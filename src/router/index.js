import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HighlightEvent from '../views/HighlightEvent.vue'
import LoginPage from '../views/LoginPage.vue'
import EventListPage from '../views/EventListPage.vue'
import AboutUs from '../views/AboutUs.vue'
import Contact from '../views/Contact.vue'
import Disclaimer from '../views/Disclaimer.vue'
import EventSubmissionGuidelines from '../views/EventSubmissionGuidelines.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import TermsOfService from '../views/TermsOfService.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/event/:id',
    name: 'HighlightEvent',
    component: HighlightEvent,
    props: true
  },

  
  {
    path: '/loginPage',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/events',
    name: 'Events',
    component: EventListPage
  },
  {
    path: '/event',
    name: 'EventList',
    component: EventListPage
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: Disclaimer
  },
  {
    path: '/event-submission-guidelines',
    name: 'EventSubmissionGuidelines',
    component: EventSubmissionGuidelines
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: TermsOfService
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
