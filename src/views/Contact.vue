<script setup>
import Header from '../components/shared/Header.vue'
import ContactContent from '../components/contact/ContactContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="contact-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Contact Content -->
    <ContactContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>