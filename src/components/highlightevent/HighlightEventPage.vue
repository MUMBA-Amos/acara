<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../shared/Header.vue'
import EventDetails from './EventDetails.vue'
import RelatedEvents from './RelatedEvents.vue'
import Footer from '../shared/footer.vue'

const route = useRoute()

// Constants
const pageData = reactive({
  eventId: null,
  eventCategory: '',
  isLoading: false,
  error: null,
})

// Functions
async function fetchEventCategory() {
  try {
    pageData.isLoading = true
    pageData.error = null
    pageData.eventId = route.params.id

    // API call to get event category for related events
    const response = await fetch(`/api/events/${pageData.eventId}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    pageData.eventCategory = data.event?.category || data.category || 'General'
  } catch (error) {
    pageData.error = 'Failed to fetch event information'
    console.error('Error fetching event category:', error)

    // TODO: Remove this mock data when backend is ready
    // Mock category for development
    pageData.eventCategory = 'Music'
    pageData.error = null
  } finally {
    pageData.isLoading = false
  }
}

// Fetch event category when component mounts
onMounted(() => {
  fetchEventCategory()
})

// Watch for route changes (when navigating between different events)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchEventCategory()
    }
  },
)
</script>

<template>
  <div class="highlight-event">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Event Details Section -->
    <EventDetails />

    <!-- Related Events Section -->
    <RelatedEvents
      v-if="pageData.eventCategory && pageData.eventId"
      :category="pageData.eventCategory"
      :current-event-id="pageData.eventId"
    />

    <!-- Loading state for related events -->
    <div v-if="pageData.isLoading" class="related-loading">
      <div class="container">
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading related events...</span>
          </div>
          <p class="mt-3 text-muted">Loading related events...</p>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="pageData.error" class="related-error">
      <div class="container">
        <div class="alert alert-warning text-center">
          {{ pageData.error }}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.highlight-event {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.related-loading {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.related-error {
  background-color: #f8f9fa;
  padding: 30px 0;
}

/* Smooth transitions for route changes */
.highlight-event {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .related-loading {
    padding: 40px 0;
  }

  .related-error {
    padding: 20px 0;
  }
}
</style>