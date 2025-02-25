<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLayout } from '@/layout/composables/layout'; // Import dark mode state

const router = useRouter();
const { isDarkTheme } = useLayout(); // Reactive dark mode state

const navigateTo = (path) => {
  router.push(path);
};

const warehouseSections = ref([
  { id: 'A', totalSlots: 50, type: 'Inbound' },
  { id: 'B', totalSlots: 50, type: 'Inbound' },
  { id: 'C', totalSlots: 15, type: 'Outbound' },
  { id: 'D', totalSlots: 64, type: 'Inbound' }
]);

const palletSlots = ref(warehouseSections.value.flatMap(section =>
  Array.from({ length: section.totalSlots }, (_, i) => ({
    id: `${section.id}-P${i}`,
    occupied: Math.random() > 0.7,
    location: `Row ${Math.ceil((i + 1) / 5)}, Col ${((i % 5) + 1)}` // Dummy row & column
  }))
));

const availableSlots = (sectionId) => 
  computed(() => palletSlots.value.filter(slot => slot.id.startsWith(sectionId) && !slot.occupied).length).value;

const occupiedSlots = (sectionId) => 
  computed(() => palletSlots.value.filter(slot => slot.id.startsWith(sectionId) && slot.occupied).length).value;

const getFilteredPalletSlots = (sectionId) => 
  computed(() => palletSlots.value.filter(slot => slot.id.startsWith(sectionId))).value;

const slotClasses = (occupied) => {
  return occupied ? 'bg-red-500 dark:bg-red-700 animate-pulse' : 'bg-green-500 dark:bg-green-700';
};

// Tooltip functionality
const tooltip = ref({ show: false, x: 0, y: 0, data: {} });

const showTooltip = (slot, event) => {
  tooltip.value = {
    show: true,
    x: event.pageX + 10,
    y: event.pageY + 10,
    data: slot
  };
};

const hideTooltip = () => {
  tooltip.value.show = false;
};
</script>

<template>
  <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Warehouse Storage Overview
      </h1>
      
      <!-- Buttons -->
      <div class="space-x-4">
        <button 
          @click="navigateTo('/order/create')"
          class="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          Create Order
        </button>
        <button 
          @click="navigateTo('/order/list')"
          class="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
        >
          📋 Order List
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div 
        v-for="section in warehouseSections" 
        :key="section.id" 
        class="widget p-6 bg-gray-200 dark:bg-surface-800 rounded-lg shadow-lg transition-all relative"
      >
        <div 
          :class="section.type === 'Inbound' ? 'bg-green-500 dark:bg-green-700' : 'bg-blue-500 dark:bg-blue-700'"
          class="absolute top-2 right-2 text-white px-3 py-1 text-xs font-bold rounded"
        >
          {{ section.type }}
        </div>

        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Section {{ section.id }}
        </h2>

        <p class="text-gray-700 dark:text-gray-300">
          Total Slots: <span class="font-semibold">{{ section.totalSlots }}</span>
        </p>
        <p class="text-green-500 dark:text-green-400 font-bold">
          Available: <span class="text-lg">{{ availableSlots(section.id) }}</span>
        </p>
        <p class="text-red-500 dark:text-red-400 font-bold">
          Occupied: <span class="text-lg">{{ occupiedSlots(section.id) }}</span>
        </p>

        <div class="mt-4 grid grid-cols-5 gap-1 relative">
          <div 
            v-for="slot in getFilteredPalletSlots(section.id)" 
            :key="slot.id"
            :class="slotClasses(slot.occupied)"
            class="w-6 h-8 rounded shadow-md cursor-pointer transition-all hover:scale-110 relative"
            @mouseenter="showTooltip(slot, $event)"
            @mouseleave="hideTooltip"
          >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tooltip -->
  <div 
    v-if="tooltip.show" 
    :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
    class="absolute p-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg transition-opacity duration-200"
  >
    <p><strong>ID:</strong> {{ tooltip.data.id }}</p>
    <p>
      <strong>Status: </strong> 
      <span :class="tooltip.data.occupied ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'">
        {{ tooltip.data.occupied ? 'Occupied' : 'Available' }}
      </span>
    </p>
    <p><strong>Location:</strong> {{ tooltip.data.location }}</p>
  </div>
</template>

<style scoped>
.cursor-pointer:hover {
  opacity: 0.8;
}
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
