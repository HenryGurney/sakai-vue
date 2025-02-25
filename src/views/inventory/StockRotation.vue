<template>
    <div class="stock-rotation widget p-4 bg-white dark:bg-surface-900 rounded-lg shadow-md">
        <h1 class="text-xl font-semibold">Stock Rotation & Movement</h1>
        <p>Monitor stock rotation based on FIFO/LIFO, prioritize expiring stock, and track warehouse movements.</p>

        <!-- 📦 Quick Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div class="bg-gray-100 dark:bg-surface-800 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Total Movements</h2>
                <p class="text-xl font-bold">{{ movements.length }}</p>
            </div>
            <div class="bg-gray-100 dark:bg-surface-800 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">FIFO Stock</h2>
                <p class="text-xl font-bold">{{ fifoStock }} Items</p>
            </div>
            <div class="bg-gray-100 dark:bg-surface-800 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">LIFO Stock</h2>
                <p class="text-xl font-bold">{{ lifoStock }} Items</p>
            </div>
            <div class="bg-gray-100 dark:bg-surface-800 p-4 rounded-md shadow">
                <h2 class="text-lg font-semibold">Expiring Soon</h2>
                <p class="text-xl font-bold">{{ expiringStock.length }} Alerts</p>
            </div>
            
        </div>

                <!-- ⚠️ Expiring Stock Reallocation Alerts -->
                <div v-if="expiringStock.length > 0" class="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-md shadow">
            <h2 class="text-lg font-semibold text-yellow-700 dark:text-yellow-300">⚠️ Expiring Stock Needs Reallocation</h2>
            <ul class="mt-2">
                <li v-for="item in expiringStock" :key="item.product">
                    🔴 {{ item.product }} ({{ item.quantity }} units) expires on {{ item.expiryDate }}
                </li>
            </ul>
        </div>

        <!-- 📊 FIFO/LIFO Stock Movement Chart -->
        <div class="mt-6 p-4 bg-gray-100 dark:bg-surface-800 rounded-md shadow">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">FIFO vs LIFO Stock Flow</h2>
            <apexchart type="bar" height="300" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>

        <!-- 🚛 Stock Movement Table -->
        <table class="table-auto w-full mt-6">
            <thead>
                <tr class="bg-gray-200 dark:bg-surface-800">
                    <th class="border px-4 py-2">Product</th>
                    <th class="border px-4 py-2">From</th>
                    <th class="border px-4 py-2">To</th>
                    <th class="border px-4 py-2">Quantity</th>
                    <th class="border px-4 py-2">Date</th>
                    <th class="border px-4 py-2">Priority</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(movement, index) in movements" :key="index">
                    <td class="border px-4 py-2">{{ movement.product }}</td>
                    <td class="border px-4 py-2">{{ movement.fromWarehouse }}</td>
                    <td class="border px-4 py-2">{{ movement.toWarehouse }}</td>
                    <td class="border px-4 py-2">{{ movement.quantity }}</td>
                    <td class="border px-4 py-2">{{ movement.date }}</td>
                    <td class="border px-4 py-2">
                        <span :class="getPriorityClass(movement.priority)">
                            {{ movement.priority }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dummy stock movements
const movements = ref([
    { product: 'Item A', fromWarehouse: 'WH-1', toWarehouse: 'WH-2', quantity: 50, date: '2025-01-15', priority: 'FIFO' },
    { product: 'Item B', fromWarehouse: 'WH-2', toWarehouse: 'WH-3', quantity: 30, date: '2025-01-20', priority: 'LIFO' },
    { product: 'Item C', fromWarehouse: 'WH-1', toWarehouse: 'WH-4', quantity: 20, date: '2025-01-22', priority: 'Expiring' },
    { product: 'Item D', fromWarehouse: 'WH-3', toWarehouse: 'WH-5', quantity: 40, date: '2025-02-10', priority: 'FIFO' }
]);

// Expiring stock alert
const expiringStock = computed(() => {
    return movements.value.filter(movement => movement.priority === 'Expiring');
});

// FIFO & LIFO Stock Counts
const fifoStock = computed(() => movements.value.filter(m => m.priority === 'FIFO').length);
const lifoStock = computed(() => movements.value.filter(m => m.priority === 'LIFO').length);

// FIFO vs LIFO Stock Movement Chart
const chartOptions = ref({
    chart: { type: 'bar', background: 'transparent' },
    xaxis: { categories: ['FIFO', 'LIFO'] },
    colors: ['#008ffb', '#ff4560']
});
const chartSeries = ref([{ name: 'Movements', data: [fifoStock.value, lifoStock.value] }]);

// Get priority class for styling
const getPriorityClass = (priority) => {
    switch (priority) {
        case 'FIFO': return 'text-green-500 font-semibold';
        case 'LIFO': return 'text-blue-500 font-semibold';
        case 'Expiring': return 'text-red-500 font-semibold';
        default: return 'text-gray-500';
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
</style>
