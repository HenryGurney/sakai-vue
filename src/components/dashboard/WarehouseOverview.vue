<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import ProgressBar from "primevue/progressbar";
import Badge from "primevue/badge";

const toast = useToast();

const getBatteryColor = (battery) => {
  return battery > 80 ? "#28a745" : battery > 30 ? "#ffc107" : "#dc3545";
};

// Define warehouse zones
const warehouseZones = [
  { name: "Inbound", x: 50, y: 50, width: 80, height: 60, color: "#888", icon: "pi pi-download" },
  { name: "Outbound", x: 650, y: 350, width: 150, height: 50, color: "#888", icon: "pi pi-upload" },
  { name: "Charging Station", x: 50, y: 350, width: 120, height: 50, color: "#888", icon: "pi pi-bolt" },
];

// Define racking zones
const rackingZones = [];

// Create racks
const createStackedRacks = (prefix, startX, startY, rows, cols, spacingX, spacingY, width, height) => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rackingZones.push({
        name: `${prefix}${i + 1}${j + 1}`,
        x: startX + j * spacingX,
        y: startY + i * spacingY,
        width: width,
        height: height,
      });
    }
  }
};

// Creating structured racks based on image layout
createStackedRacks("A", 150, 50, 4, 3, 70, 50, 60, 40);
createStackedRacks("B", 400, 50, 4, 3, 70, 50, 60, 40);
createStackedRacks("C", 650, 50, 4, 3, 70, 50, 60, 40);
createStackedRacks("D", 900, 50, 4, 3, 70, 50, 60, 40);

// Define paths for each AMR (matching your drawn paths)
const amrPaths = [
  // Path for AMR 01
  [{ x: 100, y: 400 }, { x: 250, y: 400 }, { x: 400, y: 400 }, { x: 600, y: 400 }, { x: 800, y: 400 }, { x: 950, y: 400 }],
  // Path for AMR 02
  [{ x: 950, y: 400 }, { x: 950, y: 250 }, { x: 800, y: 250 }, { x: 600, y: 250 }, { x: 400, y: 250 }, { x: 250, y: 250 }, { x: 100, y: 250 }],
  // Path for AMR 03
  [{ x: 100, y: 250 }, { x: 100, y: 100 }, { x: 250, y: 150 }, { x: 400, y: 100 }, { x: 600, y: 100 }, { x: 800, y: 100 }, { x: 950, y: 100 }],
  // Path for AMR 04
  [{ x: 700, y: 100 }, { x: 950, y: 250 }, { x: 800, y: 250 }, { x: 600, y: 250 }, { x: 400, y: 250 }, { x: 250, y: 250 }, { x: 100, y: 250 }],
  // Path for AMR 05
  [{ x: 100, y: 250 }, { x: 100, y: 400 }, { x: 250, y: 400 }, { x: 400, y: 400 }, { x: 600, y: 400 }, { x: 800, y: 400 }],
  // Path for AMR 06
  [{ x: 800, y: 400 }, { x: 950, y: 400 }, { x: 950, y: 250 }, { x: 800, y: 250 }, { x: 600, y: 250 }, { x: 400, y: 250 }]
];

// Define AMRs
const amrs = ref([
  { id: "01", x: 100, y: 400, status: "Moving", battery: 92, tasksCompleted: 20, pathIndex: 0, targetIndex: 0 },
  { id: "02", x: 950, y: 400, status: "Moving", battery: 83, tasksCompleted: 12, pathIndex: 1, targetIndex: 0 },
  { id: "03", x: 100, y: 250, status: "Moving", battery: 75, tasksCompleted: 8, pathIndex: 2, targetIndex: 0 },
  { id: "04", x: 950, y: 100, status: "Moving", battery: 30, tasksCompleted: 23, pathIndex: 3, targetIndex: 0 },
  { id: "05", x: 100, y: 250, status: "Moving", battery: 40, tasksCompleted: 17, pathIndex: 4, targetIndex: 0 },
  { id: "06", x: 800, y: 400, status: "Moving", battery: 95, tasksCompleted: 15, pathIndex: 5, targetIndex: 0 }
]);

const isInsideRackingZone = (x, y) => {
  return rackingZones.some(rack =>
    x >= rack.x &&
    x <= rack.x + rack.width &&
    y >= rack.y &&
    y <= rack.y + rack.height
  );
};

