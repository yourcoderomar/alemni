<template>
  <div class="teacher-page">
    <div class="teacher-hero-banner">
      <header class="teacher-top-bar">
        <BackButton />
        <NotificationButton />
      </header>
      <div class="teacher-hero-image" />
    </div>

    <section v-if="isLoading" class="info-card info-card--first state-card" role="status" aria-live="polite">
      <q-spinner size="28px" color="primary" />
      <p class="state-text">Loading teacher…</p>
    </section>

    <section v-else-if="errorMessage" class="info-card info-card--first state-card" role="alert">
      <q-icon name="error_outline" size="26px" />
      <p class="state-text">{{ errorMessage }}</p>
      <button class="primary-button" type="button" @click="loadTeacher">
        Retry
      </button>
    </section>

    <section v-else-if="!teacher" class="info-card info-card--first state-card">
      <q-icon name="person_off" size="26px" />
      <p class="state-text">Teacher not found.</p>
    </section>

    <section v-else class="info-card info-card--first">
      <div class="teacher-header">
        <div class="teacher-header-main">
          <div class="teacher-hero-avatar">
            {{ teacherInitials }}
          </div>
          <div class="teacher-hero-main">
            <h1 class="teacher-name">
              {{ teacher.name }}
            </h1>
            <p class="teacher-meta">
              {{ teacher.subject || 'Teacher' }}<span v-if="teacher.school"> • {{ teacher.school }}</span>
            </p>
            <p class="teacher-meta">
              {{ teacher.level || 'All levels' }}
            </p>
          </div>
        </div>

        <div class="teacher-hero-stats">
          <div class="stat-pill">
            <span class="stat-label">
              Students
            </span>
            <span class="stat-value">
              {{ teacher.studentsCount }}
            </span>
          </div>
          <div class="stat-pill">
            <span class="stat-label">
              Classes
            </span>
            <span class="stat-value">
              {{ classes.length }}
            </span>
          </div>
        </div>
      </div>

      <h2 class="section-title">
        About
      </h2>
      <p class="about-text">
        {{ teacher.about || 'No bio yet.' }}
      </p>
    </section>

    <section class="info-card">
      <h2 class="section-title">
        Classes with {{ teacher?.name || 'this teacher' }}
      </h2>

      <div
        v-if="classes.length"
        class="classes-list"
      >
        <button
          v-for="cls in classes"
          :key="cls.id"
          type="button"
          class="class-row"
        >
          <div class="class-row-main">
            <span class="class-row-title">
              {{ cls.title }}
            </span>
            <span class="class-row-meta">
              {{ cls.subject || 'Class' }}
            </span>
          </div>
          <span class="class-row-chip">
            {{ cls.level || 'All levels' }}
          </span>
        </button>
      </div>

      <p
        v-else
        class="empty-text"
      >
        No classes are linked to this teacher yet.
      </p>
    </section>

    <section class="info-card">
      <h2 class="section-title">
        What students say
      </h2>

      <div class="rating-row">
        <div class="rating-main">
          <span class="rating-value">
            {{ (teacher?.rating ?? 0).toFixed(1) }}
          </span>
          <span class="rating-stars">
            ★★★★★
          </span>
        </div>
        <p class="rating-meta">
          Based on {{ teacher?.reviewsCount ?? 0 }} student reviews
        </p>
      </div>

      <ul class="praise-list">
        <li class="praise-item">
          Explains hard topics in simple steps.
        </li>
        <li class="praise-item">
          Gives lots of practice before exams.
        </li>
        <li class="praise-item">
          Calm, patient, and encouraging in class.
        </li>
      </ul>
    </section>

    <section class="info-card">
      <h2 class="section-title">
        Contact {{ teacher?.name || 'teacher' }}
      </h2>
      <p class="about-text">
        You can reach {{ teacher?.name || 'this teacher' }} through {{ teacher?.contactMethod || 'in-app messages' }}.
      </p>
      <p class="about-text contact-meta">
        {{ teacher?.responseTime || '' }}
      </p>

      <button
        type="button"
        class="primary-button"
        aria-label="Message teacher"
        :disabled="!teacher"
      >
        Message {{ teacher?.name || 'teacher' }}
      </button>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from 'src/components/BackButton.vue'
import NotificationButton from 'src/components/NotificationButton.vue'
import { fetchTeacherBySlugOrProfileId } from 'src/services/teachers'
import { fetchClassesForTeacher } from 'src/services/classes'

const route = useRoute()

