import { createApp } from "vue";
import App from "./App.vue";
import "./style.css"; // Assuming Tailwind is set up here or in index.html
import { MotionPlugin } from "@vueuse/motion";

const app = createApp(App);
app.use(MotionPlugin);
app.mount("#app");
