<template>
    <div class="inventory-disposal widget p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 class="text-xl font-semibold">Inventory Adjustment & Disposal</h1>
        <p>Manage expired or surplus inventory efficiently with approval-based disposal and compliance tracking.</p>

        <!-- 📌 Bulk Actions -->
        <div class="flex justify-between items-center mt-4">
            <button @click="approveDisposal" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                Approve Disposal
            </button>
            <button @click="exportReport" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Export Report
            </button>
        </div>

        <!-- 🚨 Expiring Stock Alerts -->
        <div v-if="expiringStock.length > 0" class="mt-4 p-3 bg-yellow-100 dark:bg-yellow-800 rounded-md shadow">
            <h2 class="text-lg font-semibold text-yellow-700 dark:text-yellow-300">⚠️ Expiring Items</h2>
            <ul>
                <li v-for="item in expiringStock" :key="item.product">🔴 {{ item.product }} ({{ item.quantity }} units) expires on {{ item.expiryDate }}</li>
            </ul>
        </div>

        <!-- 🗑️ Inventory Disposal Table -->
        <table class="table-auto w-full mt-4">
            <thead>
                <tr class="bg-gray-200 dark:bg-gray-700">
                    <th class="border px-4 py-2">
                        <input type="checkbox" @change="toggleAllSelection" v-model="selectAll">
                    </th>
                    <th class="border px-4 py-2">Product</th>
                    <th class="border px-4 py-2">Quantity</th>
                    <th class="border px-4 py-2">Expiry Date</th>
                    <th class="border px-4 py-2">Status</th>
                    <th class="border px-4 py-2">Action</th>
                    <th class="border px-4 py-2">Approval</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(action, index) in actions" :key="index">
                    <td class="border px-4 py-2">
                        <input type="checkbox" v-model="selectedItems" :value="action">
                    </td>
                    <td class="border px-4 py-2">{{ action.product }}</td>
                    <td class="border px-4 py-2">{{ action.quantity }}</td>
                    <td class="border px-4 py-2">{{ action.expiryDate }}</td>
                    <td class="border px-4 py-2">
                        <span :class="getStatusClass(action.status)" class="px-2 py-1 rounded-full text-sm">
                            {{ action.status }}
                        </span>
                    </td>
                    <td class="border px-4 py-2">
                        <span :class="getActionClass(action.action)">
                            <i :class="getActionIcon(action.action)" class="mr-2"></i>
                            {{ action.action }}
                        </span>
                    </td>
                    <td class="border px-4 py-2">
                        <button 
                            @click="requestApproval(action, index)" 
                            class="px-4 py-2 rounded text-white"
                            :class="action.approved ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'"
                            :disabled="action.approved"
                        >
                            {{ action.approved ? 'Approved' : 'Request Approval' }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dummy inventory data
const actions = ref([
    { product: 'Item A', quantity: 100, expiryDate: '2025-01-18', status: 'Expired', action: 'Dispose', approved: false },
    { product: 'Item B', quantity: 50, expiryDate: '2025-02-20', status: 'Expiring Soon', action: 'Adjust', approved: false },
    { product: 'Item C', quantity: 200, expiryDate: '2025-06-25', status: 'Active', action: 'Adjust', approved: true },
    { product: 'Item D', quantity: 30, expiryDate: '2025-02-05', status: 'Expired', action: 'Dispose', approved: false },
    { product: 'Item E', quantity: 80, expiryDate: '2025-03-01', status: 'Active', action: 'Adjust', approved: true }
]);

// Expiring stock alert
const expiringStock = computed(() => {
    return actions.value.filter(item => item.status === 'Expiring Soon');
});

// Selected items for bulk actions
const selectedItems = ref([]);
const selectAll = ref(false);

const toggleAllSelection = () => {
    selectedItems.value = selectAll.value ? [...actions.value] : [];
};

// Status color classes
const getStatusClass = (status) => {
    switch (status) {
        case 'Expired': return 'text-red-500';
        case 'Expiring Soon': return 'text-yellow-500';
        case 'Active': return 'text-green-500';
        default: return 'text-gray-500';
    }
};

// Action color classes
const getActionClass = (action) => {
    return action === 'Dispose' ? 'text-red-500' : 'text-blue-500';
};

// Action icons
const getActionIcon = (action) => {
    return action === 'Dispose' ? 'pi pi-trash' : 'pi pi-pencil';
};

// Request approval for disposal
const requestApproval = (action, index) => {
    if (!action.approved) {
        actions.value[index].approved = true;
    }
};

// Bulk approve disposal
const approveDisposal = () => {
    selectedItems.value.forEach(item => {
        item.approved = true;
    });
    selectedItems.value = [];
};

// Export report function
const exportReport = () => {
    const reportData = actions.value.map(({ product, quantity, expiryDate, status, action, approved }) => ({
        Product: product,
        Quantity: quantity,
        "Expiry Date": expiryDate,
        Status: status,
        Action: action,
        Approved: approved ? "Yes" : "No"
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," +
        ["Product,Quantity,Expiry Date,Status,Action,Approved"].join(",") + "\n" +
        reportData.map(e => Object.values(e).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_report.csv");
    document.body.appendChild(link);
    link.click();
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
button {
    cursor: pointer;
    transition: background-color 0.3s ease;
}
</style>
