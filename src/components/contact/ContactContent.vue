<template>
  <div class="contact-content">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <h1 class="main-title">Contact Us</h1>
        <p class="subtitle">Get in touch with the GoAcara team</p>
      </section>

      <!-- Contact Information Section -->
      <section class="contact-info-section">
        <div class="contact-card">
          <div class="contact-header">
            <h2 class="section-title">Let's Connect</h2>
            <p class="description">
              Have questions about GoAcara? Want to submit an event or partner with us? 
              We'd love to hear from you!
            </p>
          </div>
          
          <div class="contact-details">
            <div class="contact-item">
              <div class="contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#006852" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="#006852" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="contact-info">
                <h3>Email</h3>
                <a href="mailto:contact@goacara.com.my" class="contact-link">
                  contact@goacara.com.my
                </a>
              </div>
            </div>
          </div>

          <div class="additional-info">
            <h3 class="info-title">What can we help you with?</h3>
            <ul class="help-list">
              <li>Event submissions and listings</li>
              <li>Partnership opportunities</li>
              <li>Technical support</li>
              <li>General inquiries about GoAcara</li>
              <li>Feedback and suggestions</li>
            </ul>
          </div>

          <div class="response-time">
            <p class="response-text">
              <strong>Response Time:</strong> We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="cta-section">
        <div class="cta-card">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-description">
            Join the GoAcara community and help us showcase Sarawak's vibrant culture and events.
          </p>
          <div class="cta-buttons">
            <a href="/event-submission-guidelines" class="btn btn-primary">
              Submit an Event
            </a>
            <a href="/about-us" class="btn btn-secondary">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contact-content {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #006852;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
  margin: 0;
}

.contact-info-section {
  margin-bottom: 3rem;
}

.contact-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #006852;
}

.contact-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #006852;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.contact-details {
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition: border-color 0.3s ease;
}

.contact-item:hover {
  border-color: #006852;
}

.contact-icon {
  color: #007bff;
  flex-shrink: 0;
}

.contact-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
}

.contact-link {
  font-size: 1.1rem;
  color: #006852;
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}

.additional-info {
  margin-bottom: 2rem;
}

.info-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-list li {
  font-size: 1rem;
  color: #555;
  padding: 0.5rem 0;
  border-left: 3px solid #006852;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 0 4px 4px 0;
}

.response-time {
  text-align: center;
  padding: 1rem;
  background: #fff3cd;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.response-text {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.cta-section {
  margin-bottom: 2rem;
}

.cta-card {
  background: linear-gradient(135deg, #006852, #004d3d);;
  color: white;
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: #f8f9fa;
  color: #006852;
}

.btn-primary:hover {
  background: #f8f9fa;
  color: #006852;
  transform: translateY(-2px);
  border-color: #f8f9fa;
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.btn-secondary:hover {
  background: white;
  color: #006852  ;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .contact-card,
  .cta-card {
    padding: 1.5rem;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>