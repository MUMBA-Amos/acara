<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import EventsManagement from '@/components/admin/EventsManagement.vue'
import CreateEvent from '@/components/admin/CreateEvent.vue'
import EventRequests from '@/components/admin/EventRequests.vue'
import UsersManagement from '@/components/admin/UsersManagement.vue'
import Analytics from '@/components/admin/Analytics.vue'
import Settings from '@/components/admin/Settings.vue'

const route = useRoute()

const currentComponent = computed(() => {
  const path = route.path

  if (path.startsWith('/admin/events/create') || path.startsWith('/admin/events/edit')) {
    return CreateEvent
  } else if (path.startsWith('/admin/events')) {
    return EventsManagement
  } else if (path.startsWith('/admin/requests')) {
    return EventRequests
  } else if (path.startsWith('/admin/users')) {
    return UsersManagement
  } else if (path.startsWith('/admin/analytics')) {
    return Analytics
  } else if (path.startsWith('/admin/settings')) {
    return Settings
  }

  return AdminDashboard
})
</script>

<template>
  <component :is="currentComponent" />
</template>

<style scoped></style>
