<script setup>
import { ref, onMounted, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import ProfileCard from "./components/ProfileCard.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import EducationSection from "./components/EducationSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import PersonalStatement from "./components/PersonalStatement.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import InterestsSection from "./components/InterestsSection.vue"; // Add this line

// Setup dark mode with default set to light mode
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "",
  initialValue: "light", // Force light mode as default
  storageKey: "live-cv-color-scheme", // Custom storage key
});
const toggleDark = useToggle(isDark);

// Ensure we start with light mode
isDark.value = false;

const profile = ref({});
const experiences = ref([]);
const education = ref([]);
const skills = ref({});
const projects = ref([]);
const personalStatement = ref("");
const projectsStatement = ref("");
const interestsStatement = ref("");
const isLoading = ref(true);

async function fetchData() {
  isLoading.value = true;
  try {
    // Use dynamic imports to get the data
    const profileModule = await import("./data/profile.json");
    const experienceModule = await import("./data/experience.json");
    const educationModule = await import("./data/education.json");
    const skillsModule = await import("./data/skills.json");
    const projectsModule = await import("./data/projects.json");

    // For Markdown, we use the ?raw suffix to get the raw content
    const statementModule = await import("./data/personal_statement.md?raw");
    const projectsStatementModule = await import(
      "./data/projects_statement.md?raw"
    ); // Added import for projects_statement.md
    const interestsStatementModule = await import("./data/interests.md?raw");

    profile.value = profileModule.default;
    experiences.value = experienceModule.default;
    education.value = educationModule.default;
    skills.value = skillsModule.default;
    projects.value = projectsModule.default;
    personalStatement.value = statementModule.default;
    projectsStatement.value = projectsStatementModule.default;
    interestsStatement.value = interestsStatementModule.default;
  } catch (error) {
    console.error("Error loading CV data:", error);
  } finally {
    isLoading.value = false;
  }
}

watch(
  profile,
  (newProfile) => {
    if (newProfile && newProfile.name) {
      document.title = `Live CV - ${newProfile.name}`;
    } else {
      document.title = "Live CV"; // Set a default title if name is not yet available
    }
  },
  { immediate: true, deep: true } // Added deep: true for nested properties
);

onMounted(() => {
  fetchData();
});

function downloadPdf() {
  alert(
    "PDF download functionality will be implemented using a library like jsPDF or a server-side solution."
  );
}
</script>

<template>
  <div
    id="app-container"
    class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 antialiased transition-colors duration-300"
  >
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400"
      ></div>
    </div>

    <div v-else>
      <header
        class="text-center pt-8 pb-12 fade-in-up"
        style="animation-delay: 0.1s"
      >
        <div class="absolute top-4 right-4 sm:top-6 sm:right-8">
          <button
            @click="toggleDark()"
            class="p-2 rounded-full transition-colors relative group"
            :class="
              isDark
                ? 'bg-gray-700 text-yellow-300'
                : 'bg-yellow-100 text-gray-800'
            "
            aria-label="Toggle dark mode"
          >
            <!-- Custom tooltip that appears on hover -->
            <span class="tooltip-text">{{ isDark ? 'Switch to light mode' : 'Switch to dark mode' }}</span>
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
        <img
          v-if="profile.avatarUrl"
          :src="profile.avatarUrl"
          alt="Profile Picture"
          class="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
        />
        <h1 class="text-5xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {{ profile.name }}
        </h1>
        <p class="text-2xl text-blue-600 dark:text-blue-400 font-light">
          {{ profile.title }}
        </p>
      </header>

      <main class="space-y-12">
        <ProfileCard
          :profile="profile"
          class="cv-section fade-in-up"
          style="animation-delay: 0.3s"
        />
        <PersonalStatement
          :statement="personalStatement"
          class="cv-section fade-in-up"
          style="animation-delay: 0.5s"
        />
        <ExperienceSection
          :experiences="experiences"
          class="cv-section fade-in-up"
          style="animation-delay: 0.9s"
        />
        <ProjectsSection
          :projects="projects"
          :projectsStatement="projectsStatement"
          class="cv-section fade-in-up"
          style="animation-delay: 1.1s"
        />
        <EducationSection
          :education="education"
          class="cv-section fade-in-up"
          style="animation-delay: 1.3s"
        />
        <InterestsSection
          :interestsStatement="interestsStatement"
          class="cv-section fade-in-up"
          style="animation-delay: 1.7s"
        />
        <SkillsSection
          :skills="skills"
          class="cv-section fade-in-up"
          style="animation-delay: 1.5s"
        />
      </main>

      <footer
        class="text-center mt-16 py-8 border-t border-gray-200 dark:border-gray-700 fade-in-up"
        style="animation-delay: 1.9s"
      >
        <p class="text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights
          reserved.
        </p>
        <button
          @click="downloadPdf"
          class="button button-primary mt-6 dark:bg-gray-800 dark:text-gray-200"
        >
          Download PDF CV
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for App.vue specific adjustments */
#app-container {
  max-width: 900px; /* Slightly narrower for better readability */
}

/* Ensure fade-in-up is applied if not globally available or overridden */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tooltip styling */
.tooltip-text {
  visibility: hidden;
  position: absolute;
  transform: translateX(-50%);
  opacity: 0;
  background-color: #1f2937; /* gray-800 */
  color: white;
  font-size: 0.75rem; /* text-xs */
  border-radius: 0.25rem; /* rounded */
  padding: 0.25rem 0.5rem; /* py-1 px-2 */
  white-space: nowrap;
  left: 50%;
  bottom: 100%;
  margin-bottom: 8px;
  transition: opacity 0.3s;
  z-index: 10;
  pointer-events: none; /* Ensures tooltip doesn't interfere with button clicks */
}

/* Arrow for tooltip */
.tooltip-text::after {
  position: absolute;
  content: "";
  border: 4px solid transparent;
  border-top-color: #1f2937; /* gray-800 */
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
}

/* Show tooltip on hover */
.group:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Dark mode tooltip */
.dark .tooltip-text {
  background-color: #f3f4f6; /* gray-100 */
  color: #1f2937; /* gray-800 */
}

.dark .tooltip-text::after {
  border-top-color: #f3f4f6; /* gray-100 */
}
</style>
