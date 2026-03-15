<template>
  <div class="student-page">
    <div class="session-top-bar">
      <BackButton />
      <span class="session-page-title">
        Session details
      </span>
      <NotificationButton />
    </div>

    <section class="session-card">
      <header class="session-header">
        <div class="session-header-left">
          <h1 class="session-title">
            {{ className }} · {{ session?.day || 'Session' }}
          </h1>
          <p class="session-subtitle">
            {{ session?.time }}
          </p>
        </div>

        <span
          class="session-status-chip"
          :class="{
            'is-present': session?.status === 'Present',
            'is-absent': session?.status === 'Absent',
            'is-upcoming': session?.status === 'Upcoming'
          }"
        >
          {{ session?.status }}
        </span>
      </header>

      <div class="session-body">
        <div class="session-row">
          <span class="session-label">
            Topic
          </span>
          <span class="session-value">
            {{ session?.topic || 'To be announced' }}
          </span>
        </div>

        <div class="session-row">
          <span class="session-label">
            Room
          </span>
          <span class="session-value">
            {{ session?.room || '—' }}
          </span>
        </div>

        <div class="session-row">
          <span class="session-label">
            Notes
          </span>
          <span class="session-value session-notes">
            {{ session?.notes || 'No notes yet. This can later show teacher comments or your own notes for this session.' }}
          </span>
        </div>
      </div>
    </section>

    <!-- MATERIALS -->
    <section class="info-card">
      <h2 class="section-title">
        Materials
      </h2>
      <div v-if="materials.length" class="list-vertical">
        <button
          v-for="material in materials"
          :key="material.id"
          type="button"
          class="pill-row"
        >
          <div class="pill-main">
            <span class="pill-title">
              {{ material.title }}
            </span>
            <span class="pill-meta">
              {{ material.type }} · {{ material.topic }}
            </span>
          </div>
          <span class="pill-meta pill-meta-right">
            {{ material.duration || material.size }}
          </span>
        </button>
      </div>
      <p v-else class="empty-text">
        Teacher hasn’t added materials yet.
      </p>
    </section>

    <!-- ASSIGNMENTS -->
    <section class="info-card">
      <h2 class="section-title">
        Assignments
      </h2>
      <div v-if="assignments.length" class="list-vertical">
        <button
          v-for="assignment in assignments"
          :key="assignment.id"
          type="button"
          class="pill-row"
        >
          <div class="pill-main">
            <span class="pill-title">
              {{ assignment.title }}
            </span>
            <span class="pill-meta">
              Due {{ assignment.due }} · {{ assignment.points }} pts
            </span>
          </div>
          <span
            class="status-chip"
            :class="`status-${assignment.status}`"
          >
            {{ assignment.statusLabel }}
          </span>
        </button>
      </div>
      <p v-else class="empty-text">
        No assignments for this class yet.
      </p>
    </section>

    <!-- QUIZZES -->
    <section class="info-card">
      <h2 class="section-title">
        Quizzes & Exams
      </h2>
      <div v-if="quizzes.length" class="list-vertical">
        <button
          v-for="quiz in quizzes"
          :key="quiz.id"
          type="button"
          class="pill-row"
        >
          <div class="pill-main">
            <span class="pill-title">
              {{ quiz.title }}
            </span>
            <span class="pill-meta">
              {{ quiz.date }} · {{ quiz.duration }} · {{ quiz.attempts }} attempts
            </span>
          </div>
          <span
            class="status-chip"
            :class="`status-${quiz.status}`"
          >
            {{ quiz.statusLabel }}
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from 'src/components/BackButton.vue';
import NotificationButton from 'src/components/NotificationButton.vue';

const route = useRoute();

const classId = computed(() => Number(route.params.id));
const sessionId = computed(() => Number(route.params.sessionId));

const classes = [
  { id: 1, name: 'Math', room: 'A1' },
  { id: 2, name: 'Science', room: 'B3' },
];

const allSessions = [
  // Math weekly
  { id: 1, classId: 1, day: 'Sun', time: '09:00 – 10:00', status: 'Present', topic: 'Algebra basics', room: 'A1' },
  { id: 2, classId: 1, day: 'Tue', time: '09:00 – 10:00', status: 'Present', topic: 'Linear equations', room: 'A1' },
  { id: 3, classId: 1, day: 'Thu', time: '09:00 – 10:00', status: 'Upcoming', topic: 'Quadratic functions', room: 'A1' },
  // Math semester extras
  { id: 4, classId: 1, day: 'Week 1 · Thu', time: '09:00 – 10:00', status: 'Absent', topic: 'Homework review', room: 'A1' },
  { id: 5, classId: 1, day: 'Week 2 · Sun', time: '09:00 – 10:00', status: 'Present', topic: 'Graphs', room: 'A1' },
  { id: 6, classId: 1, day: 'Week 2 · Thu', time: '09:00 – 10:00', status: 'Upcoming', topic: 'Mid‑unit review', room: 'A1' },

  // Science weekly/semester
  { id: 7, classId: 2, day: 'Mon', time: '11:30 – 12:30', status: 'Present', topic: 'Forces & motion', room: 'B3' },
  { id: 8, classId: 2, day: 'Wed', time: '11:30 – 12:30', status: 'Absent', topic: 'Newton’s laws', room: 'B3' },
  { id: 9, classId: 2, day: 'Week 2 · Mon', time: '11:30 – 12:30', status: 'Present', topic: 'Energy forms', room: 'B3' },
  { id: 10, classId: 2, day: 'Week 2 · Wed', time: '11:30 – 12:30', status: 'Upcoming', topic: 'Lab prep', room: 'B3' },
];

