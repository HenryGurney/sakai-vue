<script setup>
import SectionWidget from '@/components/dashboard/SectionWidget.vue';
import WarehouseStorageWidget from '@/components/dashboard/WarehouseOverview.vue';
import InventoryOverviewWidget from '@/components/dashboard/InventoryOverviewWidget.vue';
import ExpiryTrackingWidget from '@/components/dashboard/ExpiryTrackingWidget.vue';
import StockMovementWidget from '@/components/dashboard/StockMovementWidget.vue';
import NotificationsWidget from '@/components/dashboard/NotificationsWidget.vue';
import WarehouseStatusWidget from '@/components/dashboard/WarehouseStatusWidget.vue';
import StockSegmentationWidget from '@/components/dashboard/StockSegmentationWidget.vue';
</script>

<template>
    <div class="grid gap-8">
      <div>
            <WarehouseStorageWidget />
            <SectionWidget />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-8 mt-2">
        <!-- Real-Time Inventory Overview Widget & Notifications -->
        <div class="col-span-12 xl:col-span-6">
            <InventoryOverviewWidget />
            <div class="mt-2">
                <ExpiryTrackingWidget />
            </div>
        </div>

        <!-- Expiry Tracking & Stock Movement Widgets & Warehouse Status -->
        <div class="col-span-12 xl:col-span-6">
            <NotificationsWidget />
            <div class="mt-2">
                <StockSegmentationWidget />
            </div>
            <div class="mt-2">
                <StockMovementWidget />
            </div>
        </div>
    </div>
    <div class="grid gap-8 mt-2">
        <div>
            <WarehouseStatusWidget />
        </div>
    </div>
</template>

