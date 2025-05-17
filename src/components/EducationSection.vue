<script setup>
import { defineProps, ref, computed } from "vue";

defineProps({
  education: Array,
});

const expanded = ref({});

function toggleExpand(id) {
  expanded.value[id] = !expanded.value[id];
}

const hasExpandableContent = (eduItem) => {
  return (
    (eduItem.awards && eduItem.awards.length > 0) ||
    (eduItem.subjectsStudied && eduItem.subjectsStudied.length > 0) ||
    eduItem.finalYearProject ||
    (eduItem.aLevels && eduItem.aLevels.length > 0) ||
    (eduItem.gcses && eduItem.gcses.length > 0)
  );
};
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
        <div
          @click="hasExpandableContent(edu) && toggleExpand(edu.id)"
          :class="{ 'cursor-pointer': hasExpandableContent(edu) }"
        >
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-xl font-semibold text-blue-600">
              {{ edu.degree }}
            </h3>
            <div v-if="hasExpandableContent(edu)" class="flex items-center">
              <span class="text-sm text-gray-500 mr-2">{{ edu.period }}</span>
              <svg
                v-if="!expanded[edu.id]"
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
            <span v-if="edu.location">{{ edu.location }} - </span>
            <span>{{ edu.institution }}</span>
          </div>
        </div>
        <div
          v-if="hasExpandableContent(edu) && expanded[edu.id]"
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
          class="mt-4 pt-4 border-t border-gray-200 overflow-hidden text-left"
        >
          <div v-if="edu.awards && edu.awards.length" class="mb-3">
            <h4 class="text-md font-semibold text-gray-700 mb-1">Awards:</h4>
            <ul class="list-disc pl-5 space-y-1 text-gray-600">
              <li v-for="(award, index) in edu.awards" :key="'award-' + index">
                {{ award }}
              </li>
            </ul>
          </div>

          <div
            v-if="edu.subjectsStudied && edu.subjectsStudied.length"
            class="mb-3"
          >
            <h4 class="text-md font-semibold text-gray-700 mb-1">
              Subjects Studied:
            </h4>
            <ul class="list-disc pl-5 space-y-1 text-gray-600">
              <li
                v-for="(subject, index) in edu.subjectsStudied"
                :key="'subject-' + index"
              >
                {{ subject }}
              </li>
            </ul>
          </div>

          <div v-if="edu.finalYearProject" class="mb-3">
            <h4 class="text-md font-semibold text-gray-700 mb-1">
              Final Year Project:
            </h4>
            <p class="text-gray-600">{{ edu.finalYearProject }}</p>
          </div>

          <div v-if="edu.aLevels && edu.aLevels.length" class="mb-3">
            <h4 class="text-md font-semibold text-gray-700 mb-1">A-Levels:</h4>
            <ul class="list-disc pl-5 space-y-1 text-gray-600">
              <li
                v-for="(level, index) in edu.aLevels"
                :key="'alevel-' + index"
              >
                {{ level.subject }}: {{ level.grade }}
              </li>
            </ul>
          </div>

          <div v-if="edu.gcses && edu.gcses.length" class="mb-3">
            <h4 class="text-md font-semibold text-gray-700 mb-1">GCSEs:</h4>
            <ul class="list-disc pl-5 space-y-1 text-gray-600">
              <li v-for="(item, index) in edu.gcses" :key="'gcse-' + index">
                {{ item.subject }}: {{ item.grade }}
              </li>
            </ul>
            <p class="text-gray-600 text-sm mt-1">
              (Plus other GCSEs at grade C or above)
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}
/* Add any additional scoped styles if needed */
</style>
