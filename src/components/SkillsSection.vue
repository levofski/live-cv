<script setup>
import { defineProps, ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  skills: Object,
});

const technicalSkillsContainerRef = ref(null); // Ref for the technical skills container
const animatedSkillBars = ref(new Set()); // To track which skill bars have been animated

// Group skills by category
const skillsByCategory = computed(() => {
  const categories = {};
  props.skills.technical.forEach((skill) => {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    categories[skill.category].push(skill);
  });
  return categories;
});

function getSkillLevelAttributes(level) {
  switch (level) {
    case "Expert":
      return { width: "95%", class: "bg-green-500" }; // Vibrant Green
    case "Advanced":
      return { width: "80%", class: "bg-blue-500" }; // Strong Blue
    case "Proficient":
      return { width: "65%", class: "bg-yellow-400" }; // Bright Yellow
    case "Intermediate":
      return { width: "50%", class: "bg-orange-400" }; // Orange
    case "Beginner":
      return { width: "30%", class: "bg-red-400" }; // Softer Red
    default:
      return { width: "0%", class: "bg-gray-300" };
  }
}

let intersectionObserver = null;

onMounted(() => {
  const options = {
    root: null, // observing intersections relative to the viewport
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% of the technical skills container is visible
  };

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the container is visible, trigger animation for all technical skills
        props.skills.technical.forEach((skill) => {
          animatedSkillBars.value.add(skill.name);
        });
        // Optional: Unobserve after the first animation if you only want it to happen once
        // if (technicalSkillsContainerRef.value) {
        //   intersectionObserver.unobserve(technicalSkillsContainerRef.value);
        // }
      }
    });
  }, options);

  if (technicalSkillsContainerRef.value) {
    intersectionObserver.observe(technicalSkillsContainerRef.value);
  }
});

onUnmounted(() => {
  if (intersectionObserver && technicalSkillsContainerRef.value) {
    intersectionObserver.unobserve(technicalSkillsContainerRef.value);
  }
});
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-8 border-b pb-3">
      Skills
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div ref="technicalSkillsContainerRef">
        <!-- Attach ref to the container of technical skills -->
        <h3 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Technical Skills
        </h3>
        <div
          v-for="(categorySkills, category) in skillsByCategory"
          :key="category"
          class="mb-8"
        >
          <h4 class="text-lg font-semibold text-gray-600 mb-4 capitalize">
            {{ category }}
          </h4>
          <div class="space-y-5">
            <div v-for="skill in categorySkills" :key="skill.name" class="">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-gray-700">{{
                  skill.name
                }}</span>
                <span class="text-sm font-medium text-blue-600">{{
                  skill.level
                }}</span>
              </div>
              <div
                class="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden"
              >
                <div
                  :class="getSkillLevelAttributes(skill.level).class"
                  class="h-3 rounded-full transition-all duration-1000 ease-out"
                  :style="{
                    width: animatedSkillBars.has(skill.name)
                      ? getSkillLevelAttributes(skill.level).width
                      : '0%',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          Soft Skills
        </h3>
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
