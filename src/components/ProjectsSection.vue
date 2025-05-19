<script setup>
import { defineProps, ref, computed } from "vue"; // Added computed
import { marked } from "marked"; // Added marked
import ProjectCard from "./ProjectCard.vue"; // Import the new component

const props = defineProps({
  projects: Array,
  projectsStatement: String, // Added projectsStatement prop
});

// Removed expanded, toggleExpand, and getTechColor as they are now in ProjectCard.vue

// Added renderedMarkdown computed property
const renderedMarkdown = computed(() => {
  if (!props.projectsStatement) return "";
  return marked(props.projectsStatement);
});
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
      Personal Projects
    </h2>
    <!-- Added markdown display div -->
    <div
      v-if="renderedMarkdown"
      class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-left"
      v-html="renderedMarkdown"
    ></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
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

.button {
  flex-grow: 1;
}

.flex > .button:only-child {
  flex-grow: 0;
}
</style>
