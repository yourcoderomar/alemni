<template>
  <div class="auth-shell">
    <main class="auth-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.auth-shell {
  min-height: 100vh;
  background-color: $app-bg;
  color: $dark;
}

.auth-content {
  min-height: 100vh;
  padding: 6vw 4vw;
}

@media (min-width: 768px) {
  .auth-content {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>

