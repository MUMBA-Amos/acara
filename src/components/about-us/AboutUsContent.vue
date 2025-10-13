<template>
  <div class="about-us-content">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <h1 class="main-title">About GoAcara</h1>
        <div class="mission-section">
          <h2 class="section-title">Our Mission</h2>
          <p class="mission-text">
            To make Sarawak's living culture visible, connected, and empowered — through technology, storytelling, and youth participation.
          </p>
          <p class="description">
            GoAcara bridges heritage and innovation by turning scattered event information and hidden cultural gems into a structured digital ecosystem that celebrates Sarawak's identity, drives creative growth, and inspires the world to experience it.
          </p>
        </div>
      </section>

      <!-- What We Do Section -->
      <section class="what-we-do-section">
        <h2 class="section-title">What We Do</h2>
        <p class="intro-text">We connect Sarawak's communities, creators, and cultures by:</p>
        <ul class="features-list">
          <li>Mapping and amplifying all cultural and community events across Sarawak.</li>
          <li>Empowering youth and local creatives to share their stories digitally.</li>
          <li>Partnering with government, corporates, and communities to grow a sustainable cultural economy.</li>
        </ul>
        <div class="highlight-box">
          <p class="highlight-text">
            All the events that matter — food, music, culture, youth — brought together in one place.
            We transform scattered details into a living cultural index: Sarawak's traditions made discoverable, connected, and cloud-powered for the world.
          </p>
          <p class="tagline">Discover. Connect. Engage.</p>
        </div>
      </section>

      <!-- Who We Are Section -->
      <section class="who-we-are-section">
        <h2 class="section-title">Who We Are</h2>
        <p class="description">
          Founded by a diverse team of locals — technologists, creatives, and community builders — GoAcara is built from the ground up with one shared mission:
          to make Sarawak's events visible, connected, and celebrated.
        </p>
        <p class="description">
          Every member of our team believes in the power of technology to preserve culture, empower youth, and connect communities — without losing the heart and authenticity that make Sarawak truly unique.
        </p>
      </section>

      <!-- Guiding Ethos Section -->
      <section class="ethos-section">
        <h2 class="section-title">Our Guiding Ethos</h2>
        <h3 class="ethos-subtitle">Technology with Purpose. Culture with Heart.</h3>
        <div class="ethos-grid">
          <div class="ethos-item">
            <h4>Safe by Design</h4>
            <p>A calm, respectful digital space where communities, cultures, and creators feel seen, not sold to.</p>
          </div>
          <div class="ethos-item">
            <h4>Simple, Not Shallow</h4>
            <p>Every feature exists for a reason: to help people discover, connect, or engage — nothing more, nothing less.</p>
          </div>
          <div class="ethos-item">
            <h4>Trust First</h4>
            <p>Transparency, local ownership, and cultural respect guide every partnership and every line of code.</p>
          </div>
          <div class="ethos-item">
            <h4>Meaningful Data</h4>
            <p>Insights are collected to empower Sarawak's creative ecosystem — never to exploit it.</p>
          </div>
          <div class="ethos-item">
            <h4>Less Noise, More Soul</h4>
            <p>GoAcara cuts through digital clutter to bring focus back to what truly matters: real events, real people, real culture.</p>
          </div>
        </div>
      </section>

      <!-- Core Message Section -->
      <section class="core-message-section">
        <h2 class="section-title">Our Core Message</h2>
        <h3 class="core-subtitle">Empowering Youth. Connecting Creatives. Preserving Heritage.</h3>
        <p class="core-description">
          GoAcara exists to ensure that Sarawak's culture doesn't just survive — it thrives, evolves, and inspires.
          Because when culture is visible, connected, and empowered, everyone — from the longhouse to the city — has a voice in shaping Sarawak's story.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-us-content {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #006852;
  margin-bottom: 2rem;
}

.mission-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #006852;
  margin-bottom: 1.5rem;
  text-align: center;
}

.mission-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: #34495e;
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: center;
}

.what-we-do-section,
.who-we-are-section,
.ethos-section,
.core-message-section {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  text-align: center;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.features-list li {
  font-size: 1.1rem;
  color: #555;
  padding: 0.75rem 0;
  border-left: 4px solid #006852;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
}

.highlight-box {
  background: linear-gradient(135deg, #006852, #004d3d);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
}

.highlight-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.ethos-subtitle,
.core-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: #4e4f50;
  text-align: center;
  margin-bottom: 2rem;
}

.ethos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.ethos-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #006852;
}

.ethos-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.ethos-item p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.core-description {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.7;
  text-align: center;
  margin-top: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .mission-section,
  .what-we-do-section,
  .who-we-are-section,
  .ethos-section,
  .core-message-section {
    padding: 1.5rem;
  }
  
  .ethos-grid {
    grid-template-columns: 1fr;
  }
}
</style>