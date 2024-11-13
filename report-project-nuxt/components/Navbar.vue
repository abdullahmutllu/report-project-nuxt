<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <button class="btn btn-primary" type="button" @click="emit('toggle-sidebar')">☰</button>
      <NuxtLink to="/" class="navbar-brand">
        <img src="~/assets/img/logo.svg" alt="Logo" class="logo" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(["toggle-sidebar"]);
</script>

<style scoped>
.navbar {
  position: fixed;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1050;
}
.logo {
  width: 240px;
  padding: 0 10px;
  height: auto;
  vertical-align: middle;
}
</style>
