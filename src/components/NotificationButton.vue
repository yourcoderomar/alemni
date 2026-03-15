<template>
  <div class="notif-wrapper">
    <button
      class="notif-button"
      type="button"
      aria-label="Notifications"
      @click="toggle"
    >
      <q-icon
        name="notifications_none"
        size="24px"
        class="notif-icon"
      />
    </button>

    <NotificationDropdown v-if="isOpen" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NotificationDropdown from 'src/components/NotificationDropdown.vue';

const isOpen = ref(false);

function toggle () {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped lang="scss">
.notif-wrapper {
  position: relative;
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
}

.notif-icon {
  margin: 0;
}
</style>

