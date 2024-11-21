export default defineNuxtConfig({
  ssr: false,
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: ["@pinia/nuxt"],
  build: {
    transpile: ["bootstrap-vue-3"],
  },

  compatibilityDate: "2024-11-14",
  vite: {
    optimizeDeps: {
      include: ["ol/Map", "ol/View", "ol/layer/Tile", "ol/source/OSM"],
    },
  },
});
