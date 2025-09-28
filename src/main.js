import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // includes Popper

const app = createApp(App)
app.use(router)
if (import.meta.env.PROD) app.config.devtools = false
app.mount('#app')