const moveAMRs = () => {
  amrs.value = amrs.value.map(amr => {
    let path = amrPaths[amr.pathIndex];
    let target = path[amr.targetIndex];
    if (!target) return amr;

    const stepSize = 5;
    let deltaX = target.x - amr.x;
    let deltaY = target.y - amr.y;
    let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance > stepSize) {
      const ratio = stepSize / distance;
      deltaX *= ratio;
      deltaY *= ratio;
    }

    let newX = amr.x + deltaX;
    let newY = amr.y + deltaY;

    // **Check if next position collides with a rack**
    if (isInsideRackingZone(newX, newY)) {
      // console.warn(`AMR ${amr.id} avoiding rack collision.`);

      // **Try alternative path by shifting sideways**
      if (!isInsideRackingZone(newX, amr.y)) {
        newY = amr.y; // Move only in the X direction
      } else if (!isInsideRackingZone(amr.x, newY)) {
        newX = amr.x; // Move only in the Y direction
      } else {
        // **If both X and Y movements are blocked, force diagonal shift**
        let shiftX = stepSize * (Math.random() > 0.5 ? 1 : -1);
        let shiftY = stepSize * (Math.random() > 0.5 ? 1 : -1);
        newX += shiftX;
        newY += shiftY;

        // **If still inside a rack, reset to the previous safe position**
        if (isInsideRackingZone(newX, newY)) {
          newX = amr.x;
          newY = amr.y;
          // console.warn(`AMR ${amr.id} stuck. Holding position.`);
        }
      }
    }

    let newStatus = "Moving";

    // **If AMR reaches its target, move to the next waypoint**
    if (distance < stepSize) {
      newX = target.x;
      newY = target.y;
      newStatus = "Idle";
      amr.targetIndex = (amr.targetIndex + 1) % path.length;
    }

    return { ...amr, x: newX, y: newY, status: newStatus };
  });
};

// Draw paths with dotted lines
const drawPaths = () => {
  return amrPaths.map(path => path.map(point => `<circle cx="${point.x}" cy="${point.y}" r="1" fill="black" />`).join("")).join("");
};

let interval = null;

// Define zoomable SVG properties
const viewBox = ref({ x: 0, y: 0, width: 1000, height: 500 }); // Initial viewport
const zoomFactor = 1.1; // Zoom sensitivity
const minZoom = 300; // Minimum zoom level
const maxZoom = 1500; // Maximum zoom level

// Dragging state
const isDragging = ref(false);
const lastMouseX = ref(0);
const lastMouseY = ref(0);

// **Zoom function**
const zoom = (event) => {
  event.preventDefault(); // Prevent default scrolling behavior

  const direction = event.deltaY > 0 ? 1 : -1; // Zoom in or out
  let newWidth = viewBox.value.width * (direction > 0 ? zoomFactor : 1 / zoomFactor);
  let newHeight = viewBox.value.height * (direction > 0 ? zoomFactor : 1 / zoomFactor);

  // Restrict zoom limits
  if (newWidth < minZoom || newWidth > maxZoom) return;

  // Calculate new x, y to keep zoom centered at cursor position
  const rect = event.target.getBoundingClientRect();
  const mouseX = ((event.clientX - rect.left) / rect.width) * viewBox.value.width + viewBox.value.x;
  const mouseY = ((event.clientY - rect.top) / rect.height) * viewBox.value.height + viewBox.value.y;

  viewBox.value = {
    x: mouseX - (mouseX - viewBox.value.x) * (newWidth / viewBox.value.width),
    y: mouseY - (mouseY - viewBox.value.y) * (newHeight / viewBox.value.height),
    width: newWidth,
    height: newHeight,
  };
};

// **Start dragging**
const startDrag = (event) => {
  isDragging.value = true;
  lastMouseX.value = event.clientX;
  lastMouseY.value = event.clientY;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("mouseleave", stopDrag);
};

// **Dragging function**
const drag = (event) => {
  if (!isDragging.value) return;
  
  event.preventDefault(); // Prevent text selection

  // Ensure smooth dragging by using the actual SVG container size
  const dx = (event.clientX - lastMouseX.value) * (viewBox.value.width / svgContainer.value.clientWidth);
  const dy = (event.clientY - lastMouseY.value) * (viewBox.value.height / svgContainer.value.clientHeight);

  viewBox.value.x -= dx;
  viewBox.value.y -= dy;

  lastMouseX.value = event.clientX;
  lastMouseY.value = event.clientY;
};

