<template>
  <div class="student-page">
    <main class="assignments-main">
      <div class="assignments-list">
        <div
          v-for="assignment in assignments"
          :key="assignment.id"
          class="assignment-card"
        >
          <div class="assignment-header">
            <div class="assignment-title-row">
              <div class="assignment-subject">
                {{ assignment.subject }}
              </div>
              <span class="assignment-status">
                {{ assignment.status }}
              </span>
            </div>
            <div class="assignment-title">
              {{ assignment.title }}
            </div>
          </div>

          <div class="assignment-meta-row">
            <div class="assignment-pill">
              <q-icon
                name="event"
                size="16px"
              />
              <span>{{ assignment.due }}</span>
            </div>
            <div class="assignment-pill">
              <q-icon
                name="schedule"
                size="16px"
              />
              <span>{{ assignment.timeLeft }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const assignments = ref([
  {
    id: 1,
    subject: 'Math',
    title: 'Algebra worksheet',
    due: 'Due today, 8:00 pm',
    timeLeft: '3 hours left',
    status: 'Due soon'
  },
  {
    id: 2,
    subject: 'Science',
    title: 'Lab report: Forces',
    due: 'Due tomorrow',
    timeLeft: '1 day left',
    status: 'Upcoming'
  }
])
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

.assignments-main {
  flex: 1;
}

.assignments-list {
  display: flex;
  flex-direction: column;
  gap: 3.6vw;
}

.assignment-card {
  border-radius: 4.6vw;
  padding: 4vw 4.2vw;
  border: 0.2vw solid rgba(33, 26, 30, 0.05);
  background-color: #FFFFFF;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.assignment-header {
  display: flex;
  flex-direction: column;
  gap: 1.4vw;
}

.assignment-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assignment-subject {
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.8);
}

.assignment-status {
  padding: 1vw 3vw;
  border-radius: 4vw;
  background-color: rgba(119, 150, 203, 0.16);
  font-size: 3vw;
}

.assignment-title {
  font-family: $font-body;
  font-size: 4vw;
  font-weight: 500;
}

.assignment-meta-row {
  display: flex;
  gap: 2vw;
}

.assignment-pill {
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

