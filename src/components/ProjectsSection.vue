<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  projects: Array,
});

const expanded = ref({});

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
    <h2 class="text-3xl font-semibold text-gray-700 mb-8 border-b pb-3">
      Featured Projects
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
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
          <p class="text-gray-600 leading-relaxed mb-4 h-20 overflow-y-auto">
            {{ project.summary }}
          </p>

          <div @click="toggleExpand(project.id)" class="cursor-pointer mb-4">
            <button class="button button-secondary text-sm py-1 px-3 w-full">
              {{ expanded[project.id] ? "Show Less" : "Show Details" }}
            </button>
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
              transition: { duration: 200 },
            }"
            class="project-details-wrapper overflow-hidden"
          >
            <ul class="list-disc pl-5 space-y-2 text-sm text-gray-600">
              <li
                v-for="(detail, dIndex) in project.details"
                :key="dIndex"
                v-motion
                :initial="{ opacity: 0, x: -20 }"
                :enter="{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: dIndex * 100,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  },
                }"
              >
                {{ detail }}
              </li>
            </ul>
          </div>

          <div class="mt-6 flex justify-between items-center space-x-3">
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
