<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  project: Object,
});

const expanded = ref(false);

function toggleExpand() {
  expanded.value = !expanded.value;
}

function getTechColor(index) {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return colors[index % colors.length];
}
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 overflow-hidden"
  >
    <img
      v-if="project.imageUrl"
      :src="project.imageUrl"
      alt="Project Image"
      class="w-full h-48 object-cover"
    />
    <div class="p-6">
      <h3 class="text-2xl font-semibold text-gray-800 mb-2">
        {{ project.name }}
      </h3>
      <p v-if="project.period" class="text-sm text-gray-500 mb-3">
        {{ project.period }}
      </p>
      <div class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="(tech, tIndex) in project.technologies"
          :key="tIndex"
          :class="getTechColor(tIndex)"
          class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
        >
          {{ tech }}
        </span>
      </div>
      <p
        v-if="project.summary"
        class="text-gray-600 leading-relaxed mb-4 max-h-20 overflow-y-auto"
      >
        {{ project.summary }}
      </p>
      <p v-if="project.description" class="text-sm text-gray-700 mt-1 mb-2">
        {{ project.description }}
      </p>

      <div
        v-if="project.details && project.details.length"
        @click="toggleExpand"
        class="flex justify-center cursor-pointer mb-1"
      >
        <svg
          v-if="!expanded"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>

      <div
        v-if="expanded && project.details && project.details.length"
        v-motion
        :initial="{ opacity: 0, y: -20, height: 0 }"
        :enter="{
          opacity: 1,
          y: 0,
          height: 'auto',
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5,
          },
        }"
        :leave="{
          opacity: 0,
          y: -20,
          height: 0,
          transition: {
            type: 'spring',
            stiffness: 250,
            damping: 25,
            mass: 0.5,
          },
        }"
        class="project-details-wrapper pt-4 pb-4 border-gray-200 overflow-hidden"
      >
        <ul class="space-y-2 text-sm text-gray-600 text-left pl-0">
          <li
            v-for="(detail, dIndex) in project.details"
            :key="dIndex"
            class="flex items-start"
          >
            <svg
              class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <circle cx="10" cy="10" r="4" />
            </svg>
            <span>{{ detail }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-2 flex justify-between items-center space-x-3">
        <a
          v-if="project.liveUrl && project.liveUrl !== '#'"
          :href="project.liveUrl"
          target="_blank"
          class="button button-primary text-sm py-2 px-4"
          >Live URL</a
        >
        <a
          v-if="project.sourceUrl"
          :href="project.sourceUrl"
          target="_blank"
          class="button button-outline text-sm py-2 px-4"
          >Source Code</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}

.button {
  flex-grow: 1;
}

.flex > .button:only-child {
  flex-grow: 0;
}
</style>