const materials = [
  {
    id: 1,
    title: 'Algebra basics – slides',
    type: 'Slides',
    topic: 'Week 1',
    size: '4 MB',
  },
  {
    id: 2,
    title: 'Practice worksheet',
    type: 'PDF',
    topic: 'Homework',
    size: '2 MB',
  },
  {
    id: 3,
    title: 'Intro video',
    type: 'Video',
    topic: 'Concept intro',
    duration: '8 min',
  },
];

const assignments = [
  {
    id: 1,
    title: 'Homework 1: Linear equations',
    due: 'Thu · 10 Mar',
    points: 10,
    status: 'inprogress',
    statusLabel: 'In progress',
  },
  {
    id: 2,
    title: 'Homework 2: Graphs',
    due: 'Sun · 15 Mar',
    points: 15,
    status: 'notstarted',
    statusLabel: 'Not started',
  },
  {
    id: 3,
    title: 'Project: Real‑life algebra',
    due: 'End of month',
    points: 30,
    status: 'submitted',
    statusLabel: 'Submitted',
  },
];

const quizzes = [
  {
    id: 1,
    title: 'Quiz 1: Algebra basics',
    date: 'Thu · 17 Mar',
    duration: '20 min',
    attempts: 1,
    status: 'upcoming',
    statusLabel: 'Upcoming',
  },
  {
    id: 2,
    title: 'Quiz 0: Intro check‑in',
    date: 'Last week',
    duration: '10 min',
    attempts: 1,
    status: 'completed',
    statusLabel: 'Completed',
  },
];

const session = computed(() => {
  const id = sessionId.value;
  const clsId = classId.value;
  if (!Number.isFinite(id) || !Number.isFinite(clsId)) {
    return null;
  }
  return allSessions.find((s) => s.id === id && s.classId === clsId) || null;
});

const className = computed(() => {
  const clsId = classId.value;
  const cls = classes.find((c) => c.id === clsId);
  return cls ? cls.name : 'Class';
});
</script>

<style scoped lang="scss">
.student-page {
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.session-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4vw;
}

.session-page-title {
  font-family: $font-title;
  font-size: 4.8vw;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.session-card {
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.4vw 4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.08);
}

.session-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
  margin-bottom: 3.4vw;
}

.session-header-left {
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
}

.session-title {
  margin: 0;
  font-family: $font-title;
  font-size: 5.4vw;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.session-subtitle {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.session-status-chip {
  padding: 1.4vw 3.4vw;
  border-radius: 4vw;
  font-family: $font-body;
  font-size: 3.1vw;
  background-color: rgba(33, 26, 30, 0.06);
}

.session-status-chip.is-present {
  background-color: rgba(120, 188, 97, 0.16);
}

.session-status-chip.is-absent {
  background-color: rgba(201, 76, 76, 0.16);
}

.session-status-chip.is-upcoming {
  background-color: rgba(119, 150, 203, 0.16);
}

.session-body {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.session-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4vw;
}

.session-label {
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.7);
}

.session-value {
  font-family: $font-body;
  font-size: 3.4vw;
  text-align: right;
}

.session-notes {
  max-width: 60vw;
  color: rgba(33, 26, 30, 0.75);
}

.info-card {
  margin-top: 4.8vw;
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.4vw 4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.06);
}

.section-title {
  margin: 0 0 3.4vw;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.04em;
  color: rgba(33, 26, 30, 0.96);
}

.list-vertical {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.empty-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.5);
}

.pill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  width: 100%;
  padding: 3.2vw 3vw;
  border-radius: 3.4vw;
  border: none;
  background-color: rgba(119, 150, 203, 0.04);
  text-align: left;
}

.pill-main {
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.pill-title {
  font-family: $font-body;
  font-size: 3.6vw;
  font-weight: 600;
}

.pill-meta {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.64);
}

.pill-meta-right {
  white-space: nowrap;
}

.status-chip {
  padding: 1.2vw 3vw;
  border-radius: 999px;
  font-family: $font-body;
  font-size: 3vw;
}

.status-inprogress {
  background-color: rgba(119, 150, 203, 0.18);
}

.status-notstarted {
  background-color: rgba(33, 26, 30, 0.06);
}

.status-submitted {
  background-color: rgba(120, 188, 97, 0.18);
}

.status-upcoming {
  background-color: rgba(119, 150, 203, 0.18);
}

.status-completed {
  background-color: rgba(120, 188, 97, 0.24);
}
</style>

