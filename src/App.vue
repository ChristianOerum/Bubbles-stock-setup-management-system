<template>

  <RouterView v-slot="{ Component }">
    <Transition enter-from-class="opacity-0" enter-active-class="transition duration-500">
      <component :is="Component"/>
    </Transition>
    
    <Nav_menu v-if="this.$router.currentRoute._value.path != '/login'" :name="this.$router.currentRoute._value.path" class="absolute top-0 left-0"></Nav_menu>

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
import Nav_menu from '../src/components/nav_menu.vue'

export default defineComponent({
  name: "App",
  components: {
    Nav_menu
  },
  data() {
    return {
      password: localStorage.getItem("Password"),
      VUE_APP_ACCESS_PIN: process.env.VUE_APP_ACCESS_PIN,
    };
  },

  methods: {},
  mixins: [queryFirestore],
  async mounted() {
    this.queryFirestore(); 
  },
});
</script>
