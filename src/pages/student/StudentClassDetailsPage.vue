<template>
  <div class="student-page">
    <div class="class-hero">
      <div class="class-top-bar">
        <BackButton />
        <NotificationButton />
      </div>
      <div class="class-hero-image" />
    </div>

    <section class="class-details-card">
      <header class="class-details-header">
        <h1 class="class-details-title">
          {{ classInfo?.name || 'Class' }}
        </h1>
        <p class="class-details-meta">
          {{ classInfo?.teacher }} • {{ classInfo?.days }}
        </p>
      </header>

      <div class="class-details-body">
        <div class="class-details-row">
          <span class="class-details-label">
            Time
          </span>
          <span class="class-details-value">
            {{ classInfo?.time }}
          </span>
        </div>

        <div class="class-details-row">
          <span class="class-details-label">
            Room
          </span>
          <span class="class-details-value">
            {{ classInfo?.room }}
          </span>
        </div>

        <div class="class-details-row">
          <span class="class-details-label">
            Status
          </span>
          <span class="class-details-chip">
            {{ classInfo?.status }}
          </span>
        </div>
      </div>

      <!-- Announcements -->
      <section class="class-extra-card">
        <h2 class="class-extra-title">
          Announcements
        </h2>
        <div v-if="announcements.length" class="class-extra-list">
          <article
            v-for="item in announcements"
            :key="item.id"
            class="class-announcement-item"
          >
            <div class="class-announcement-header">
              <span class="class-announcement-title">
                {{ item.title }}
              </span>
              <span class="class-announcement-date">
                {{ item.date }}
              </span>
            </div>
            <p class="class-announcement-body">
              {{ item.body }}
            </p>
          </article>
        </div>
        <p v-else class="class-extra-empty">
          No announcements yet.
        </p>
      </section>

      <section class="class-sessions">
        <div class="class-sessions-header">
          <h2
            class="class-sessions-title"
            :class="{ 'class-sessions-title--compact': showAllSessions }"
          >
            {{ showAllSessions ? 'All sessions this semester' : 'Sessions this week' }}
          </h2>

          <button
            type="button"
            class="class-sessions-toggle"
            @click="showAllSessions = !showAllSessions"
          >
            {{ showAllSessions ? 'Show this week' : 'Show all' }}
          </button>
        </div>

        <ul class="class-sessions-list">
          <li
            v-for="session in visibleSessions"
            :key="session.id"
            class="class-session-item"
            @click="goToSession(session)"
          >
            <div class="class-session-main">
              <span class="class-session-day">
                {{ session.day }}
              </span>
              <span class="class-session-time">
                {{ session.time }}
              </span>
              <span
                v-if="session.topic"
                class="class-session-topic"
              >
                {{ session.topic }}
              </span>
            </div>
            <span
              class="class-session-status"
              :class="{
                'is-present': session.status === 'Present',
                'is-absent': session.status === 'Absent',
                'is-upcoming': session.status === 'Upcoming'
              }"
            >
              {{ session.status }}
            </span>
          </li>
        </ul>
      </section>

      <!-- Q&A -->
      <section class="class-extra-card">
        <h2 class="class-extra-title">
          Q&amp;A
        </h2>
        <div v-if="questions.length" class="class-extra-list">
          <article
            v-for="q in questions"
            :key="q.id"
            class="class-qa-item"
          >
            <div class="class-qa-header">
              <span class="class-qa-author">
                {{ q.author }}
              </span>
              <span class="class-qa-time">
                {{ q.time }}
              </span>
            </div>
            <p class="class-qa-question">
              {{ q.text }}
            </p>
            <p
              v-if="q.answer"
              class="class-qa-answer"
            >
              {{ q.answer }}
            </p>
          </article>
        </div>
        <p v-else class="class-extra-empty">
          No questions yet. Be the first to ask.
        </p>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from 'src/components/BackButton.vue';
import NotificationButton from 'src/components/NotificationButton.vue';

const route = useRoute();
const router = useRouter();

const allClasses = [
  {
    id: 1,
    name: 'Math',
    teacher: 'Mr. Ali',
    days: 'Sun, Tue, Thu',
    time: '09:00 – 10:00',
    room: 'A1',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Science',
    teacher: 'Ms. Sara',
    days: 'Mon, Wed',
    time: '11:30 – 12:30',
    room: 'B3',
    status: 'Active',
  },
];

