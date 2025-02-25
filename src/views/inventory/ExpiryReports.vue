<template>
    <div class="expiry-reports widget p-4 bg-white dark:bg-surface-900 rounded-lg shadow-md">
        <h1 class="text-xl font-semibold">Expiry & Aging Reports</h1>
        <p>Generate reports on expired and aging inventory items.</p>

        <!-- Filters -->
        <div class="flex justify-between items-center mt-4">
            <div class="flex space-x-2">
                <select v-model="selectedWarehouse" class="border p-2 rounded">
                    <option value="">All Warehouses</option>
                    <option v-for="warehouse in warehouses" :key="warehouse" :value="warehouse">
                        {{ warehouse }}
                    </option>
                </select>
                <input type="date" v-model="dateFilter" class="border p-2 rounded">
            </div>
            <button @click="generateReport" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Generate Report
            </button>
        </div>

        <!-- Example Table for Expiry Reports -->
        <table class="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th class="border px-4 py-2">Product</th>
                    <th class="border px-4 py-2">Expiry Date</th>
                    <th class="border px-4 py-2">Age (Days)</th>
                    <th class="border px-4 py-2">Turnover Rate</th>
                    <th class="border px-4 py-2">Status</th>
                    <th class="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(report, index) in filteredReports" :key="index">
                    <td class="border px-4 py-2">{{ report.product }}</td>
                    <td class="border px-4 py-2">{{ report.expiryDate }}</td>
                    <td class="border px-4 py-2">{{ report.age }} days</td>
                    <td class="border px-4 py-2">{{ report.turnoverRate }}%</td>
                    <td class="border px-4 py-2">
                        <span :class="getStatusClass(report.status)" class="flex items-center">
                            <i :class="getStatusIcon(report.status)" class="mr-2"></i>
                            {{ report.status }}
                        </span>
                    </td>
                    <td class="border px-4 py-2">
                        <button @click="viewAuditLog(report.product)" class="text-blue-500 hover:underline">
                            View Audit Log
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Example data for expiry reports
const reports = ref([
    { product: 'Item 1', expiryDate: '2025-01-10', age: 20, turnoverRate: 40, status: 'Expired' },
    { product: 'Item 2', expiryDate: '2025-02-01', age: 5, turnoverRate: 70, status: 'Expiring Soon' },
    { product: 'Item 3', expiryDate: '2025-03-10', age: 0, turnoverRate: 85, status: 'Active' }
]);

// Warehouses and filters
const warehouses = ref(['Warehouse A', 'Warehouse B', 'Warehouse C']);
const selectedWarehouse = ref('');
const dateFilter = ref('');

// Function to determine the class for the status
const getStatusClass = (status) => {
    switch (status) {
        case 'Expired': return 'text-red-500';
        case 'Expiring Soon': return 'text-orange-500';
        case 'Active': return 'text-green-500';
        default: return 'text-gray-500';
    }
};

// Function to determine the icon for the status
const getStatusIcon = (status) => {
    switch (status) {
        case 'Expired': return 'pi pi-times-circle';
        case 'Expiring Soon': return 'pi pi-exclamation-circle';
        case 'Active': return 'pi pi-check-circle';
        default: return 'pi pi-info-circle';
    }
};

// Filter reports based on selected warehouse and date
const filteredReports = computed(() => {
    return reports.value.filter(report => 
        (!selectedWarehouse.value || report.warehouse === selectedWarehouse.value) &&
        (!dateFilter.value || new Date(report.expiryDate) <= new Date(dateFilter.value))
    );
});

// Function to generate reports
const generateReport = () => {
    alert('Report generated!');
};

// Function to view audit logs
const viewAuditLog = (product) => {
    alert(`Viewing audit log for ${product}`);
};

// Heatmap Data
const stockAgingData = ref([
    { days: 10 }, { days: 20 }, { days: 30 }, { days: 40 },
    { days: 50 }, { days: 60 }, { days: 70 }, { days: 80 }
]);
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
.heatmap-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 4px;
    margin-top: 10px;
}
.heatmap-box {
    width: 50px;
    height: 50px;
    color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
</style>
