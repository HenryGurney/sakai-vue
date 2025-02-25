<script setup>
import { ref } from 'vue';

// Warehouse Management-related settings
const defaultWarehouse = ref('Warehouse A');
const warehouses = ref(['Warehouse A', 'Warehouse B', 'Warehouse C']);
const lowStockAlert = ref(true);
const autoReceiveShipments = ref(false);
const emailNotifications = ref(true);

// Function to save settings
const saveSettings = () => {
    alert('Warehouse settings saved successfully!');
};
</script>

<template>
    <div class="p-6 bg-white dark:bg-surface-900 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Admin Settings</h1>

        <!-- Select Default Warehouse -->
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-white font-semibold mb-2">Default Warehouse</label>
            <select v-model="defaultWarehouse" 
                class="w-full p-2 border rounded-md bg-white dark:bg-surface-600 text-gray-900 dark:text-white">
                <option v-for="warehouse in warehouses" :key="warehouse">{{ warehouse }}</option>
            </select>
        </div>

        <!-- Low Stock Alert -->
        <div class="mb-4">
            <label class="flex items-center text-gray-700 dark:text-white">
                <input type="checkbox" v-model="lowStockAlert" class="mr-2">
                Enable Low Stock Alerts
            </label>
        </div>

        <!-- Auto-Receive Shipments -->
        <div class="mb-4">
            <label class="flex items-center text-gray-700 dark:text-white">
                <input type="checkbox" v-model="autoReceiveShipments" class="mr-2">
                Enable Auto-Receive Shipments
            </label>
        </div>

        <!-- Email Notifications -->
        <div class="mb-4">
            <label class="flex items-center text-gray-700 dark:text-white">
                <input type="checkbox" v-model="emailNotifications" class="mr-2">
                Enable Email Notifications
            </label>
        </div>

        <!-- Save Button -->
        <button @click="saveSettings" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
            Save Settings
        </button>
    </div>
</template>
