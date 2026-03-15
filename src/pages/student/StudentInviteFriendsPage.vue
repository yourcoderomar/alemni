<template>
  <div class="invite-page">
    <header class="invite-top-bar">
      <BackButton />
      <h1 class="invite-title">
        Invite friends
      </h1>
    </header>

    <section class="invite-card">
      <div class="invite-hero">
        <div class="invite-hero-graphic" />
        <div class="invite-hero-text">
          <h2 class="invite-hero-title">
            Share Alemni with friends
          </h2>
          <p class="invite-hero-subtitle">
            Help your classmates join your classes and stay updated.
          </p>
        </div>
      </div>

      <div class="invite-code-block">
        <span class="invite-code-label">
          Your invite code
        </span>
        <div class="invite-code-row">
          <span class="invite-code">
            ALE-123-456
          </span>
          <button
            type="button"
            class="invite-chip"
          >
            Copy
          </button>
        </div>
      </div>

      <div class="invite-actions">
        <button
          type="button"
          class="invite-button invite-button--primary"
        >
          Share via WhatsApp
        </button>
        <button
          type="button"
          class="invite-button invite-button--secondary"
        >
          Share link
        </button>
      </div>
    </section>

    <section class="invite-list-section">
      <h2 class="invite-list-title">
        Other options
      </h2>
      <div class="invite-list">
        <button
          v-for="item in options"
          :key="item.id"
          type="button"
          class="invite-list-item"
        >
          <div class="invite-list-main">
            <div class="invite-list-icon">
              <q-icon :name="item.icon" size="22px" />
            </div>
            <span class="invite-list-label">
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
import { ref } from 'vue'
import BackButton from 'src/components/BackButton.vue'

const options = ref([
  { id: 1, label: 'Invite from contacts', icon: 'contact_page' },
  { id: 2, label: 'Share to email', icon: 'email' },
  { id: 3, label: 'Copy code only', icon: 'content_copy' },
])
</script>

<style scoped lang="scss">
.invite-page {
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.invite-top-bar {
  display: flex;
  align-items: center;
  gap: 3vw;
  margin-bottom: 5vw;
}

.invite-title {
  margin: 0;
  font-family: $font-title;
  font-size: 5vw;
  letter-spacing: 0.06em;
}

.invite-card {
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.4vw 4vw;
  box-shadow: 0 1.6vw 4.2vw rgba(0, 0, 0, 0.06);
}

.invite-hero {
  display: flex;
  gap: 3vw;
  margin-bottom: 4vw;
}

.invite-hero-graphic {
  width: 18vw;
  height: 18vw;
  border-radius: 5vw;
  background: linear-gradient(135deg, #7796CB, #78BC61);
}

.invite-hero-text {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.invite-hero-title {
  margin: 0;
  font-family: $font-title;
  font-size: 4.4vw;
}

.invite-hero-subtitle {
  margin: 0;
  font-family: $font-body;
  font-size: 3.3vw;
  color: rgba(33, 26, 30, 0.78);
}

.invite-code-block {
  margin-top: 3vw;
}

.invite-code-label {
  display: block;
  margin-bottom: 1.4vw;
  font-family: $font-body;
  font-size: 3.1vw;
  color: rgba(33, 26, 30, 0.7);
}

.invite-code-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  padding: 2.8vw 3vw;
  border-radius: 3.4vw;
  background-color: rgba(33, 26, 30, 0.02);
}

.invite-code {
  font-family: $font-body;
  font-size: 3.6vw;
  letter-spacing: 0.16em;
}

.invite-chip {
  border: none;
  border-radius: 999vw;
  padding: 1.4vw 3.4vw;
  background-color: $primary;
  color: #FFFFFA;
  font-family: $font-body;
  font-size: 3.1vw;
}

.invite-actions {
  display: flex;
  flex-direction: column;
  gap: 2.4vw;
  margin-top: 4vw;
}

.invite-button {
  width: 100%;
  min-height: 12vw;
  border-radius: 4vw;
  border: none;
  font-family: $font-body;
  font-size: 3.7vw;
}

.invite-button--primary {
  background-color: $primary;
  color: #FFFFFA;
}

.invite-button--secondary {
  background-color: #FFFFFA;
  color: $dark;
  border: 0.4vw solid rgba(33, 26, 30, 0.12);
}

.invite-list-section {
  margin-top: 6vw;
}

.invite-list-title {
  margin: 0 0 3vw;
  font-family: $font-title;
  font-size: 4.4vw;
  letter-spacing: 0.04em;
}

.invite-list {
  display: flex;
  flex-direction: column;
  gap: 2.6vw;
}

.invite-list-item {
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

.invite-list-main {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.invite-list-icon {
  width: 9vw;
  height: 9vw;
  border-radius: 999vw;
  background-color: rgba(33, 26, 30, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.invite-list-label {
  font-family: $font-body;
  font-size: 3.6vw;
}
</style>

