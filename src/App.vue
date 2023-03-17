<template>
<LoginScreen v-if="password !== VUE_APP_ACCESS_PIN" v-model:modelValue="password">
</LoginScreen>

<Home v-else>
</Home>

<button @click="clearLocalStorage" class="absolute right-10 bottom-10">Logout</button>

</template>

<script>
//import af tailwind CSS
import './assets/tailwind.css'
//import af dash_page komponent
import LoginScreen from "./page/Login_screen.vue";
import Home from "./page/Home_page.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    LoginScreen,
    Home
  },
  data() {
    return {
      password: localStorage.getItem('Password'),
      VUE_APP_ACCESS_PIN: process.env.VUE_APP_ACCESS_PIN
    }
  },

  methods: {
    clearLocalStorage(){
      localStorage.clear();
      location.reload();
    }

  },
});
</script>
