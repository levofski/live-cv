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
        class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col"
      >
        <img
          v-if="project.imageUrl"
          :src="project.imageUrl"
          :alt="project.name"
          class="w-full h-56 object-cover"
        />
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-2xl font-semibold text-blue-600 mb-2">
            {{ project.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-3">{{ project.period }}</p>

          <div class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="(tech, tIndex) in project.technologies"
              :key="tech"
              :class="getTechColor(tIndex)"
              class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <p class="text-gray-600 leading-relaxed mb-4 flex-grow">
            {{ project.summary }}
          </p>

          <div class="mt-auto">
            <button
              @click="toggleExpand(project.id)"
              v-if="project.details && project.details.length"
              class="button button-secondary text-sm py-2 px-4 w-full mb-3 flex items-center justify-center"
            >
              {{ expanded[project.id] ? "Show Less" : "Show More Details" }}
              <svg
                :class="{ 'rotate-180': expanded[project.id] }"
                class="w-4 h-4 inline-block ml-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <transition
              name="expand"
              @enter="
                (el, done) => {
                  el.style.height = el.scrollHeight + 'px';
                  done();
                }
              "
              @after-enter="
                (el) => {
                  el.style.height = 'auto';
                }
              "
              @before-leave="
                (el) => {
                  el.style.height = el.scrollHeight + 'px';
                }
              "
              @leave="
                (el, done) => {
                  el.style.height = '0px';
                  done();
                }
              "
            >
              <div
                v-if="expanded[project.id]"
                class="mb-4 pt-4 border-t border-gray-200"
              >
                <ul
                  class="list-disc list-inside text-gray-600 space-y-1.5 pl-5 leading-relaxed"
                >
                  <li v-for="(detail, index) in project.details" :key="index">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </transition>

            <div class="flex space-x-3">
              <a
                v-if="project.liveUrl && project.liveUrl !== '#'"
                :href="project.liveUrl"
                target="_blank"
                class="button button-primary text-sm py-2 px-4 flex-1 text-center"
              >
                View Live
              </a>
              <a
                v-if="project.sourceUrl"
                :href="project.sourceUrl"
                target="_blank"
                class="button button-secondary text-sm py-2 px-4 flex-1 text-center"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
}

.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}

/* Ensure buttons in flex container distribute space nicely */
.button {
  flex-grow: 1; /* Default for buttons to share space */
}

/* If only one button, let it take full width or its natural width based on design */
.flex > .button:only-child {
  flex-grow: 0; /* Or 1 if you want it to be full width */
  /* width: auto; /* Or 100% */
}
</style>
