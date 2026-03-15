<template>
  <div class="student-page">
    <main class="teachers-main">
      <div class="teachers-list">
        <button
          v-for="teacher in teachers"
          :key="teacher.id"
          class="teacher-card"
          type="button"
          @click="goToTeacher(teacher)"
        >
          <div class="teacher-header">
            <div class="teacher-avatar">
              {{ teacher.name[0] }}
            </div>

            <div class="teacher-info">
              <div class="teacher-name">
                {{ teacher.name }}
              </div>
              <div class="teacher-meta">
                {{ teacher.subject }} • {{ teacher.school }}
              </div>
            </div>

            <div
              class="teacher-subscribe"
              :class="{ 'teacher-subscribe--active': teacher.subscribed }"
            >
              <span class="teacher-subscribe-label">
                {{ teacher.subscribed ? 'Subscribed' : 'Subscribe' }}
              </span>
            </div>
          </div>

          <div class="teacher-footer">
            <div class="teacher-pill">
              <q-icon
                name="groups"
                size="16px"
              />
              <span>{{ teacher.students }} students</span>
            </div>

            <div class="teacher-pill">
              <q-icon
                name="school"
                size="16px"
              />
              <span>{{ teacher.level }}</span>
            </div>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const teachers = ref([
  {
    id: 1,
    name: 'Mr. Ali',
    subject: 'Math',
    school: 'Alemni School',
    students: '120+',
    level: 'Grade 9–10',
    subscribed: true
  },
  {
    id: 2,
    name: 'Ms. Sara',
    subject: 'Science',
    school: 'Alemni School',
    students: '95+',
    level: 'Grade 8–9',
    subscribed: false
  }
])

function goToTeacher (teacher) {
  if (!teacher?.id) {
    return
  }

  router.push({
    name: 'student-teacher-details',
    params: {
      id: teacher.id
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

