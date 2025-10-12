<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Statistics data
const stats = ref({
  totalEvents: 156,
  activeEvents: 42,
  totalUsers: 1250,
  revenue: 45600,
})

// Recent events
const recentEvents = ref([
  { id: 1, title: 'Summer Music Festival', date: '2025-10-15', status: 'Active', attendees: 450 },
  { id: 2, title: 'Tech Conference 2025', date: '2025-10-20', status: 'Active', attendees: 320 },
  { id: 3, title: 'Food & Wine Expo', date: '2025-10-25', status: 'Pending', attendees: 180 },
  { id: 4, title: 'Art Gallery Opening', date: '2025-11-01', status: 'Active', attendees: 95 },
])

// Check authentication
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
      <!-- Header -->
      <div class="admin-header">
        <h1>Dashboard</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <!-- Statistics Cards -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-primary">
              <i class="bi bi-calendar-event"></i>
            </div>
            <div class="stat-info">
              <h3>{{ stats.totalEvents }}</h3>
              <p>Total Events</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-success">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ stats.activeEvents }}</h3>
              <p>Active Events</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-info">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-info">
              <h3>{{ stats.totalUsers }}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-warning">
              <i class="bi bi-currency-dollar"></i>
            </div>
            <div class="stat-info">
              <h3>${{ stats.revenue.toLocaleString() }}</h3>
              <p>Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Events Table -->
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h3>Recent Events</h3>
          <router-link to="/admin/events" class="btn btn-primary btn-sm">
            View All Events
          </router-link>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Attendees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in recentEvents" :key="event.id">
                  <td>{{ event.title }}</td>
                  <td>{{ event.date }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="event.status === 'Active' ? 'bg-success' : 'bg-warning'"
                    >
                      {{ event.status }}
                    </span>
                  </td>
                  <td>{{ event.attendees }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row g-4 mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3">Quick Actions</h4>
              <div class="d-grid gap-2">
                <router-link to="/admin/events/create" class="btn btn-primary">
                  <i class="bi bi-plus-circle me-2"></i>Create New Event
                </router-link>
                <router-link to="/admin/users" class="btn btn-outline-primary">
                  <i class="bi bi-people me-2"></i>Manage Users
                </router-link>
                <router-link to="/admin/settings" class="btn btn-outline-secondary">
                  <i class="bi bi-gear me-2"></i>Settings
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h4 class="mb-3">System Status</h4>
              <div class="status-item">
                <span>Server Status</span>
                <span class="badge bg-success">Online</span>
              </div>
              <div class="status-item">
                <span>Database</span>
                <span class="badge bg-success">Connected</span>
              </div>
              <div class="status-item">
                <span>Last Backup</span>
                <span class="text-muted">2 hours ago</span>
              </div>
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

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin-right: 15px;
}

.stat-info h3 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.stat-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
}

.card-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px 10px 0 0;
}

.card-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.table {
  margin: 0;
}

.table th {
  font-weight: 600;
  color: #666;
  border-bottom: 2px solid #e0e0e0;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.status-item:last-child {
  border-bottom: none;
}

.btn-primary {
  background-color: #006852;
  border-color: #006852;
}

.btn-primary:hover {
  background-color: #005642;
  border-color: #005642;
}

.btn-outline-primary {
  color: #006852;
  border-color: #006852;
}

.btn-outline-primary:hover {
  background-color: #006852;
  border-color: #006852;
}
</style>
