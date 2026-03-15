<template>
  <div class="student-page">
    <main class="classes-main">
      <div class="classes-list">
        <button
          v-for="cls in classes"
          :key="cls.id"
          class="class-card"
          type="button"
          @click="goToClassDetails(cls)"
        >
          <div class="class-header">
            <div class="class-avatar">
              {{ cls.name[0] }}
            </div>
            <div class="class-info">
              <div class="class-name">
                {{ cls.name }}
              </div>
              <div class="class-meta">
                {{ cls.teacher }} • {{ cls.days }}
              </div>
            </div>
            <div class="class-status">
              <q-icon
                class="class-status-icon"
                name="check_circle"
                size="xs"
              />
              <span>{{ cls.status }}</span>
            </div>
          </div>
          <div class="class-time-row">
            <div class="class-time-pill">
              <q-icon
                name="schedule"
                size="16px"
              />
              <span>{{ cls.time }}</span>
            </div>
            <div class="class-room-pill">
              <q-icon
                name="meeting_room"
                size="16px"
              />
              <span>Room {{ cls.room }}</span>
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

const classes = ref([
  {
    id: 1,
    name: 'Math',
    teacher: 'Mr. Ali',
    days: 'Sun, Tue, Thu',
    time: '09:00 – 10:00',
    room: 'A1',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Science',
    teacher: 'Ms. Sara',
    days: 'Mon, Wed',
    time: '11:30 – 12:30',
    room: 'B3',
    status: 'Active'
  }
])

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

