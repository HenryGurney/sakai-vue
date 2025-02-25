<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚚 Order Picking</h1>
  
        <!-- Orders Received List -->
        <div class="mb-6 p-4 border rounded-lg bg-gray-100 dark:bg-surface-800">
            <h2 class="text-lg font-semibold">📋 Orders Received</h2>
            <ul v-if="orders.length">
                <li v-for="(order, index) in orders" :key="index" class="p-2 border-b dark:border-gray-600">
                    📦 Order #{{ order.id }} ({{ order.items.length }} Items)
                </li>
            </ul>
            <p v-else class="text-gray-500 dark:text-gray-400">No new orders.</p>
        </div>
  
        <!-- Order Selection -->
        <div class="flex gap-4">
            <select v-model="selectedOrder" class="p-3 border rounded-lg w-1/2 dark:bg-surface-800 dark:text-white">
                <option disabled value="">Select Order</option>
                <option v-for="(order, index) in orders" :key="index" :value="order">
                    Order #{{ order.id }} ({{ order.items.length }} items)
                </option>
            </select>
  
            <button 
                @click="startRobotPicking"
                :disabled="isPicking || !selectedOrder"
                class="px-4 py-2 rounded-lg transition"
                :class="isPicking ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'"
            >
                {{ isPicking ? "Picking..." : "Confirm Pick" }}
            </button>
        </div>
  
        <!-- Robot Picking Status -->
        <div v-if="robotStatus !== 'Idle'" class="mt-4 p-3 border rounded-lg bg-gray-100 dark:bg-surface-800">
            <p class="text-lg font-semibold text-gray-900 dark:text-white">🚀 Status:</p>
            <div class="progress-bar mt-2 w-full bg-gray-300 rounded-lg overflow-hidden">
                <div class="progress" :style="{ width: pickingProgress + '%' }"></div>
            </div>
            <p class="mt-2 text-center" :class="statusClass(robotStatus)">
                {{ robotStatus }}
            </p>
        </div>
  
        <!-- Order Details -->
        <div v-if="selectedOrder" class="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-surface-800">
            <h2 class="text-lg font-semibold">📦 Order Details</h2>
            <p class="text-gray-600 dark:text-gray-300"><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
            <p class="text-gray-600 dark:text-gray-300"><strong>Items:</strong> {{ selectedOrder.items.join(', ') }}</p>
        </div>
  
        <!-- Completed Orders -->
        <div class="mt-6">
            <h2 class="text-lg font-bold mb-3">Completed Orders</h2>
            <ul v-if="pickedOrders.length">
                <li v-for="(order, index) in pickedOrders" :key="index" class="p-2 border-b dark:border-gray-600">
                    ✅ Order #{{ order.id }} - {{ order.items.length }} Items
                </li>
            </ul>
            <p v-else class="text-gray-500 dark:text-gray-400">No orders picked yet.</p>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Sample Orders
  const orders = ref([
    { id: 101, items: ["Item A", "Item B", "Item C"] },
    { id: 102, items: ["Item D", "Item E"] },
    { id: 103, items: ["Item F", "Item G", "Item H"] }
  ]);
  
  const selectedOrder = ref(null);
  const pickedOrders = ref([]);
  const isPicking = ref(false);
  const robotStatus = ref("Idle");
  const pickingProgress = ref(0);
  
  // Function to Start Robot Picking Process
  const startRobotPicking = () => {
    if (!selectedOrder.value) return;
    
    isPicking.value = true;
    pickingProgress.value = 0;
    robotStatus.value = "🟡 Moving to Pick Order...";
  
    let interval = setInterval(() => {
        pickingProgress.value += 25;
  
        if (pickingProgress.value === 50) {
            robotStatus.value = "Picking Items...";
        }
  
        if (pickingProgress.value >= 100) {
            clearInterval(interval);
            robotStatus.value = "✅ Order Picked Successfully!";
            pickedOrders.value.push(selectedOrder.value);
            orders.value = orders.value.filter(order => order.id !== selectedOrder.value.id);
            selectedOrder.value = null;
            isPicking.value = false;
  
            setTimeout(() => {
                robotStatus.value = "Idle";
                pickingProgress.value = 0;
            }, 2000);
        }
    }, 1000); // Simulate picking time
  };
  
  // Dynamic Status Classes
  const statusClass = (status) => {
    return {
        "text-yellow-500 font-semibold": status.includes("Moving") || status.includes("Picking"),
        "text-green-500 font-semibold": status.includes("Successfully"),
        "text-gray-500 font-semibold": status === "Idle"
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
  </style>
  