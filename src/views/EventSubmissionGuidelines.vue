<script setup>
import Header from '../components/shared/Header.vue'
import EventSubmissionGuidelinesContent from '../components/event-submission-guidelines/EventSubmissionGuidelinesContent.vue'
import Footer from '../components/shared/footer.vue'
</script>

<template>
  <div class="event-submission-guidelines-page">
    <!-- Header with search, month strip, and categories -->
    <Header />

    <!-- Event Submission Guidelines Content -->
    <EventSubmissionGuidelinesContent />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.event-submission-guidelines-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>