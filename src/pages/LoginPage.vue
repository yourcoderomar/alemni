<template>
  <div class="login-page">
    <header class="login-header">
      <h1 class="login-title">Login</h1>
    </header>

    <form class="login-form" @submit.prevent="onSubmit">
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
          autocomplete="current-password"
          placeholder="Password"
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

      <button class="forgot" type="button" @click="onForgotPassword">
        Forgot Password?
      </button>

      <p v-if="submitError" class="form-error" role="alert">
        {{ submitError }}
      </p>

      <button class="login-btn" type="submit" :disabled="isSubmitting">
        <span v-if="!isSubmitting">Login</span>
        <span v-else class="loading">
          <q-icon name="progress_activity" size="18px" />
          Logging in…
        </span>
      </button>

      <div class="or-row" aria-hidden="true">
        <span class="or-line" />
        <span class="or-text">or</span>
        <span class="or-line" />
      </div>

      <button class="social-btn social-btn--google" type="button" @click="onContinueWithGoogle">
        <span class="brand-mark brand-mark--google" aria-hidden="true">G</span>
        <span>Continue with Google</span>
      </button>

      <button class="social-btn social-btn--apple" type="button" @click="onContinueWithApple">
        <span class="brand-mark brand-mark--apple" aria-hidden="true"></span>
        <span>Continue with Apple</span>
      </button>

      <div class="signup">
        <span class="signup-muted">Need an account?</span>
        <button class="signup-link" type="button" @click="onCreateAccount">Sign up</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/services/supabaseClient'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  rememberMe: true
})

const isPasswordVisible = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')

async function onSubmit () {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  submitError.value = ''
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password
    })

    if (error) {
      submitError.value = error.message
      return
    }

    router.push({ name: 'student-home' })
  } finally {
    isSubmitting.value = false
  }
}

function onForgotPassword () {
  // TODO: add forgot password flow
}

function onContinueWithGoogle () {
  // TODO: add Google auth
}

function onContinueWithApple () {
  // TODO: add Apple auth
}

function onCreateAccount () {
  router.push({ name: 'signup' })
}
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  background-color: $app-bg;
  color: $dark;
  padding: 10vw 6vw 8vw;
  display: flex;
  flex-direction: column;
}

.login-header {
  text-align: center;
  margin-bottom: 8vw;
}

.login-title {
  margin: 0;
  font-family: $font-title;
  font-size: 8vw;
  font-weight: 400;
  color: rgba(33, 26, 30, 0.9);
}

.login-form {
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

.forgot {
  border: none;
  background: transparent;
  font-family: $font-body;
  font-size: 3.6vw;
  color: rgba(33, 26, 30, 0.65);
  text-decoration: underline;
  text-underline-offset: 0.8vw;
  margin-top: -1.2vw;
  align-self: center;
  min-height: 12vw;
  padding: 0 4vw;
}

.form-error {
  margin: -1vw 0 0;
  font-family: $font-body;
  font-size: 3.6vw;
  color: $negative;
  text-align: center;
}

.login-btn {
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

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading {
  display: inline-flex;
  align-items: center;
  gap: 2vw;
}

.or-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  margin-top: 2vw;
  margin-bottom: 1vw;
  color: rgba(33, 26, 30, 0.5);
  font-family: $font-body;
  font-size: 3.5vw;
}

.or-line {
  flex: 1 1 auto;
  height: 0.25vw;
  background: rgba(33, 26, 30, 0.1);
  border-radius: 999vw;
}

.or-text {
  padding: 0 2vw;
}

.social-btn {
  width: 100%;
  border: none;
  border-radius: 999vw;
  padding: 3.6vw 4vw;
  min-height: 13vw;
  background-color: rgba(33, 26, 30, 0.05);
  color: rgba(33, 26, 30, 0.85);
  font-family: $font-body;
  font-size: 3.8vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3vw;
}

.social-btn--google {
  background-color: rgba(33, 26, 30, 0.06);
}

.social-btn--apple {
  background-color: rgba(120, 188, 97, 0.8);
  color: rgba(33, 26, 30, 0.9);
}

.brand-mark {
  width: 7.6vw;
  height: 7.6vw;
  border-radius: 999vw;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 4.2vw;
}

.brand-mark--google {
  background: #FFFFFF;
  border: 0.25vw solid rgba(33, 26, 30, 0.1);
  color: transparent;
  background-image: linear-gradient(90deg, #4285F4 0%, #34A853 35%, #FBBC05 70%, #EA4335 100%);
  -webkit-background-clip: text;
  background-clip: text;
}

.brand-mark--apple {
  background: rgba(33, 26, 30, 0.08);
  color: rgba(33, 26, 30, 0.85);
}

.signup {
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  font-family: $font-body;
  font-size: 3.6vw;
}

.signup-muted {
  color: rgba(33, 26, 30, 0.6);
}

.signup-link {
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
  .login-page {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>

