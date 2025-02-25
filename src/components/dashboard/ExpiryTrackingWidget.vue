<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-xl">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Expiry Tracking</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Safe Stock (>90 days) -->
            <div class="col-span-1 p-4 bg-green-100 dark:bg-green-800 rounded-lg shadow-md">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-xl font-semibold text-gray-900 dark:text-gray-100">Safe Stock</span>
                        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(&gt;90 days)</span>
                    </div>
                    <span class="text-xl text-gray-900 dark:text-gray-100">{{ safeStockCount }}</span>
                </div>
                <div class="mt-2">
                    <div class="bg-green-300 dark:bg-green-600 rounded-full h-2.5">
                        <div class="bg-green-500 h-2.5 rounded-full" :style="{ width: '60%' }"></div>
                    </div>
                </div>
            </div>

            <!-- At Risk (30-90 days) -->
            <div class="col-span-1 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-lg shadow-md">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-xl font-semibold text-gray-900 dark:text-gray-100">At Risk</span>
                        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(30-90 days)</span>
                    </div>
                    <span class="text-xl text-gray-900 dark:text-gray-100">{{ atRiskCount }}</span>
                </div>
                <div class="mt-2">
                    <div class="bg-yellow-300 dark:bg-yellow-600 rounded-full h-2.5">
                        <div class="bg-yellow-500 h-2.5 rounded-full" :style="{ width: '40%' }"></div>
                    </div>
                </div>
            </div>

            <!-- Critical Expiry (<30 days) -->
            <div class="col-span-1 p-4 bg-red-100 dark:bg-red-800 rounded-lg shadow-md">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-xl font-semibold text-gray-900 dark:text-gray-100">Critical Expiry</span>
                        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">(&lt;30 days)</span>
                    </div>
                    <span class="text-xl text-gray-900 dark:text-gray-100">{{ criticalStockCount }}</span>
                </div>
                <div class="mt-2">
                    <div class="bg-red-300 dark:bg-red-600 rounded-full h-2.5">
                        <div class="bg-red-500 h-2.5 rounded-full" :style="{ width: '25%' }"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const safeStockCount = 300;
const atRiskCount = 100;
const criticalStockCount = 50;
</script>


