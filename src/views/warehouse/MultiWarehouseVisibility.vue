<template>
    <div class="widget p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Multi-Warehouse Visibility</h1>
  
      <!-- Search and Filters -->
      <div class="mb-6 flex flex-wrap gap-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search Item..."
          class="p-3 border rounded-lg w-full md:w-1/3 dark:bg-gray-700 dark:text-white"
        />
        <select v-model="selectedWarehouse" class="p-3 border rounded-lg w-full md:w-1/3 dark:bg-gray-700 dark:text-white">
          <option value="">All Warehouses</option>
          <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
            {{ warehouse.name }}
          </option>
        </select>
      </div>
  
      <!-- Warehouse Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="warehouse in filteredWarehouses" :key="warehouse.id" 
             class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 class="text-lg font-bold">{{ warehouse.name }}</h2>
          <p class="text-gray-500 dark:text-gray-300">📍 {{ warehouse.location }}</p>
          <p class="mt-2 text-sm font-semibold">📦 Total Inventory: <span class="text-blue-500">{{ warehouse.inventory }}</span></p>
          <p class="mt-2">
            <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="warehouseStatusClass(warehouse.status)">
              {{ warehouse.status }}
            </span>
          </p>
        </div>
      </div>
  
      <!-- Inventory Visibility Table -->
      <div class="mt-6">
        <h2 class="text-lg font-bold mb-3">📋 Warehouse Inventory Overview</h2>
        <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <th class="p-2 border">Warehouse</th>
              <th class="p-2 border">Item</th>
              <th class="p-2 border">Stock</th>
              <th class="p-2 border">Priority</th>
              <th class="p-2 border">Status</th>
            </tr>
          </thead>
          <transition-group tag="tbody" name="fade-slide">
            <tr v-for="item in filteredInventory" :key="item.id" class="hover:bg-gray-100 dark:hover:bg-gray-700 text-center">
              <td class="p-2 border">{{ item.warehouse }}</td>
              <td class="p-2 border">{{ item.name }}</td>
              <td class="p-2 border">{{ item.stock }}</td>
              <td class="p-2 border">
                <span class="px-3 py-1 text-xs rounded-full" :class="priorityClass(item.priority)">
                  {{ item.priority }}
                </span>
              </td>
              <td class="p-2 border" :class="statusClass(item.status)">{{ item.status }}</td>
            </tr>
          </transition-group>
        </table>
        <p v-if="!filteredInventory.length" class="text-gray-500 dark:text-gray-400 text-center mt-2">No inventory records found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Sample Warehouse Data
  const warehouses = ref([
    { id: 1, name: "Warehouse A", location: "Klang", inventory: 1500, status: "Active" },
    { id: 2, name: "Warehouse B", location: "Subang", inventory: 1200, status: "Maintenance" },
    { id: 3, name: "Warehouse C", location: "Shah Alam", inventory: 1800, status: "Inactive" }
  ]);
  
  // Sample Inventory Data
  const inventory = ref([
    { id: 101, warehouse: "Warehouse A", name: "5G Modem", stock: 120, priority: "High", status: "Available" },
    { id: 102, warehouse: "Warehouse B", name: "Fiber Router", stock: 60, priority: "Medium", status: "Low Stock" },
    { id: 103, warehouse: "Warehouse C", name: "Network Switch", stock: 30, priority: "High", status: "Critical" },
    { id: 104, warehouse: "Warehouse A", name: "SIM Cards", stock: 200, priority: "Low", status: "Available" }
  ]);
  
  const searchQuery = ref("");
  const selectedWarehouse = ref("");
  
  // Filtered Warehouse List
  const filteredWarehouses = computed(() => {
    if (!selectedWarehouse.value) return warehouses.value;
    return warehouses.value.filter(warehouse => warehouse.id === selectedWarehouse.value);
  });
  
  // Filtered Inventory List
  const filteredInventory = computed(() => {
    return inventory.value.filter(item =>
      (!selectedWarehouse.value || item.warehouse === warehouses.value.find(w => w.id === selectedWarehouse.value)?.name) &&
      (!searchQuery.value || item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });
  
  // Function to Assign Warehouse Status Colors
  const warehouseStatusClass = (status) => {
    return {
      "bg-green-500 text-white": status === "Active",
      "bg-yellow-500 text-black": status === "Maintenance",
      "bg-red-500 text-white": status === "Inactive"
    };
  };
  
  // Function to Assign Priority Colors
  const priorityClass = (priority) => {
    return {
      "bg-red-500 text-white": priority === "High",
      "bg-yellow-500 text-black": priority === "Medium",
      "bg-gray-500 text-white": priority === "Low"
    };
  };
  
  // Function to Assign Inventory Status Colors
  const statusClass = (status) => {
    return {
      "text-green-500 font-semibold": status === "Available",
      "text-yellow-500 font-semibold": status === "Low Stock",
      "text-red-500 font-semibold": status === "Critical",
      "text-gray-500 font-semibold": status === "Inactive"
    };
  };
  </script>
  
  <style scoped>
  button:focus {
    outline: none;
  }

  </style>
  