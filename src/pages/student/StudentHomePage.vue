<template>
  <div class="home-root">
    <main class="home-content">
      <section class="home-row home-row-wide home-row-teachers">
        <button
          class="home-card home-card-teachers"
          type="button"
        >
          <div class="home-card-top">
            <div class="home-card-body">
              <div class="home-card-label">
                Recommended teachers
              </div>
              <div class="home-card-main-text">
                Find a teacher to follow
              </div>
              <div class="home-card-subtext">
                Subscribe to teachers and see their classes faster.
              </div>
            </div>
            <div class="home-card-teachers-avatars">
              <div class="home-card-teacher-avatar">
                A
              </div>
              <div class="home-card-teacher-avatar home-card-teacher-avatar--offset">
                S
              </div>
              <div class="home-card-teacher-count">
                +8
              </div>
            </div>
          </div>
        </button>
      </section>

      <section class="home-row home-row-top">
        <button
          class="home-card home-card-today"
          type="button"
        >
          <div class="home-card-top">
            <div class="home-card-circle">
              <span class="home-card-circle-index">
                1
              </span>
            </div>
            <span
              class="home-card-handle"
              aria-hidden="true"
            />
          </div>

          <div class="home-card-body">
            <div class="home-card-label">
              Next class
            </div>
            <div class="home-card-main-text">
              Math · Room 301
            </div>
            <div class="home-card-subtext">
              Starts in 20 min
            </div>
          </div>
        </button>

        <button
          class="home-card home-card-assignment"
          type="button"
        >
          <div class="home-card-top">
            <div class="home-card-metric">
              <div class="home-card-metric-value">
                3
              </div>
              <div class="home-card-metric-unit">
                days left
              </div>
            </div>

            <span
              class="home-card-handle"
              aria-hidden="true"
            />
          </div>

          <div class="home-card-body">
            <div class="home-card-label">
              Next assignment
            </div>
            <div class="home-card-main-text">
              Physics lab report
            </div>
            <div class="home-card-subtext">
              Due Tue, 5 pm
            </div>
          </div>
        </button>
      </section>

      <section class="home-row home-row-wide">
        <button
          class="home-card home-card-timeline"
          type="button"
        >
          <div class="home-card-top home-card-top-wide">
            <div>
              <div class="home-card-label">
                This week
              </div>
              <div class="home-card-subtext">
                Attendance & study streak
              </div>
            </div>

            <div class="home-card-chip">
              Attendance
            </div>
          </div>

          <div class="home-timeline-months">
            <span class="home-timeline-month">
              Mon
            </span>
            <span class="home-timeline-month">
              Tue
            </span>
            <span class="home-timeline-month">
              Wed
            </span>
            <span class="home-timeline-month">
              Thu
            </span>
            <span class="home-timeline-month">
              Fri
            </span>
          </div>

          <div class="home-timeline-dots" aria-label="Study streak for this week">
            <span class="home-timeline-dot is-active" />
            <span class="home-timeline-dot is-active" />
            <span class="home-timeline-dot is-active" />
            <span class="home-timeline-dot" />
            <span class="home-timeline-dot" />
          </div>

          <div class="home-card-footer">
            <span class="home-card-footer-highlight">
              3 days in a row
            </span>
            <span class="home-card-footer-muted">
              Keep it going
            </span>
          </div>
        </button>
      </section>

      <section class="home-row home-row-wide home-row-last">
        <button
          class="home-card home-card-stats"
          type="button"
        >
          <div class="home-card-stats-left">
            <div class="home-card-label">
              Study time
            </div>
            <div class="home-card-subtext">
              Last 7 days
            </div>
          </div>

          <div class="home-card-stats-divider" />

          <div class="home-card-stats-right">
            <div class="home-card-metric-value">
              12.5
            </div>
            <div class="home-card-metric-unit">
              hrs
            </div>
          </div>
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.home-root {
  min-height: 100vh;
  background-color: #FFFFFA;
  color: #211A1E;
  padding: 0 4vw 6vw;
  display: flex;
  flex-direction: column;
}

.home-content {
  display: flex;
  flex-direction: column;
  gap: 3.6vw;
}

.home-row {
  display: flex;
  width: 100%;
}

.home-row-top {
  gap: 3vw;
}

.home-row-top .home-card {
  flex: 1;
}

.home-row-wide {
  margin-top: 1vw;
}

.home-row-last {
  margin-top: 1.4vw;
}

