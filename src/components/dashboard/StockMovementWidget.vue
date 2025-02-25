<template>
    <div class="widget p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Stock Movement</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Inbound Shipments -->
            <div class="col-span-1">
                <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-lg shadow-md transition-all">
                    <div class="flex items-center space-x-4">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3-3 3 3h4M5 10v10h14V10" />
                        </svg>
                        <span class="font-semibold text-white">Inbound Shipments</span>
                    </div>
                    <span class="text-2xl font-bold text-white">{{ inboundShipments }}</span>
                </div>
            </div>
            <!-- Outbound Shipments -->
            <div class="col-span-1">
                <div class="flex justify-between items-center p-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 dark:bg-gradient-to-r dark:from-green-600 dark:via-green-700 dark:to-green-800 rounded-lg shadow-md transition-all">
                    <div class="flex items-center space-x-4">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3-3 3 3h4M5 10v10h14V10" />
                        </svg>
                        <span class="font-semibold text-white">Outbound Shipments</span>
                    </div>
                    <span class="text-2xl font-bold text-white">{{ outboundShipments }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const inboundShipments = 150;
const outboundShipments = 120;
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
</style>
