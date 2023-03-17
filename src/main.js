import { createStore } from 'vuex'
import { createApp } from 'vue'

//main state store
const store = createStore({
    state: {
        word: "hello"
    }
  })


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import './assets/tailwind.css'

library.add(fas)

createApp(App)
.use(store)
.component("fa", FontAwesomeIcon)
.mount('#app')
