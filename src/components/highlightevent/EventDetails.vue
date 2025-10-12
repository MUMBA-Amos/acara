<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// TODO: change object properties to match API response
const eventDetails = reactive({
  event: {
    id: 0,
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    category: '',
    fullDescription: '',
    images: [],
    organizer: '',
    price: '',
    capacity: '',
  },
  isLoading: false,
  error: null,
  hasData: false,
})

// Functions
async function fetchEventDetails() {
  try {
    eventDetails.isLoading = true
    eventDetails.error = null

    // API call to get event details by ID
    const eventId = route.params.id
    const response = await fetch(`/api/events/${eventId}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Update the reactive data
    eventDetails.event = data.event || data
    eventDetails.hasData = !!eventDetails.event.id
  } catch (error) {
    eventDetails.error = 'Failed to fetch event details'
    console.error('Error fetching event details:', error)

    // TODO: Remove this mock data when backend is ready
    // Mock data for development
    const eventId = route.params.id
    eventDetails.event = {
      id: eventId,
      title: 'Rainforest Festival 2025',
      description:
        'Experience the magic of nature and music combined in this spectacular outdoor festival.',
      fullDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      date: '26 January - 26 February',
      time: '18:00 - 23:00',
      location: 'Echoes of the Earth, Heartbeat of Borneo',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      category: 'Music',
      organizer: 'GoAcara Events',
      price: 'RM 150 - RM 300',
      capacity: '5,000 people',
      images: [
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1571266028243-d220c9c3d5d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      ],
    }
    eventDetails.hasData = true
    eventDetails.error = null
  } finally {
    eventDetails.isLoading = false
  }
}

// Computed property for sidebar details
const sidebarDetails = computed(() => {
  const details = {
    Date: eventDetails.event.date,
    Time: eventDetails.event.time,
    Location: eventDetails.event.location,
    Organizer: eventDetails.event.organizer,
    Price: eventDetails.event.price,
    Capacity: eventDetails.event.capacity,
    Category: eventDetails.event.category,
  }

  // Filter out empty values
  return Object.entries(details).filter(([key, value]) => value && value.trim() !== '')
})

// Fetch event details when component mounts
onMounted(() => {
  fetchEventDetails()
})
</script>

<template>
  <div class="event-details">
    <!-- Loading state -->
    <div v-if="eventDetails.isLoading" class="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading event details...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="eventDetails.error" class="error alert alert-danger">
      {{ eventDetails.error }}
    </div>

    <!-- Event details content -->
    <div v-if="eventDetails.hasData && !eventDetails.isLoading" class="event-content">
      <!-- Hero Image -->
      <div class="event-hero">
        <img :src="eventDetails.event.image" :alt="eventDetails.event.title" class="hero-image" />
        <div class="hero-overlay">
          <div class="hero-content">
            <h1 class="event-title">{{ eventDetails.event.title }}</h1>
            <div class="event-meta">
              <span class="event-date">📅 {{ eventDetails.event.date }}</span>
              <span class="event-time">🕒 {{ eventDetails.event.time }}</span>
              <span class="event-location">📍 {{ eventDetails.event.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Information -->
      <div class="container mt-5">
        <div class="row">
          <div class="col-lg-8">
            <!-- Description -->
            <div class="event-description">
              <h2>About This Event</h2>
              <p>{{ eventDetails.event.fullDescription || eventDetails.event.description }}</p>
            </div>

            <!-- Additional Images -->
            <div
              v-if="eventDetails.event.images && eventDetails.event.images.length > 0"
              class="event-gallery mt-4"
            >
              <h3>Event Gallery</h3>
              <div class="row">
                <div
                  v-for="(image, index) in eventDetails.event.images"
                  :key="index"
                  class="col-md-6 mb-3"
                >
                  <img :src="image" :alt="`Event image ${index + 1}`" class="gallery-image" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- Event Details Sidebar -->
            <div class="event-sidebar">
              <div class="sidebar-card">
                <h3>Event Details</h3>
                <div v-for="[label, value] in sidebarDetails" :key="label" class="detail-item">
                  <strong>{{ label }}:</strong> {{ value }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons mt-3">
                <button class="btn btn-primary btn-lg w-100 mb-2">Register Now</button>
                <button class="btn btn-outline-secondary w-100">Share Event</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-details {
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error {
  margin: 20px;
  text-align: center;
}

.event-hero {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.hero-content {
  color: white;
}

.event-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.event-meta {
  display: flex;
  gap: 30px;
  font-size: 1.2rem;
}

.event-meta span {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.event-description {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.event-description h2 {
  color: #006852;
  margin-bottom: 20px;
}

.event-description p {
  line-height: 1.6;
  color: #333;
  font-size: 1.1rem;
}

.event-gallery h3 {
  color: #006852;
  margin-bottom: 20px;
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-sidebar {
  position: sticky;
  top: 20px;
}

.sidebar-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar-card h3 {
  color: #006852;
  margin-bottom: 20px;
  border-bottom: 2px solid #f4e7ce;
  padding-bottom: 10px;
}

.detail-item {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.detail-item strong {
  color: #006852;
  display: inline-block;
  width: 100px;
}

.action-buttons .btn-primary {
  background-color: #006852;
  border-color: #006852;
}

.action-buttons .btn-primary:hover {
  background-color: #005544;
  border-color: #005544;
}

.action-buttons .btn-outline-secondary {
  color: #006852;
  border-color: #006852;
}

.action-buttons .btn-outline-secondary:hover {
  background-color: #006852;
  border-color: #006852;
}

@media (max-width: 768px) {
  .event-title {
    font-size: 2rem;
  }

  .event-meta {
    flex-direction: column;
    gap: 10px;
  }

  .hero-overlay {
    padding: 20px;
  }

  .event-description,
  .sidebar-card {
    padding: 20px;
  }
}
</style>
