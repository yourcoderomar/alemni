<template>
  <div class="student-page">
    <section class="student-section-card">
      <header class="student-section-header">
        <h1 class="student-section-title">
          Quizzes
        </h1>
        <p class="student-section-subtitle">
          See upcoming and past quizzes so you can prepare ahead.
        </p>
      </header>

      <ul class="student-list">
        <li class="student-list-item">
          <div class="student-list-main">
            <span class="student-list-title">
              Algebra – Mid‑unit quiz
            </span>
            <span class="student-list-meta">
              Due tomorrow · 10 questions · 15 min
            </span>
          </div>
          <button
            type="button"
            class="student-list-action"
          >
            Review
          </button>
        </li>

        <li class="student-list-item">
          <div class="student-list-main">
            <span class="student-list-title">
              Science – Energy forms
            </span>
            <span class="student-list-meta">
              Due Fri · 8 questions · 10 min
            </span>
          </div>
          <button
            type="button"
            class="student-list-action"
          >
            Review
          </button>
        </li>

        <li class="student-list-item">
          <div class="student-list-main">
            <span class="student-list-title">
              History – Map skills check
            </span>
            <span class="student-list-meta">
              Completed · Score pending
            </span>
          </div>
          <button
            type="button"
            class="student-list-action student-list-action--outline"
          >
            Details
          </button>
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
  margin-bottom: 3.4vw;
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

.student-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.8vw;
}

.student-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
}

.student-list-main {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.student-list-title {
  font-family: $font-body;
  font-size: 3.6vw;
  color: $dark;
}

.student-list-meta {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.65);
}

.student-list-action {
  flex: 0 0 auto;
  min-width: 20vw;
  min-height: 10vw;
  padding: 1.8vw 3.6vw;
  border-radius: 999vw;
  border: none;
  background-color: $primary;
  color: #FFFFFA;
  font-family: $font-body;
  font-size: 3.2vw;
  cursor: pointer;
}

.student-list-action--outline {
  background-color: transparent;
  color: $dark;
  border: 0.4vw solid rgba(33, 26, 30, 0.16);
}
</style>

