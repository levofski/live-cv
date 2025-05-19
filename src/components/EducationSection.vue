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
    <h2
      class="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6 pb-3"
    >
      Education
    </h2>
    <div class="space-y-8">
      <div
        v-for="edu in education"
        :key="edu.id"
        class="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-300"
      >
        <div
          @click="hasExpandableContent(edu) && toggleExpand(edu.id)"
          :class="{ 'cursor-pointer': hasExpandableContent(edu) }"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="pr-4">
              <h3
                class="text-xl font-semibold text-blue-600 dark:text-blue-400 leading-tight text-left"
              >
                {{ edu.degree }}
              </h3>
            </div>
            <span
              class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0 text-right"
            >
              {{ edu.period }}
            </span>
          </div>
          <div
            class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="leading-tight"
              >{{ edu.location ? `${edu.location} - ` : ""
              }}{{ edu.institution }}</span
            >
          </div>
          <div
            v-if="hasExpandableContent(edu)"
            class="flex justify-center mt-4"
          >
            <svg
              v-if="!expanded[edu.id]"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 dark:text-gray-400"
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
              class="h-6 w-6 text-gray-500 dark:text-gray-400"
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
          class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden text-left"
        >
          <div v-if="edu.awards && edu.awards.length" class="mb-3">
            <h4
              class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Awards:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li
                v-for="(award, index) in edu.awards"
                :key="'award-' + index"
                class="flex items-start"
              >
                <svg
                  class="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>{{ award }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="edu.subjectsStudied && edu.subjectsStudied.length"
            class="mb-3"
          >
            <h4
              class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Subjects Studied:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li
                v-for="(subject, index) in edu.subjectsStudied"
                :key="'subject-' + index"
                class="flex items-start"
              >
                <svg
                  class="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>{{ subject }}</span>
              </li>
            </ul>
          </div>

          <div v-if="edu.finalYearProject" class="mb-3">
            <h4
              class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Final Year Project:
            </h4>
            <p class="text-gray-600 dark:text-gray-300">
              {{ edu.finalYearProject }}
            </p>
          </div>

          <div v-if="edu.aLevels && edu.aLevels.length" class="mb-3">
            <h4
              class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              A-Levels:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li
                v-for="(level, index) in edu.aLevels"
                :key="'alevel-' + index"
                class="flex items-start"
              >
                <svg
                  class="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>{{ level.subject }}: {{ level.grade }}</span>
              </li>
            </ul>
          </div>

          <div v-if="edu.gcses && edu.gcses.length" class="mb-3">
            <h4
              class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              GCSEs:
            </h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-300">
              <li
                v-for="(item, index) in edu.gcses"
                :key="'gcse-' + index"
                class="flex items-start"
              >
                <svg
                  class="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>{{ item.subject }}: {{ item.grade }}</span>
              </li>
            </ul>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
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

.dark .text-blue-600 {
  color: #3b82f6; /* Tailwind's blue-500 for dark mode */
}
</style>
