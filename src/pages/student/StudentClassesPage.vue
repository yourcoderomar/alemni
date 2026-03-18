<template>
  <div class="student-page">
    <main class="classes-main">
      <div v-if="isLoading" class="state-shell" role="status" aria-live="polite">
        <q-spinner size="28px" color="primary" />
        <p class="state-text">Loading your classes…</p>
      </div>

      <div v-else-if="errorMessage" class="state-shell" role="alert">
        <q-icon name="error_outline" size="26px" />
        <p class="state-text">{{ errorMessage }}</p>
        <button class="retry-btn" type="button" @click="loadClasses">
          Retry
        </button>
      </div>

      <div v-else-if="!classes.length" class="state-shell">
        <q-icon name="school" size="26px" />
        <p class="state-text">You’re not enrolled in any classes yet.</p>
      </div>

      <div v-else class="classes-list">
        <button
          v-for="cls in classes"
          :key="cls.id"
          class="class-card"
          type="button"
          @click="goToClassDetails(cls)"
        >
          <div class="class-header">
            <div class="class-avatar">
              {{ cls.title?.[0] ?? 'C' }}
            </div>
            <div class="class-info">
              <div class="class-name">
                {{ cls.title }}
              </div>
              <div class="class-meta">
                {{ cls.subject || 'Class' }}<span v-if="cls.level"> • {{ cls.level }}</span>
              </div>
            </div>
            <div class="class-status">
              <q-icon
                class="class-status-icon"
                name="check_circle"
                size="xs"
              />
              <span>Enrolled</span>
            </div>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchEnrolledClassesForCurrentUser } from 'src/services/classes'

const router = useRouter()

const classes = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadClasses () {
  isLoading.value = true
  errorMessage.value = ''
  try {
    classes.value = await fetchEnrolledClassesForCurrentUser()
  } catch (err) {
    errorMessage.value = err?.message || 'Could not load your classes.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadClasses()
})

function goToClassDetails (cls) {
  if (!cls || !cls.id) {
    return
  }

  router.push({
    name: 'student-class-details',
    params: { id: cls.id }
  })
}
</script>

<style scoped lang="scss">
.student-page {
  min-height: 100vh;
  padding: 4vw 4vw 20vw;
  background-color: #FFFFFA;
  color: #211A1E;
  display: flex;
  flex-direction: column;
}

.student-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5vw;
}

.student-header-left {
  display: flex;
  flex-direction: column;
  gap: 1.2vw;
}

.section-title {
  font-family: $font-title;
  font-size: 5.6vw;
}

.section-subtitle {
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.classes-main {
  flex: 1;
}

.classes-list {
  display: flex;
  flex-direction: column;
  gap: 3.6vw;
}

.state-shell {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  padding: 8vw 4vw;
  text-align: center;
  color: rgba(33, 26, 30, 0.75);
}

.state-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.6vw;
}

.retry-btn {
  border: none;
  border-radius: 999vw;
  padding: 2.8vw 5vw;
  min-height: 12vw;
  background-color: $dark;
  color: $app-bg;
  font-family: $font-body;
  font-size: 3.6vw;
}

.class-card {
  position: relative;
  width: 100%;
  border-radius: 4.6vw;
  padding: 4vw 4.2vw;
  border: 0.2vw solid rgba(33, 26, 30, 0.05);
  background-color: #FFFFFF;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.06);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 3vw;
  cursor: pointer;
}

.class-header {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.class-avatar {
  width: 10vw;
  height: 10vw;
  border-radius: 3vw;
  background: linear-gradient(145deg, rgba(119, 150, 203, 0.15), #FFFFFF);
  color: #211A1E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 5vw;
}

.class-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.class-name {
  font-size: 4vw;
  font-weight: 500;
}

.class-meta {
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.7);
}

.class-status {
  display: inline-flex;
  align-items: center;
  gap: 1.4vw;
  font-size: 3.1vw;
  padding: 1vw 3vw;
  border-radius: 4vw;
  background-color: rgba(120, 188, 97, 0.16);
  color: #211A1E;
}

.class-status-icon {
  color: #78BC61;
}

.class-time-row {
  margin-top: 3vw;
  display: flex;
  justify-content: space-between;
  gap: 2vw;
}

.class-time-pill,
.class-room-pill {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.4vw;
  padding: 1.8vw 2.4vw;
  border-radius: 4vw;
  background-color: rgba(33, 26, 30, 0.03);
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.85);
}
</style>

