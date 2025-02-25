<template>
    <div class="p-6 bg-white dark:bg-surface-900 rounded-lg shadow-md">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">📊 Warehouse Reports & Analytics</h1>
            <button 
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
                @click="exportReport"
            >
                📥 Export Report
            </button>
        </div>
        <p class="text-gray-600 dark:text-gray-400">Monitor warehouse performance with key indicators.</p>

        <!-- Filters: Warehouse Selection & Date Range -->
        <div class="mt-4 flex flex-wrap gap-4">
            <div>
                <label class="block text-gray-800 dark:text-gray-300">Select Warehouse:</label>
                <select 
                    v-model="selectedWarehouse" 
                    class="w-full max-w-sm p-2 border rounded-md dark:bg-surface-800 dark:text-white"
                >
                    <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.name }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block text-gray-800 dark:text-gray-300">Select Date Range:</label>
                <input 
                    type="date" 
                    v-model="startDate" 
                    class="p-2 border rounded-md dark:bg-surface-800 dark:text-white"
                />
                <span class="mx-2">to</span>
                <input 
                    type="date" 
                    v-model="endDate" 
                    class="p-2 border rounded-md dark:bg-surface-800 dark:text-white"
                />
            </div>
        </div>

        <!-- Warehouse Metrics Overview -->
        <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="metric in warehouseMetrics" :key="metric.label" class="p-4 bg-gray-100 dark:bg-surface-800 rounded-md shadow text-center">
                <p class="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                    <span v-html="metric.icon"></span> {{ metric.label }}
                </p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ metric.value }}</p>
            </div>
        </div>

        <!-- Warehouse Performance Chart -->
        <div class="mt-8">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">📈 Warehouse Performance</h2>
            <div class="relative w-full h-64">
                <canvas ref="chartCanvas"></canvas>
            </div>
        </div>

        <!-- Warehouse Activity Table -->
        <div class="mt-8">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">📋 Recent Warehouse Activity</h2>
            <table class="w-full mt-4 border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
                        <th class="p-2 border">Activity</th>
                        <th class="p-2 border">Date</th>
                        <th class="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(activity, index) in recentActivity" :key="index" class="text-center hover:bg-gray-100 dark:hover:bg-gray-800">
                        <td class="p-2 border">{{ activity.name }}</td>
                        <td class="p-2 border">{{ activity.date }}</td>
                        <td class="p-2 border">
                            <span :class="statusClass(activity.status)">{{ activity.status }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

// Warehouse Data
const warehouses = ref([
    { id: 1, name: "Warehouse A" },
    { id: 2, name: "Warehouse B" },
    { id: 3, name: "Warehouse C" }
]);

const selectedWarehouse = ref(1);
const startDate = ref('');
const endDate = ref('');

// Warehouse Metrics (Static Data)
const warehouseMetrics = ref([
    { label: "Total Stock", value: "15,300", icon: "📦" },
    { label: "Orders Processed", value: "8,750", icon: "📤" },
    { label: "Delayed Shipments", value: "230", icon: "⏳" },
    { label: "Returns", value: "120", icon: "🔄" }
]);

// Warehouse Activity Data
const recentActivity = ref([
    { name: "Shipment Received", date: "2024-02-01", status: "Completed" },
    { name: "Order Dispatched", date: "2024-02-02", status: "Pending" },
    { name: "Stock Updated", date: "2024-02-03", status: "Completed" },
    { name: "Inventory Audit", date: "2024-02-04", status: "In Progress" }
]);

// Status Badge Colors
const statusClass = (status) => {
    return {
        "text-green-500 font-semibold": status === "Completed",
        "text-yellow-500 font-semibold": status === "Pending",
        "text-blue-500 font-semibold": status === "In Progress"
    };
};

// Chart Reference
const chartCanvas = ref(null);
let warehouseChart = null;

// Function to Generate Chart
const generateChart = () => {
    if (warehouseChart) {
        warehouseChart.destroy(); // ✅ Destroy previous chart before re-rendering
    }

    const ctx = chartCanvas.value.getContext('2d'); // Get canvas context

    warehouseChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Warehouse Efficiency",
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                data: [85, 87, 78, 92, 95]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // ✅ Prevents auto-scaling
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
};

// Initialize chart on component mount
onMounted(() => {
    generateChart();
});

// Watch for changes in warehouse selection & update reports
watch([selectedWarehouse, startDate, endDate], () => {
    console.log("Fetching new data for:", selectedWarehouse.value, startDate.value, endDate.value);
    generateChart();
});

// Function to Export Report
const exportReport = () => {
    alert("Exporting report as PDF/CSV (Feature coming soon!)");
};
</script>

<style scoped>
select, input {
    max-width: 200px;
}
</style>
