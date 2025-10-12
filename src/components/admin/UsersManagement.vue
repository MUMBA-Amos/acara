<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    status: 'Active',
    joined: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    joined: '2024-02-20',
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@goacara.com',
    role: 'Admin',
    status: 'Active',
    joined: '2023-12-01',
  },
  {
    id: 4,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    joined: '2024-03-10',
  },
])

const searchQuery = ref('')
const filterRole = ref('All')

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = filterRole.value === 'All' || user.role === filterRole.value
    return matchesSearch && matchesRole
  })
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
        <h1>Users Management</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <div class="action-bar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="form-control"
          />
        </div>

        <div class="filter-group">
          <select v-model="filterRole" class="form-select">
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>
                    <strong>{{ user.name }}</strong>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span
                      class="badge"
                      :class="user.role === 'Admin' ? 'bg-primary' : 'bg-secondary'"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="user.status === 'Active' ? 'bg-success' : 'bg-secondary'"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td>{{ user.joined }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-sm btn-outline-primary" title="Edit">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" title="Delete">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-box input {
  padding-left: 45px;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  gap: 15px;
}

.form-select {
  width: 150px;
  border-radius: 8px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
}

.table th {
  font-weight: 600;
  color: #666;
  border-bottom: 2px solid #e0e0e0;
  padding: 15px;
}

.table td {
  padding: 15px;
  vertical-align: middle;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-outline-primary {
  color: #006852;
  border-color: #006852;
}

.btn-outline-primary:hover {
  background-color: #006852;
  border-color: #006852;
  color: white;
}
</style>
