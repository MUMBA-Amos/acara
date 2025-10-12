<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//Constants
const UserLogin = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')
const isLoading = ref(false)

async function login() {
  errorMessage.value = ''

  // Validate form
  const validationError = validate()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  isLoading.value = true

  // Simulate API call (replace with actual authentication logic)
  setTimeout(() => {
    // For demo purposes, accept any valid email/password
    // In production, you would validate against your backend
    if (UserLogin.email && UserLogin.password) {
      // Set authentication flag
      localStorage.setItem('isAdminAuthenticated', 'true')
      localStorage.setItem('adminEmail', UserLogin.email)

      // Redirect to admin dashboard
      router.push('/admin')
    } else {
      errorMessage.value = 'Invalid credentials'
    }
    isLoading.value = false
  }, 1000)
}

function validate() {
  if (!UserLogin.email || !UserLogin.password) return 'Email & password required'
  if (!/^\S+@\S+\.\S+$/.test(UserLogin.email)) return 'Invalid email'
  if (UserLogin.password.length < 6) return 'Password too short'
  return ''
}
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="card-title text-center mb-4 text-primary">Admin Login</h2>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-circle me-2"></i>{{ errorMessage }}
          </div>

          <form @submit.prevent="login" class="needs-validation" novalidate>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                v-model="UserLogin.email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter your email"
                :disabled="isLoading"
                required
              />
              <div class="invalid-feedback">Please provide a valid email.</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                v-model="UserLogin.password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter your password"
                :disabled="isLoading"
                required
              />
              <div class="invalid-feedback">Please provide a password.</div>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
          </form>

          <div class="text-center mt-3">
            <small class="text-muted">Demo: Use any valid email (min 6 char password)</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom color scheme */
.text-primary {
  color: #006852 !important;
}

.btn-primary {
  background-color: #006852;
  border-color: #006852;
}

.btn-primary:hover {
  background-color: #005642;
  border-color: #005642;
}

.form-control:focus {
  border-color: #006852;
  box-shadow: 0 0 0 0.2rem rgba(0, 104, 82, 0.25);
}

.card {
  border: none;
  border-radius: 15px;
}

body {
  background-color: #006852;
}
</style>
