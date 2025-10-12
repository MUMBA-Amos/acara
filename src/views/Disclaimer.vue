<script setup>
import Header from '../components/shared/Header.vue'
import DisclaimerContent from '../components/disclaimer/DisclaimerContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="disclaimer-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Disclaimer Content -->
    <DisclaimerContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.disclaimer-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>