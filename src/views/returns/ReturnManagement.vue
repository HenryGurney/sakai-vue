<template>
  <div class="widget p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔄 Return Management</h1>

      <!-- Return Processing Form -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
              <label class="block text-gray-700 dark:text-gray-300 font-semibold">Enter Order ID for Return:</label>
              <input 
                  v-model="returnInput"
                  type="text" 
                  placeholder="Order ID..." 
                  class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
              />
          </div>

          <div>
              <label class="block text-gray-700 dark:text-gray-300 font-semibold">Return Reason:</label>
              <select v-model="selectedReason" class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white">
                  <option disabled value="">Select Reason</option>
                  <option v-for="reason in returnReasons" :key="reason">{{ reason }}</option>
              </select>
          </div>

          <div class="flex items-end">
              <button 
                  @click="processReturn"
                  :disabled="!returnInput || !selectedReason"
                  class="px-4 py-2 rounded-lg transition w-full"
                  :class="!returnInput || !selectedReason ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'"
              >
                  Process Return
              </button>
          </div>
      </div>

      <!-- Returned Orders Table -->
      <div class="mt-6">
          <h2 class="text-lg font-bold mb-3">📋 Returned Orders</h2>
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                  <tr class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                      <th class="p-2 border">Order ID</th>
                      <th class="p-2 border">Return Reason</th>
                      <th class="p-2 border">Date Returned</th>
                      <th class="p-2 border">Status</th>
                      <th class="p-2 border">Action</th>
                  </tr>
              </thead>
              <transition-group tag="tbody" name="fade-slide" class="tbody">
                  <tr v-for="(returnOrder, index) in returnedOrders" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-2 border">{{ returnOrder.orderId }}</td>
                      <td class="p-2 border">{{ returnOrder.reason }}</td>
                      <td class="p-2 border">{{ returnOrder.date }}</td>
                      <td class="p-2 border">
                          <span :class="statusClass(returnOrder.status)">{{ returnOrder.status }}</span>
                      </td>
                      <td class="p-2 border">
                          <button 
                              v-if="returnOrder.status === 'Pending'" 
                              @click="updateStatus(index, 'Inspected')" 
                              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                          >
                              Inspect
                          </button>
                          <button 
                              v-if="returnOrder.status === 'Inspected'" 
                              @click="updateStatus(index, 'Refunded')" 
                              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mx-1"
                          >
                              Refund
                          </button>
                          <button 
                              v-if="returnOrder.status === 'Inspected'" 
                              @click="updateStatus(index, 'Restocked')" 
                              class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                          >
                              Restock
                          </button>
                      </td>
                  </tr>
              </transition-group>
          </table>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample Return Reasons
const returnReasons = ref([
  "Damaged Product",
  "Incorrect Item Sent",
  "Customer Changed Mind",
  "Product Defective",
  "Other"
]);

const returnInput = ref('');
const selectedReason = ref('');
const returnedOrders = ref([]);

// Process Return Function
const processReturn = () => {
  if (!returnInput.value || !selectedReason.value) return;

  returnedOrders.value.push({
      orderId: returnInput.value.trim(),
      reason: selectedReason.value,
      date: new Date().toLocaleDateString(),
      status: "Pending"
  });

  // Reset inputs
  returnInput.value = '';
  selectedReason.value = '';
};

// Update Return Status
const updateStatus = (index, newStatus) => {
  returnedOrders.value[index].status = newStatus;
};

// Dynamic Status Classes
const statusClass = (status) => {
  return {
      "text-yellow-500 font-semibold": status === "Pending",
      "text-blue-500 font-semibold": status === "Inspected",
      "text-green-500 font-semibold": status === "Refunded",
      "text-orange-500 font-semibold": status === "Restocked"
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
