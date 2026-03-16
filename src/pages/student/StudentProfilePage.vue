<template>
  <div class="profile-page">
    <section class="profile-header-shell">
      <header class="profile-top-bar">
        <NotificationButton />
      </header>
      <div class="profile-banner" />

      <div class="profile-header-content">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar-ring">
            <div class="profile-avatar">
              <img
                v-if="avatarImageSrc"
                :src="avatarImageSrc"
                alt="Profile avatar"
                class="profile-avatar-img"
              >
              <span
                v-else
                class="profile-avatar-initials"
              >
                {{ initials }}
              </span>
            </div>
          </div>
        </div>

        <div class="profile-text">
          <div class="profile-name">
            {{ form.name }}
          </div>
          <div class="profile-subtitle">
            {{ form.email }}
          </div>
        </div>
      </div>
    </section>

    <section class="profile-content">
      <div class="settings-list">
        <button
          class="settings-item settings-item--highlight"
          @click="goToInviteFriends"
        >
          <div class="settings-item-main">
            <div class="settings-item-icon settings-item-icon--primary">
              <q-icon name="person_add" size="22px" />
            </div>
            <span class="settings-item-label">
              Invite friends
            </span>
          </div>
        </button>

        <button
          class="settings-item"
          @click="goToManageProfile"
        >
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="settings" size="22px" />
            </div>
            <span class="settings-item-label">
              Manage profile
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>

        <button class="settings-item">
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="tune" size="22px" />
            </div>
            <span class="settings-item-label">
              Customize my experience
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>

        <button class="settings-item">
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="notifications_none" size="22px" />
            </div>
            <span class="settings-item-label">
              Manage notifications
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>

        <button class="settings-item">
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="help_outline" size="22px" />
            </div>
            <span class="settings-item-label">
              FAQ
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>

        <button class="settings-item">
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="diamond" size="22px" />
            </div>
            <span class="settings-item-label">
              Manage subscription
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>

        <button class="settings-item">
          <div class="settings-item-main">
            <div class="settings-item-icon">
              <q-icon name="bug_report" size="22px" />
            </div>
            <span class="settings-item-label">
              Report a bug
            </span>
          </div>
          <q-icon name="chevron_right" size="22px" />
        </button>
      </div>

      <p v-if="logoutError" class="profile-error" role="alert">
        {{ logoutError }}
      </p>

      <button
        class="logout-btn"
        type="button"
        :disabled="isLoggingOut"
        @click="onLogout"
      >
        <span v-if="!isLoggingOut">Log out</span>
        <span v-else class="logout-loading">
          <q-icon name="progress_activity" size="18px" />
          Logging out…
        </span>
      </button>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import NotificationButton from 'src/components/NotificationButton.vue'
import { supabase } from 'src/services/supabaseClient'

const router = useRouter()

const form = ref({
  name: 'Student Name',
  email: 'student@example.com',
  phone: '+971 50 000 0000',
  grade: '10',
  section: 'A'
})

const avatarImageSrc = '/img/student-profile-avatar.png'

const isLoggingOut = ref(false)
const logoutError = ref('')

const initials = computed(() =>
  form.value.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
)

function goToInviteFriends () {
  router.push({ name: 'student-invite-friends' })
}

function goToManageProfile () {
  router.push({ name: 'student-manage-profile' })
}

async function onLogout () {
  if (isLoggingOut.value) {
    return
  }

  isLoggingOut.value = true
  logoutError.value = ''
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      logoutError.value = error.message
      return
    }

    router.replace({ name: 'login' })
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<style scoped lang="scss">
.profile-page {
  min-height: 100vh;
  padding: 3vw 3vw 20vw;
  background-color: $app-bg;
  color: $dark;
  display: flex;
  flex-direction: column;
}

.profile-header-shell {
  position: relative;
}

.profile-top-bar {
  position: absolute;
  top: 4vw;
  right: 4vw;
  left: 4vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 3;
}

.profile-banner {
  width: 100%;
  height: 40vw;
  border-radius: 4vw 4vw 6vw 6vw;
  background: linear-gradient(
    145deg,
    rgba(119, 150, 203, 0.35),
    rgba(120, 188, 97, 0.22)
  );
}

.profile-header-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -12vw;
}

.profile-avatar-wrapper {
  margin-bottom: 3vw;
}

.profile-avatar-ring {
  width: 24vw;
  height: 24vw;
  border-radius: 50%;
  padding: 0.8vw;
  background: conic-gradient(
    from 180deg,
    transparent 0deg,
    transparent 90deg,
    #7796CB 90deg,
    #78BC61 270deg,
    transparent 270deg,
    transparent 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2vw 5vw rgba(33, 26, 30, 0.18);
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #FFFFFA;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-avatar-initials {
  font-family: $font-title;
  font-size: 7vw;
}

.profile-text {
  text-align: center;
  margin-top: 1vw;
}

.profile-name {
  font-family: $font-title;
  font-size: 5vw;
}

.profile-subtitle {
  margin-top: 1.5vw;
  font-family: $font-body;
  font-size: 3.4vw;
  opacity: 0.78;
}

.profile-content {
  margin-top: 7vw;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 2.4vw;
}

.settings-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.4vw 3.6vw;
  border-radius: 4.2vw;
  border: none;
  background-color: #FFFFFA;
  box-shadow: 0 1.4vw 4vw rgba(0, 0, 0, 0.04);
  cursor: pointer;
}

.settings-item--highlight {
  background-image: linear-gradient(
    270deg,
    #7796CB 0%,
    rgba(119, 150, 203, 0.4) 40%,
    rgba(255, 255, 250, 0) 100%
  );
  background-repeat: no-repeat;
  background-size: 20% 100%;
  background-position: right center;
}

.settings-item-main {
  display: flex;
  align-items: center;
  gap: 3vw;
}

.settings-item-icon {
  width: 9vw;
  height: 9vw;
  border-radius: 999vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(33, 26, 30, 0.06);
}

.settings-item-icon--primary {
  background-color: rgba(33, 26, 30, 0.06);
}

.settings-item-label {
  font-family: $font-body;
  font-size: 3.8vw;
}

.profile-error {
  margin: 4vw 0 0;
  font-family: $font-body;
  font-size: 3.6vw;
  color: $negative;
  text-align: center;
}

.logout-btn {
  width: 100%;
  margin-top: 5vw;
  border: 0.35vw solid rgba(33, 26, 30, 0.18);
  border-radius: 999vw;
  padding: 3.8vw 4vw;
  min-height: 13vw;
  background-color: rgba(33, 26, 30, 0.03);
  color: rgba(33, 26, 30, 0.9);
  font-family: $font-body;
  font-size: 4vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.logout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.logout-loading {
  display: inline-flex;
  align-items: center;
  gap: 2vw;
}
</style>

