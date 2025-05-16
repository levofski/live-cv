<script setup>
import { defineProps } from "vue";

const props = defineProps({
  skills: Object,
});

function getSkillLevelClass(level) {
  if (level >= 90) return "bg-green-500"; // Vibrant Green
  if (level >= 75) return "bg-blue-500"; // Strong Blue
  if (level >= 60) return "bg-yellow-400"; // Bright Yellow
  return "bg-red-400"; // Softer Red
}
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-8 border-b pb-3">
      Skills
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-6">
          Technical Skills
        </h3>
        <div class="space-y-5">
          <div v-for="skill in skills.technical" :key="skill.name" class="">
            <div class="flex justify-between mb-1">
              <span class="text-base font-medium text-gray-700">{{
                skill.name
              }}</span>
              <span class="text-sm font-medium text-blue-600"
                >{{ skill.level }}%</span
              >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div
                :class="getSkillLevelClass(skill.level)"
                class="h-3 rounded-full transition-all duration-500 ease-out"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-6">Soft Skills</h3>
        <ul class="space-y-3">
          <li
            v-for="skill in skills.soft"
            :key="skill"
            class="flex items-center text-gray-700"
          >
            <svg
              class="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{{ skill }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles for SkillsSection */
.h-3 {
  height: 0.85rem; /* Slightly thicker bar */
}

/* Optional: Add a subtle animation to the skill bars on load/appear */
/* 
.bg-green-500, .bg-blue-500, .bg-yellow-400, .bg-red-400 {
  animation: fillBar 1s ease-out forwards; 
}

@keyframes fillBar {
  from { width: 0%; }
  to { /* width is set by :style */ /* }
} 
*/
</style>
