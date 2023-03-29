<template>
  <LoginScreen v-if="password !== VUE_APP_ACCESS_PIN" v-model:modelValue="password">
  </LoginScreen>

  <Lager v-else-if="this.$store.state.visiblePage == 'Lager'"> </Lager>

  <TilføjLager v-else-if="this.$store.state.visiblePage == 'TilføjLager'">
  </TilføjLager>

  <TilføjStock v-else-if="this.$store.state.visiblePage == 'TilføjStock'">
  </TilføjStock>

  <UpdateProdukt v-else-if="this.$store.state.visiblePage == 'UpdateProdukt'">
  </UpdateProdukt>

  <UpdateStock v-else-if="this.$store.state.visiblePage == 'UpdateStock'">
  </UpdateStock>

  <Systemer v-else-if="this.$store.state.visiblePage == 'Systemer'"> </Systemer>

  <TilføjSystemer v-else-if="this.$store.state.visiblePage == 'TilføjSystemer'">
  </TilføjSystemer>

  <UpdateSystemer v-else-if="this.$store.state.visiblePage == 'UpdateSystemer'">
  </UpdateSystemer>
</template>

<script>
//import af tailwind CSS
import "./assets/tailwind.css";
//import af dash_page komponent
import LoginScreen from "./page/Login_screen.vue";
import Lager from "./page/Lager_page.vue";
import TilføjLager from "./page/TilføjProdukt_page.vue";
import TilføjStock from "./page/TilføjStock_page.vue";
import UpdateProdukt from "./page/UpdateProdukt_page.vue";
import UpdateStock from "./page/UpdateStock_page.vue";
import Systemer from "./page/Systemer_page.vue";
import TilføjSystemer from "./page/TilføjSystem_page.vue";
import UpdateSystemer from "./page/UpdateSystem_page.vue";
import { defineComponent } from "vue";

//import mixins
import queryFirestore from "../src/mixins/queryFirestore";

export default defineComponent({
  name: "App",
  components: {
    LoginScreen,
    Lager,
    TilføjLager,
    TilføjStock,
    UpdateProdukt,
    UpdateStock,
    Systemer,
    TilføjSystemer,
    UpdateSystemer,
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
