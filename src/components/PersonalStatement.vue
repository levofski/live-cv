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
    <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b pb-3">
      About Me
    </h2>
    <!-- Apply Tailwind Typography for nice default markdown styling -->
    <div
      class="prose prose-lg max-w-none text-gray-700 leading-relaxed"
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
</style>
