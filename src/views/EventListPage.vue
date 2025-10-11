<script setup>
import Header from '../components/shared/Header.vue'
import Footer from '../components/shared/footer.vue'
import EventList from '../components/listpage/EventList.vue'
</script>

<template>
  <div class="event-list-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Event List Content -->
    <EventList />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.event-list-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>