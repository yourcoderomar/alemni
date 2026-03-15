<template>
  <div class="app-shell">
    <PageHeader
      v-if="!route.meta?.hideHeader"
      :title="pageTitle"
      :links="headerLinks"
      :active-key="activeHeaderKey"
      @link-click="onHeaderLinkClick"
    />

    <main class="app-content">
      <router-view />
    </main>

    <nav class="bottom-nav">
      <button
        class="nav-item"
        :class="{ 'nav-item--active': activeBottomNavGroup === 'home' }"
        @click="$router.push({ name: 'student-home' })"
        aria-label="Student home"
      >
        <q-icon
          name="home"
          class="nav-icon"
          size="26px"
        />
      </button>

      <button
        class="nav-item"
        :class="{ 'nav-item--active': activeBottomNavGroup === 'classes' }"
        @click="$router.push({ name: 'student-classes' })"
        aria-label="Student classes"
      >
        <q-icon
          name="menu_book"
          class="nav-icon"
          size="26px"
        />
      </button>

      <button
        class="nav-item"
        :class="{ 'nav-item--active': activeBottomNavGroup === 'teachers' }"
        @click="$router.push({ name: 'student-teachers' })"
        aria-label="Student teachers"
      >
        <q-icon
          name="groups"
          class="nav-icon"
          size="26px"
        />
      </button>

      <button
        class="nav-item"
        :class="{ 'nav-item--active': activeBottomNavGroup === 'profile' }"
        @click="$router.push({ name: 'student-profile' })"
        aria-label="Student profile"
      >
        <q-icon
          name="person_outline"
          class="nav-icon"
          size="26px"
        />
      </button>

    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from 'src/components/PageHeader.vue';

const route = useRoute();
const router = useRouter();

const activeBottomNavGroup = computed(() => route.meta?.bottomNavGroup || '');

const pageTitle = computed(() => {
  if (route.meta?.title) {
    return route.meta.title;
  }

  if (route.name && typeof route.name === 'string') {
    return route.name
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return 'Alemni';
});

const headerLinks = [
  { key: 'materials', label: 'Materials' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'attendance', label: 'Attendance' },
];

const activeHeaderKey = computed(() => {
  if (!route.name) {
    return '';
  }

  switch (route.name) {
  case 'student-materials':
    return 'materials';
  case 'student-assignments':
    return 'assignments';
  case 'student-quizzes':
    return 'quizzes';
  case 'student-attendance':
    return 'attendance';
  default:
    return '';
  }
});

function onHeaderLinkClick (link) {
  if (!link || !link.key) {
    return;
  }

  switch (link.key) {
  case 'materials':
    router.push({ name: 'student-materials' });
    break;
  case 'assignments':
    router.push({ name: 'student-assignments' });
    break;
  case 'quizzes':
    router.push({ name: 'student-quizzes' });
    break;
  case 'attendance':
    router.push({ name: 'student-attendance' });
    break;
  default:
    break;
  }
}
</script>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $app-bg;
}

.app-content {
  flex: 1 1 auto;
  padding: 0.6vw 0 18vw; // space for header + bottom nav on mobile
}

.bottom-nav {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.4vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.8vw 0.75vw;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(170%);
  -webkit-backdrop-filter: blur(20px) saturate(170%);
  box-shadow: 0 1.2vw 3.8vw rgba(33, 26, 30, 0.14);
  border-radius: 999vw;
  border: 0.3vw solid rgba(255, 255, 255, 0.5);
  max-width: 86vw;
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10vw;
  min-height: 10vw;
  margin: 0 1.2vw;
  border: none;
  border-radius: 999vw;
  background: transparent;
  color: rgba(33, 26, 30, 0.45);
  font-family: $font-body;
  font-size: 3.5vw;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1),
    box-shadow 0.18s ease;
}

.nav-item--active {
  background-color: #211A1E;
  color: #FFFFFA;
  transform: translateY(-1vw);
  box-shadow: 0 1.4vw 3.4vw rgba(33, 26, 30, 0.32);
}

.nav-icon {
  margin: 0;
}

@media (min-width: 768px) {
  .app-content {
    padding-bottom: 10vw;
  }

  .bottom-nav {
    max-width: 520px;
  }

  .nav-item {
    font-size: 1.6vw;
  }
}
</style>
