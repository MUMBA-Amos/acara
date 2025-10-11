<script setup>
import { reactive, computed, onMounted, ref } from 'vue'

// Sorting options
const sortBy = ref('date')
const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Title' }
]

// Get current month name
const currentMonth = computed(() => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[new Date().getMonth()]
})

//Constants
const monthlyEvents = reactive({
  // TODO: Replace with actual API data during production deployment
  monthEvents: [
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 15th',
      time: '2:00 PM',
      location: 'Kuching',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 16th',
      time: '3:00 PM',
      location: 'Miri',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 17th',
      time: '4:00 PM',
      location: 'Sibu',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 18th',
      time: '5:00 PM',
      location: 'Bintulu',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 8,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 19th',
      time: '6:00 PM',
      location: 'Limbang',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 9,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 20th',
      time: '7:00 PM',
      location: 'Sarikei',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 10,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 21st',
      time: '8:00 PM',
      location: 'Mukah',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 11,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 22nd',
      time: '9:00 PM',
      location: 'Betong',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 12,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 23rd',
      time: '10:00 AM',
      location: 'Kapit',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 13,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 24th',
      time: '11:00 AM',
      location: 'Sri Aman',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 14,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 25th',
      time: '12:00 PM',
      location: 'Lawas',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 15,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 26th',
      time: '1:00 PM',
      location: 'Marudi',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 16,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 27th',
      time: '2:00 PM',
      location: 'Daro',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 17,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 28th',
      time: '3:00 PM',
      location: 'Pusa',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 18,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 29th',
      time: '4:00 PM',
      location: 'Belaga',
      image: '/src/assets/rainforest.jpg'
    },
    {
      id: 19,
      title: 'Lorem ipsum dolor sit amet',
      date: 'May 30th',
      time: '5:00 PM',
      location: 'Tatau',
      image: '/src/assets/rainforest.jpg'
    }
  ],
  isLoading: false,
  error: null,
  hasData: true,
})

// Computed property for sorted events
const sortedEvents = computed(() => {
  const events = [...monthlyEvents.monthEvents]
  
  switch (sortBy.value) {
    case 'date':
      return events.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'popularity':
      return events.sort((a, b) => b.popularity - a.popularity)
    case 'title':
      return events.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return events
  }
})

//functions
async function fetchMonthlyEvents() {
  try {
    monthlyEvents.isLoading = true
    monthlyEvents.error = null

    // TODO: Replace with actual API endpoint during production deployment
    const response = await fetch('/api/monthly-events')

    const data = await response.json()

    // Update the retrieved data
    monthlyEvents.monthEvents = data.monthEvents || data
    monthlyEvents.hasData = monthlyEvents.monthEvents.length > 0
  } catch (error) {
    // TODO: Remove mock data fallback during production deployment
    console.log('Using mock data for monthly events (development mode)')
    monthlyEvents.error = null // Clear error since we have mock data
    monthlyEvents.hasData = true
  } finally {
    monthlyEvents.isLoading = false
  }
}

// TODO: Remove this mock function during production deployment
function handleSortChange() {
  console.log(`Sorting events by: ${sortBy.value}`)
}

// Fetch events when component mounts
onMounted(() => {
  fetchMonthlyEvents()
})
</script>

<template>
  <div class="month-events">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">Events in {{ currentMonth }} 2025</h2>
        <div class="sort-controls">
          <label for="sort-select" class="sort-label">Sort by:</label>
          <select 
            id="sort-select" 
            v-model="sortBy" 
            @change="handleSortChange"
            class="sort-select"
          >
            <option 
              v-for="option in sortOptions" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="monthlyEvents.isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading events...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="monthlyEvents.error" class="error-state">
        <p>{{ monthlyEvents.error }}</p>
      </div>

      <!-- Events Grid -->
      <div v-else-if="monthlyEvents.hasData" class="events-grid">
        <div 
          v-for="event in sortedEvents" 
          :key="event.id" 
          class="event-card"
        >
          <RouterLink :to="`/event/${event.id}`" class="event-link">
            <div class="event-image-container">
              <img 
                :src="event.image" 
                :alt="event.title" 
                class="event-image"
              />
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

      <!-- No Events State -->
      <div v-else class="no-events-state">
        <p>No events found for this month.</p>
      </div>

      <!-- View All Events Button -->
      <div class="view-all-container">
        <RouterLink to="/events" class="view-all-button">
          View All Events
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.month-events {
  padding: 3rem 0;
  background-color: #f8f9fa;
}

.container {
  padding: 25px 40px;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.sort-select:hover {
  border-color: #007bff;
}

.sort-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-state {
  text-align: center;
  padding: 4rem 0;
  color: #dc3545;
  font-size: 1.1rem;
}

/* No Events State */
.no-events-state {
  text-align: center;
  padding: 4rem 0;
  color: #666;
  font-size: 1.1rem;
}

/* Events Grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: fit-content;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
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

/* View All Events Button */
.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding-bottom: 1rem;
}

.view-all-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #4a5568;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}

.view-all-button:hover {
  background: #2d3748;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
  text-decoration: none;
}

.view-all-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .container {
    padding: 15px 35px;
  }
  
  .view-all-button {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .event-image-container {
    height: 180px;
  }
  
  .view-all-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
