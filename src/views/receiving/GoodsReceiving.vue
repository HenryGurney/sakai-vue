<template>
  <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚚 Goods Receiving</h1>

      <!-- Items to Receive List -->
      <div class="mb-6">
          <h2 class="text-lg font-bold mb-3">📋 Items to Receive</h2>
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                  <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
                      <th class="p-2 border">Goods ID</th>
                      <th class="p-2 border">Description</th>
                      <th class="p-2 border">Quantity</th>
                      <th class="p-2 border">Supplier</th>
                      <th class="p-2 border">Expected Location</th>
                      <th class="p-2 border">Status</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in itemsToReceive" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-2 border">{{ item.id }}</td>
                      <td class="p-2 border">{{ item.description }}</td>
                      <td class="p-2 border">{{ item.quantity }}</td>
                      <td class="p-2 border">{{ item.supplier }}</td>
                      <td class="p-2 border">{{ item.expectedLocation }}</td>
                      <td class="p-2 border font-semibold" :class="statusClass(item.status)">{{ item.status }}</td>
                  </tr>
              </tbody>
          </table>
      </div>

      <!-- Goods Scanning & Receiving -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label class="block text-gray-700 dark:text-gray-300 font-semibold">Enter Goods ID:</label>
              <input 
                  v-model="scanInput"
                  type="text" 
                  placeholder="Scan or Enter Goods ID..." 
                  class="p-3 border rounded-lg w-full dark:bg-surface-800 dark:text-white"
              />
          </div>

          <div class="flex items-end">
              <button 
                  @click="receiveGoods"
                  :disabled="isReceiving || !scanInput.trim()"
                  class="px-4 py-2 rounded-lg transition"
                  :class="isReceiving ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'"
              >
                  {{ isReceiving ? "Receiving..." : "Receive Goods" }}
              </button>
          </div>
      </div>

      <!-- Receiving Progress Bar -->
      <div v-if="isReceiving" class="mt-4 p-3 border rounded-lg bg-gray-100 dark:bg-surface-800">
          <p class="text-lg font-semibold text-gray-900 dark:text-white">📦 Receiving in Progress...</p>
          <div class="progress-bar mt-2 w-full bg-gray-300 rounded-lg overflow-hidden">
              <div class="progress" :style="{ width: receivingProgress + '%' }"></div>
          </div>
          <p class="mt-2 text-center">{{ receivingProgress }}% Completed</p>
      </div>

      <!-- Received Goods Table -->
      <div class="mt-6">
          <h2 class="text-lg font-bold mb-3">✅ Received Goods</h2>
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                  <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
                      <th class="p-2 border">Goods ID</th>
                      <th class="p-2 border">Description</th>
                      <th class="p-2 border">Quantity</th>
                      <th class="p-2 border">Supplier</th>
                      <th class="p-2 border">Date Received</th>
                      <th class="p-2 border">Location</th>
                      <th class="p-2 border">Status</th>
                  </tr>
              </thead>
              <transition-group tag="tbody" name="fade-slide" class="tbody">
                  <tr v-for="(item, index) in receivedGoods" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-2 border">{{ item.id }}</td>
                      <td class="p-2 border">{{ item.description }}</td>
                      <td class="p-2 border">{{ item.quantity }}</td>
                      <td class="p-2 border">{{ item.supplier }}</td>
                      <td class="p-2 border">{{ item.date }}</td>
                      <td class="p-2 border">{{ item.location }}</td>
                      <td class="p-2 border text-green-500 font-semibold">Received</td>
                  </tr>
              </transition-group>
          </table>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample Storage Locations
const locations = ["Warehouse A", "Warehouse B", "Section C", "Storage Unit D"];

// Sample Items to Receive
const itemsToReceive = ref([
  { id: "G001", description: "5G Modem", quantity: 20, supplier: "Huawei Technologies", expectedLocation: "Warehouse A", status: "Pending" },
  { id: "G002", description: "Fiber Router", quantity: 10, supplier: "Nokia Malaysia", expectedLocation: "Warehouse B", status: "Pending" },
  { id: "G003", description: "Network Switch", quantity: 15, supplier: "Ericsson Suppliers", expectedLocation: "Section C", status: "Pending" },
  { id: "G004", description: "SIM Cards", quantity: 50, supplier: "ZTE Global", expectedLocation: "Storage Unit D", status: "Pending" }
]);

const scanInput = ref('');
const receivedGoods = ref([]);
const isReceiving = ref(false);
const receivingProgress = ref(0);

// Function to Receive Goods
const receiveGoods = () => {
  if (!scanInput.value.trim()) return;

  isReceiving.value = true;
  receivingProgress.value = 0;

  let interval = setInterval(() => {
      if (receivingProgress.value >= 100) {
          clearInterval(interval);
          const receivedItem = itemsToReceive.value.find(item => item.id === scanInput.value.trim());
          if (receivedItem) {
              receivedItem.status = "Received";
              receivedGoods.value.push({
                  ...receivedItem,
                  date: new Date().toLocaleDateString(),
                  location: receivedItem.expectedLocation
              });
          }
          scanInput.value = '';
          isReceiving.value = false;
      } else {
          receivingProgress.value += 25;
      }
  }, 500);
};

// Status Color Classes
const statusClass = (status) => {
  return {
      "text-yellow-500 font-semibold": status === "Pending",
      "text-green-500 font-semibold": status === "Received"
  };
};
</script>

<style scoped>
button:focus {
  outline: none;
}

/* Progress Bar Styling */
.progress-bar {
  height: 12px;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #10b981);
  transition: width 0.5s ease-in-out;
}

/* Fade Slide Transition */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
