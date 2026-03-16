<template>
  <div class="signup-page">
    <header class="signup-header">
      <h1 class="signup-title">Sign up</h1>
      <p class="signup-subtitle">Create your Alemni account in a minute.</p>
    </header>

    <form class="signup-form" @submit.prevent="onSubmit">
      <div class="input-shell">
        <q-icon class="input-icon" name="person_outline" size="20px" />
        <input
          v-model.trim="form.fullName"
          class="input"
          type="text"
          autocomplete="name"
          placeholder="Full name"
          required
        >
      </div>

      <div class="input-shell">
        <q-icon class="input-icon" name="mail_outline" size="20px" />
        <input
          v-model.trim="form.email"
          class="input"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="Email"
          required
        >
      </div>

      <div class="input-shell">
        <q-icon class="input-icon" name="lock_outline" size="20px" />
        <input
          v-model="form.password"
          class="input"
          :type="isPasswordVisible ? 'text' : 'password'"
          autocomplete="new-password"
          placeholder="Password"
          minlength="8"
          required
        >
        <button
          class="input-action"
          type="button"
          :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
          @click="isPasswordVisible = !isPasswordVisible"
        >
          <q-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" size="20px" />
        </button>
      </div>

      <div class="input-shell">
        <q-icon class="input-icon" name="lock_outline" size="20px" />
        <input
          v-model="form.confirmPassword"
          class="input"
          :type="isConfirmPasswordVisible ? 'text' : 'password'"
          autocomplete="new-password"
          placeholder="Confirm password"
          minlength="8"
          required
        >
        <button
          class="input-action"
          type="button"
          :aria-label="isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'"
          @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
        >
          <q-icon :name="isConfirmPasswordVisible ? 'visibility_off' : 'visibility'" size="20px" />
        </button>
      </div>

      <p v-if="passwordError" class="form-error" role="alert">
        {{ passwordError }}
      </p>

      <p v-if="submitError" class="form-error" role="alert">
        {{ submitError }}
      </p>

      <label class="terms">
        <input v-model="form.acceptTerms" class="terms-box" type="checkbox" required>
        <span class="terms-check" aria-hidden="true" />
        <span class="terms-text">
          I agree to the <button class="terms-link" type="button" @click="onOpenTerms">Terms</button>
          and <button class="terms-link" type="button" @click="onOpenPrivacy">Privacy Policy</button>.
        </span>
      </label>

      <button class="signup-btn" type="submit" :disabled="!canSubmit || isSubmitting">
        <span v-if="!isSubmitting">Create account</span>
        <span v-else class="loading">
          <q-icon name="progress_activity" size="18px" />
          Creating…
        </span>
      </button>

      <div class="login">
        <span class="login-muted">Already have an account?</span>
        <button class="login-link" type="button" @click="onGoToLogin">Log in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/services/supabaseClient'

const router = useRouter()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')

const passwordError = computed(() => {
  if (!form.value.password || !form.value.confirmPassword) {
    return ''
  }
  if (form.value.password !== form.value.confirmPassword) {
    return 'Passwords do not match.'
  }
  return ''
})

const canSubmit = computed(() => {
  return Boolean(
    form.value.fullName &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.acceptTerms &&
    !passwordError.value
  )
})

async function onSubmit () {
  if (!canSubmit.value || isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  submitError.value = ''
  try {
    const { error } = await supabase.auth.signUp({
      email: form.value.email,
      password: form.value.password,
      options: {
        data: {
          full_name: form.value.fullName
        }
      }
    })

    if (error) {
      submitError.value = error.message
      return
    }

    // If email confirmations are enabled, user may need to verify email first.
    router.push({ name: 'student-home' })
  } finally {
    isSubmitting.value = false
  }
}

function onGoToLogin () {
  router.push({ name: 'login' })
}

function onOpenTerms () {
  // TODO: link to terms page
}

function onOpenPrivacy () {
  // TODO: link to privacy page
}
</script>

<style scoped lang="scss">
.signup-page {
  min-height: 100vh;
  background-color: $app-bg;
  color: $dark;
  padding: 10vw 6vw 8vw;
  display: flex;
  flex-direction: column;
}

.signup-header {
  text-align: center;
  margin-bottom: 6vw;
}

.signup-title {
  margin: 0;
  font-family: $font-title;
  font-size: 8vw;
  font-weight: 400;
  color: rgba(33, 26, 30, 0.9);
}

.signup-subtitle {
  margin: 2vw 0 0;
  font-family: $font-body;
  font-size: 3.7vw;
  color: rgba(33, 26, 30, 0.6);
}

.signup-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4.2vw;
}

