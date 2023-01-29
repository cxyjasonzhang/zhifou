import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import { pinia } from './store'
import { createPinia } from 'pinia'

import router from './router'

// const app = createApp(App)
const pinia = createPinia()
// 挂载到vue实例
// app.use(pinia)
// app.use(router)
// app.mount('#app')
createApp(App).use(pinia).use(router).mount('#app')