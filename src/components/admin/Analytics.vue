<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

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
        <h1>Analytics</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3>Event Performance</h3>
              <p class="text-muted">
                Coming soon - Charts and graphs showing event performance metrics
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h3>User Engagement</h3>
              <p class="text-muted">Coming soon - User activity and engagement statistics</p>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h3>Revenue Trends</h3>
              <p class="text-muted">Coming soon - Revenue analysis and forecasting</p>
            </div>
          </div>
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
  padding: 20px;
}

.card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
}
</style>
