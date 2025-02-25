<!-- <script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Pages',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
{
    //     label: 'Pages',
    //     items: [
    //         { label: 'Landing', icon: 'pi pi-fw pi-globe', to: '/landing' },
    //         { label: 'Auth', icon: 'pi pi-fw pi-user', items: [
    //             { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/auth/login' },
    //             { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/auth/error' },
    //             { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/auth/access' }
    //         ]},
    //         { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/pages/notfound' }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         { label: 'Documentation', icon: 'pi pi-fw pi-book', to: '/documentation' },
    //         { label: 'View Source', icon: 'pi pi-fw pi-github', url: 'https://github.com/primefaces/sakai-vue', target: '_blank' }
    //     ]
    // }
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
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

<style lang="scss" scoped></style> -->

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



