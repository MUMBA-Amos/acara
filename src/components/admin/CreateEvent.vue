<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const eventForm = ref({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: '',
  price: '',
  capacity: '',
  image: '',
  status: 'Active',
})

const categories = [
  'Music',
  'Technology',
  'Food',
  'Art',
  'Sports',
  'Business',
  'Education',
  'Entertainment',
]

// Check authentication
onMounted(() => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated')
  if (!isAuthenticated) {
    router.push('/loginPage')
  }
})

function handleSubmit() {
  // Here you would typically send the data to your backend
  console.log('Creating event:', eventForm.value)

  // For now, just redirect back to events page
  alert('Event created successfully!')
  router.push('/admin/events')
}

function cancel() {
  router.push('/admin/events')
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
        <div>
          <h1>Create New Event</h1>
          <p class="subtitle">Fill in the details to create a new event</p>
        </div>
        <button @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>

      <!-- Form -->
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="row g-4">
              <!-- Event Title -->
              <div class="col-md-6">
                <label for="title" class="form-label">Event Title *</label>
                <input
                  v-model="eventForm.title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <!-- Category -->
              <div class="col-md-6">
                <label for="category" class="form-label">Category *</label>
                <select v-model="eventForm.category" class="form-select" id="category" required>
                  <option value="">Select category</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <!-- Description -->
              <div class="col-12">
                <label for="description" class="form-label">Description *</label>
                <textarea
                  v-model="eventForm.description"
                  class="form-control"
                  id="description"
                  rows="4"
                  placeholder="Enter event description"
                  required
                ></textarea>
              </div>

              <!-- Date -->
              <div class="col-md-4">
                <label for="date" class="form-label">Event Date *</label>
                <input
                  v-model="eventForm.date"
                  type="date"
                  class="form-control"
                  id="date"
                  required
                />
              </div>

              <!-- Time -->
              <div class="col-md-4">
                <label for="time" class="form-label">Event Time *</label>
                <input
                  v-model="eventForm.time"
                  type="time"
                  class="form-control"
                  id="time"
                  required
                />
              </div>

              <!-- Status -->
              <div class="col-md-4">
                <label for="status" class="form-label">Status *</label>
                <select v-model="eventForm.status" class="form-select" id="status" required>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <!-- Location -->
              <div class="col-md-6">
                <label for="location" class="form-label">Location *</label>
                <input
                  v-model="eventForm.location"
                  type="text"
                  class="form-control"
                  id="location"
                  placeholder="Enter event location"
                  required
                />
              </div>

              <!-- Capacity -->
              <div class="col-md-6">
                <label for="capacity" class="form-label">Capacity *</label>
                <input
                  v-model="eventForm.capacity"
                  type="number"
                  class="form-control"
                  id="capacity"
                  placeholder="Maximum attendees"
                  required
                />
              </div>

              <!-- Price -->
              <div class="col-md-6">
                <label for="price" class="form-label">Ticket Price ($) *</label>
                <input
                  v-model="eventForm.price"
                  type="number"
                  class="form-control"
                  id="price"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <!-- Image URL -->
              <div class="col-md-6">
                <label for="image" class="form-label">Image URL</label>
                <input
                  v-model="eventForm.image"
                  type="url"
                  class="form-control"
                  id="image"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <!-- Submit Buttons -->
              <div class="col-12">
                <div class="button-group">
                  <button type="submit" class="btn btn-primary btn-lg">
                    <i class="bi bi-check-circle me-2"></i>Create Event
                  </button>
                  <button type="button" @click="cancel" class="btn btn-secondary btn-lg">
                    <i class="bi bi-x-circle me-2"></i>Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Help Text -->
      <div class="help-box mt-4">
        <i class="bi bi-info-circle me-2"></i>
        <span
          >Fields marked with * are required. Make sure all information is accurate before
          submitting.</span
        >
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

.subtitle {
  color: #666;
  margin-top: 5px;
  margin-bottom: 0;
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

.button-group {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
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

.btn-secondary {
  padding: 12px 30px;
}

.help-box {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  color: #856404;
  display: flex;
  align-items: center;
}

.help-box i {
  font-size: 20px;
}
</style>
