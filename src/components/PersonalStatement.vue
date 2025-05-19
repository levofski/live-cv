<script setup>
import { defineProps, computed } from "vue";
import { marked } from "marked";

const props = defineProps({
  statement: String,
});

const renderedMarkdown = computed(() => {
  if (!props.statement) return "";
  // Basic renderer customization for Tailwind Typography if needed
  const renderer = new marked.Renderer();
  // Example: Customize heading rendering if necessary
  // renderer.heading = (text, level) => {
  //   const escapedText = text.toLowerCase().replace(/[\s]+/g, '-');
  //   return `<h${level} class="text-xl font-semibold mt-4 mb-2"><a name="${escapedText}" class="anchor" href="#${escapedText}}">${text}</a></h${level}>`;
  // };
  return marked(props.statement, { renderer });
});
</script>

<template>
  <section>
    <!-- Apply Tailwind Typography for nice default markdown styling -->
    <div
      class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
      v-html="renderedMarkdown"
    ></div>
  </section>
</template>

<style scoped>
/* Ensure prose styles are applied correctly. Tailwind Typography plugin handles this. */
/* If not using the plugin, you might need to add custom styles for markdown elements. */
.prose :where(h3):not(:where([class~="not-prose"] *)) {
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  font-size: 1.25em; /* Adjust size as needed */
  color: #2c3e50; /* Dark blue-gray for headings */
}

.dark .prose :where(h3):not(:where([class~="not-prose"] *)) {
  color: #e5e7eb; /* Light gray for headings in dark mode */
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 1.75em;
  text-align: left; /* Ensure left alignment */
}

.prose :where(li):not(:where([class~="not-prose"] *)) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  text-align: left; /* Ensure left alignment for list items too */
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
