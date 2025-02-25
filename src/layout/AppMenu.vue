<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Order Fulfillment',
        items: [
            { label: 'Create Order', icon: 'pi pi-fw pi-plus', to: '/order/create' }, // 🛒 Create New Order
            { label: 'Order List', icon: 'pi pi-fw pi-list', to: '/order/list' }, // 📋 List of Orders
            { label: 'Order Picking', icon: 'pi pi-fw pi-truck', to: '/order/picking' }, // 🚚 Picking Orders
            { label: 'Order Packing', icon: 'pi pi-fw pi-box', to: '/order/packing' } // 📦 Packing Orders
        ]
    },
    {
        label: 'Receiving & Putaway',
        items: [
            { label: 'Goods Receiving', icon: 'pi pi-fw pi-truck', to: '/receiving' },
            { label: 'Putaway Management', icon: 'pi pi-fw pi-inbox', to: '/putaway' }
        ]
    },
    {
        label: 'Shipping & Returns',
        items: [
            { label: 'Shipping Management', icon: 'pi pi-fw pi-send', to: '/shipping' },
            { label: 'Return Management', icon: 'pi pi-fw pi-undo', to: '/returns' }
        ]
    },
        {
        label: 'Inventory Management',
        items: [
            { label: 'Inventory Status & Expiry Tracking', icon: 'pi pi-fw pi-box', to: '/inventory/status' },
            { label: 'Stock Rotation & Movement', icon: 'pi pi-fw pi-refresh', to: '/inventory/rotation' },
            { label: 'Inventory Adjustment & Disposal', icon: 'pi pi-fw pi-trash', to: '/inventory/disposal' },
            { label: 'Expiry & Aging Reports', icon: 'pi pi-fw pi-chart-line', to: '/inventory/reports' }
        ]
    },
    {
        label: 'Warehouse Management',
        items: [
            { label: 'Warehouse Selection', icon: 'pi pi-fw pi-building', to: '/warehouse/select' },
            { label: 'Multi-Warehouse Visibility', icon: 'pi pi-fw pi-map-marker', to: '/warehouse/visibility' }
        ]
    },
    {
        label: 'Reporting & Analytics',
        items: [
            { label: 'Warehouse Reports', icon: 'pi pi-fw pi-chart-bar', to: '/reports/warehouse' }
        ]
    },
    {
        label: 'Admin',
        items: [
            { label: 'User Management', icon: 'pi pi-fw pi-users', to: '/admin/user-management' },
            { label: 'System Logs', icon: 'pi pi-fw pi-file', to: '/admin/system-logs' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/admin/settings' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>
/* Add custom styling here if needed */
</style>



