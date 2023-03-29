import { createStore } from 'vuex'
import { createApp } from 'vue'
import router from './router'

//main state store
const store = createStore({

  // this.$store.state.lager

    state: {
        lager: [],
        lagerUdInd: [],
        systemer: [],
        todaysDate: "",
        visiblePage: "Lager",
        TempIndex: null,
        HideCompleted: true,
        HideOutOfDate: true
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
.use(router)
.component("fa", FontAwesomeIcon)
.mount('#app')
