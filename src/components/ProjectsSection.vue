<script setup>
import { defineProps, ref, computed } from "vue"; // Added computed
import { marked } from "marked"; // Added marked

const props = defineProps({
  projects: Array,
  projectsStatement: String, // Added projectsStatement prop
});

const expanded = ref({});

// Added renderedMarkdown computed property
const renderedMarkdown = computed(() => {
  if (!props.projectsStatement) return "";
  return marked(props.projectsStatement);
});

function toggleExpand(id) {
  expanded.value[id] = !expanded.value[id];
}

function getTechColor(index) {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
  ];
  return colors[index % colors.length];
}
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-6">Personal Projects</h2>
    <!-- Added markdown display div -->
    <div
      v-if="renderedMarkdown"
      class="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8 text-left"
      v-html="renderedMarkdown"
    ></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        <img
          v-if="project.imageUrl"
          :src="project.imageUrl"
          alt="Project Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ project.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-3">{{ project.period }}</p>
          <div class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="(tech, tIndex) in project.technologies"
              :key="tIndex"
              :class="getTechColor(tIndex)"
              class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {{ tech }}
            </span>
          </div>
          <p
            class="text-gray-600 leading-relaxed mb-4 max-h-20 overflow-y-auto"
          >
            {{ project.summary }}
          </p>

          <div
            v-if="project.details && project.details.length"
            @click="toggleExpand(project.id)"
            class="flex justify-center cursor-pointer mb-1"
          >
            <svg
              v-if="!expanded[project.id]"
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

          <div
            v-if="expanded[project.id]"
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
            class="project-details-wrapper mt-4 pt-4 border-t border-gray-200 overflow-hidden"
          >
            <ul class="space-y-2 text-sm text-gray-600 text-left">
              <li
                v-for="(detail, dIndex) in project.details"
                :key="dIndex"
                class="flex items-start"
              >
                <svg
                  class="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-2 flex justify-between items-center space-x-3">
            <a
              v-if="project.liveUrl && project.liveUrl !== '#'"
              :href="project.liveUrl"
              target="_blank"
              class="button button-primary text-sm py-2 px-4"
              >Live Demo</a
            >
            <a
              v-if="project.sourceUrl"
              :href="project.sourceUrl"
              target="_blank"
              class="button button-outline text-sm py-2 px-4"
              >Source Code</a
            >
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

.button {
  flex-grow: 1;
}

.flex > .button:only-child {
  flex-grow: 0;
}
</style>
