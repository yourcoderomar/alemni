<template>
  <div class="student-page">
    <main class="teachers-main">
      <div v-if="isLoading" class="state-shell" role="status" aria-live="polite">
        <q-spinner size="28px" color="primary" />
        <p class="state-text">Loading teachers…</p>
      </div>

      <div v-else-if="errorMessage" class="state-shell" role="alert">
        <q-icon name="error_outline" size="26px" />
        <p class="state-text">{{ errorMessage }}</p>
        <button class="retry-btn" type="button" @click="loadTeachers">
          Retry
        </button>
      </div>

      <div v-else-if="!teachers.length" class="state-shell">
        <q-icon name="school" size="26px" />
        <p class="state-text">No teachers yet.</p>
      </div>

      <div v-else class="teachers-list">
        <button
          v-for="teacher in teachers"
          :key="teacher.profileId"
          class="teacher-card"
          type="button"
          @click="goToTeacher(teacher)"
        >
          <div class="teacher-header">
            <div class="teacher-avatar">
              {{ teacher.name?.[0] ?? '?' }}
            </div>

            <div class="teacher-info">
              <div class="teacher-name">
                {{ teacher.name }}
              </div>
              <div class="teacher-meta">
                {{ teacher.subject || 'Teacher' }}<span v-if="teacher.school"> • {{ teacher.school }}</span>
              </div>
            </div>

          </div>

          <div class="teacher-footer">
            <div class="teacher-pill">
              <q-icon
                name="groups"
                size="16px"
              />
              <span>{{ teacher.studentsCount }} students</span>
            </div>

            <div class="teacher-pill">
              <q-icon
                name="school"
                size="16px"
              />
              <span>{{ teacher.level || 'All levels' }}</span>
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
import { fetchTeachers } from 'src/services/teachers'

const router = useRouter()

const teachers = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadTeachers () {
  isLoading.value = true
  errorMessage.value = ''
  try {
    teachers.value = await fetchTeachers()
  } catch (err) {
    errorMessage.value = err?.message || 'Could not load teachers.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadTeachers()
})

function goToTeacher (teacher) {
  const slug = teacher?.slug || teacher?.profileId
  if (!slug) {
    return
  }

  router.push({
    name: 'student-teacher-details',
    params: {
      slug
    }
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

.teachers-main {
  flex: 1;
}

.teachers-list {
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

.teacher-card {
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

.teacher-header {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.teacher-avatar {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(119, 150, 203, 0.15), #FFFFFF);
  color: #211A1E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 5vw;
}

.teacher-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.teacher-name {
  font-size: 4vw;
  font-weight: 500;
}

.teacher-meta {
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.7);
}

.teacher-subscribe {
  padding: 1.6vw 3.4vw;
  border-radius: 4vw;
  border: 0.2vw solid rgba(119, 150, 203, 0.4);
  background-color: rgba(119, 150, 203, 0.08);
  font-size: 3.1vw;
  font-family: $font-body;
  color: #211A1E;
}

.teacher-subscribe--active {
  border-color: rgba(120, 188, 97, 0.6);
  background-color: rgba(120, 188, 97, 0.16);
}

.teacher-footer {
  display: flex;
  gap: 2vw;
}

.teacher-pill {
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