const teacher = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const classes = ref([])

const teacherSlug = computed(() => String(route.params.slug || '').trim())

async function loadTeacher () {
  if (!teacherSlug.value) {
    teacher.value = null
    isLoading.value = false
    errorMessage.value = 'Missing teacher id.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    teacher.value = await fetchTeacherBySlugOrProfileId(teacherSlug.value)
    classes.value = teacher.value?.profileId
      ? await fetchClassesForTeacher(teacher.value.profileId)
      : []
  } catch (err) {
    errorMessage.value = err?.message || 'Could not load teacher.'
    teacher.value = null
    classes.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTeacher()
})

watch(teacherSlug, () => {
  loadTeacher()
})

const teacherInitials = computed(() => {
  if (!teacher.value?.name) {
    return ''
  }

  const parts = teacher.value.name.split(' ')
  if (!parts.length) {
    return ''
  }

  if (parts.length === 1) {
    return parts[0][0]
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})
</script>

<style scoped lang="scss">
.teacher-page {
  position: relative;
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.teacher-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 4vw;
  left: 4vw;
  right: 4vw;
  z-index: 3;
}

.teacher-hero-banner {
  position: relative;
  width: 100vw;
  margin-left: -4vw;
  margin-top: -5vw;
  height: 28vw;
  border-radius: 0;
  overflow: hidden;
  background-color: $primary;
  z-index: 10;
}

.teacher-hero-image {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(145deg, rgba(33, 26, 30, 0.15), rgba(33, 26, 30, 0.55)),
    url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.teacher-header {
  display: flex;
  align-items: center;
  gap: 3vw;
  margin-bottom: 4vw;
}

.teacher-header-main {
  display: flex;
  align-items: center;
  gap: 3vw;
  flex: 1;
}

.teacher-hero-avatar {
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

.teacher-hero-main {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.teacher-name {
  margin: 0;
  font-family: $font-title;
  font-size: 5.4vw;
  line-height: 1.1;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.teacher-meta {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.teacher-hero-stats {
  display: flex;
  gap: 2.6vw;
  margin-left: auto;
}

.stat-pill {
  flex: 1;
  padding: 2.4vw 2.8vw;
  border-radius: 3.4vw;
  background-color: rgba(33, 26, 30, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
}

.stat-label {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.65);
}

.stat-value {
  font-family: $font-body;
  font-size: 3.8vw;
}

.info-card {
  margin-top: 4.8vw;
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.4vw 4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.06);
}

.state-card {
  min-height: 28vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  text-align: center;
}

.state-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.6vw;
  color: rgba(33, 26, 30, 0.75);
}

.info-card--first {
  margin-top: -6vw;
  position: relative;
  z-index: 11;
}

.section-title {
  margin: 0 0 3.4vw;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.04em;
  color: rgba(33, 26, 30, 0.96);
}

.about-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.78);
}

.contact-meta {
  margin-top: 1.6vw;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.64);
}

.classes-list {
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.class-row {
  width: 100%;
  padding: 3.2vw 3vw;
  border-radius: 3.4vw;
  border: none;
  background-color: rgba(119, 150, 203, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  text-align: left;
}

.class-row-main {
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.class-row-title {
  font-family: $font-body;
  font-size: 3.6vw;
  font-weight: 600;
}

.class-row-meta {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.64);
}

.class-row-chip {
  padding: 1.4vw 3.4vw;
  border-radius: 999px;
  background-color: rgba(33, 26, 30, 0.04);
  font-family: $font-body;
  font-size: 3.1vw;
  white-space: nowrap;
}

.empty-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.5);
}

.primary-button {
  margin-top: 4vw;
  width: 100%;
  min-height: 12vw;
  border: none;
  border-radius: 4vw;
  background-color: $primary;
  color: #FFFFFA;
  font-family: $font-body;
  font-size: 3.8vw;
}

.rating-row {
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
  margin-bottom: 3.2vw;
}

.rating-main {
  display: flex;
  align-items: baseline;
  gap: 2vw;
}

.rating-value {
  font-family: $font-title;
  font-size: 5.2vw;
}

.rating-stars {
  font-size: 3.8vw;
  letter-spacing: 0.3vw;
  color: rgba(33, 26, 30, 0.9);
}

.rating-meta {
  margin: 0;
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.64);
}

.praise-list {
  margin: 0;
  padding-left: 4vw;
  display: flex;
  flex-direction: column;
  gap: 1.6vw;
}

.praise-item {
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.78);
}
</style>

