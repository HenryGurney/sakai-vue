<template>
    <div class="inventory-status-widget p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Inventory Status & Expiry Tracking</h1>
        <p class="mt-2 text-gray-700 dark:text-gray-300">
            Track stock levels, movement, and expiry statuses in real-time.
        </p>

        <!-- 📦 Total Stock Summary & Warehouse View -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Total Stock</h2>
                <p class="text-xl font-bold">{{ totalStock }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Multi-Warehouse Visibility</h2>
                <p class="text-xl font-bold">{{ warehouses.length }} Warehouses</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Stock Movement Status</h2>
                <p class="text-xl font-bold">{{ stockMovements }} Movements Today</p>
            </div>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Storage Allocation</h2>
                <p class="text-xl font-bold">{{ allocatedStorage }}% Utilized</p>
            </div>
        </div>

        <!-- 🔔 Auto Alerts for Expiry -->
        <div v-if="expiringSoon.length > 0" class="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-md shadow">
            <h2 class="text-lg font-semibold text-yellow-700 dark:text-yellow-300">⚠️ Expiry Alerts</h2>
            <ul class="mt-2">
                <li v-for="alert in expiringSoon" :key="alert.product">
                    🔴 {{ alert.product }} expires on {{ alert.expiryDate }}
                </li>
            </ul>
        </div>

        <!-- 🛠️ Inventory Table -->
        <div class="overflow-x-auto mt-6">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="bg-gray-200 dark:bg-gray-700">
                        <th class="border px-4 py-2">Product</th>
                        <th class="border px-4 py-2">Quantity</th>
                        <th class="border px-4 py-2">Expiry Date</th>
                        <th class="border px-4 py-2">Status</th>
                        <th class="border px-4 py-2">Warehouse</th>
                        <th class="border px-4 py-2">Lot/Serial No.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in inventory" :key="index">
                        <td class="border px-4 py-2">{{ item.product }}</td>
                        <td class="border px-4 py-2">{{ item.quantity }}</td>
                        <td class="border px-4 py-2">{{ item.expiryDate }}</td>
                        <td class="border px-4 py-2">
                            <span :class="getStatusClass(item.status)" class="flex items-center">
                                <i :class="getStatusIcon(item.status)" class="mr-2"></i>
                                {{ item.status }}
                            </span>
                        </td>
                        <td class="border px-4 py-2">{{ item.warehouse }}</td>
                        <td class="border px-4 py-2">{{ item.lotNumber }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Example inventory data
const inventory = ref([
    { product: 'Item A', quantity: 100, expiryDate: '2025-05-01', status: 'Active', warehouse: 'WH-1', lotNumber: 'L001' },
    { product: 'Item B', quantity: 50, expiryDate: '2025-02-15', status: 'Expiring Soon', warehouse: 'WH-2', lotNumber: 'L002' },
    { product: 'Item C', quantity: 200, expiryDate: '2025-08-25', status: 'Active', warehouse: 'WH-3', lotNumber: 'L003' },
    { product: 'Item D', quantity: 30, expiryDate: '2025-01-30', status: 'Expired', warehouse: 'WH-1', lotNumber: 'L004' }
]);

// Example warehouse data
const warehouses = ref(['WH-1', 'WH-2', 'WH-3']);
const stockMovements = ref(12); // Example stock movements for today
const allocatedStorage = ref(75); // Example storage utilization percentage

// Compute total stock
const totalStock = computed(() => {
    return inventory.value.reduce((total, item) => total + item.quantity, 0);
});

// Expiring soon alert list
const expiringSoon = computed(() => {
    return inventory.value.filter(item => item.status === 'Expiring Soon');
});

// Function to determine the class for the status
const getStatusClass = (status) => {
    switch (status) {
        case 'Expired':
            return 'text-red-500';
        case 'Expiring Soon':
            return 'text-orange-500';
        case 'Active':
            return 'text-green-500';
        default:
            return 'text-gray-500';
    }
};

// Function to determine the icon for the status
const getStatusIcon = (status) => {
    switch (status) {
        case 'Expired':
            return 'pi pi-times-circle';
        case 'Expiring Soon':
            return 'pi pi-exclamation-circle';
        case 'Active':
            return 'pi pi-check-circle';
        default:
            return 'pi pi-info-circle';
    }
};
</script>

<style scoped>
.table-auto {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
}
.flex {
    display: flex;
    align-items: center;
}
</style>
