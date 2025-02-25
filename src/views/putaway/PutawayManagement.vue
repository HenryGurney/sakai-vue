<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Putaway Management</h1>
  
      <!-- Goods Selection & Location Assignment -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold">📦 Select Received Good:</label>
          <select v-model="selectedGood" class="p-3 border rounded-lg w-full dark:bg-surface-800 dark:text-white">
            <option disabled value="">Select Received Good</option>
            <option v-for="(item, index) in receivedGoods" :key="index" :value="item">
              {{ item.id }} - {{ item.name }}
            </option>
          </select>
        </div>
  
        <div>
          <label class="block text-gray-700 dark:text-gray-300 font-semibold">📍 Select Storage Location:</label>
          <select v-model="selectedLocation" class="p-3 border rounded-lg w-full dark:bg-surface-800 dark:text-white">
            <option disabled value="">Select Storage Location</option>
            <option v-for="(location, index) in warehouseLocations" :key="index" :value="location">
              {{ location }}
            </option>
          </select>
        </div>
  
        <div class="flex items-end">
          <button 
            @click="assignPutaway"
            :disabled="!selectedGood || !selectedLocation"
            class="px-4 py-2 rounded-lg transition w-full"
            :class="!selectedGood || !selectedLocation ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'"
          >
            Assign Putaway
          </button>
        </div>
      </div>

      <!-- Circular Loading Animation -->
      <div v-if="isMoving" class="mt-6 flex flex-col items-center">
        <p class="text-lg font-semibold text-gray-900 dark:text-white">Storing Items...</p>
        <div class="loader"></div>
      </div>
  
      <!-- Putaway Assignments Table -->
      <div class="mt-6">
        <h2 class="text-lg font-bold mb-3">📋 Putaway Assignments</h2>
        <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
              <th class="p-2 border">Goods ID</th>
              <th class="p-2 border">Item Name</th>
              <th class="p-2 border">Storage Location</th>
              <th class="p-2 border">Assigned By</th>
              <th class="p-2 border">Status</th>
              <th class="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(assignment, index) in putawayList" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
              <td class="p-2 border">{{ assignment.good.id }}</td>
              <td class="p-2 border">{{ assignment.good.name }}</td>
              <td class="p-2 border">{{ assignment.location }}</td>
              <td class="p-2 border">{{ assignment.assignedBy }}</td>
              <td class="p-2 border">
                <span :class="statusClass(assignment.status)">{{ assignment.status }}</span>
              </td>
              <td class="p-2 border">
                <button 
                  v-if="assignment.status === 'Pending'" 
                  @click="startStorage(index)" 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                >
                  Store Items
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Sample Received Goods
  const receivedGoods = ref([
    { id: "GR101", name: "Item A" },
    { id: "GR102", name: "Item B" },
    { id: "GR103", name: "Item C" }
  ]);
  
  // Sample Warehouse Locations
  const warehouseLocations = ref([
    "Section A - Row 1",
    "Section B - Row 3",
    "Section C - Row 2",
    "Storage Unit D"
  ]);
  
  const selectedGood = ref(null);
  const selectedLocation = ref('');
  const putawayList = ref([]);
  const isMoving = ref(false);
  
  // Assign Putaway Function
  const assignPutaway = () => {
    if (!selectedGood.value || !selectedLocation.value) return;
  
    putawayList.value.push({
      good: selectedGood.value,
      location: selectedLocation.value,
      assignedBy: "Warehouse Operator",
      status: "Pending"
    });
  
    selectedGood.value = null;
    selectedLocation.value = '';
  };
  
  // Start Storage Function
  const startStorage = (index) => {
    putawayList.value[index].status = "In Progress";
    isMoving.value = true;
  
    setTimeout(() => {
      isMoving.value = false;
      putawayList.value[index].status = "Stored";
    }, 3500);
  };
  
  // Dynamic Status Classes
  const statusClass = (status) => {
    return {
      "text-yellow-500 font-semibold": status === "Pending",
      "text-blue-500 font-semibold": status === "In Progress",
      "text-green-500 font-semibold": status === "Stored"
    };
  };
  </script>
  
  <style scoped>
  button:focus {
    outline: none;
  }
  
  /* Circular Loading Animation */
  .loader {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-top: 10px;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  