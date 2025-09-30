<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Props to receive current event category
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  currentEventId: {
    type: [String, Number],
    required: true,
  },
})

// Constants
const relatedEvents = reactive({
  events: [],
  isLoading: false,
  error: null,
  hasData: false,
})

// Functions
async function fetchRelatedEvents() {
  try {
    relatedEvents.isLoading = true
    relatedEvents.error = null

    // API call to get events by category, excluding current event
    const response = await fetch(
      `/api/events/category/${props.category}?exclude=${props.currentEventId}&limit=4`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Update the reactive data
    relatedEvents.events = data.events || data || []
    relatedEvents.hasData = relatedEvents.events.length > 0
  } catch (error) {
    relatedEvents.error = 'Failed to fetch related events'
    console.error('Error fetching related events:', error)

    // TODO: Remove this mock data when backend is ready
    const mockEvents = [
      {
        id: 1,
        title: 'Jazz Night',
        description: 'Smooth jazz under the stars',
        date: '2024-07-15',
        time: '20:00',
        location: 'Blue Note Club',
        image: 'https://via.placeholder.com/300x200?text=Jazz+Night',
        category: props.category,
      },
      {
        id: 2,
        title: 'Summer Music Festival',
        description: 'A celebration of summer with live music',
        date: '2024-07-20',
        time: '18:00',
        location: 'Central Park',
        image: 'https://via.placeholder.com/300x200?text=Summer+Festival',
        category: props.category,
      },
      {
        id: 3,
        title: 'Rock Concert',
        description: 'High-energy rock performance',
        date: '2024-08-05',
        time: '21:00',
        location: 'Stadium Arena',
        image: 'https://via.placeholder.com/300x200?text=Rock+Concert',
        category: props.category,
      },
      {
        id: 4,
        title: 'Classical Evening',
        description: 'An elegant evening of classical music',
        date: '2024-08-12',
        time: '19:00',
        location: 'Opera House',
        image: 'https://via.placeholder.com/300x200?text=Classical+Music',
        category: props.category,
      }
    ]
    
    relatedEvents.events = mockEvents
      .filter((event) => event.id !== parseInt(props.currentEventId))
      .slice(0, 4)
    relatedEvents.hasData = relatedEvents.events.length > 0
  } finally {
    relatedEvents.isLoading = false
  }
}

// Function to navigate to event details
function goToEvent(eventId) {
  // Navigate to the event details page
  window.location.href = `/event/${eventId}`
}

// Fetch related events when component mounts or when category changes
onMounted(() => {
  if (props.category) {
    fetchRelatedEvents()
  }
})

// Watch for category changes
import { watch } from 'vue'
watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      fetchRelatedEvents()
    }
  },
)
</script>

<template>
  <div class="related-events">
    <div class="container">
      <div class="section-header">
        <h2>Related Events</h2>
        <p>More events in {{ category }} category</p>
      </div>

      <!-- Loading state -->
      <div v-if="relatedEvents.isLoading" class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading related events...</span>
        </div>
      </div>

      <!-- Error state -->
      <div v-if="relatedEvents.error && !relatedEvents.hasData" class="error alert alert-warning">
        {{ relatedEvents.error }}
      </div>

      <!-- Related events content -->
      <div v-if="relatedEvents.hasData && !relatedEvents.isLoading" class="events-grid">
        <div class="row">
          <div v-for="event in relatedEvents.events" :key="event.id" class="col-lg-3 col-md-6 mb-4">
            <div class="event-card" @click="goToEvent(event.id)">
              <div class="card-image">
                <img :src="event.image" :alt="event.title" class="event-image" />
                <div class="card-overlay">
                  <div class="overlay-content">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <h4 class="event-title">{{ event.title }}</h4>
                <p class="event-description">{{ event.description }}</p>
                <div class="event-meta">
                  <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>{{ event.date }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ event.time }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No related events -->
      <div
        v-if="!relatedEvents.hasData && !relatedEvents.isLoading && !relatedEvents.error"
        class="no-events"
      >
        <div class="text-center">
          <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4>No Related Events Found</h4>
          <p class="text-muted">
            There are currently no other events in the {{ category }} category.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.related-events {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-header h2 {
  color: #006852;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.section-header p {
  color: #666;
  font-size: 1.2rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.error {
  text-align: center;
  margin: 20px 0;
}

.events-grid {
  margin-top: 30px;
}

.event-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 104, 82, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.event-card:hover .card-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
}

.overlay-content i {
  display: block;
  font-size: 2rem;
  margin-bottom: 10px;
}

.card-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-title {
  color: #006852;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.3;
}

.event-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  margin-top: auto;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.meta-item i {
  color: #006852;
  width: 16px;
  margin-right: 8px;
  font-size: 0.8rem;
}

.no-events {
  padding: 60px 0;
}

.no-events i {
  color: #ccc;
}

.no-events h4 {
  color: #666;
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .related-events {
    padding: 40px 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-header {
    margin-bottom: 30px;
  }

  .card-content {
    padding: 20px;
  }

  .event-title {
    font-size: 1.2rem;
  }
}
</style>
