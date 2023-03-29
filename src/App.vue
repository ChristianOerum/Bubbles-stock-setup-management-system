<template>
  <RouterView/>
</template>

<script>
//import af tailwind CSS
import "./assets/tailwind.css";
//import af dash_page komponent
import { defineComponent } from "vue";

//import mixins
import queryFirestore from "../src/mixins/queryFirestore";

export default defineComponent({
  name: "App",
  components: {
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
