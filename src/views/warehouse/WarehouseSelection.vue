<template>
    <div class="warehouse-selection widget p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 class="text-xl font-semibold">Warehouse Selection</h1>
        <p>Select a warehouse to manage inventory or perform operations.</p>

        <!-- Dropdown for Warehouse Selection -->
        <div class="mt-4">
            <label for="warehouse" class="block">Select Warehouse:</label>
            <select 
                id="warehouse" 
                class="w-full border px-4 py-2 mt-2 rounded-md" 
                v-model="selectedWarehouse"
                :disabled="warehouses.length === 0"
            >
                <option v-for="(warehouse, index) in warehouses" :key="index" :value="warehouse.id">
                    {{ warehouse.name }}
                </option>
            </select>
            <p v-if="warehouses.length === 0" class="mt-2 text-red-500">No warehouses available</p>
        </div>

        <!-- Warehouse Details Display -->
        <div v-if="selectedWarehouse" class="mt-4">
            <h2 class="text-lg mb-3">Warehouse Details</h2>
            <p><strong>Name:</strong> {{ warehouseDetails.name }}</p>
            <p><strong>Location:</strong> {{ warehouseDetails.location }}</p>
            <p>
                <strong>Status: </strong> 
                <span 
                    :class="{
                        'text-green-500': warehouseDetails.status === 'Active', 
                        'text-gray-500': warehouseDetails.status === 'Inactive',
                        'text-red-500': warehouseDetails.status === 'Maintenance'
                    }"
                >
                    {{ warehouseDetails.status }}
                </span>
            </p>

            <!-- Additional Actions (e.g., Go to Warehouse Management) -->
            <div class="mt-4">
                <button 
                    v-if="warehouseDetails.status === 'Active'" 
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @click="goToWarehouseManagement"
                >
                    Manage Warehouse
                </button>
                <button 
                    v-if="warehouseDetails.status === 'Inactive'" 
                    class="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    @click="goToWarehouseManagement"
                    disabled
                >
                    Manage Warehouse (Inactive)
                </button>
                <button 
                    v-if="warehouseDetails.status === 'Maintenance'" 
                    class="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    @click="goToWarehouseManagement"
                >
                    Under Maintenance (Manage)
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';  // Import the router

// Warehouse data
const warehouses = ref([
    { id: 1, name: 'Warehouse A', location: 'Subang', status: 'Active' },
    { id: 2, name: 'Warehouse B', location: 'Shah Alam', status: 'Inactive' },
    { id: 3, name: 'Warehouse C', location: 'Klang', status: 'Maintenance' }
]);

const selectedWarehouse = ref(null);
const warehouseDetails = ref({});

// Create the router instance
const router = useRouter();

// Watch for selected warehouse and update warehouse details
watchEffect(() => {
    if (selectedWarehouse.value) {
        const warehouse = warehouses.value.find(w => w.id === selectedWarehouse.value);
        warehouseDetails.value = warehouse || {};
    }
});

// Navigation function for managing warehouse
const goToWarehouseManagement = () => {
    if (warehouseDetails.value && warehouseDetails.value.id) {
        router.push({ 
            name: 'warehouse-management',  // ✅ Match route name exactly
            params: { id: String(warehouseDetails.value.id) } // Ensure id is a string
        });
    } else {
        console.error("No warehouse ID available for navigation");
    }
};

</script>

<style scoped>
select {
    max-width: 300px;
}
button:disabled {
    cursor: not-allowed;
}
</style>
