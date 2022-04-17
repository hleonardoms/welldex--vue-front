import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.use(PrimeVue)
app.use(router)
app.mount('#app')
