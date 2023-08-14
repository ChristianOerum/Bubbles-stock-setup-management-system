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
        demoSystemer: [],
        combos: [],
        medarbejdere: [],
        todaysDate: "",
        visiblePage: "Lager",
        TempIndex: null,
        TempIndex2: null,
        HideCompleted: true,
        HideOutOfDate: false,
        HideDelivered: true,
        completedReQueryRead: false,
    }
  })


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import './assets/tailwind.css'

library.add(fas)

createApp(App)
.use(store)
.use(router)
.use(autoAnimatePlugin)
.component("fa", FontAwesomeIcon)
.mount('#app')
