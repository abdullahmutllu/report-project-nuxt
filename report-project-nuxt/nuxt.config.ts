export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],

  build: {
    transpile: ["bootstrap-vue-3"],
  },

  vite: {
    plugins: ["~/plugins/bootstrap.ts"],
    define: {
      "process.env.DEBUG": false,
    },
  },

  compatibilityDate: "2024-11-14",
});
