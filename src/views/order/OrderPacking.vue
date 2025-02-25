<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📦 Order Packing</h1>
  
        <!-- Orders Ready for Packing List -->
        <div class="mb-6 p-4 border rounded-lg bg-gray-100 dark:bg-surface-800">
            <h2 class="text-lg font-semibold">📋 Orders Ready for Packing</h2>
            <ul v-if="pickedOrders.length">
                <li v-for="(order, index) in pickedOrders" :key="index" 
                    class="p-2 border-b dark:border-gray-600 flex justify-between items-center">
                    <span>📦 Order #{{ order.id }} ({{ order.items.length }} Items)</span>
                    <span :class="priorityClass(order.priority)" class="px-3 py-1 text-xs rounded-full">
                        {{ order.priority }}
                    </span>
                </li>
            </ul>
            <p v-else class="text-gray-500 dark:text-gray-400">No picked orders available.</p>
        </div>
  
        <!-- Order Selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 dark:text-gray-300 font-semibold">Select Picked Order:</label>
                <select v-model="selectedPackedOrder" class="p-3 border rounded-lg w-full dark:bg-surface-800 dark:text-white">
                    <option disabled value="">Choose an Order</option>
                    <option v-for="(order, index) in pickedOrders" :key="index" :value="order">
                        Order #{{ order.id }} ({{ order.items.length }} items)
                    </option>
                </select>
            </div>
  
            <div class="flex items-end">
                <button 
                    @click="startPacking"
                    :disabled="isPacking || !selectedPackedOrder"
                    class="px-4 py-2 rounded-lg transition"
                    :class="isPacking ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'"
                >
                    {{ isPacking ? "Packing..." : "Confirm Pack" }}
                </button>
            </div>
        </div>
  
        <!-- Packing Animation -->
        <div v-if="isPacking" class="mt-6 flex flex-col items-center">
            <p class="text-lg font-semibold text-gray-900 dark:text-white">Packing in Progress...</p>
            <div class="conveyor-belt">
                <div class="box"></div>
            </div>
        </div>
  
        <!-- Packed Orders -->
        <div class="mt-6">
            <h2 class="text-lg font-bold mb-3">✅ Packed Orders</h2>
            <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
                        <th class="p-2 border">Order ID</th>
                        <th class="p-2 border">Items</th>
                        <th class="p-2 border">Priority</th>
                        <th class="p-2 border">Status</th>
                    </tr>
                </thead>
                <transition-group tag="tbody" name="fade-slide" class="tbody">
                    <tr v-for="(order, index) in packedOrders" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="p-2 border">#{{ order.id }}</td>
                        <td class="p-2 border">{{ order.items.join(", ") }}</td>
                        <td class="p-2 border">
                            <span :class="priorityClass(order.priority)" class="px-3 py-1 text-xs rounded-full">
                                {{ order.priority }}
                            </span>
                        </td>
                        <td class="p-2 border text-green-500 font-semibold">Packed</td>
                    </tr>
                </transition-group>
            </table>
            <p v-if="!packedOrders.length" class="text-gray-500 dark:text-gray-400 text-center mt-2">No orders packed yet.</p>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Sample Picked Orders (Now includes Priority)
  const pickedOrders = ref([
    { id: 101, items: ["Item A", "Item B", "Item C"], priority: "High" },
    { id: 102, items: ["Item D", "Item E"], priority: "Medium" },
    { id: 103, items: ["Item F", "Item G", "Item H"], priority: "Low" }
  ]);
  
  const selectedPackedOrder = ref(null);
  const packedOrders = ref([]);
  const isPacking = ref(false);
  
  // Function to Start Packing Process with Animation
  const startPacking = () => {
    if (!selectedPackedOrder.value) return;
  
    isPacking.value = true;
  
    setTimeout(() => {
        packedOrders.value.push(selectedPackedOrder.value);
        pickedOrders.value = pickedOrders.value.filter(order => order.id !== selectedPackedOrder.value.id);
        selectedPackedOrder.value = null;
        isPacking.value = false;
    }, 3500); // Packing duration (3.5 seconds)
  };
  
  // Function to Assign Priority Colors
  const priorityClass = (priority) => {
    return {
        "bg-red-500 text-white": priority === "High",
        "bg-yellow-500 text-black": priority === "Medium",
        "bg-gray-500 text-white": priority === "Low"
    };
  };
  </script>
  
  <style scoped>
  button:focus {
    outline: none;
  }
  
  /* Conveyor Belt Animation */
  .conveyor-belt {
    width: 300px;
    height: 100px;
    background: repeating-linear-gradient(
        90deg,
        #ccc,
        #ccc 10px,
        #ddd 10px,
        #ddd 20px
    );
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    animation: moveBelt 1s linear infinite;
  }
  
  .box {
    width: 50px;
    height: 50px;
    background: #fb9f00;
    border-radius: 5px;
    position: absolute;
    top: 25px;
    left: 0;
    animation: moveBox 3.5s linear forwards;
  }
  
  /* Moving Conveyor */
  @keyframes moveBelt {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 20px 0;
    }
  }
  
  /* Moving Box */
  @keyframes moveBox {
    0% {
        left: 0;
    }
    100% {
        left: 100%;
    }
  }
  
  /* Smooth Transition Animations */
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
  