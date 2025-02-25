<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Warehouse Status</h3>
        <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Warehouse A -->
            <div class="col-span-1 p-6 dark:bg-surface-800 rounded-lg shadow-lg transition-transform duration-300">
                <h4 class="flex items-center font-semibold text-gray-900 dark:text-gray-100">
                    <i class="fas fa-warehouse mr-2 text-2xl text-blue-700 dark:text-blue-300"></i> Warehouse A
                </h4>
                <div class="mt-4">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Operational Status</span>
                    <div class="text-xl text-green-500 dark:text-green-400">Operational</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Inventory Level</span>
                    <div class="text-xl text-blue-600 dark:text-blue-400">High</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Maintenance Status</span>
                    <div class="text-xl text-gray-900 dark:text-gray-100">No Issues</div>
                </div>
            </div>

            <!-- Warehouse B -->
            <div class="col-span-1 p-6 dark:bg-surface-800 rounded-lg shadow-lg transition-transform duration-300">
                <h4 class="flex items-center font-semibold text-gray-900 dark:text-gray-100">
                    <i class="fas fa-warehouse mr-2 text-2xl text-green-700 dark:text-green-300"></i> Warehouse B
                </h4>
                <div class="mt-4">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Operational Status</span>
                    <div class="text-xl text-yellow-500 dark:text-yellow-400">In Maintenance</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Inventory Level</span>
                    <div class="text-xl text-orange-600 dark:text-orange-400">Medium</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Maintenance Status</span>
                    <div class="text-xl text-red-500 dark:text-red-400">Scheduled</div>
                </div>
            </div>

            <!-- Warehouse C -->
            <div class="col-span-1 p-6 dark:bg-surface-800 rounded-lg shadow-lg transition-transform duration-300">
                <h4 class="flex items-center font-semibold text-gray-900 dark:text-gray-100">
                    <i class="fas fa-warehouse mr-2 text-2xl text-yellow-700 dark:text-yellow-300"></i> Warehouse C
                </h4>
                <div class="mt-4">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Operational Status</span>
                    <div class="text-xl text-green-500 dark:text-green-400">Operational</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Inventory Level</span>
                    <div class="text-xl text-red-600 dark:text-red-400">Low</div>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">Maintenance Status</span>
                    <div class="text-xl text-gray-900 dark:text-gray-100">No Issues</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const warehouseAStatus = {
    operational: 'Operational',
    inventory: 'High',
    maintenance: 'No Issues'
};

const warehouseBStatus = {
    operational: 'In Maintenance',
    inventory: 'Medium',
    maintenance: 'Scheduled'
};

const warehouseCStatus = {
    operational: 'Operational',
    inventory: 'Low',
    maintenance: 'No Issues'
};
</script>

<style scoped>
.widget {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for better depth */
}

.dark .text-gray-900 {
    color: #e5e7eb; /* Light text on dark background */
}

.dark .text-gray-100 {
    color: #f3f4f6; /* Lightest gray for dark mode */
}

.text-2xl {
    font-size: 1.5rem; /* Larger text for the stock counts */
}

.font-bold {
    font-weight: 700;
}

.text-center {
    text-align: center; /* Center the text vertically */
}

.space-x-4 {
    margin-right: 1rem; /* Space between icon and text */
}

.text-white {
    color: #ffffff;
}

.grid-cols-1 {
    grid-template-columns: repeat(1, 1fr);
}

.grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
}

.transition-transform {
    transition: transform 0.3s ease-in-out;
}

.icon {
    margin-right: 0.5rem;
}

.fas {
    font-size: 1.5rem;
}
</style>
