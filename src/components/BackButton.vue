<template>
  <button
    class="back-button"
    type="button"
    aria-label="Go back"
    @click="onClick"
  >
    <q-icon
      name="arrow_back"
      size="24px"
      class="back-icon"
    />
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function onClick () {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: 'student-classes' });
  }
}
</script>

<style scoped lang="scss">
.back-button {
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

.back-icon {
  margin: 0;
}
</style>

