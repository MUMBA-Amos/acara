<script setup>
// Month events component - content to be added later
import { reactive, computed, onMounted } from 'vue'

//Constants

const monthlyEvents = reactive({
  monthEvents: [{ id: 0, title: '', date: '', time: '', location: '' }],
  isloading: false,
  error: null,
  hasData: true,
})

//functions
async function fetchMonthlyEvents() {
  try {
    monthlyEvents.isloading = true
    monthlyEvents.error = null

    const response = await fetch('API')

    const data = await response.json()

    //updata the retrieved data
    monthlyEvents.monthEvents = data.monthEvents || data
    monthlyEvents.hasData = monthlyEvents.monthEvents.length > 0
  } catch (error) {
    monthlyEvents.error = 'Failed to fetch Monthly Events'
    console.error('Error fetching Monthly events:', error)
  } finally {
    monthlyEvents.isloading = false
  }
}
</script>

<template>
  <div class="month-events">
    <!-- Month events content will be added here -->
    <h1>MOTHLY EVENTS COMING</h1>
  </div>
</template>

<style scoped>
.month-events {
  padding: 40px 0;
  background-color: #ffffff;
  min-height: 200px;
}
</style>
