<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = ref([
  { name: 'Dashboard', icon: 'bi-speedometer2', path: '/admin' },
  { name: 'Events', icon: 'bi-calendar-event', path: '/admin/events' },
  { name: 'Event Requests', icon: 'bi-clipboard-check', path: '/admin/requests' },
  { name: 'Users', icon: 'bi-people', path: '/admin/users' },
  { name: 'Analytics', icon: 'bi-graph-up', path: '/admin/analytics' },
  { name: 'Settings', icon: 'bi-gear', path: '/admin/settings' },
])

function isActive(path) {
  return route.path === path || (path !== '/admin' && route.path.startsWith(path))
}
</script>

<template>
  <div class="sidebar">
    <!-- Logo/Brand -->
    <div class="sidebar-header">
      <img src="@/assets/logo-goacara.png" alt="GoAcara Logo" class="logo" />
      <h2>GoAcara Admin</h2>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <i :class="['bi', item.icon]"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <div class="admin-info">
        <div class="admin-avatar">
          <i class="bi bi-person-circle"></i>
        </div>
        <div class="admin-details">
          <p class="admin-name">Admin User</p>
          <p class="admin-role">Administrator</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #006852 0%, #005642 100%);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.sidebar-header {
  padding: 30px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.sidebar-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  border-left-color: white;
  color: white;
}

.nav-item i {
  font-size: 20px;
  margin-right: 15px;
  width: 24px;
}

.nav-item span {
  font-size: 15px;
  font-weight: 500;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-info {
  display: flex;
  align-items: center;
}

.admin-avatar {
  font-size: 40px;
  margin-right: 10px;
  color: white;
}

.admin-details {
  flex: 1;
}

.admin-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.admin-role {
  font-size: 12px;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

/* Scrollbar styling */
.sidebar-nav::-webkit-scrollbar {
  width: 5px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
