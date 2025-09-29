<script setup>
import { reactive, computed, onMounted } from 'vue'

//Constants
const featureEvents = reactive({
  events: [
    {
      id: 0,
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: '',
    },
  ],
  isLoading: false,
  error: null,
  hasData: true,
})

// Configuration
const EVENTS_PER_SLIDE = 3

// Computed property to create carousel slides
const carouselSlides = computed(() => {
  const slides = []
  for (let i = 0; i < featureEvents.events.length; i += EVENTS_PER_SLIDE) {
    slides.push(featureEvents.events.slice(i, i + EVENTS_PER_SLIDE))
  }
  return slides
})

//functions
async function fetchEvents() {
  try {
    featureEvents.isLoading = true
    featureEvents.error = null

    // API in future
    const response = await fetch('/api/events/')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Update the reactive data
    featureEvents.events = data.events || data
    featureEvents.hasData = featureEvents.events.length > 0
  } catch (error) {
    featureEvents.error = 'Failed to fetch Events'
    console.error('Error fetching events:', error)
  } finally {
    featureEvents.isLoading = false
  }
}

// Fetch events when component mounts
onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div class="featured-events">
    <h2 class="section-title">Featured Events</h2>

    <!--Loading states-->
    <div v-if="featureEvents.isLoading" class="loading">Loading Events...</div>

    <!--Error state -->
    <div v-if="featureEvents.error" class="error">Error: {{ featureEvents.error }}</div>

    <!--Bootstrap Carousel Container-->
    <div v-if="featureEvents.hasData" class="carousel-container">
      <div id="featuredEventsCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <!-- Dynamic slides based on database data -->
          <div
            v-for="(slide, slideIndex) in carouselSlides"
            :key="slideIndex"
            class="carousel-item"
            :class="{ active: slideIndex === 0 }"
          >
            <div class="events-row">
              <div v-for="(event, eventIndex) in slide" :key="event.id" class="event-card">
                <img :src="event.image" :alt="event.title" class="event-image" />
                <div class="event-content">
                  <h3 class="event-title">{{ event.title }}</h3>
                  <p class="event-description">{{ event.description }}</p>
                  <div class="event-details">
                    <p class="event-time">📅 {{ event.date }}</p>
                    <p class="event-time">🕒 {{ event.time }}</p>
                    <p class="event-location">📍 {{ event.location }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bootstrap Navigation Buttons -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#featuredEventsCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#featuredEventsCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

        <!-- Bootstrap Indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(slide, index) in carouselSlides"
            :key="index"
            type="button"
            data-bs-target="#featuredEventsCarousel"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-current="index === 0 ? 'true' : undefined"
            :aria-label="`Slide ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.featured-events {
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.section-title {
  font-size: 2rem;
  color: #006852;
  margin-bottom: 30px;
  font-family: 'Lato', sans-serif;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #e74c3c;
}

/* Simple carousel container */
.carousel-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
}

/* Ensure carousel items maintain consistent height */
.carousel-item {
  min-height: 500px;
}

.carousel-item.active {
  min-height: 500px;
}

/* Events row layout */
.events-row {
  display: flex;
  gap: 20px;
  padding: 0 10px;
  min-height: 500px;
  align-items: stretch;
}

/* Simple event card */
.event-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 0;
  height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.event-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  line-height: 1.3;
  height: 3.2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.event-description {
  color: #666;
  margin-bottom: 20px;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}

.event-details {
  margin-top: auto;
}

.event-details p {
  margin: 5px 0;
  color: #555;
  font-size: 0.9rem;
  word-wrap: break-word;
  line-height: 1.4;
}

/* Custom button styling */
.carousel-control-prev,
.carousel-control-next {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: rgba(0, 104, 82, 0.9);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.carousel-control-prev {
  left: -25px;
}

.carousel-control-next {
  right: -25px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 20px;
  height: 20px;
}

/* Simple indicators */
.carousel-indicators .active {
  background-color: #006852;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .featured-events {
    padding: 30px 15px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .carousel-container {
    max-width: 100%;
  }

  .events-row {
    flex-direction: column;
    gap: 15px;
  }

  .event-content {
    padding: 15px;
  }

  .carousel-container {
    padding: 0 20px;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 40px;
    height: 40px;
  }

  .carousel-control-prev {
    left: -20px;
  }

  .carousel-control-next {
    right: -20px;
  }
}
</style>
