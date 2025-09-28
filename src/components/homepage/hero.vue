<script setup>
// Hero component with image background and overlaid text
</script>

<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Rainforest Festival 2025</h1>
      <p class="hero-subtitle">20th June - 22nd June | Sarawak Cultural Village, Kuching</p>
      <p class="hero-quote">"Echoes of the Earth, Heartbeat of Borneo."</p>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 500px;
  background-image: url('/src/assets/rainforest.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}

.hero-title {
  font-family: 'Kantumruy Pro', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
}

.hero-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 15px 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.hero-quote {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
    min-height: 400px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-quote {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 50vh;
    min-height: 350px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-quote {
    font-size: 0.9rem;
  }
}
</style>