// **Stop dragging**
const stopDrag = () => {
  isDragging.value = false;

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("mouseleave", stopDrag);
};

const svgContainer = ref(null);

onMounted(() => {
  interval = setInterval(moveAMRs, 300);
  if (svgContainer.value) {
    svgContainer.value.addEventListener("wheel", zoom);
  }
});

onUnmounted(() => {
  clearInterval(interval);
  if (svgContainer.value) {
    svgContainer.value.removeEventListener("wheel", zoom);
  }
});
</script>

<template>
  <div class="widget p-6 bg-white dark:bg-surface-900 rounded-lg shadow-lg transition-all mb-2">
    <h1 class="text-2xl font-bold mb-4">Warehouse Live</h1>

    <div class="grid grid-cols-3 gap-4 mb-6">
      <Card v-for="amr in amrs" :key="amr.id" class="shadow-lg p-4 rounded-lg border border-gray-200 bg-white dark:bg-surface-800 dark:border-surface-700">
        <template #content>
          <div class="flex flex-col items-center text-center">
            <img :src="`/robot_${amr.id}.png`" alt="Robot Image" class="w-30 h-30 mb-3" />
            <h2 class="text-xl font-semibold">AMR - {{ amr.id }}</h2>
            <Badge :value="amr.status" class="px-3 py-1 rounded text-white text-sm" :style="{ backgroundColor: amr.status === 'Moving' ? '#426bf9' : '#6c757d' }" />
            <div class="w-full mt-3">
              <ProgressBar :value="amr.battery" class="mt-3" :style="{ '--progressbar-color': getBatteryColor(amr.battery) }" />          
            </div>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Battery: <span class="font-semibold">{{ amr.battery }}%</span></p>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Tasks Completed: <span class="font-semibold">{{ amr.tasksCompleted }}</span></p>
          </div>
        </template>
      </Card>
    </div>

    <div ref="svgContainer" class="overflow-hidden border rounded-lg cursor-grab active:cursor-grabbing no-select"
     @mousedown="startDrag">
      <svg :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`" class="bg-gray-200 w-full h-[450px]">
        <g v-for="zone in warehouseZones" :key="zone.name">
          <rect :x="zone.x" :y="zone.y" :width="zone.width" :height="zone.height" :fill="zone.color" stroke="white" stroke-width="1" />
          <foreignObject :x="zone.x" :y="zone.y" :width="zone.width" :height="zone.height">
            <div class="flex items-center justify-center w-full h-full">
              <i :class="zone.icon" class="text-white mr-1" :style="{ fontSize: '10px' }"></i>
              <span class="text-white text-xs">{{ zone.name }}</span>
            </div>
          </foreignObject>
        </g>
        
        <rect v-for="rack in rackingZones" :key="rack.name" 
              :x="rack.x" :y="rack.y" :width="rack.width" :height="rack.height" 
              fill="#c7cacb" stroke="white" stroke-width="1" />
        
        <text v-for="rack in rackingZones" :key="rack.name + '-text'" 
              :x="rack.x + rack.width / 4" :y="rack.y + rack.height / 2" 
              fill="white" font-size="10">{{ rack.name }}</text>
        
        <g v-for="amr in amrs" :key="amr.id">
          <image 
            :x="amr.x - 75" 
            :y="amr.y - 75" 
            width="150" 
            height="150" 
            :xlink:href="`/robot_${amr.id}.png`" 
            :class="{ 'blinking': amr.status === 'Moving' }" />
          
          <circle 
            :cx="amr.x" 
            :cy="amr.y" 
            r="3" 
            fill="green" 
            opacity="0.8"
          />
        </g>

        <!-- <g v-html="drawPaths()"></g>
        <circle v-for="amr in amrs" :key="amr.id" :cx="amr.x" :cy="amr.y" r="1" fill="green" /> -->
        
      </svg>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-progressbar-value) {
  background-color: var(--progressbar-color) !important;
}

.blinking {
  animation: blink-animation 0.8s infinite alternate;
}

@keyframes blink-animation {
  100% { opacity: 0.5; }
}

.no-select {
    user-select: none; /* Prevents text selection */
}
</style>
