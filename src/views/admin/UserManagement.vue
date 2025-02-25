<script setup>
import { ref } from 'vue';

// Sample user data with Warehouse Manager, Supervisor, and Operator roles
const users = ref([
    { id: 1, name: 'John Doe', role: 'Warehouse Manager', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Supervisor', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', role: 'Operator', email: 'mike@example.com' } // New Operator added
]);

// New user input
const newUser = ref({ name: '', email: '', role: 'Operator' });

// Function to add a user
const addUser = () => {
    if (!newUser.value.name || !newUser.value.email) return alert('Please enter all fields');

    users.value.push({
        id: users.value.length + 1,
        name: newUser.value.name,
        email: newUser.value.email,
        role: newUser.value.role
    });

    newUser.value = { name: '', email: '', role: 'Operator' }; // Reset form
};

// Function to delete a user
const deleteUser = (id) => {
    users.value = users.value.filter(user => user.id !== id);
};

// Function to assign role colors dynamically
const roleClass = (role) => {
    switch (role) {
        case "Warehouse Manager":
            return "bg-blue-600";
        case "Supervisor":
            return "bg-purple-600";
        case "Operator":
            return "bg-green-600";
        default:
            return "bg-gray-500";
    }
};

// Edit User Functionality
const isEditModalOpen = ref(false);
const selectedUser = ref({ id: null, name: '', email: '', role: '' });

const openEditModal = (user) => {
    selectedUser.value = { ...user }; // Clone user data
    isEditModalOpen.value = true;
};

const updateUser = () => {
    const index = users.value.findIndex(user => user.id === selectedUser.value.id);
    if (index !== -1) {
        users.value[index] = { ...selectedUser.value };
    }
    isEditModalOpen.value = false;
};
</script>

<template>
    <div class="p-6 bg-white dark:bg-surface-900 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Management</h1>

        <!-- Add User Form -->
        <div class="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-surface-800">
            <h2 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Add New User</h2>
            <div class="flex flex-col md:flex-row gap-2">
                <input v-model="newUser.name" type="text" placeholder="Name"
                    class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <input v-model="newUser.email" type="email" placeholder="Email"
                    class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <select v-model="newUser.role"
                    class="p-2 border rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
                    <option>Warehouse Manager</option>
                    <option>Supervisor</option>
                    <option>Operator</option>
                </select>
                <button @click="addUser"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Add User
                </button>
            </div>
        </div>

        <!-- User Table -->
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr class="bg-gray-200 dark:bg-surface-800 text-gray-900 dark:text-white">
                        <th class="border border-gray-300 p-3">ID</th>
                        <th class="border border-gray-300 p-3">Name</th>
                        <th class="border border-gray-300 p-3">Role</th>
                        <th class="border border-gray-300 p-3">Email</th>
                        <th class="border border-gray-300 p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id"
                        class="text-center hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td class="border border-gray-300 p-3">{{ user.id }}</td>
                        <td class="border border-gray-300 p-3">{{ user.name }}</td>
                        <td class="border border-gray-300 p-3">
                            <span class="px-3 py-1 rounded-full text-white text-xs"
                                :class="roleClass(user.role)">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="border border-gray-300 p-3">{{ user.email }}</td>
                        <td class="border border-gray-300 p-3">
                            <button @click="openEditModal(user)"
                                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md mr-2">
                                Edit
                            </button>
                            <button @click="deleteUser(user.id)"
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Edit User Modal -->
        <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
                <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Edit User</h2>
                <div class="flex flex-col gap-2">
                    <input v-model="selectedUser.name" type="text" placeholder="Name"
                        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <input v-model="selectedUser.email" type="email" placeholder="Email"
                        class="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <select v-model="selectedUser.role"
                        class="p-2 border rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
                        <option>Warehouse Manager</option>
                        <option>Supervisor</option>
                        <option>Operator</option>
                    </select>
                </div>
                <div class="flex justify-end mt-4">
                    <button @click="isEditModalOpen = false"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">
                        Cancel
                    </button>
                    <button @click="updateUser"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button:focus {
    outline: none;
}
</style>
