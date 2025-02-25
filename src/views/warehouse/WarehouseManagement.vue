<template>
    <div class="warehouse-management p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Warehouse Management
            </h1>
            <button
                @click="goBack"
                class="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none"
            >
                Back
            </button>
        </div>
        <p class="mt-2 text-gray-700 dark:text-gray-300">
            Managing warehouse ID: <strong>#{{ warehouseId }}</strong>
        </p>

        <!-- Warehouse Details -->
        <div v-if="warehouse" class="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow">
            <h2 class="text-lg font-semibold">Warehouse Details</h2>
            <p><strong>Name:</strong> {{ warehouse.name }}</p>
            <p><strong>Location:</strong> {{ warehouse.location }}</p>
            <p>
                <strong>Status: </strong>
                <span :class="statusClass">{{ warehouse.status }}</span>
            </p>

            <div class="mt-4 flex gap-2">
                <button
                    @click="editWarehouse"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    @click="deleteWarehouse"
                    class="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>

        <!-- Tabs for Different Sections -->
        <div class="mt-6">
            <div class="flex border-b">
                <button
                    v-for="tab in tabs"
                    :key="tab"
                    @click="activeTab = tab"
                    class="px-4 py-2 border-b-2"
                    :class="{
                        'border-blue-500 text-blue-500': activeTab === tab,
                        'text-gray-500': activeTab !== tab
                    }"
                >
                    {{ tab }}
                </button>
            </div>

            <div class="mt-4">
                <div v-if="activeTab === 'Inventory'">
                    <p>📦 Inventory Management Coming Soon...</p>
                </div>
                <div v-if="activeTab === 'Orders'">
                    <p>📋 Orders and Processing Coming Soon...</p>
                </div>
                <div v-if="activeTab === 'Reports'">
                    <p>📊 Reports and Insights Coming Soon...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const warehouseId = route.params.id;

// Sample warehouse data (Replace with API call later)
const warehouses = [
    { id: '1', name: 'Warehouse A', location: 'Location A', status: 'Active' },
    { id: '2', name: 'Warehouse B', location: 'Location B', status: 'Inactive' },
    { id: '3', name: 'Warehouse C', location: 'Location C', status: 'Maintenance' }
];

// Find warehouse by ID
const warehouse = ref(null);

onMounted(() => {
    warehouse.value = warehouses.find(w => w.id === warehouseId);
});

// Dynamic status color class
const statusClass = computed(() => {
    if (!warehouse.value) return 'text-gray-500';
    return {
        'text-green-500': warehouse.value.status === 'Active',
        'text-gray-500': warehouse.value.status === 'Inactive',
        'text-red-500': warehouse.value.status === 'Maintenance'
    };
});

// Tabs
const tabs = ['Inventory', 'Orders', 'Reports'];
const activeTab = ref('Inventory');

// Navigation & Actions
const goBack = () => router.back();
const editWarehouse = () => alert('Edit warehouse functionality coming soon...');
const deleteWarehouse = () => alert('Delete warehouse functionality coming soon...');
</script>

<style scoped>
button {
    transition: all 0.2s;
}
</style>
