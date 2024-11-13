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
