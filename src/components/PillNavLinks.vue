<template>
  <nav
    v-if="links && links.length"
    class="pill-nav"
    aria-label="Section navigation"
  >
    <button
      v-for="link in links"
      :key="link.key"
      class="pill-nav-link"
      :class="{ 'pill-nav-link--active': link.key === activeKey }"
      type="button"
      @click="$emit('link-click', link)"
    >
      {{ link.label }}
    </button>
  </nav>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    default: () => [],
  },
  activeKey: {
    type: String,
    default: '',
  },
});

defineEmits(['link-click']);
</script>

<style scoped lang="scss">
.pill-nav {
  margin-top: 0.4vw;
  margin-bottom: 0;
  padding: 0 2vw;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  align-items: center;
  justify-content: flex-start;
  gap: 2vw;
}

.pill-nav::-webkit-scrollbar {
  display: none;
}

.pill-nav {
  scrollbar-width: none;
}

.pill-nav-link {
  flex: 0 0 auto;
  padding: 1.4vw 4vw;
  border-radius: 999vw;
  border: 0.4vw solid #211A1E;
  background: transparent;
  font-family: $font-body;
  font-size: 2.6vw;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #211A1E;
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease, transform 0.08s ease;
}
</style>

