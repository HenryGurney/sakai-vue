<script setup>
import { ref } from 'vue';

const logs = ref([
    { id: 1, message: 'User John logged in', timestamp: '2024-01-31 10:15 AM' },
    { id: 2, message: 'Settings updated by Admin', timestamp: '2024-01-31 11:00 AM' },
    { id: 3, message: 'New user Jane registered', timestamp: '2024-01-31 12:30 PM' }
]);
</script>

<template>
    <div class="widget p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">System Logs</h1>
        <ul class="bg-gray-100 p-4 rounded-md">
            <li v-for="log in logs" :key="log.id" class="border-b py-2">
                <strong>{{ log.timestamp }}</strong>: {{ log.message }}
            </li>
        </ul>
    </div>
</template>