const classInfo = computed(() => {
  const idParam = route.params.id;
  const id = Number(idParam);
  if (!Number.isFinite(id)) {
    return allClasses[0];
  }
  return allClasses.find((cls) => cls.id === id) || allClasses[0];
});

const weeklySessions = computed(() => {
  if (!classInfo.value) {
    return [];
  }

  if (classInfo.value.id === 1) {
    return [
      { id: 1, day: 'Sun', time: '09:00 – 10:00', status: 'Present', topic: 'Algebra basics' },
      { id: 2, day: 'Tue', time: '09:00 – 10:00', status: 'Present', topic: 'Linear equations' },
      { id: 3, day: 'Thu', time: '09:00 – 10:00', status: 'Upcoming', topic: 'Quadratic functions' },
    ];
  }

  if (classInfo.value.id === 2) {
    return [
      { id: 4, day: 'Mon', time: '11:30 – 12:30', status: 'Present', topic: 'Forces & motion' },
      { id: 5, day: 'Wed', time: '11:30 – 12:30', status: 'Absent', topic: 'Newton’s laws' },
    ];
  }

  return [];
});

const semesterSessions = computed(() => {
  if (!classInfo.value) {
    return [];
  }

  if (classInfo.value.id === 1) {
    return [
      { id: 1, day: 'Week 1 · Sun', time: '09:00 – 10:00', status: 'Present', topic: 'Algebra basics' },
      { id: 2, day: 'Week 1 · Tue', time: '09:00 – 10:00', status: 'Present', topic: 'Linear equations' },
      { id: 3, day: 'Week 1 · Thu', time: '09:00 – 10:00', status: 'Absent', topic: 'Homework review' },
      { id: 4, day: 'Week 2 · Sun', time: '09:00 – 10:00', status: 'Present', topic: 'Graphs' },
      { id: 5, day: 'Week 2 · Tue', time: '09:00 – 10:00', status: 'Present', topic: 'Practice session' },
      { id: 6, day: 'Week 2 · Thu', time: '09:00 – 10:00', status: 'Upcoming', topic: 'Mid‑unit review' },
    ];
  }

  if (classInfo.value.id === 2) {
    return [
      { id: 7, day: 'Week 1 · Mon', time: '11:30 – 12:30', status: 'Present', topic: 'Forces & motion' },
      { id: 8, day: 'Week 1 · Wed', time: '11:30 – 12:30', status: 'Absent', topic: 'Newton’s laws' },
      { id: 9, day: 'Week 2 · Mon', time: '11:30 – 12:30', status: 'Present', topic: 'Energy forms' },
      { id: 10, day: 'Week 2 · Wed', time: '11:30 – 12:30', status: 'Upcoming', topic: 'Lab prep' },
    ];
  }

  return weeklySessions.value;
});

const announcements = [
  {
    id: 1,
    title: 'Unit 1 review session',
    body: 'We will add an optional review session before the first quiz. Details will be shared soon.',
    date: 'Today',
  },
  {
    id: 2,
    title: 'Materials updated',
    body: 'New practice worksheets have been uploaded to the class materials.',
    date: 'Yesterday',
  },
];

const questions = [
  {
    id: 1,
    author: 'You',
    time: '2h ago',
    text: 'Do we need to memorize all formulas for the quiz?',
    answer: 'You should know the main algebra formulas; a small formula sheet will be provided.',
  },
  {
    id: 2,
    author: 'Student · Rawan',
    time: 'Yesterday',
    text: 'Will there be group work in this unit?',
    answer: 'Yes, there will be one small group activity next week.',
  },
];

const showAllSessions = ref(false);

const visibleSessions = computed(() =>
  showAllSessions.value ? semesterSessions.value : weeklySessions.value
);

function goToSession (session) {
  if (!session || !session.id || !classInfo.value?.id) {
    return;
  }

  router.push({
    name: 'student-session-details',
    params: {
      id: classInfo.value.id,
      sessionId: session.id,
    },
  });
}
</script>

<style scoped lang="scss">
.student-page {
  min-height: 100vh;
  padding: 0 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.class-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 4vw;
  left: 4vw;
  right: 4vw;
  z-index: 3;
}

.class-hero {
  position: relative;
  width: 100vw;
  margin-left: -4vw;
  margin-top: 0;
  height: 32vw;
  border-radius: 0;
  overflow: hidden;
  background-color: $primary;
}

