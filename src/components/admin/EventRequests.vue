<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Event requests data
const eventRequests = ref([
  {
    id: 1,
    title: 'Annual Charity Gala',
    organizer: 'John Smith',
    email: 'john@charity.org',
    date: '2025-12-15',
    location: 'Grand Ballroom',
    category: 'Charity',
    description: "Annual fundraising event for local children's hospital",
    status: 'Pending',
    submittedDate: '2024-10-20',
    attendees: 300,
  },
  {
    id: 2,
    title: 'Tech Startup Meetup',
    organizer: 'Sarah Johnson',
    email: 'sarah@techstartup.com',
    date: '2025-11-30',
    location: 'Innovation Hub',
    category: 'Technology',
    description: 'Monthly networking event for tech entrepreneurs',
    status: 'Approved',
    submittedDate: '2024-10-18',
    attendees: 150,
  },
  {
    id: 3,
    title: 'Art Exhibition Opening',
    organizer: 'Michael Chen',
    email: 'michael@artgallery.com',
    date: '2025-11-25',
    location: 'Modern Art Gallery',
    category: 'Art',
    description: 'Opening night for contemporary art exhibition',
    status: 'Rejected',
    submittedDate: '2024-10-15',
    attendees: 100,
  },
  {
    id: 4,
    title: 'Food Festival 2025',
    organizer: 'Lisa Rodriguez',
    email: 'lisa@foodfest.com',
    date: '2025-12-01',
    location: 'City Park',
    category: 'Food',
    description: 'Annual food festival featuring local restaurants',
    status: 'Pending',
    submittedDate: '2024-10-22',
    attendees: 500,
  },
])

const searchQuery = ref('')
const filterStatus = ref('All')
const selectedRequest = ref(null)
const showDetailsModal = ref(false)

onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

const filteredRequests = computed(() => {
  return eventRequests.value.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      request.organizer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'All' || request.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

function viewDetails(request) {
  selectedRequest.value = request
  showDetailsModal.value = true
}

function approveRequest(requestId) {
  const request = eventRequests.value.find((r) => r.id === requestId)
  if (request) {
    request.status = 'Approved'
  }
}

function rejectRequest(requestId) {
  const request = eventRequests.value.find((r) => r.id === requestId)
  if (request) {
    request.status = 'Rejected'
  }
}

function closeModal() {
  showDetailsModal.value = false
  selectedRequest.value = null
}

function approveAndClose() {
  if (selectedRequest.value) {
    approveRequest(selectedRequest.value.id)
    closeModal()
  }
}

function rejectAndClose() {
  if (selectedRequest.value) {
    rejectRequest(selectedRequest.value.id)
    closeModal()
  }
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
      <!-- Header -->
      <div class="admin-header">
        <h1>Event Requests</h1>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <!-- Action Bar -->
      <div class="action-bar">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search requests..."
            class="form-control"
          />
        </div>

        <div class="filter-group">
          <select v-model="filterStatus" class="form-select">
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <!-- Statistics -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-warning">
              <i class="bi bi-clock"></i>
            </div>
            <div class="stat-info">
              <h3>{{ eventRequests.filter((r) => r.status === 'Pending').length }}</h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-success">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ eventRequests.filter((r) => r.status === 'Approved').length }}</h3>
              <p>Approved</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-danger">
              <i class="bi bi-x-circle"></i>
            </div>
            <div class="stat-info">
              <h3>{{ eventRequests.filter((r) => r.status === 'Rejected').length }}</h3>
              <p>Rejected</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-info">
              <i class="bi bi-list-check"></i>
            </div>
            <div class="stat-info">
              <h3>{{ eventRequests.length }}</h3>
              <p>Total</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Requests Table -->
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Title</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in filteredRequests" :key="request.id">
                  <td>{{ request.id }}</td>
                  <td>
                    <strong>{{ request.title }}</strong>
                  </td>
                  <td>{{ request.organizer }}</td>
                  <td>{{ request.date }}</td>
                  <td>
                    <span class="badge bg-secondary">{{ request.category }}</span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'bg-warning': request.status === 'Pending',
                        'bg-success': request.status === 'Approved',
                        'bg-danger': request.status === 'Rejected',
                      }"
                    >
                      {{ request.status }}
                    </span>
                  </td>
                  <td>{{ request.submittedDate }}</td>
                  <td>
                    <div class="action-buttons">
                      <button
                        @click="viewDetails(request)"
                        class="btn btn-sm btn-outline-info"
                        title="View Details"
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                      <button
                        v-if="request.status === 'Pending'"
                        @click="approveRequest(request.id)"
                        class="btn btn-sm btn-outline-success"
                        title="Approve"
                      >
                        <i class="bi bi-check"></i>
                      </button>
                      <button
                        v-if="request.status === 'Pending'"
                        @click="rejectRequest(request.id)"
                        class="btn btn-sm btn-outline-danger"
                        title="Reject"
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredRequests.length === 0" class="text-center py-5">
            <i class="bi bi-inbox" style="font-size: 48px; color: #ccc"></i>
            <p class="mt-3 text-muted">No requests found</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Event Request Details</h3>
          <button @click="closeModal" class="btn-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="modal-body" v-if="selectedRequest">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Event Title</label>
              <p class="form-control-plaintext">{{ selectedRequest.title }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Organizer</label>
              <p class="form-control-plaintext">{{ selectedRequest.organizer }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <p class="form-control-plaintext">{{ selectedRequest.email }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Date</label>
              <p class="form-control-plaintext">{{ selectedRequest.date }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Location</label>
              <p class="form-control-plaintext">{{ selectedRequest.location }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Category</label>
              <p class="form-control-plaintext">{{ selectedRequest.category }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Expected Attendees</label>
              <p class="form-control-plaintext">{{ selectedRequest.attendees }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label">Status</label>
              <p class="form-control-plaintext">
                <span
                  class="badge"
                  :class="{
                    'bg-warning': selectedRequest.status === 'Pending',
                    'bg-success': selectedRequest.status === 'Approved',
                    'bg-danger': selectedRequest.status === 'Rejected',
                  }"
                >
                  {{ selectedRequest.status }}
                </span>
              </p>
            </div>
            <div class="col-12">
              <label class="form-label">Description</label>
              <p class="form-control-plaintext">{{ selectedRequest.description }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="selectedRequest && selectedRequest.status === 'Pending'">
          <button @click="closeModal" class="btn btn-secondary">Close</button>
          <button @click="rejectAndClose" class="btn btn-danger">Reject</button>
          <button @click="approveAndClose" class="btn btn-success">Approve</button>
        </div>
        <div class="modal-footer" v-else>
          <button @click="closeModal" class="btn btn-secondary">Close</button>
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
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
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

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.form-control-plaintext {
  padding: 8px 0;
  margin-bottom: 15px;
  color: #666;
}

.btn-outline-info {
  color: #006852;
  border-color: #006852;
}

.btn-outline-info:hover {
  background-color: #006852;
  border-color: #006852;
  color: white;
}
</style>
