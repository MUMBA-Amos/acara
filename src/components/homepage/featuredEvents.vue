<script setup>
import { reactive, computed, onMounted } from 'vue'

//Constants
const featureEvents = reactive({
  // TODO: Replace with actual API data during production deployment
  events: [
    {
      id: 1,
      title: 'Sarawak International Choral Festival/Symposium 2025',
      date: '10 June 2025',
      time: '9:00 am',
      location: 'Kuching, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
    {
      id: 2,
      title: 'Slot International Mountain Bike Challenge (SIMBC 2025)',
      date: '15 June 2025',
      time: '8:00 am',
      location: 'Miri, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
    {
      id: 3,
      title: 'Kuching Food Festival 2025 (GAWAI)',
      date: '20 June 2025',
      time: '10:00 am',
      location: 'Kuching Waterfront, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
    {
      id: 4,
      title: 'Borneo Jazz Festival 2025',
      date: '25 June 2025',
      time: '7:00 pm',
      location: 'Miri, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
    {
      id: 5,
      title: 'Sarawak Cultural Village Festival',
      date: '30 June 2025',
      time: '2:00 pm',
      location: 'Santubong, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
    {
      id: 6,
      title: 'Rainforest World Music Festival 2025',
      date: '5 July 2025',
      time: '6:00 pm',
      location: 'Kuching, Sarawak',
      image: '/src/assets/rainforest.jpg',
    },
  ],
  isLoading: false,
  error: null,
  hasData: true,
})

// Carousel scroll functionality
let carouselContainer = null

function scrollCarousel(direction) {
  if (!carouselContainer) return

  const scrollAmount = 410 // Card width (387px) + gap (1.5rem ≈ 24px)
  const currentScroll = carouselContainer.scrollLeft
  const targetScroll =
    direction === 'next' ? currentScroll + scrollAmount : currentScroll - scrollAmount

  carouselContainer.scrollTo({
    left: targetScroll,
    behavior: 'smooth',
  })
}

//functions
async function fetchEvents() {
  try {
    featureEvents.isLoading = true
    featureEvents.error = null

    // TODO: Replace with actual API endpoint during production deployment
    const response = await fetch('/api/events/')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Update the reactive data
    featureEvents.events = data.events || data
    featureEvents.hasData = featureEvents.events.length > 0
  } catch (error) {
    // TODO: Remove mock data fallback during production deployment
    console.log('Using mock data for featured events (development mode)')
    featureEvents.error = null // Clear error since we have mock data
    featureEvents.hasData = true
  } finally {
    featureEvents.isLoading = false
  }
}

// TODO: Remove this mock function during production deployment
function navigateToEvent(eventId) {
  // This will be handled by RouterLink in template
  console.log(`Navigating to event ${eventId}`)
}

// Fetch events when component mounts
onMounted(() => {
  fetchEvents()
  // Get reference to carousel container for scrolling
  carouselContainer = document.querySelector('.events-scroll-container')
})
</script>

<template>
  <div class="featured-events">
    <h2 class="section-title">Featured Events</h2>

    <!--Loading states-->
    <div v-if="featureEvents.isLoading" class="loading">Loading Events...</div>

    <!--Error state -->
    <div v-if="featureEvents.error" class="error">Error: {{ featureEvents.error }}</div>

    <!--Continuous Scroll Carousel Container-->
    <div v-if="featureEvents.hasData" class="carousel-container">
      <div class="events-scroll-container">
        <div class="events-row">
          <div v-for="event in featureEvents.events" :key="event.id" class="event-card">
            <RouterLink :to="`/event/${event.id}`" class="event-link">
              <div class="event-image-container">
                <img :src="event.image" :alt="event.title" class="event-image" />
              </div>
              <div class="event-content">
                <h3 class="event-title">{{ event.title }}</h3>
                <div class="event-details">
                  <p class="event-date">📅 {{ event.date }}</p>
                  <p class="event-time">🕒 {{ event.time }}</p>
                  <p class="event-location">📍 {{ event.location }}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Custom Navigation Buttons -->
      <button class="carousel-control-prev" type="button" @click="scrollCarousel('prev')">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" @click="scrollCarousel('next')">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.featured-events {
  padding: 40px 130px;
  background-color: #f8f9fa;
}

.section-title {
  font-size: 2rem;
  color: #006852;
  font-family: 'Lato', sans-serif;
  padding-left: 40px;
  margin-top: 40px;
  font-weight: 700;
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

/* Carousel container with navigation */
.carousel-container {
  position: relative;
  padding: 25px 40px;
}

/* Horizontal scroll container */
.events-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.events-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Events row layout for horizontal scrolling */
.events-row {
  display: flex;
  gap: 1.5rem;
  padding: 0;
  align-items: stretch;
  width: max-content;
}

/* Event card with fixed height and width */
.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 387px;
  min-width: 387px;
  height: 488px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
  margin: 20px 0;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* RouterLink styling */
.event-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.event-link:hover {
  text-decoration: none;
  color: inherit;
}

.event-image-container {
  position: relative;
  width: 100%;
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

.event-content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.event-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-details p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

/* Mobile responsive */
@media (max-width: 768px) {
  .featured-events {
    padding: 30px 15px;
  }

  .section-title {
    font-size: 1.5rem;
    padding-left: 20px;
  }

  .carousel-container {
    padding: 15px 20px;
  }

  .events-row {
    gap: 1rem;
  }

  .event-card {
    width: 309px;
    min-width: 309px;
    height: 390px;
  }

  .event-image-container {
    height: 160px;
  }

  .event-content {
    padding: 1rem;
  }

  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }

  .carousel-control-prev {
    left: -10px;
  }

  .carousel-control-next {
    right: -10px;
  }
}
</style>
