<script setup>
import Header from '../components/homepage/Header.vue'
import Hero from '../components/homepage/hero.vue'
import FeaturedEvents from '../components/homepage/featuredEvents.vue'
import MonthEvents from '../components/homepage/monthEvents.vue'
</script>

<template>
  <div class="homepage">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Hero section -->
    <Hero />

    <!-- Featured Events -->
    <FeaturedEvents />

    <!-- Month Events -->
    <MonthEvents />

    <!-- Footer -->
  </div>
</template>

<!-- <style scoped>
.homepage {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style> -->
