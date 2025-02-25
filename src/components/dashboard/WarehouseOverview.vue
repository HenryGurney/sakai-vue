<template>
    <div class="widget p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Warehouse Overview</h2>

        <!-- Filter Buttons -->
        <div class="flex space-x-4 mb-2">
            <button @click="filter = 'all'"
                class="px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md
                    bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white focus:outline-none">
                Show All
            </button>

            <button @click="filter = 'occupied'"
                class="px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md
                    bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:outline-none">
                Occupied
            </button>

            <button @click="filter = 'available'"
                class="px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md
                    bg-green-500 hover:bg-green-600 active:bg-green-700 text-white focus:outline-none">
                Available
            </button>
        </div>

        <!-- Warehouse Container -->
        <div ref="warehouseContainer" class="relative w-full h-[500px] rounded-lg overflow-hidden">
            <svg viewBox="0 0 800 400" class="w-full h-full">
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="lightgray" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="none" />

            <!-- Warehouse Sections -->
            <g v-for="section in warehouseSections" :key="section.id">
                <rect :x="section.x"
                    :y="section.y"
                    :width="section.width"
                    :height="section.height"
                    fill="#E5E7EB"
                    stroke="#6B7280"
                    stroke-width="2"
                    class="cursor-pointer transition-all duration-200"
                />

                <!-- Rectangular pallet slots inside each section -->
                <rect v-for="slot in getFilteredPalletSlots(section)"
                    :key="slot.id"
                    :x="slot.x"
                    :y="slot.y"
                    width="12"
                    height="24"
                    :fill="slot.occupied ? '#f61236' : '#0bd265'"  
                    stroke="gray"
                    stroke-width="0.5"
                    rx="3" ry="3"
                    @mouseover="showPalletDetails(slot, $event)"
                    @mouseleave="hidePalletDetails"
                />

                <!-- Section Labels -->
                <text :x="section.x + section.width / 2"
                    :y="section.y + section.height / 2"
                    text-anchor="middle"
                    :style="{ fill: '#000', fontWeight: 'bold', fontSize: '14px' }">
                    {{ section.id }}
                </text>
            </g>

            <!-- Inbound Label & Animated Arrow (Placed to the right) -->
            <g transform="translate(280, 5)">
                <text x="20" y="10" text-anchor="middle" :style="{ fill: '#374151', fontWeight: 'bold', fontSize: '16px' }">
                    INBOUND (A, B, D)
                </text>
                <g transform="translate(100, -5)">  <!-- Move arrow to the right -->
                    <path d="M 5 0 L 15 10 L 25 0" stroke="#374151" stroke-width="2" fill="none"/> <!-- Static Arrow -->
                    <polygon points="10,15 20,15 15,25" fill="#374151">
                        <animateTransform attributeType="XML" attributeName="transform" type="translate" from="0,0" to="0,10" dur="0.6s" repeatCount="indefinite"/>
                    </polygon>
                </g>
            </g>

            <!-- Outbound Label & Animated Arrow (Placed to the right) -->
            <g transform="translate(510, 350)">
                <text x="90" y="30" text-anchor="middle" :style="{ fill: '#374151', fontWeight: 'bold', fontSize: '16px' }">
                    OUTBOUND (C)
                </text>
                <g transform="translate(160, 5)">  <!-- Move arrow to the right -->
                    <polygon points="10,20 20,20 15,10" fill="#374151">
                        <animateTransform attributeType="XML" attributeName="transform" type="translate" from="0,10" to="0,0" dur="0.6s" repeatCount="indefinite"/>
                    </polygon>
                    <path d="M 5 30 L 15 20 L 25 30" stroke="#374151" stroke-width="2" fill="none"/> <!-- Static Arrow -->
                </g>
            </g>
        </svg>


            <!-- Pallet Slot Tooltip -->
            <div v-if="hoveredPallet"
                 class="absolute bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg"
                 :style="tooltipStyles">
                <h3 class="font-bold">Pallet Slot: {{ hoveredPallet.id }}</h3>
                <p>Status: <strong :class="hoveredPallet.occupied ? 'text-red-500' : 'text-green-500'">
                    {{ hoveredPallet.occupied ? "Occupied" : "Available" }}
                </strong></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const warehouseContainer = ref(null);
const warehouseSections = ref([
    { id: 'A', x: 200, y: 50, width: 250, height: 150, rows: 5, cols: 10 },
    { id: 'B', x: 200, y: 220, width: 250, height: 150, rows: 5, cols: 10 },
    { id: 'C', x: 500, y: 220, width: 150, height: 100, rows: 3, cols: 5 },
    { id: 'D', x: 50, y: 50, width: 150, height: 320, rows: 8, cols: 8 }
]);

const generatePalletSlots = (section) => {
    if (!section) return [];
    const slots = [];
    const rowSpacing = section.width / section.cols;
    const colSpacing = section.height / section.rows;

    for (let row = 0; row < section.rows; row++) {
        for (let col = 0; col < section.cols; col++) {
            slots.push({
                id: `${section.id}-P${row}-${col}`,
                x: section.x + col * rowSpacing + 3,  // Adjust position
                y: section.y + row * colSpacing + 3,  // Adjust position
                occupied: Math.random() > 0.7
            });
        }
    }
    return slots;
};

// Create initial pallet slots
const palletSlots = ref(warehouseSections.value.flatMap(generatePalletSlots));

const filter = ref("all");

// Computed property to update pallet slots based on filter
const getFilteredPalletSlots = (section) => {
    return computed(() => 
        palletSlots.value.filter(slot =>
            slot.id.startsWith(section.id) &&
            (filter.value === "all" || (filter.value === "occupied" && slot.occupied) || (filter.value === "available" && !slot.occupied))
        )
    ).value;
};

const hoveredPallet = ref(null);
const tooltipStyles = ref({});

const showPalletDetails = (slot, event) => {
    if (!slot || !warehouseContainer.value) return;
    hoveredPallet.value = slot;

    // Get bounding box of the warehouse container
    const containerRect = warehouseContainer.value.getBoundingClientRect();

    let top = event.clientY - containerRect.top + 10;
    let left = event.clientX - containerRect.left + 10;

    // Prevent tooltip from going out of bounds
    const maxTop = containerRect.height - 50;
    const maxLeft = containerRect.width - 150;

    if (top > maxTop) top = maxTop;
    if (left > maxLeft) left = maxLeft;

    tooltipStyles.value = {
        top: `${top}px`,
        left: `${left}px`
    };
};

const hidePalletDetails = () => {
    hoveredPallet.value = null;
};
</script>

<style scoped>
.cursor-pointer:hover {
    opacity: 0.8;
}
</style>
