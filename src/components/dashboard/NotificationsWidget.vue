<template>
    <div class="widget p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Notifications</h3>

        <!-- Scrollable Notifications Container -->
        <div class="overflow-y-auto max-h-64">
            <ul class="space-y-3">
                <li v-for="(notification, index) in notifications" :key="index" 
                    class="flex items-start justify-between p-2 border-b dark:border-gray-700">
                    
                    <div class="flex items-center space-x-2 w-full">
                        <!-- Notification Icon -->
                        <div :class="[
                            'w-2.5 h-2.5 rounded-full',
                            notification.type === 'info' ? 'bg-blue-500' : 
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        ]"></div>

                        <!-- Notification Content -->
                        <div class="w-full">
                            <p :class="[
                                'text-sm font-semibold text-gray-900 dark:text-gray-100',
                                notification.read ? 'text-opacity-50' : ''
                            ]">
                                {{ notification.title }}
                            </p>
                            <p :class="[
                                'text-xs text-gray-600 dark:text-gray-400',
                                notification.read ? 'text-opacity-50' : ''
                            ]">
                                {{ notification.message }}
                            </p>
                        </div>
                    </div>

                    <!-- Actions: Mark as Read & Delete -->
                    <div class="flex space-x-1">
                        <button v-if="!notification.read" @click="markAsRead(index)"
                            class="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                            ✓
                        </button>
                        <button @click="removeNotification(index)"
                            class="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                            ✕
                        </button>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Clear All Button -->
        <div v-if="notifications.length" class="text-center mt-3">
            <button @click="clearAllNotifications"
                class="text-xs px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                Clear All
            </button>
        </div>

        <!-- No Notifications Message -->
        <p v-else class="text-center text-gray-500 dark:text-gray-400 text-sm">No new notifications</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample Notifications List
const notifications = ref([
    { type: 'info', title: 'Stock Alert', message: 'New stock has been added to the warehouse.', read: false },
    { type: 'warning', title: 'Low Stock', message: 'The stock for SKU 1234 is running low.', read: false },
    { type: 'error', title: 'Critical Error', message: 'There was an issue processing the last shipment.', read: false },
    { type: 'info', title: 'Inbound Shipment', message: 'A new shipment has arrived at Dock B.', read: false },
    { type: 'warning', title: 'Delayed Order', message: 'Order #5678 is delayed due to warehouse constraints.', read: false },
    { type: 'error', title: 'System Downtime', message: 'Warehouse management system maintenance scheduled at midnight.', read: false }
]);

// Mark a notification as read
const markAsRead = (index) => {
    notifications.value[index].read = true;
};

// Remove a single notification
const removeNotification = (index) => {
    notifications.value.splice(index, 1);
};

// Clear all notifications
const clearAllNotifications = () => {
    notifications.value = [];
};
</script>

<style scoped>
/* Dark mode styles */
.dark .bg-white {
    background-color: #1f2937;
}
.dark .text-gray-900 {
    color: #e5e7eb;
}
.dark .text-gray-600 {
    color: #d1d5db;
}
.dark .bg-blue-500 {
    background-color: #3b82f6;
}
.dark .bg-yellow-500 {
    background-color: #f59e0b;
}
.dark .bg-red-500 {
    background-color: #ef4444;
}

/* Scrollable container */
.overflow-y-auto {
    max-height: 165px; /* Allows scrolling for many notifications */
    overflow-y: auto;
}
</style>
