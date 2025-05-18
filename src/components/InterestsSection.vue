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
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Personal Interests & Activities
      </h2>
      <div
        v-if="renderedMarkdown"
        class="prose prose-lg max-w-none text-gray-700 leading-relaxed bg-white p-8 rounded-lg shadow-md"
        v-html="renderedMarkdown"
      ></div>
      <div v-else class="text-center text-gray-500">
        <p>
          Interests and activities information is not available at the moment.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5em;
}

.prose :deep(li) {
  margin-bottom: 0.5em;
}
</style>
