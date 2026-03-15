<template>
  <header class="top-header">
    <div class="top-header-main">
      <h1 class="page-title">
        {{ title }}
      </h1>

      <div
        v-if="showNotification"
        class="notif-wrapper"
      >
        <button
          class="notif-button"
          type="button"
          aria-label="Notifications"
          @click="isNotifOpen = !isNotifOpen"
        >
          <q-icon
            name="notifications_none"
            size="24px"
            class="notif-icon"
          />
        </button>

        <NotificationDropdown v-if="isNotifOpen" />
      </div>
    </div>

    <PillNavLinks
      v-if="links && links.length"
      :links="links"
      :active-key="activeKey"
      @link-click="$emit('link-click', $event)"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import PillNavLinks from 'src/components/PillNavLinks.vue';
import NotificationDropdown from 'src/components/NotificationDropdown.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    default: () => [],
  },
  activeKey: {
    type: String,
    default: '',
  },
  showNotification: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['link-click']);

const isNotifOpen = ref(false);
</script>

<style scoped lang="scss">
.top-header {
  padding: 3.5vw 6vw 2.5vw;
  background-color: $app-bg;
}

.top-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
}

.notif-wrapper {
  position: relative;
}

.page-title {
  margin: 0;
  font-family: $font-title;
  font-size: 7vw;
  letter-spacing: 0.08em;
  color: rgba(33, 26, 30, 0.95);
}

.notif-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  border: none;
  background-color: #211A1E;
  color: #FFFFFA;
  cursor: pointer;
  box-shadow: 0 1.4vw 3.4vw rgba(0, 0, 0, 0.08);
  transition: transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease;
}

.notif-button:active {
  transform: translateY(0.6vw) scale(0.97);
  box-shadow: 0 0.6vw 2.4vw rgba(0, 0, 0, 0.08);
}

.notif-icon {
  margin: 0;
}
</style>

