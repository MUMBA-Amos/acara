<script setup>
//javaScript search logic

//imports
import { ref, watch } from 'vue'
import MonthStrip from '../homepage/monthStrip.vue' // <-- match file name exactly
import CategoriesBar from '../homepage/CategoriesBar.vue'

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

function handleLogin() {
  console.log('Login clicked')
  // Add your login logic here
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
      <!--Login Button-->
      <div class="login-section">
      <RouterLink to="/loginPage">
          <button type="button" class="login-button" @click="handleLogin">
            Login
          </button>
      </RouterLink>
      </div>
      
      <!--Logo-->
      <div class="logo-section">
        <img src="@/assets/logo-goacara.png" alt="Logo" class="logo" />
      </div>

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
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative; /* For absolute positioning of logo */
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  margin-bottom: 25px;
}

.categories-section {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
/* Large tablets and small desktops */
@media (max-width: 1024px) {
  .header-container {
    padding: 18px;
    min-height: 38vh;
  }

  .header-content {
    gap: 8px;
    margin-top: 80px;
  }

  .logo {
    height: 110px;
    width: 110px;
  }

  .logo-section {
    left: 150px;
  }

  .login-section {
    top: 18px;
    right: 18px;
  }

  .login-button {
    padding: 8px 16px;
    font-size: 13px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .header-container {
    padding: 15px;
    min-height: 45vh;
  }

  .header-content {
    gap: 8px;
    margin-top: 70px;
  }

  .month-section {
    margin-bottom: 20px;
  }

  .search-container {
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }

  .search-input {
    width: 100%;
    font-size: 15px;
    padding: 12px 18px;
  }

  .calendar-button {
    width: 100%;
    padding: 12px 18px;
    font-size: 15px;
  }

  .logo {
    height: 90px;
    width: 90px;
  }

  .logo-section {
    top: 15px;
    left: 20px;
  }

  .login-section {
    top: 15px;
    right: 15px;
  }

  .login-button {
    padding: 8px 14px;
    font-size: 12px;
  }
}

/* Large phones */
@media (max-width: 600px) {
  .header-container {
    padding: 12px;
    min-height: 50vh;
  }

  .header-content {
    gap: 6px;
    margin-top: 60px;
  }

  .month-section {
    margin-bottom: 18px;
  }

  .search-input {
    font-size: 14px;
    padding: 10px 16px;
  }

  .calendar-button {
    font-size: 14px;
    padding: 10px 16px;
  }

  .logo {
    height: 80px;
    width: 80px;
  }

  .login-section {
    top: 12px;
    right: 12px;
  }

  .login-button {
    padding: 6px 12px;
    font-size: 11px;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .header-container {
    padding: 10px;
    min-height: 55vh;
  }

  .header-content {
    gap: 5px;
    margin-top: 50px;
  }

  .month-section {
    margin-bottom: 15px;
  }

  .search-input {
    font-size: 13px;
    padding: 8px 14px;
  }

  .calendar-button {
    font-size: 13px;
    padding: 8px 14px;
  }

  .logo {
    height: 70px;
    width: 70px;
  }

  .logo-section {
    top: 10px;
    left: 15px;
  }

  .login-section {
    top: 10px;
    right: 10px;
  }

  .login-button {
    padding: 6px 10px;
    font-size: 10px;
  }
}

/* iPhone SE and extra small phones */
@media (max-width: 375px) {
  .header-container {
    padding: 8px;
    min-height: 58vh;
  }

  .header-content {
    gap: 5px;
    margin-top: 45px;
  }

  .month-section {
    margin-bottom: 15px;
  }

  .search-input {
    font-size: 13px;
    padding: 8px 14px;
  }

  .calendar-button {
    font-size: 13px;
    padding: 8px 14px;
  }

  .logo {
    height: 65px;
    width: 65px;
  }

  .logo-section {
    top: 8px;
    left: 12px;
  }

  .login-section {
    top: 8px;
    right: 8px;
  }

  .login-button {
    padding: 5px 8px;
    font-size: 9px;
  }
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; /* Space between logo row and month strip */
}

/* NEW: Login section */
.login-section {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.login-button {
  padding: 10px 20px;
  border: 2px solid #f4e7ce;
  background: transparent;
  color: #f4e7ce;
  font-weight: 500;
  font-family: 'Kantumruy Pro', sans-serif;
  cursor: pointer;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.login-button:hover {
  background: #f4e7ce;
  color: #006852;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 231, 206, 0.3);
}

/* NEW: Logo section */
.logo-section {
  position: absolute;
  top: 20px;
  left: 290px;
  z-index: 10;
}

.logo {
  height: 130px;
  width: 130px;
}

/* Responsive logo adjustments */
@media (max-width: 1200px) {
  .logo-section {
    left: 200px; /* Adjust for medium screens */
  }
}

@media (max-width: 768px) {
  .logo-section {
    top: 15px;
    left: 20px; /* Move to edge on smaller screens */
  }

  .logo {
    height: 100px;
    width: 100px;
  }
}

@media (max-width: 480px) {
  .logo-section {
    top: 10px;
    left: 15px; /* Keep close to edge on mobile */
  }

  .logo {
    height: 80px;
    width: 80px;
  }
}

/* UPDATED: Search section */
.search-section {
  width: auto; /* Changed from 100% */
  display: flex;
  justify-content: flex-end; /* Changed from center */
}
</style>