.home-row-teachers {
  margin-bottom: 1vw;
}

.home-card {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 4.6vw;
  padding: 4vw 4.2vw;
  border: 0.2vw solid rgba(33, 26, 30, 0.05);
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 3vw;
  cursor: pointer;
  text-align: left;
}

.home-card-today {
  background: linear-gradient(145deg, rgba(119, 150, 203, 0.15), #FFFFFF);
}

.home-card-assignment {
  background: linear-gradient(145deg, rgba(120, 188, 97, 0.16), #FFFFFF);
}

.home-card-teachers {
  width: 100%;
  background: linear-gradient(135deg, rgba(119, 150, 203, 0.16), rgba(120, 188, 97, 0.12));
}

.home-card-timeline {
  width: 100%;
}

.home-card-announcements {
  width: 100%;
}

.home-card-stats {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.home-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-card-top-wide {
  gap: 4vw;
}

.home-card-circle {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  border: 0.8vw solid rgba(119, 150, 203, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-card-circle-index {
  font-family: $font-body;
  font-size: 4vw;
}

.home-card-handle {
  width: 1vw;
  height: 6vw;
  border-radius: 4vw;
  background: linear-gradient(180deg, rgba(33, 26, 30, 0.1), rgba(33, 26, 30, 0.02));
}

.home-card-body {
  display: flex;
  flex-direction: column;
  gap: 1.4vw;
}

.home-card-teachers-avatars {
  display: flex;
  align-items: center;
  gap: 1.4vw;
}

.home-card-teacher-avatar {
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  background-color: #FFFFFF;
  border: 0.2vw solid rgba(33, 26, 30, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 4vw;
  color: #211A1E;
}

.home-card-teacher-avatar--offset {
  margin-left: -3vw;
}

.home-card-teacher-count {
  padding: 1vw 3vw;
  border-radius: 4vw;
  background-color: rgba(255, 255, 250, 0.9);
  font-family: $font-body;
  font-size: 3.2vw;
  color: #211A1E;
}

.home-card-label {
  font-family: $font-body;
  font-size: 3.2vw;
  text-transform: uppercase;
  letter-spacing: 0.3vw;
  color: rgba(33, 26, 30, 0.7);
}

.home-card-main-text {
  font-family: $font-body;
  font-size: 4vw;
  color: #211A1E;
}

.home-card-subtext {
  font-family: $font-body;
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.6);
}

.home-card-metric {
  text-align: right;
}

.home-card-metric-value {
  font-family: $font-body;
  font-size: 6vw;
  color: #211A1E;
}

.home-card-metric-unit {
  font-family: $font-body;
  font-size: 3.2vw;
  color: rgba(33, 26, 30, 0.7);
}

.home-card-chip {
  padding: 1.4vw 3vw;
  border-radius: 4vw;
  background-color: rgba(119, 150, 203, 0.14);
  font-family: $font-body;
  font-size: 3vw;
  color: #211A1E;
}

.home-timeline-months {
  display: flex;
  justify-content: space-between;
  margin-top: 3vw;
  margin-bottom: 2vw;
}

.home-timeline-month {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.7);
}

.home-timeline-dots {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4vw;
}

.home-timeline-dot {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: rgba(33, 26, 30, 0.12);
}

.home-timeline-dot.is-active {
  background-color: #78BC61;
}

.home-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: $font-body;
  font-size: 3.2vw;
}

.home-card-footer-highlight {
  color: #78BC61;
}

.home-card-footer-muted {
  color: rgba(33, 26, 30, 0.7);
}

.home-announcement-count {
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  background-color: rgba(119, 150, 203, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-body;
  font-size: 3.4vw;
}

.home-announcement-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.home-announcement-list {
  display: flex;
  gap: 2vw;
  margin-top: 3vw;
  overflow-x: auto;
}

.home-announcement-pill {
  flex: 0 0 auto;
  padding: 1.8vw 3.2vw;
  border-radius: 4vw;
  background-color: #FFFFFF;
  border: 0.2vw solid rgba(33, 26, 30, 0.08);
  font-family: $font-body;
  font-size: 3.2vw;
  white-space: nowrap;
}

.home-card-stats-left {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.home-card-stats-divider {
  width: 0.3vw;
  height: 10vw;
  border-radius: 1vw;
  background: linear-gradient(180deg, rgba(33, 26, 30, 0.1), rgba(33, 26, 30, 0.02));
}

.home-card-stats-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

@media (min-width: 768px) {
  .home-root {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>

