<template>
  <div class="widget p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📦 Create Order</h1>

    <!-- Order Form -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-gray-900 dark:text-white font-semibold">👤 Customer Name</label>
        <input 
          v-model="newOrder.customer" 
          type="text" 
          placeholder="Enter customer name"
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📦 Item Name</label>
        <input 
          v-model="newOrder.item" 
          type="text" 
          placeholder="Enter Item Name"
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📦 Box Quantity</label>
        <input 
          v-model="newOrder.boxQuantity" 
          type="number" 
          placeholder="Enter box quantity"
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📦 SKU Quantity</label>
        <input 
          v-model="newOrder.skuQuantity" 
          type="number" 
          placeholder="Enter SKU quantity"
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📌 Bin Location</label>
        <select v-model="newOrder.bin" class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white">
          <option disabled value="">Select Bin</option>
          <option v-for="(bin, index) in binLocations" :key="index" :value="bin">
            {{ bin }}
          </option>
        </select>
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📅 Expiry Date</label>
        <input 
          v-model="newOrder.expiryDate" 
          type="date" 
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📍 Delivery Address</label>
        <input 
          v-model="newOrder.address" 
          type="text" 
          placeholder="Enter delivery address"
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label class="text-gray-900 dark:text-white font-semibold">📝 Order Description</label>
        <textarea
          v-model="newOrder.description"
          placeholder="Enter order details..."
          class="p-3 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
    </div>

    <!-- Add Order Button -->
    <button 
      @click="addOrder"
      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
    >
      Add Order
    </button>

    <!-- Order List -->
    <div class="mt-6">
      <h2 class="text-lg font-bold mb-3">📋 New Orders</h2>
      <div v-if="orders.length" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700 text-left">
              <th class="p-2 border dark:border-gray-600">#</th>
              <th class="p-2 border dark:border-gray-600">Customer</th>
              <th class="p-2 border dark:border-gray-600">Item</th>
              <th class="p-2 border dark:border-gray-600">Description</th>
              <th class="p-2 border dark:border-gray-600">Box Qty</th>
              <th class="p-2 border dark:border-gray-600">SKU Qty</th>
              <th class="p-2 border dark:border-gray-600">Bin</th>
              <th class="p-2 border dark:border-gray-600">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index" class="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td class="p-2 border dark:border-gray-600">#{{ index + 1 }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.customer }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.item.name }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.description }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.boxQuantity }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.skuQuantity }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.bin }}</td>
              <td class="p-2 border dark:border-gray-600">{{ order.expiryDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-gray-500 dark:text-gray-400">No orders created yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newOrder = ref({
  customer: '',
  address: '',
  description: '',
  item: '',
  boxQuantity: '',
  skuQuantity: '',
  bin: '',
  expiryDate: '',
});

const orders = ref([]);

const binLocations = ref(["A1", "B2", "C3", "D4"]);

const addOrder = () => {
  if (newOrder.value.customer && newOrder.value.item && newOrder.value.description) {
    orders.value.push({ ...newOrder.value });
    newOrder.value = { customer: '', address: '', description: '', item: '', boxQuantity: '', skuQuantity: '', bin: '', expiryDate: '' };
  }
};
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
