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
        systemQueryAmountMultiplier: 1,
        stockQueryAmountMultiplier: 1,
        showPreloader: false,
        showErrorMessage: false,
        errorMessage: "",
        showSuccessMessage: false,
        successMessage: ""
    }
  })


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import './assets/tailwind.css'
import './assets/css/custom-font.css' 


library.add(fas)

createApp(App)
.use(store)
.use(router)
.use(autoAnimatePlugin)
.component("fa", FontAwesomeIcon)
.mount('#app')
