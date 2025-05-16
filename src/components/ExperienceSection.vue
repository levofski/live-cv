<script setup>
import { defineProps, ref } from "vue";

defineProps({
  experiences: Array,
});

const expanded = ref({});

function toggleExpand(id) {
  expanded.value[id] = !expanded.value[id];
}
</script>

<template>
  <section>
    <h2 class="text-3xl font-semibold text-gray-700 mb-6 border-b pb-3">
      Work Experience
    </h2>
    <div class="space-y-8">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
      >
        <div @click="toggleExpand(exp.id)" class="cursor-pointer">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-xl font-semibold text-blue-600">{{ exp.title }}</h3>
            <span
              class="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded"
              >{{ exp.company }}</span
            >
          </div>
          <div class="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <div class="flex items-center space-x-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>{{ exp.period }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>{{ exp.location }}</span>
            </div>
          </div>
          <p class="text-gray-600 leading-relaxed mb-3">{{ exp.summary }}</p>
          <button class="button button-secondary text-sm py-1 px-3">
            {{ expanded[exp.id] ? "Show Less" : "Show More Details" }}
            <svg
              :class="{ 'rotate-180': expanded[exp.id] }"
              class="w-4 h-4 inline-block ml-1 transition-transform duration-300"
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
        </div>
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
            v-if="expanded[exp.id]"
            class="mt-4 pt-4 border-t border-gray-200"
          >
            <ul
              class="list-disc list-inside text-gray-600 space-y-2 pl-5 leading-relaxed"
            >
              <li v-for="(detail, index) in exp.details" :key="index">
                {{ detail }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.4s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
}

/* Additional styling for a more polished look */
.text-blue-600 {
  color: #2563eb; /* Tailwind's blue-600 */
}
</style>
