<template>
<LoginScreen v-if="password !== VUE_APP_ACCESS_PIN" v-model:modelValue="password">
</LoginScreen>

<Lager v-else-if="this.$store.state.visiblePage == 'Lager'">
</Lager>

<TilføjLager v-else-if="this.$store.state.visiblePage == 'TilføjLager'">
</TilføjLager>

<TilføjStock v-else-if="this.$store.state.visiblePage == 'TilføjStock'">
</TilføjStock>

<UpdateProdukt v-else-if="this.$store.state.visiblePage == 'UpdateProdukt'">
</UpdateProdukt>

<UpdateStock v-else-if="this.$store.state.visiblePage == 'UpdateStock'">
</UpdateStock>

<Systemer v-else-if="this.$store.state.visiblePage == 'Systemer'">
</Systemer>

<TilføjSystemer v-else-if="this.$store.state.visiblePage == 'TilføjSystemer'">
</TilføjSystemer>

<UpdateSystemer v-else-if="this.$store.state.visiblePage == 'UpdateSystemer'">
</UpdateSystemer>


</template>

<script>
//import af tailwind CSS
import './assets/tailwind.css'
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
import { defineComponent } from 'vue';

//firebase import
import { collection, getDocs, query, orderBy } from "firebase/firestore"; 
import { db } from '@/firebase'

export default defineComponent({
  name: 'App',
  components: {
    LoginScreen,
    Lager,
    TilføjLager,
    TilføjStock,
    UpdateProdukt,
    UpdateStock,
    Systemer,
    TilføjSystemer,
    UpdateSystemer
  },
  data() {
    return {
      password: localStorage.getItem('Password'),
      VUE_APP_ACCESS_PIN: process.env.VUE_APP_ACCESS_PIN
    }
  },

  methods: {},
  async mounted(){
    this.$store.state.todaysDate = new Date(new Date().setHours(0,0,0,0))

    try {
            const docRef = await getDocs(query(collection(db, "systemer"), orderBy('Brugsdato')));

            this.$store.state.systemer = []


            docRef.forEach((doc) => {
                
                this.$store.state.systemer.push( {Systemnavn: doc.data().Systemnavn, Opsatstatus: doc.data().Opsatstatus, Brugsdato: doc.data().Brugsdato, Brugte_produkter: doc.data().Brugte_produkter, id: doc.id  } )

            });

        console.log("read data from: stock");

        } catch (error) {
        console.error("ERROR reading data from: stock " + error);
        
    }

    try {
          const docRef1 = await getDocs(collection(db, "produkter"));
          this.$store.state.lager = []

          docRef1.forEach((doc) => {
              this.$store.state.lager.push({Produktnavn: doc.data().Produktnavn, Qt_på_lager: 0, Qt_prøveperiode: 0, id: doc.id, Qt_behov_til_systemer: 0, ForfaldDato: null})
          });

      console.log("read data from: produkter");
      } catch (error) {
      console.error("ERROR reading data from: produkter " + error);
      
      }

      try {
          const docRef2 = await getDocs(query(collection(db, "stock"), orderBy('date')));

          this.$store.state.lagerUdInd = []

          docRef2.forEach((doc) => {
              let temp_indexing_of_arr = this.$store.state.lager.map(ref => ref.id).indexOf(doc.data().produkt_ref_id);
              this.$store.state.lager[temp_indexing_of_arr].Qt_på_lager += doc.data().update
              
              this.$store.state.lagerUdInd.unshift({Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.data().date.seconds, Update: doc.data().update, id: doc.id, beskrivelse: doc.data().beskrivelse })
          });

      console.log("read data from: stock");
      } catch (error) {
      console.error("ERROR reading data from: stock " + error);
      
      }

      (this.$store.state.systemer).forEach((parentItem) => {

            (parentItem.Brugte_produkter).forEach((childItem) => {

                let index = (this.$store.state.lager).indexOf(  (this.$store.state.lager).find(item => item.id === childItem.id)  )

                this.$store.state.lager[index].Qt_behov_til_systemer += childItem.qt

                if (this.$store.state.lager[index].ForfaldDato == null && this.$store.state.lager[index].Qt_behov_til_systemer > this.$store.state.lager[index].Qt_på_lager) {
                  this.$store.state.lager[index].ForfaldDato = new Date(  (parentItem.Brugsdato.seconds)*1000  )
                }

            })
        })

        //lager array med tilførte system qt korrektion
        console.log(this.$store.state.lager)

    

  }
});
</script>
