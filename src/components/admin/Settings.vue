<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = ref({
  siteName: 'GoAcara',
  siteEmail: 'admin@goacara.com',
  timezone: 'UTC',
  language: 'English',
  notifications: true,
  maintenance: false,
})

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

function saveSettings() {
  alert('Settings saved successfully!')
}

function logout() {
  localStorage.removeItem('isAdminAuthenticated')
  router.push('/')
}
</script>

<template>
  <div class="admin-container">
    <AdminSidebar />

    <div class="main-content">
      <div class="admin-header">
        <h1>Settings</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <div class="card">
        <div class="card-body">
          <form @submit.prevent="saveSettings">
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label">Site Name</label>
                <input v-model="settings.siteName" type="text" class="form-control" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Site Email</label>
                <input v-model="settings.siteEmail" type="email" class="form-control" />
              </div>

              <div class="col-md-6">
                <label class="form-label">Timezone</label>
                <select v-model="settings.timezone" class="form-select">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                  <option>GMT</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">Language</label>
                <select v-model="settings.language" class="form-select">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div class="col-12">
                <div class="form-check form-switch">
                  <input
                    v-model="settings.notifications"
                    class="form-check-input"
                    type="checkbox"
                    id="notifications"
                  />
                  <label class="form-check-label" for="notifications">
                    Enable Email Notifications
                  </label>
                </div>
              </div>

              <div class="col-12">
                <div class="form-check form-switch">
                  <input
                    v-model="settings.maintenance"
                    class="form-check-input"
                    type="checkbox"
                    id="maintenance"
                  />
                  <label class="form-check-label" for="maintenance"> Maintenance Mode </label>
                </div>
              </div>

              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-check-circle me-2"></i>Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex: 1;
  padding: 30px;
  margin-left: 250px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
}

.card-body {
  padding: 30px;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px 15px;
}

.form-control:focus,
.form-select:focus {
  border-color: #006852;
  box-shadow: 0 0 0 0.2rem rgba(0, 104, 82, 0.25);
}

.form-check-input:checked {
  background-color: #006852;
  border-color: #006852;
}

.btn-primary {
  background-color: #006852;
  border-color: #006852;
  padding: 12px 30px;
}

.btn-primary:hover {
  background-color: #005642;
  border-color: #005642;
}
</style>