.input-shell {
  width: 100%;
  border-radius: 999vw;
  padding: 3.6vw 4vw;
  background-color: rgba(33, 26, 30, 0.03);
  border: 0.25vw solid rgba(33, 26, 30, 0.08);
  display: flex;
  align-items: center;
  gap: 3vw;
  height: 12vw;
}

.input-icon {
  opacity: 0.55;
}

.input {
  flex: 1 1 auto;
  border: none;
  outline: none;
  background: transparent;
  font-family: $font-body;
  font-size: 3.9vw;
  color: rgba(33, 26, 30, 0.85);
  min-height: 6vw;
}

.input::placeholder {
  color: rgba(33, 26, 30, 0.35);
}

.input-action {
  border: none;
  background: transparent;
  color: rgba(33, 26, 30, 0.55);
  min-width: 12vw;
  min-height: 12vw;
  padding: 0;
  margin: 0;
  line-height: 1;
  border-radius: 999vw;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.form-error {
  margin: -1vw 0 0;
  font-family: $font-body;
  font-size: 3.6vw;
  color: $negative;
  text-align: center;
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 3vw;
  padding: 1vw 1vw 0;
  font-family: $font-body;
  font-size: 3.5vw;
  color: rgba(33, 26, 30, 0.7);
  cursor: pointer;
}

.terms-box {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

.terms-check {
  width: 6.2vw;
  height: 6.2vw;
  margin-top: 2.5vw;
  border-radius: 1.6vw;
  border: 0.35vw solid rgba(33, 26, 30, 0.22);
  background: rgba(33, 26, 30, 0.02);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease;
}

.terms-check::after {
  content: '';
  width: 2.2vw;
  height: 3.6vw;
  border-right: 0.7vw solid $app-bg;
  border-bottom: 0.7vw solid $app-bg;
  transform: rotate(45deg) translateY(-0.2vw);
  opacity: 0;
  transition: opacity 120ms ease;
}

.terms-box:checked + .terms-check {
  background: $primary;
  border-color: rgba(33, 26, 30, 0.08);
}

.terms-box:checked + .terms-check::after {
  opacity: 1;
}

.terms-box:focus-visible + .terms-check {
  box-shadow: 0 0 0 0.9vw rgba(119, 150, 203, 0.28);
}

.terms:active .terms-check {
  transform: scale(0.98);
}

.terms-text {
  padding-top: 0.2vw;
  line-height: 1.35;
}

.terms-link {
  border: none;
  background: transparent;
  padding: 0 1vw;
  min-height: 12vw;
  font-family: $font-body;
  font-size: 3.5vw;
  color: $dark;
  text-decoration: underline;
  text-underline-offset: 0.8vw;
  cursor: pointer;
}

.signup-btn {
  width: 100%;
  border: none;
  border-radius: 999vw;
  padding: 3.8vw 4vw;
  min-height: 13vw;
  background-color: $dark;
  color: $app-bg;
  font-family: $font-body;
  font-size: 4vw;
  cursor: pointer;
  box-shadow: 0 3vw 7vw rgba(33, 26, 30, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: inline-flex;
  align-items: center;
  gap: 2vw;
}

.login {
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  font-family: $font-body;
  font-size: 3.6vw;
}

.login-muted {
  color: rgba(33, 26, 30, 0.6);
}

.login-link {
  border: none;
  background: transparent;
  padding: 2vw 2vw;
  min-height: 12vw;
  font-family: $font-body;
  font-size: 3.6vw;
  color: $dark;
  text-decoration: underline;
  text-underline-offset: 0.8vw;
  cursor: pointer;
}

@media (min-width: 768px) {
  .signup-page {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>

