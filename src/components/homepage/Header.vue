<script setup>
//javaScript search logic

//imports
import { ref, watch } from 'vue'
import MonthStrip from './monthStrip.vue' // <-- match file name exactly
import CategoriesBar from './CategoriesBar.vue'

//constants
const query = ref('')
let debounceId = null
const selectedDate = ref(new Date())
const selectedCategory = ref('all')

const showCategories = ref(true) // <— hidden at start

//functions
async function searchEventsInDB(text) {
  const res = await fetch('Api')
  const data = await res.json()
  return data
}

function openFilters() {
  console.log('Full Calender')
}

watch(query, (val) => {
  clearTimeout(debounceId)
  const q = val.trim()
  if (q.length < 2) return

  debounceId = setTimeout(() => {
    searchEventsInDB(q)
  }, 300)
})

function onMonthChange({ year, month }) {
  console.log('Header month change:', year, month)
  showCategories.value = true // <— reveal categories
  console.log('Header month change:', year, month)
}

function onCategoryChange(slug) {
  selectedCategory.value = slug
  // call your API/filter: year, month, category
  // searchEventsInDB(query.value, { year, month, category: slug })
}
</script>

<!-- Output Render template -->
<template>
  <div class="header-container">
    <div class="header-content">
      <!--Search bar-->
      <div class="search-section">
        <div class="search-container">
          <input
            type="text"
            id="homeSearch"
            class="search-input"
            placeholder="Search events in Sarawak"
            aria-label="Search"
            v-model="query"
            @keyup.enter="searchNow"
          />
          <button type="button" class="calendar-button" @click="openFilters">Full Calendar</button>
        </div>
      </div>

      <!-- Month strip -->
      <div class="month-section">
        <MonthStrip
          v-model="selectedDate"
          :min-year="2018"
          :max-year="2030"
          @change="onMonthChange"
        />
      </div>

      <!-- Categories appear AFTER month is clicked -->
      <div v-if="showCategories" class="categories-section">
        <CategoriesBar variant="bar" v-model="selectedCategory" @change="onCategoryChange" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Header container */
.header-container {
  background: #006852; /* Green background */
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  max-width: 1200px;
  margin-top: 85px;
}

.search-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.month-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.categories-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom search container styling */
.search-container {
  display: flex;
  gap: 8px; /* Small gap between elements */
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  outline: none;
  background: #f5f5dc; /* Light beige background */
  color: #333;
  font-size: 16px;
  border-radius: 25px; /* Rounded input */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: #666;
}

.calendar-button {
  padding: 12px 20px;
  border: none;
  background: #2f4046; /* Dark grey background */
  color: #f4e7ce; /* Light grey text */
  font-weight: 500;
  font-family: 'Kantumruy Pro', sans-serif;
  cursor: pointer;
  border-radius: 25px; /* Rounded button */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
  white-space: nowrap; /* Prevent text wrapping */
}

.calendar-button:hover {
  background: #2c3e50; /* Slightly darker on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-container {
    padding: 15px;
    min-height: 35vh;
  }

  .header-content {
    gap: 3px;
  }

  .search-container {
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }

  .search-input {
    width: 100%;
    font-size: 14px;
    padding: 10px 16px;
  }

  .calendar-button {
    width: 100%;
    padding: 10px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 10px;
    min-height: 30vh;
  }

  .header-content {
    gap: 2px;
  }

  .search-input {
    font-size: 13px;
    padding: 8px 12px;
  }

  .calendar-button {
    font-size: 13px;
    padding: 8px 12px;
  }
}
</style>
