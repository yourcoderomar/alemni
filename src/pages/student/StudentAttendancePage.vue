<template>
  <div class="student-page">
    <section class="student-section-card">
      <header class="student-section-header">
        <h1 class="student-section-title">
          Attendance
        </h1>
        <p class="student-section-subtitle">
          See your attendance for each class this week.
        </p>
      </header>

      <ul class="attendance-classes">
        <li class="attendance-class-card">
          <div class="attendance-class-main">
            <div class="attendance-class-header">
              <div class="attendance-class-avatar">
                M
              </div>
              <div class="attendance-class-info">
                <div class="attendance-class-name">
                  Math
                </div>
                <div class="attendance-class-meta">
                  4 / 5 classes present
                </div>
              </div>
              <span class="attendance-class-chip is-good">
                80%
              </span>
            </div>
            <div class="attendance-class-week">
              <span class="attendance-dot is-present" aria-label="Mon present" />
              <span class="attendance-dot is-present" aria-label="Tue present" />
              <span class="attendance-dot is-absent" aria-label="Wed absent" />
              <span class="attendance-dot is-present" aria-label="Thu present" />
              <span class="attendance-dot is-present" aria-label="Fri present" />
            </div>
          </div>
        </li>

        <li class="attendance-class-card">
          <div class="attendance-class-main">
            <div class="attendance-class-header">
              <div class="attendance-class-avatar">
                S
              </div>
              <div class="attendance-class-info">
                <div class="attendance-class-name">
                  Science
                </div>
                <div class="attendance-class-meta">
                  5 / 5 classes present
                </div>
              </div>
              <span class="attendance-class-chip is-excellent">
                100%
              </span>
            </div>
            <div class="attendance-class-week">
              <span class="attendance-dot is-present" aria-label="Mon present" />
              <span class="attendance-dot is-present" aria-label="Tue present" />
              <span class="attendance-dot is-present" aria-label="Wed present" />
              <span class="attendance-dot is-present" aria-label="Thu present" />
              <span class="attendance-dot is-present" aria-label="Fri present" />
            </div>
          </div>
        </li>

        <li class="attendance-class-card">
          <div class="attendance-class-main">
            <div class="attendance-class-header">
              <div class="attendance-class-avatar">
                H
              </div>
              <div class="attendance-class-info">
                <div class="attendance-class-name">
                  History
                </div>
                <div class="attendance-class-meta">
                  3 / 5 classes present
                </div>
              </div>
              <span class="attendance-class-chip is-warning">
                60%
              </span>
            </div>
            <div class="attendance-class-week">
              <span class="attendance-dot is-present" aria-label="Mon present" />
              <span class="attendance-dot is-absent" aria-label="Tue absent" />
              <span class="attendance-dot is-present" aria-label="Wed present" />
              <span class="attendance-dot is-absent" aria-label="Thu absent" />
              <span class="attendance-dot is-present" aria-label="Fri present" />
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.student-page {
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.student-section-card {
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.2vw 4vw;
  box-shadow: 0 1.4vw 4vw rgba(0, 0, 0, 0.06);
}

.student-section-header {
  margin-bottom: 4vw;
}

.student-section-title {
  margin: 0 0 1.2vw;
  font-family: $font-title;
  font-size: 6vw;
  letter-spacing: 0.08em;
  color: rgba(33, 26, 30, 0.96);
}

.student-section-subtitle {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.attendance-classes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.attendance-class-card {
  border-radius: 3.6vw;
  padding: 3.4vw 3.6vw;
  background-color: rgba(33, 26, 30, 0.02);
}

.attendance-class-main {
  display: flex;
  flex-direction: column;
  gap: 2.2vw;
}

.attendance-class-header {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.attendance-class-avatar {
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(119, 150, 203, 0.16), #FFFFFF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 4.2vw;
}

.attendance-class-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.attendance-class-name {
  font-family: $font-body;
  font-size: 3.8vw;
}

.attendance-class-meta {
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.7);
}

.attendance-class-chip {
  padding: 1.4vw 3vw;
  border-radius: 4vw;
  font-family: $font-body;
  font-size: 3vw;
}

.attendance-class-chip.is-excellent {
  background-color: rgba(120, 188, 97, 0.18);
  color: #211A1E;
}

.attendance-class-chip.is-good {
  background-color: rgba(119, 150, 203, 0.16);
  color: #211A1E;
}

.attendance-class-chip.is-warning {
  background-color: rgba(201, 76, 76, 0.16);
  color: #211A1E;
}

.attendance-class-week {
  display: flex;
  justify-content: space-between;
  gap: 2.4vw;
  margin-top: 0.8vw;
}

.attendance-dot {
  width: 2.4vw;
  height: 2.4vw;
  border-radius: 50%;
  background-color: rgba(33, 26, 30, 0.12);
}

.attendance-dot.is-present {
  background-color: #78BC61;
}

.attendance-dot.is-absent {
  background-color: #C94C4C;
}
</style>

