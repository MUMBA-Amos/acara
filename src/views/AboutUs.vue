<script setup>
import Header from '../components/shared/Header.vue'
import AboutUsContent from '../components/about-us/AboutUsContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="about-us-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- About Us Content -->
    <AboutUsContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.about-us-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>