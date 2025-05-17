<script setup>
import { defineProps, ref } from "vue";

defineProps({
  experiences: Array,
});

const expanded = ref({});

function toggleExpand(id) {
  expanded.value[id] = !expanded.value[id];
}
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b pb-3">
      Work Experience
    </h2>
    <div class="space-y-8">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
      >
        <div @click="toggleExpand(exp.id)" class="cursor-pointer">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-xl font-semibold text-blue-600">
              {{ exp.title }} at {{ exp.company }}
            </h3>
            <span class="text-sm text-gray-500">{{ exp.period }}</span>
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
            <span>{{ exp.location }}</span>
          </div>
          <p class="text-gray-600 leading-relaxed mb-3">{{ exp.summary }}</p>
          <button class="button button-secondary text-sm py-1 px-3">
            {{ expanded[exp.id] ? "Show Less" : "Show More" }}
          </button>
        </div>
        <div
          v-if="expanded[exp.id]"
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
          class="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
        >
          <ul class="list-disc pl-5 space-y-1 mb-6">
            <li
              v-for="(detail, index) in exp.details"
              :key="index"
              class="text-gray-600"
            >
              {{ detail }}
            </li>
          </ul>

          <div
            v-if="exp.projects && exp.projects.length"
            class="mt-6 pt-6 border-t-2 border-gray-200"
          >
            <h4 class="text-lg font-semibold text-gray-700 mb-3">
              Notable Projects:
            </h4>
            <ul class="space-y-3">
              <li
                v-for="project in exp.projects"
                :key="project.id"
                class="text-gray-600 bg-gray-50 p-3 rounded-md shadow-sm"
              >
                <strong class="font-semibold text-blue-600">{{
                  project.name
                }}</strong>
                <p class="text-sm text-gray-700 mt-1 mb-2">
                  {{ project.description }}
                </p>
                <div
                  v-if="project.technologies && project.technologies.length"
                  class="mt-2"
                >
                  <span class="text-xs font-medium text-gray-500 mr-2"
                    >Technologies:</span
                  >
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
                  >
                    {{ tech }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* .expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
} Remove these as v-motion handles transitions */

/* Additional styling for a more polished look */
.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}
</style>
