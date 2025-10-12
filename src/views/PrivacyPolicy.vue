<script setup>
import Header from '../components/shared/Header.vue'
import PrivacyPolicyContent from '../components/privacy-policy/PrivacyPolicyContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="privacy-policy-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Privacy Policy Content -->
    <PrivacyPolicyContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.privacy-policy-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>