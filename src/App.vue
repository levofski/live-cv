<script setup>
import { ref, onMounted, watch } from "vue";
import ProfileCard from "./components/ProfileCard.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import EducationSection from "./components/EducationSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import PersonalStatement from "./components/PersonalStatement.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import InterestsSection from "./components/InterestsSection.vue"; // Add this line

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
    }
  },
  { immediate: true }
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
    class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 antialiased"
  >
    <div v-if="isLoading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
      ></div>
    </div>

    <div v-else>
      <header
        class="text-center pt-8 pb-12 fade-in-up"
        style="animation-delay: 0.1s"
      >
        <img
          v-if="profile.avatarUrl"
          :src="profile.avatarUrl"
          alt="Profile Picture"
          class="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg"
        />
        <h1 class="text-5xl font-bold text-gray-800 mb-2">
          {{ profile.name }}
        </h1>
        <p class="text-2xl text-blue-600 font-light">
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
        class="text-center mt-16 py-8 border-t border-gray-200 fade-in-up"
        style="animation-delay: 1.9s"
      >
        <p class="text-gray-500">
          &copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights
          reserved.
        </p>
        <button @click="downloadPdf" class="button button-primary mt-6">
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
</style>
