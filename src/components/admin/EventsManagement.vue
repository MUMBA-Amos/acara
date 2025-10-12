<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Events data
const events = ref([
  {
    id: 1,
    title: 'Summer Music Festival',
    date: '2025-10-15',
    location: 'Central Park',
    category: 'Music',
    status: 'Active',
    attendees: 450,
    price: 50,
  },
  {
    id: 2,
    title: 'Tech Conference 2025',
    date: '2025-10-20',
    location: 'Convention Center',
    category: 'Technology',
    status: 'Active',
    attendees: 320,
    price: 150,
  },
  {
    id: 3,
    title: 'Food & Wine Expo',
    date: '2025-10-25',
    location: 'Downtown Hall',
    category: 'Food',
    status: 'Pending',
    attendees: 180,
    price: 35,
  },
  {
    id: 4,
    title: 'Art Gallery Opening',
    date: '2025-11-01',
    location: 'Art Museum',
    category: 'Art',
    status: 'Active',
    attendees: 95,
    price: 25,
  },
  {
    id: 5,
    title: 'Marathon Run 2025',
    date: '2025-11-05',
    location: 'City Streets',
    category: 'Sports',
    status: 'Active',
    attendees: 580,
    price: 40,
  },
])

const searchQuery = ref('')
const filterStatus = ref('All')
const selectedEvent = ref(null)
const showDeleteModal = ref(false)

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'All' || event.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

function editEvent(eventId) {
  router.push(`/admin/events/edit/${eventId}`)
}

function confirmDelete(event) {
  selectedEvent.value = event
  showDeleteModal.value = true
}

function deleteEvent() {
  events.value = events.value.filter((e) => e.id !== selectedEvent.value.id)
  showDeleteModal.value = false
  selectedEvent.value = null
}

function logout() {
  localStorage.removeItem('isAdminAuthenticated')
  router.push('/')
}
</script>

<script>
import { computed } from 'vue'
export default {
  name: 'EventsManagement',
}
</script>

<template>
  <div class="admin-container">
    <AdminSidebar />

    <div class="main-content">
      <!-- Header -->
      <div class="admin-header">
        <h1>Events Management</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <!-- Action Bar -->
      <div class="action-bar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search events..."
            class="form-control"
          />
        </div>

        <div class="filter-group">
          <select v-model="filterStatus" class="form-select">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <router-link to="/admin/events/create" class="btn btn-primary">
            <i class="bi bi-plus-circle me-2"></i>Create Event
          </router-link>
        </div>
      </div>

      <!-- Events Table -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Attendees</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in filteredEvents" :key="event.id">
                  <td>{{ event.id }}</td>
                  <td>
                    <strong>{{ event.title }}</strong>
                  </td>
                  <td>{{ event.date }}</td>
                  <td>{{ event.location }}</td>
                  <td>
                    <span class="badge bg-secondary">{{ event.category }}</span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'bg-success': event.status === 'Active',
                        'bg-warning': event.status === 'Pending',
                        'bg-secondary': event.status === 'Completed',
                      }"
                    >
                      {{ event.status }}
                    </span>
                  </td>
                  <td>{{ event.attendees }}</td>
                  <td>${{ event.price }}</td>
                  <td>
                    <div class="action-buttons">
                      <button
                        @click="editEvent(event.id)"
                        class="btn btn-sm btn-outline-primary"
                        title="Edit"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        @click="confirmDelete(event)"
                        class="btn btn-sm btn-outline-danger"
                        title="Delete"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredEvents.length === 0" class="text-center py-5">
            <i class="bi bi-inbox" style="font-size: 48px; color: #ccc"></i>
            <p class="mt-3 text-muted">No events found</p>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="row g-4 mt-4">
        <div class="col-md-4">
          <div class="info-card">
            <h4>Total Events</h4>
            <p class="stat-number">{{ events.length }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="info-card">
            <h4>Active Events</h4>
            <p class="stat-number">{{ events.filter((e) => e.status === 'Active').length }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="info-card">
            <h4>Total Attendees</h4>
            <p class="stat-number">{{ events.reduce((sum, e) => sum + e.attendees, 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Confirm Delete</h3>
          <button @click="showDeleteModal = false" class="btn-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to delete <strong>{{ selectedEvent?.title }}</strong
            >?
          </p>
          <p class="text-muted">This action cannot be undone.</p>
        </div>
        <div class="modal-footer">
          <button @click="showDeleteModal = false" class="btn btn-secondary">Cancel</button>
          <button @click="deleteEvent" class="btn btn-danger">Delete</button>
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

.table {
  margin: 0;
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

.info-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-card h4 {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #006852;
  margin: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #999;
}

.btn-close:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
  color: white;
}
</style>