.class-hero-image {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(145deg, rgba(33, 26, 30, 0.15), rgba(33, 26, 30, 0.55)),
    url('https://images.pexels.com/photos/5212335/pexels-photo-5212335.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.class-hero-content {
  position: absolute;
  left: 4vw;
  right: 4vw;
  bottom: 1.5vw;
  display: flex;
  align-items: center;
  gap: 3vw;
  padding: 3vw 3.4vw;
  border-radius: 4vw;
  background-color: #FFFFFA;
  box-shadow: 0 1.6vw 4vw rgba(0, 0, 0, 0.14);
}

.class-hero-avatar {
  width: 12vw;
  height: 12vw;
  border-radius: 3.2vw;
  background-color: #FFFFFA;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 6vw;
  color: $dark;
}

.class-hero-main {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.class-hero-title {
  margin: 0;
  font-family: $font-title;
  font-size: 6vw;
  letter-spacing: 0.08em;
  color: rgba(133, 133, 133, 1);
}

.class-hero-meta {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(133, 133, 133, 1);
}

.class-details-card {
  position: relative;
  z-index: 2;
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 2.2vw 4vw 4.4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.08);
  margin-top: -8vw;
}

.class-details-header {
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
  margin-bottom: 2.2vw;
}

.class-details-title {
  margin: 0;
  font-family: $font-title;
  font-size: 6vw;
  letter-spacing: 0.08em;
  color: rgba(33, 26, 30, 0.96);
}

.class-details-meta {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.class-details-body {
  display: flex;
  flex-direction: column;
  gap: 2.8vw;
  margin-top: 1.4vw;
}

.class-details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
}

.class-details-label {
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.7);
}

.class-details-value {
  font-family: $font-body;
  font-size: 3.6vw;
}

.class-details-chip {
  padding: 1.4vw 3.4vw;
  border-radius: 4vw;
  background-color: rgba(120, 188, 97, 0.16);
  font-family: $font-body;
  font-size: 3.2vw;
}

.class-sessions {
  margin-top: 5vw;
}

.class-sessions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3vw;
}

.class-sessions-title {
  margin: 0;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.class-sessions-title--compact {
  line-height: 1.15;
  margin-bottom: 4vw;
}

.class-sessions-toggle {
  flex: 0 0 auto;
  min-height: 8vw;
  padding: 1.4vw 3vw;
  border-radius: 999vw;
  border: 0.4vw solid rgba(33, 26, 30, 0.16);
  background-color: #FFFFFA;
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.85);
  cursor: pointer;
}

.class-sessions-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.6vw;
}

.class-session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4vw 2.8vw;
  border-radius: 3vw;
  background-color: rgba(33, 26, 30, 0.02);
}

.class-session-main {
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
}

.class-session-day {
  font-family: $font-body;
  font-size: 3.4vw;
}

.class-session-time {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.7);
}

.class-session-topic {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.85);
}

.class-session-status {
  font-family: $font-body;
  font-size: 3.1vw;
}

.class-session-status.is-present {
  color: #78BC61;
}

.class-session-status.is-absent {
  color: #C94C4C;
}

.class-session-status.is-upcoming {
  color: rgba(33, 26, 30, 0.7);
}

.class-extra-card {
  margin-top: 5vw;
  padding-top: 4vw;
  border-top: 0.3vw solid rgba(33, 26, 30, 0.06);
}

.class-extra-title {
  margin: 0 0 3vw;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.class-extra-list {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.class-extra-empty {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.5);
}

.class-announcement-item {
  padding: 3vw 3.2vw;
  border-radius: 3.2vw;
  background-color: rgba(119, 150, 203, 0.04);
}

.class-announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3vw;
  margin-bottom: 1.4vw;
}

.class-announcement-title {
  font-family: $font-body;
  font-size: 3.6vw;
  font-weight: 600;
}

.class-announcement-date {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.6);
}

.class-announcement-body {
  margin: 0;
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.78);
}

.class-qa-item {
  padding: 3vw 3.2vw;
  border-radius: 3.2vw;
  background-color: rgba(33, 26, 30, 0.02);
}

.class-qa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3vw;
  margin-bottom: 1.2vw;
}

.class-qa-author {
  font-family: $font-body;
  font-size: 3.3vw;
  font-weight: 600;
}

.class-qa-time {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.6);
}

.class-qa-question {
  margin: 0 0 1.4vw;
  font-family: $font-body;
  font-size: 3.3vw;
}

.class-qa-answer {
  margin: 0;
  font-family: $font-body;
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.7);
}
</style>

