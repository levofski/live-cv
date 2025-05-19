<script setup>
import { defineProps, computed } from "vue";
import { marked } from "marked";

const props = defineProps({
  interestsStatement: String,
});

const renderedMarkdown = computed(() => {
  if (!props.interestsStatement) return "";
  return marked(props.interestsStatement);
});
</script>

<template>
  <section class="py-12 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-6">
      <h2
        class="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center"
      >
        Personal Interests & Activities
      </h2>
      <div
        v-if="renderedMarkdown"
        class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-700 p-4 rounded-lg"
        v-html="renderedMarkdown"
      ></div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400">
        <p>
          Interests and activities information is not available at the moment.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 1em;
  margin-bottom: 1em;
}
.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5em;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
}

.dark .prose {
  color: #e5e7eb;
}

.dark .prose a {
  color: #60a5fa;
}

.dark .prose strong {
  color: #f3f4f6;
}
</style>
