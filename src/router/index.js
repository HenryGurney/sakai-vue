// import AppLayout from '@/layout/AppLayout.vue';
// import { createRouter, createWebHistory } from 'vue-router';

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         {
//             path: '/',
//             component: AppLayout,
//             children: [
//                 {
//                     path: '/',
//                     name: 'dashboard',
//                     component: () => import('@/views/Dashboard.vue')
//                 },
//                 {
//                     path: '/uikit/formlayout',
//                     name: 'formlayout',
//                     component: () => import('@/views/uikit/FormLayout.vue')
//                 },
//                 {
//                     path: '/uikit/input',
//                     name: 'input',
//                     component: () => import('@/views/uikit/InputDoc.vue')
//                 },
//                 {
//                     path: '/uikit/button',
//                     name: 'button',
//                     component: () => import('@/views/uikit/ButtonDoc.vue')
//                 },
//                 {
//                     path: '/uikit/table',
//                     name: 'table',
//                     component: () => import('@/views/uikit/TableDoc.vue')
//                 },
//                 {
//                     path: '/uikit/list',
//                     name: 'list',
//                     component: () => import('@/views/uikit/ListDoc.vue')
//                 },
//                 {
//                     path: '/uikit/tree',
//                     name: 'tree',
//                     component: () => import('@/views/uikit/TreeDoc.vue')
//                 },
//                 {
//                     path: '/uikit/panel',
//                     name: 'panel',
//                     component: () => import('@/views/uikit/PanelsDoc.vue')
//                 },

//                 {
//                     path: '/uikit/overlay',
//                     name: 'overlay',
//                     component: () => import('@/views/uikit/OverlayDoc.vue')
//                 },
//                 {
//                     path: '/uikit/media',
//                     name: 'media',
//                     component: () => import('@/views/uikit/MediaDoc.vue')
//                 },
//                 {
//                     path: '/uikit/message',
//                     name: 'message',
//                     component: () => import('@/views/uikit/MessagesDoc.vue')
//                 },
//                 {
//                     path: '/uikit/file',
//                     name: 'file',
//                     component: () => import('@/views/uikit/FileDoc.vue')
//                 },
//                 {
//                     path: '/uikit/menu',
//                     name: 'menu',
//                     component: () => import('@/views/uikit/MenuDoc.vue')
//                 },
//                 {
//                     path: '/uikit/charts',
//                     name: 'charts',
//                     component: () => import('@/views/uikit/ChartDoc.vue')
//                 },
//                 {
//                     path: '/uikit/misc',
//                     name: 'misc',
//                     component: () => import('@/views/uikit/MiscDoc.vue')
//                 },
//                 {
//                     path: '/uikit/timeline',
//                     name: 'timeline',
//                     component: () => import('@/views/uikit/TimelineDoc.vue')
//                 },
//                 {
//                     path: '/pages/empty',
//                     name: 'empty',
//                     component: () => import('@/views/pages/Empty.vue')
//                 },
//                 {
//                     path: '/pages/crud',
//                     name: 'crud',
//                     component: () => import('@/views/pages/Crud.vue')
//                 },
//                 {
//                     path: '/documentation',
//                     name: 'documentation',
//                     component: () => import('@/views/pages/Documentation.vue')
//                 }
//             ]
//         },
//         {
//             path: '/landing',
//             name: 'landing',
//             component: () => import('@/views/pages/Landing.vue')
//         },
//         {
//             path: '/pages/notfound',
//             name: 'notfound',
//             component: () => import('@/views/pages/NotFound.vue')
//         },

//         {
//             path: '/auth/login',
//             name: 'login',
//             component: () => import('@/views/pages/auth/Login.vue')
//         },
//         {
//             path: '/auth/access',
//             name: 'accessDenied',
//             component: () => import('@/views/pages/auth/Access.vue')
//         },
//         {
//             path: '/auth/error',
//             name: 'error',
//             component: () => import('@/views/pages/auth/Error.vue')
//         }
//     ]
// });

// export default router;

import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },

                // Receiving & Putaway
                {
                    path: '/receiving',
                    name: 'goods-receiving',
                    component: () => import('@/views/receiving/GoodsReceiving.vue')
                },
                {
                    path: '/putaway',
                    name: 'putaway-management',
                    component: () => import('@/views/putaway/PutawayManagement.vue')
                },

                // Inventory Management
                {
                    path: '/inventory/status',
                    name: 'inventory-status',
                    component: () => import('@/views/inventory/InventoryStatus.vue')
                },
                {
                    path: '/inventory/rotation',
                    name: 'inventory-rotation',
                    component: () => import('@/views/inventory/StockRotation.vue')
                },
                {
                    path: '/inventory/disposal',
                    name: 'inventory-disposal',
                    component: () => import('@/views/inventory/InventoryDisposal.vue')
                },
                {
                    path: '/inventory/reports',
                    name: 'inventory-reports',
                    component: () => import('@/views/inventory/ExpiryReports.vue')
                },

                // Order Fulfillment
                {
                    path: '/order/create',
                    name: 'create-order',
                    component: () => import('@/views/order/CreateOrder.vue')
                },
                {
                    path: '/order/list',
                    name: 'order-list',
                    component: () => import('@/views/order/OrderList.vue')
                },
                {
                    path: '/order/picking',
                    name: 'order-picking',
                    component: () => import('@/views/order/OrderPicking.vue')
                },
                {
                    path: '/order/packing',
                    name: 'order-packing',
                    component: () => import('@/views/order/OrderPacking.vue')
                },

                // Shipping & Returns
                {
                    path: '/shipping',
                    name: 'shipping-management',
                    component: () => import('@/views/shipping/ShippingManagement.vue')
                },
                {
                    path: '/returns',
                    name: 'return-management',
                    component: () => import('@/views/returns/ReturnManagement.vue')
                },

                // Warehouse Management
                {
                    path: '/warehouse/select',
                    name: 'warehouse-select',
                    component: () => import('@/views/warehouse/WarehouseSelection.vue')
                },
                {
                    path: '/warehouse-management/:id',
                    name: 'warehouse-management',
                    props: true,
                    component: () => import('@/views/warehouse/WarehouseManagement.vue')
                },
                {
                    path: '/warehouse/visibility',
                    name: 'multi-warehouse-visibility',
                    component: () => import('@/views/warehouse/MultiWarehouseVisibility.vue')
                },

                // Reporting & Analytics
                {
                    path: '/reports/warehouse',
                    name: 'warehouse-reports',
                    component: () => import('@/views/reports/WarehouseReports.vue')
                },
                // Admin
                {
                    path: '/admin/user-management',
                    name: 'user-management',
                    component: () => import('@/views/admin/UserManagement.vue')
                },
                {
                    path: '/admin/system-logs',
                    name: 'system-logs',
                    component: () => import('@/views/admin/SystemLogs.vue')
                },
                {
                    path: '/admin/settings',
                    name: 'admin-settings',
                    component: () => import('@/views/admin/Settings.vue')
                }                
            ]
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
    ]
});

export default router;


