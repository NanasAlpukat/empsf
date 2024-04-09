import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './stores'
import './assets/css/index.css'
import './axios'
import 'remixicon/fonts/remixicon.css'
import { setHeaderToken } from './auth'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'


let token = localStorage.getItem('token')
if (!token) { 
   console.log(' maaf token nya tidak ada')
} 
setHeaderToken(token) 
  store.dispatch('users/user', token)
  .then(() => {
createApp(App).use(store).use(VueSweetalert2).use(router).mount('#app')
}).catch((error) => {
    console.error(error);
  })
