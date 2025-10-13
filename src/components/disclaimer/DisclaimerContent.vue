<template>
  <div class="disclaimer-content">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <h1 class="main-title">Disclaimer</h1>
        <p class="last-updated">Last Updated: 12 Oct 2025</p>
      </section>

      <!-- Disclaimer Content -->
      <section class="disclaimer-section">
        <div class="disclaimer-card">
          <div class="intro-text">
            <p>
              Welcome to GoAcara. The information provided on 
              <a href="https://www.goacara.com.my" class="link">www.goacara.com.my</a>
              (the "Site") is intended for general informational purposes only.
            </p>
            <p>
              While we strive to ensure that all event listings are accurate and up to date, we cannot guarantee the accuracy, reliability, or completeness of the information displayed. Many event details are submitted by third parties (such as organizers or users) and may change without prior notice.
            </p>
          </div>

          <div class="disclaimer-item">
            <h2 class="item-title">1. No Responsibility for Event Changes or Cancellations</h2>
            <p>
              GoAcara is not responsible for any event-related changes, cancellations, inaccuracies, or schedule adjustments.
            </p>
            <p>
              We strongly recommend that users contact event organizers directly to confirm details such as timing, location, pricing, and availability before attending.
            </p>
          </div>

          <div class="disclaimer-item">
            <h2 class="item-title">2. Use at Your Own Risk</h2>
            <p>
              Your use of the Site—and any reliance on event information—is entirely at your own risk.
            </p>
            <p>
              GoAcara and its team are not liable for any losses, injuries, or damages (direct or indirect) that may result from participation in, or reliance on, any event listed on our platform.
            </p>
          </div>

          <div class="disclaimer-item">
            <h2 class="item-title">3. Third-Party Links and Submissions</h2>
            <p>
              GoAcara may contain links to external websites or services operated by third parties. We are not responsible for the content, accuracy, or privacy practices of those sites.
            </p>
            <p>
              We also reserve the right to moderate, edit, or remove any user-submitted events or content that violate our 
              <a href="/terms-of-service" class="link">Terms of Use</a> or community guidelines.
            </p>
          </div>

          <div class="disclaimer-item">
            <h2 class="item-title">4. No Professional Advice</h2>
            <p>
              The content on GoAcara is provided for information, entertainment, and event discovery purposes only. It should not be considered professional, legal, or financial advice.
            </p>
            <p>
              If you need specific advice, please consult a qualified professional.
            </p>
          </div>

          <div class="disclaimer-item">
            <h2 class="item-title">5. Governing Law</h2>
            <p>
              This Disclaimer shall be governed by and interpreted in accordance with the laws of Sarawak and the laws of Malaysia.
            </p>
          </div>

          <div class="contact-section">
            <h2 class="item-title">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Disclaimer, please contact us at:
            </p>
            <div class="contact-info">
              <p class="contact-item">
                📧 Email: <a href="mailto:contact@goacara.com.my" class="link">contact@goacara.com.my</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Important Notice -->
      <section class="notice-section">
        <div class="notice-card">
          <h3 class="notice-title">Important Notice</h3>
          <p class="notice-text">
            By using GoAcara, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer. 
            If you do not agree with any part of this Disclaimer, please discontinue use of our services.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.disclaimer-content {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.container {
  max-width: 900px;
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

.last-updated {
  font-size: 1rem;
  color: #666;
  font-style: italic;
  margin: 0;
}

.disclaimer-section {
  margin-bottom: 2rem;
}

.disclaimer-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.intro-text {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.intro-text p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.disclaimer-item {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.disclaimer-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.item-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #006852;
  margin-bottom: 1rem;
}

.disclaimer-item p {
  font-size: 1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.disclaimer-item p:last-child {
  margin-bottom: 0;
}

.link {
  color: #006852;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.contact-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #006852;
}

.contact-info {
  margin-top: 1rem;
}

.contact-item {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

.notice-section {
  margin-bottom: 2rem;
}

.notice-card {
  background: linear-gradient(135deg, #006852, #004d3d);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.notice-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.notice-text {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .disclaimer-card,
  .notice-card {
    padding: 1.5rem;
  }
  
  .item-title {
    font-size: 1.2rem;
  }
  
  .intro-text p,
  .disclaimer-item p {
    font-size: 0.95rem;
  }
}
</style>