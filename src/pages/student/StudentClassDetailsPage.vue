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
          {{ classInfo?.title || 'Class' }}
        </h1>
        <p class="class-details-meta">
          {{ classInfo?.subject || 'Class' }}<span v-if="classInfo?.level"> • {{ classInfo.level }}</span>
        </p>
      </header>

      <div class="class-details-body">
        <div class="class-details-row">
          <span class="class-details-label">
            Time
          </span>
          <span class="class-details-value">
            {{ classTime }}
          </span>
        </div>

        <div class="class-details-row">
          <span class="class-details-label">
            Room
          </span>
          <span class="class-details-value">
            {{ classLocation }}
          </span>
        </div>

        <div class="class-details-row">
          <span class="class-details-label">
            Status
          </span>
          <span class="class-details-chip">
            Active
          </span>
        </div>
      </div>

      <!-- Announcements (still mock for now) -->
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
                {{ new Date(item.createdAt).toLocaleDateString() }}
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
            {{ showAllSessions ? 'All sessions' : 'Upcoming sessions' }}
          </h2>

          <button
            type="button"
            class="class-sessions-toggle"
            @click="showAllSessions = !showAllSessions"
          >
            {{ showAllSessions ? 'Show upcoming' : 'Show all' }}
          </button>
        </div>

        <ul v-if="visibleSessions.length" class="class-sessions-list">
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
                'is-upcoming': session.status === 'Upcoming'
              }"
            >
              {{ session.status }}
            </span>
          </li>
        </ul>
        <p v-else class="class-extra-empty">
          No sessions scheduled yet.
        </p>
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
                {{ q.authorName }}
              </span>
              <span class="class-qa-time">
                {{ new Date(q.createdAt).toLocaleDateString() }}
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
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from 'src/components/BackButton.vue';
import NotificationButton from 'src/components/NotificationButton.vue';
import {
  fetchClassById,
  fetchSessionsForClass,
  fetchAnnouncementsForClass,
  fetchQuestionsForClass
} from 'src/services/classes';

const route = useRoute();
const router = useRouter();

const classInfo = ref(null);
const sessions = ref([]);
const announcements = ref([]);
const questions = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');

const showAllSessions = ref(false);

const classTime = computed(() => {
  if (!sessions.value.length) return '—';
  const s = sessions.value[0];
  if (!s.startsAt || !s.endsAt) return '—';
  const start = new Date(s.startsAt);
  const end = new Date(s.endsAt);
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
});

const classLocation = computed(() => {
  if (!sessions.value.length) return '—';
  return sessions.value[0].location || '—';
});

const mappedSessions = computed(() => {
  const now = new Date();
  return sessions.value.map((s) => {
    const date = s.startsAt ? new Date(s.startsAt) : null;
    const isUpcoming = date ? date >= now : true;
    return {
      id: s.id,
      rawDate: date,
      day: date
        ? date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })
        : '',
      time: date
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '',
      status: isUpcoming ? 'Upcoming' : 'Upcoming',
      topic: s.title,
    };
  });
});

const visibleSessions = computed(() => {
  if (showAllSessions.value) return mappedSessions.value;
  const now = new Date();
  return mappedSessions.value.filter((s) => !s.rawDate || s.rawDate >= now);
});

async function loadClassAndSessions () {
  const idParam = route.params.id;
  if (!idParam) {
    errorMessage.value = 'Missing class id.';
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  try {
    const [cls, sess, anns, qs] = await Promise.all([
      fetchClassById(idParam),
      fetchSessionsForClass(idParam),
      fetchAnnouncementsForClass(idParam),
      fetchQuestionsForClass(idParam),
    ]);
    classInfo.value = cls;
    sessions.value = sess;
    announcements.value = anns;
    questions.value = qs;
  } catch (err) {
    errorMessage.value = err?.message || 'Could not load class details.';
    classInfo.value = null;
    sessions.value = [];
    announcements.value = [];
    questions.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadClassAndSessions();
});

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

