<script setup>
import Header from '../components/shared/Header.vue'
import TermsOfServiceContent from '../components/terms-of-service/TermsOfServiceContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="terms-of-service-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Terms of Service Content -->
    <TermsOfServiceContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.terms-of-service-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>