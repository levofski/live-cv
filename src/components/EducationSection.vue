<script setup>
import { defineProps, ref } from "vue";

defineProps({
  education: Array,
});

const expanded = ref({});

function toggleExpand(id) {
  expanded.value[id] = !expanded.value[id];
}
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b pb-3">
      Education
    </h2>
    <div class="space-y-8">
      <div
        v-for="edu in education"
        :key="edu.id"
        class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
      >
        <div @click="toggleExpand(edu.id)" class="cursor-pointer">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-xl font-semibold text-blue-600">
              {{ edu.degree }}
            </h3>
            <span class="text-sm text-gray-500">{{ edu.period }}</span>
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ edu.location }} - {{ edu.institution }}</span>
          </div>
          <button class="button button-secondary text-sm py-1 px-3">
            {{ expanded[edu.id] ? "Show Less" : "Show More" }}
          </button>
        </div>
        <div
          v-if="expanded[edu.id]"
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
            transition: { duration: 200 },
          }"
          class="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
        >
          <p class="text-gray-600">{{ edu.details }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}
</style>
