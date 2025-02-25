<template>
    <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">Stock Segmentation</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- SIM Cards -->
            <!-- <div class="col-span-1">
                <div class="p-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-lg shadow-md transition-all">
                    <div class="text-center">
                        <span class="font-semibold text-white block">SIM Cards</span>
                        <span class="text-2xl font-bold text-white mt-2">{{ simCardsStock }}</span>
                    </div>
                </div>
            </div> -->
            <!-- Marketing Materials -->
            <div class="col-span-1">
                <div class="p-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 dark:bg-gradient-to-r dark:from-green-600 dark:via-green-700 dark:to-green-800 rounded-lg shadow-md transition-all">
                    <div class="text-center">
                        <span class="font-semibold text-white block">Marketing Materials</span>
                        <span class="text-2xl font-bold text-white mt-2">{{ marketingMaterialsStock }}</span>
                    </div>
                </div>
            </div>
            <!-- Spare Parts -->
            <div class="col-span-1">
                <div class="p-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 dark:bg-gradient-to-r dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-800 rounded-lg shadow-md transition-all">
                    <div class="text-center">
                        <span class="font-semibold text-white block">Spare Parts</span>
                        <span class="text-2xl font-bold text-white mt-2">{{ sparePartsStock }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const simCardsStock = 200;
const marketingMaterialsStock = 150;
const sparePartsStock = 100;
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
    font-size: 1.5rem; /* Larger text for stock count */
}

.font-bold {
    font-weight: 700;
}

.text-center {
    text-align: center; /* Center the text vertically */
}

.mt-2 {
    margin-top: 0.5rem; /* Add space between label and number */
}

.block {
    display: block; /* Ensures the label and number are on separate lines */
}
</style>
