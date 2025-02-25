<template>
  <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Order List</h1>

      <!-- Order Table -->
      <div v-if="orders.length" class="p-4 rounded-lg overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                  <tr class="bg-gray-200 dark:bg-gray-700 text-left">
                      <th class="p-2 border dark:border-gray-600">Order ID</th>
                      <th class="p-2 border dark:border-gray-600">Type</th>
                      <th class="p-2 border dark:border-gray-600">Priority</th>
                      <th class="p-2 border dark:border-gray-600">Bin</th>
                      <th class="p-2 border dark:border-gray-600">Inventory</th>
                      <th class="p-2 border dark:border-gray-600">Box Qty</th>
                      <th class="p-2 border dark:border-gray-600">SKU Qty</th>
                      <th class="p-2 border dark:border-gray-600">Expiry Date</th>
                      <th class="p-2 border dark:border-gray-600">Location</th>
                      <th class="p-2 border dark:border-gray-600">Handling Notes</th>
                      <th class="p-2 border dark:border-gray-600">Last Updated</th>
                      <th class="p-2 border dark:border-gray-600">Status</th>
                      <th class="p-2 border dark:border-gray-600">Actions</th>
                  </tr>
              </thead>
              <transition-group tag="tbody" name="fade-slide" class="tbody">
                  <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-2 border dark:border-gray-600">#{{ order.id }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.type }}</td>
                      <td class="p-2 border dark:border-gray-600">
                          <span :class="priorityClass(order.priority)">{{ order.priority }}</span>
                      </td>
                      <td class="p-2 border dark:border-gray-600">{{ order.bin }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.inventory }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.boxQuantity }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.skuQuantity }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.expiryDate }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.location }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.notes }}</td>
                      <td class="p-2 border dark:border-gray-600">{{ order.lastUpdated }}</td>
                      <td class="p-2 border dark:border-gray-600">
                          <span :class="statusClass(order.status)">{{ order.status }}</span>
                      </td>
                      <td class="p-2 border dark:border-gray-600">
                          <button 
                              v-if="order.status === 'Pending'" 
                              @click="updateStatus(order.id, 'Processing')" 
                              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                          >
                              Process
                          </button>
                          <button 
                              v-if="order.status === 'Processing'" 
                              @click="updateStatus(order.id, 'Shipped')" 
                              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                          >
                              Ship
                          </button>
                          <button 
                              v-if="order.status === 'Shipped'" 
                              @click="updateStatus(order.id, 'Completed')" 
                              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                          >
                              Complete
                          </button>
                      </td>
                  </tr>
              </transition-group>
          </table>
      </div>

      <p v-else class="text-gray-500 dark:text-gray-400">No orders available.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample Orders for Celcom Digi Warehouse Operations
const orders = ref([
  { id: 101, type: "Inbound", priority: "High", bin: "A1", inventory: "5G Modem", boxQuantity: 10, skuQuantity: 100, expiryDate: "N/A", location: "Storage A", notes: "Handle with care", lastUpdated: "2024-02-01", status: "Pending" },
  { id: 102, type: "Outbound", priority: "Medium", bin: "B4", inventory: "Fiber Router", boxQuantity: 5, skuQuantity: 50, expiryDate: "N/A", location: "Storage A", notes: "Urgent order", lastUpdated: "2024-01-28", status: "Processing" },
  { id: 103, type: "Return", priority: "Low", bin: "C2", inventory: "SIM Cards", boxQuantity: 3, skuQuantity: 30, expiryDate: "2025-03-20", location: "Storage C", notes: "Defective units", lastUpdated: "2024-01-25", status: "Shipped" },
  { id: 104, type: "Inbound", priority: "High", bin: "A5", inventory: "Wireless Routers", boxQuantity: 12, skuQuantity: 120, expiryDate: "N/A", location: "Storage B", notes: "Check firmware", lastUpdated: "2024-02-02", status: "Pending" },
  { id: 105, type: "Outbound", priority: "High", bin: "B7", inventory: "Fiber Modem", boxQuantity: 6, skuQuantity: 60, expiryDate: "N/A", location: "Storage B", notes: "Express delivery", lastUpdated: "2024-02-01", status: "Processing" },
  { id: 106, type: "Return", priority: "Medium", bin: "C1", inventory: "Network Cables", boxQuantity: 4, skuQuantity: 40, expiryDate: "2026-06-30", location: "Storage C", notes: "Damaged cables", lastUpdated: "2024-01-30", status: "Shipped" }
]);

// Update Order Status
const updateStatus = (id, newStatus) => {
  const order = orders.value.find(o => o.id === id);
  if (order) {
      order.status = newStatus;
      order.lastUpdated = new Date().toLocaleDateString();
  }
};

// Dynamic Status Classes
const statusClass = (status) => {
  return {
      "text-yellow-500 font-semibold": status === "Pending",
      "text-blue-500 font-semibold": status === "Processing",
      "text-orange-500 font-semibold": status === "Shipped",
      "text-green-500 font-semibold": status === "Completed",
      "text-red-500 font-semibold": status === "Canceled"
  };
};

// Priority Class
const priorityClass = (priority) => {
  return {
      "text-red-500 font-semibold": priority === "High",
      "text-yellow-500 font-semibold": priority === "Medium",
      "text-gray-500 font-semibold": priority === "Low"
  };
};
</script>

<style scoped>
button:focus {
  outline: none;
}

/* Transition Animations */
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
