<template>
  <div class="widget p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚚 Shipping Management</h1>

      <!-- Order Selection & Carrier Assignment -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
              <label class="block text-gray-700 dark:text-gray-300 font-semibold">Select Packed Order:</label>
              <select v-model="selectedOrder" class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white">
                  <option disabled value="">Select Packed Order</option>
                  <option v-for="(order, index) in packedOrders" :key="index" :value="order">
                      Order #{{ order.id }} ({{ order.items.length }} items)
                  </option>
              </select>
          </div>

          <div>
              <label class="block text-gray-700 dark:text-gray-300 font-semibold">Select Shipping Carrier:</label>
              <select v-model="selectedCarrier" class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white">
                  <option disabled value="">Select Carrier</option>
                  <option v-for="carrier in shippingCarriers" :key="carrier">{{ carrier }}</option>
              </select>
          </div>

          <div class="flex items-end">
              <button 
                  @click="confirmShipment"
                  :disabled="!selectedOrder || !selectedCarrier"
                  class="px-4 py-2 rounded-lg transition w-full"
                  :class="!selectedOrder || !selectedCarrier ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'"
              >
                  Ship Order
              </button>
          </div>
      </div>

      <!-- Shipment Tracking Table -->
      <div class="mt-6">
          <h2 class="text-lg font-bold mb-3">📦 Shipped Orders</h2>
          <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                  <tr class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                      <th class="p-2 border">Order ID</th>
                      <th class="p-2 border">Items</th>
                      <th class="p-2 border">Carrier</th>
                      <th class="p-2 border">Tracking Number</th>
                      <th class="p-2 border">Date Shipped</th>
                      <th class="p-2 border">Status</th>
                      <th class="p-2 border">Actions</th>
                  </tr>
              </thead>
              <transition-group tag="tbody" name="fade-slide" class="tbody">
                  <tr v-for="(shipment, index) in shippedOrders" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td class="p-2 border">{{ shipment.order.id }}</td>
                      <td class="p-2 border">{{ shipment.order.items.join(', ') }}</td>
                      <td class="p-2 border">{{ shipment.carrier }}</td>
                      <td class="p-2 border">{{ shipment.trackingNumber }}</td>
                      <td class="p-2 border">{{ shipment.dateShipped }}</td>
                      <td class="p-2 border">
                          <span :class="statusClass(shipment.status)">{{ shipment.status }}</span>
                      </td>
                      <td class="p-2 border">
                          <button 
                              v-if="shipment.status === 'In Transit'" 
                              @click="updateStatus(index, 'Delivered')" 
                              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                          >
                              Mark Delivered
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

// Sample Packed Orders
const packedOrders = ref([
  { id: 101, items: ["Item A", "Item B", "Item C"] },
  { id: 102, items: ["Item D", "Item E"] }
]);

// Shipping Carriers
const shippingCarriers = ref(["DHL", "FedEx", "UPS", "PosLaju", "J&T Express"]);

const selectedOrder = ref(null);
const selectedCarrier = ref('');
const shippedOrders = ref([]);

// Generate a Random Tracking Number
const generateTrackingNumber = () => {
  return "TRK" + Math.floor(100000 + Math.random() * 900000);
};

// Function to Confirm Shipment
const confirmShipment = () => {
  if (!selectedOrder.value || !selectedCarrier.value) return;

  shippedOrders.value.push({
      order: selectedOrder.value,
      carrier: selectedCarrier.value,
      trackingNumber: generateTrackingNumber(),
      dateShipped: new Date().toLocaleDateString(),
      status: "In Transit"
  });

  // Remove order from packed list after shipping
  packedOrders.value = packedOrders.value.filter(order => order.id !== selectedOrder.value.id);

  // Reset selection
  selectedOrder.value = null;
  selectedCarrier.value = '';
};

// Function to Update Shipment Status
const updateStatus = (index, newStatus) => {
  shippedOrders.value[index].status = newStatus;
};

// Dynamic Status Classes
const statusClass = (status) => {
  return {
      "text-blue-500 font-semibold": status === "In Transit",
      "text-green-500 font-semibold": status === "Delivered"
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
