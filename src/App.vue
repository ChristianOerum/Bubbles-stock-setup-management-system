<template>

  <RouterView :key="$route.fullPath" v-slot="{ Component }">
    <Transition>
      <component :is="Component"/>
    </Transition>
    
    <Nav_menu :name="this.$router.currentRoute._value.path" class="absolute top-0 left-0"></Nav_menu>

    <transition name="fade" mode="out-in">
      <preloader v-if="this.$store.state.showPreloader == true" class="absolute top-0 left-0"></preloader>
    </transition>

    <transition name="fade" mode="out-in">
      <Confirm_Alert v-if="this.$store.state.showConfirmation == true" class="absolute top-0 left-0"></Confirm_Alert>
    </transition>

    <div class="absolute top-0 left-0 w-full flex flex-col">

      <transition name="fade" mode="out-in">
        <Error_Alert v-if="this.$store.state.showErrorMessage == true" class=""></Error_Alert>
      </transition>

      <transition name="fade" mode="out-in">
        <Success_Alert v-if="this.$store.state.showSuccessMessage == true" class=""></Success_Alert>
      </transition>

    </div>

  </RouterView>

</template>

<script>
//import af tailwind CSS
import "./assets/tailwind.css";
//import af dash_page komponent
import { defineComponent } from "vue";

//import mixins
import queryFirestore from "../src/mixins/queryFirestore";

//comps
import Success_Alert from "./components/Success_Alert.vue";
import preloader from "./components/preloader_view.vue";
import Nav_menu from '../src/components/nav_menu.vue'
import Error_Alert from "./components/Error_Alert.vue";
import Confirm_Alert from "./components/Confirm_Alert.vue";

export default defineComponent({
  name: "App",
  components: {
    Nav_menu,
    preloader,
    Error_Alert,
    Success_Alert,
    Confirm_Alert
  },
  data() {
    return {
      password: localStorage.getItem("Password"),
      VUE_APP_ACCESS_PIN: process.env.VUE_APP_ACCESS_PIN,
      InitialQueryRan: false
    };
  },

  methods: {},
  mixins: [queryFirestore],
  async mounted() {

    // run before each page load
    this.$router.beforeEach((to, from, next) => {

      next();

      if (to.path != "/" && to.path != "/login" && this.InitialQueryRan != true) {
        this.InitialQueryRan = true
        this.queryFirestore();
      }
    });

  },
  
});
</script>

<style>
.fade-enter-active {
    transition: opacity 1s
}
.fade-leave-active {
    transition: opacity 1s
}

.fade-enter-to {
    opacity: 100
}
.fade-leave-to {
    opacity: 0
}

</style>
