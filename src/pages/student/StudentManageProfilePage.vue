<template>
  <div class="manage-page">
    <header class="manage-top-bar">
      <BackButton />
      <h1 class="manage-title">
        Manage profile
      </h1>
    </header>

    <section class="manage-card">
      <div class="manage-header">
        <div class="manage-avatar">
          {{ initials }}
        </div>
        <div class="manage-header-text">
          <h2 class="manage-name">
            {{ form.name }}
          </h2>
          <p class="manage-email">
            {{ form.email }}
          </p>
        </div>
      </div>

      <div class="manage-fields">
        <div class="manage-row">
          <span class="manage-label">
            Phone
          </span>
          <span class="manage-value">
            {{ form.phone }}
          </span>
        </div>
        <div class="manage-row">
          <span class="manage-label">
            Grade &amp; section
          </span>
          <span class="manage-value">
            {{ form.grade }} · {{ form.section }}
          </span>
        </div>
      </div>

      <div class="manage-actions">
        <button
          type="button"
          class="manage-button manage-button--primary"
        >
          Edit basic info
        </button>
        <button
          type="button"
          class="manage-button manage-button--secondary"
        >
          Change password
        </button>
      </div>
    </section>

    <section class="manage-list-section">
      <h2 class="manage-list-title">
        Account settings
      </h2>
      <div class="manage-list">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="manage-list-item"
        >
          <div class="manage-list-main">
            <div class="manage-list-icon">
              <q-icon :name="item.icon" size="22px" />
            </div>
            <span class="manage-list-label">
              {{ item.label }}
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BackButton from 'src/components/BackButton.vue'

const form = ref({
  name: 'Student Name',
  email: 'student@example.com',
  phone: '+971 50 000 0000',
  grade: '10',
  section: 'A',
})

const items = ref([
  { id: 1, label: 'Language & region', icon: 'language' },
  { id: 2, label: 'Login & security', icon: 'lock_open' },
  { id: 3, label: 'Delete my account', icon: 'delete_outline' },
])

const initials = computed(() =>
  form.value.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2),
)
</script>

<style scoped lang="scss">
.manage-page {
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.manage-top-bar {
  display: flex;
  align-items: center;
  gap: 3vw;
  margin-bottom: 5vw;
}

.manage-title {
  margin: 0;
  font-family: $font-title;
  font-size: 5vw;
  letter-spacing: 0.06em;
}

.manage-card {
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.4vw 4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.06);
}

.manage-header {
  display: flex;
  align-items: center;
  gap: 3vw;
  margin-bottom: 4vw;
}

.manage-avatar {
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  background-color: $primary;
  color: #FFFFFA;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $font-title;
  font-size: 5.4vw;
}

.manage-header-text {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.manage-name {
  margin: 0;
  font-family: $font-title;
  font-size: 4.6vw;
}

.manage-email {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.78);
}

.manage-fields {
  display: flex;
  flex-direction: column;
  gap: 2.4vw;
}

.manage-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4vw;
}

.manage-label {
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.7);
}

.manage-value {
  font-family: $font-body;
  font-size: 3.5vw;
  text-align: right;
}

.manage-actions {
  display: flex;
  flex-direction: column;
  gap: 2.4vw;
  margin-top: 4vw;
}

.manage-button {
  width: 100%;
  min-height: 12vw;
  border-radius: 4vw;
  border: none;
  font-family: $font-body;
  font-size: 3.7vw;
}

.manage-button--primary {
  background-color: $primary;
  color: #FFFFFA;
}

.manage-button--secondary {
  background-color: #FFFFFA;
  color: $dark;
  border: 0.4vw solid rgba(33, 26, 30, 0.12);
}

.manage-list-section {
  margin-top: 6vw;
}

.manage-list-title {
  margin: 0 0 3vw;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.04em;
}

.manage-list {
  display: flex;
  flex-direction: column;
  gap: 2.6vw;
}

.manage-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2vw 3.4vw;
  border-radius: 3.6vw;
  border: none;
  background-color: #FFFFFA;
  box-shadow: 0 1.2vw 3.6vw rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.manage-list-main {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.manage-list-icon {
  width: 9vw;
  height: 9vw;
  border-radius: 999vw;
  background-color: rgba(33, 26, 30, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.manage-list-label {
  font-family: $font-body;
  font-size: 3.6vw;
}
</style>

