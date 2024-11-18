<template>
  <div id="app">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar :isVisible="sidebarVisible" />
    <main :class="{ 'content-expanded': sidebarVisible }">
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.ckeditor.com/ckeditor5/40.1.0/classic/ckeditor.css",
        },
      ],
    },
    {
      src: "https://cdn.ckeditor.com/ckeditor5/40.1.0/classic/ckeditor.js",
      defer: true,
    },
  ],
});

const sidebarVisible = ref(false);

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};
</script>

<style scoped>
#app {
  min-height: 100vh;
}

main {
  padding-top: 60px;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.content-expanded {
  margin-left: 250px;
}
</style>
