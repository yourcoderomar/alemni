<template>
  <div
    class="notif-dropdown"
    role="dialog"
    aria-label="Notifications"
  >
    <header class="notif-dropdown-header">
      <span class="notif-dropdown-title">
        Notifications
      </span>
      <span class="notif-dropdown-label">
        This week
      </span>
    </header>

    <ul class="notif-list">
      <li class="notif-item">
        <div class="notif-dot is-primary" />
        <div class="notif-item-main">
          <div class="notif-item-title">
            New assignment posted
          </div>
          <div class="notif-item-meta">
            Math · Due tomorrow
          </div>
        </div>
        <span class="notif-item-time">
          2h
        </span>
      </li>

      <li class="notif-item">
        <div class="notif-dot is-accent" />
        <div class="notif-item-main">
          <div class="notif-item-title">
            Attendance updated
          </div>
          <div class="notif-item-meta">
            You have a 3‑day streak
          </div>
        </div>
        <span class="notif-item-time">
          Today
        </span>
      </li>

      <li class="notif-item">
        <div class="notif-dot" />
        <div class="notif-item-main">
          <div class="notif-item-title">
            New message from your teacher
          </div>
          <div class="notif-item-meta">
            Science · Check materials
          </div>
        </div>
        <span class="notif-item-time">
          Mon
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.notif-dropdown {
  position: fixed;
  top: 14vw;
  right: 6vw;
  width: 70vw;
  max-width: 320px;
  background-color: #FFFFFA;
  border-radius: 4vw;
  box-shadow: 0 2vw 4.4vw rgba(0, 0, 0, 0.18);
  padding: 3.2vw 3.4vw;
  z-index: 1000;
}

.notif-dropdown-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2.4vw;
}

.notif-dropdown-title {
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.06em;
  color: rgba(33, 26, 30, 0.96);
}

.notif-dropdown-label {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.6);
}

.notif-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.6vw;
}

.notif-item {
  display: flex;
  align-items: center;
  gap: 2.4vw;
}

.notif-dot {
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 50%;
  background-color: rgba(33, 26, 30, 0.18);
}

.notif-dot.is-primary {
  background-color: $primary;
}

.notif-dot.is-accent {
  background-color: $accent;
}

.notif-item-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

.notif-item-title {
  font-family: $font-body;
  font-size: 3.4vw;
  color: $dark;
}

.notif-item-meta {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.65);
}

.notif-item-time {
  font-family: $font-body;
  font-size: 2.8vw;
  color: rgba(33, 26, 30, 0.5);
}
</style>

