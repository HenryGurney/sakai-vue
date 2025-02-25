<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Inventory Overview</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <!-- Total Stock -->
            <div class="col-span-1 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-6">
                <div class="flex flex-col items-start">
                    <span class="font-semibold text-blue-800 dark:text-blue-200 text-lg">Total Stock</span>
                    <span class="text-3xl text-gray-900 dark:text-gray-100 mt-2">{{ totalStock }}</span>
                </div>
                <!-- <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Total stock across all warehouses</div> -->
            </div>

            <!-- Stock by SKU -->
            <div class="col-span-1 bg-green-50 dark:bg-green-900 rounded-lg shadow-md p-6">
                <div class="flex flex-col items-start">
                    <span class="font-semibold text-green-800 dark:text-green-200 text-lg">Stock by SKU</span>
                    <span class="text-3xl text-gray-900 dark:text-gray-100 mt-2">{{ stockBySKU }}</span>
                </div>
                <!-- <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Stock categorized by SKU</div> -->
            </div>

            <!-- Stock by Warehouse -->
            <div class="col-span-1 bg-yellow-50 dark:bg-yellow-900 rounded-lg shadow-md p-6">
                <div class="flex flex-col items-start">
                    <span class="font-semibold text-yellow-800 dark:text-yellow-200 text-lg">Stock by Warehouse</span>
                    <span class="text-3xl text-gray-900 dark:text-gray-100 mt-2">{{ stockByWarehouse }}</span>
                </div>
                <!-- <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Stock categorized by warehouse</div> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const totalStock = ref(1200);
const stockBySKU = ref(500);
const stockByWarehouse = ref(700);
</script>

<style scoped>
.widget {
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.dark .bg-white {
    background-color: #1f2937; /* Dark mode background */
}

.dark .text-gray-900 {
    color: #e5e7eb; /* Light text on dark background */
}

.dark .bg-blue-50 {
    background-color: #bfdbfe; /* Light Blue for total stock */
}

.dark .bg-green-50 {
    background-color: #d1fae5; /* Light Green for stock by SKU */
}

.dark .bg-yellow-50 {
    background-color: #fef9c3; /* Light Yellow for stock by warehouse */
}

.dark .bg-blue-900 {
    background-color: #1e3a8a; /* Dark Blue for total stock */
}

.dark .bg-green-900 {
    background-color: #065f46; /* Dark Green for stock by SKU */
}

.dark .bg-yellow-900 {
    background-color: #b45309; /* Dark Yellow for stock by warehouse */
}

.widget .text-xl {
    font-size: 1.5rem;
}

.widget .text-3xl {
    font-size: 2rem;
}
</style>
