export default defineNuxtConfig({
  ssr: false,
  css: ["bootstrap/dist/css/bootstrap.min.css"],

  build: {
    transpile: ["bootstrap-vue-3"],
  },

  compatibilityDate: "2024-11-14",
});
