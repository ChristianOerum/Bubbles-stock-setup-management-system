<template>
    
    <div @click.self="goToSystemPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <Nav_menu class="absolute left-0 top-0"></Nav_menu>
    
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Opdater system</h1>
            
            <input type="text" placeholder="System navn" class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold" v-model="SystemNavn">

            <button @click.self="toggleDropdown" class="h-[50px] w-[400px] text-[#00214B] text-left mt-2 indent-[15px] bg-white font-semibold rounded-lg">{{ SelectedOption.value == null ? "Opsat status" : SelectedOption.lable }}</button>
            <div v-if="this.dropdownOpen" class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelect($event, index)" v-for="(item, index) in this.DropdownOptions" v-bind:key="index" class="h-[40px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">{{ item.lable }}</button>
            </div>

            <input type="date" required pattern="\d{4}-\d{2}-\d{2}" class="mt-2 h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B]" v-model="dateValue"/>

            <p class="indent-[3px] mt-4 font-semibold">Produkter på system</p>

            <div class="mt-2 indent-[15px] h-auto w-[400px] rounded-lg rounded-lg overflow-hidden">
                <div v-for="(item, index) in this.BrugteProdukter" v-bind:key="index" class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p>{{ item.navn }}</p>
                    <input type="number" class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold" v-model="BrugteProdukter[index].qt">
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>
            </div>

            <button @click="updateSystem" class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">Opdater</button>

        </div>

    </div>
</template>

<script>
import { doc, updateDoc, getDocs, query, collection, orderBy} from "firebase/firestore"; 
import { db } from '@/firebase'
import Nav_menu from "../components/nav_menu.vue";

export default {
    data() {
        return {
            dateValue: null,
            dropdownOpen: false,
            DropdownOptions: [{lable: "Opsat", value: true},{lable: "Ikke opsat", value: false}],
            SelectedOption: [],
            SystemNavn: "",
            BrugteProdukter: []

        }
    },
    components: {
        Nav_menu
    },
    methods: {
        goToSystemPage(){
            this.$store.state.visiblePage = "Systemer"
        },

        toggleDropdown(){
            this.dropdownOpen = !this.dropdownOpen
        },

        dropdownSelect(ev, i) {
            this.SelectedOption = this.DropdownOptions[i]
            this.dropdownOpen = !this.dropdownOpen
        },
        async refreshSystmer(){
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
        },

        async updateSystem(){
            try {
                    const ref = doc(db, "systemer", this.$store.state.systemer[this.$store.state.TempIndex].id)
                    await updateDoc(ref, {
                        Brugsdato: new Date(this.dateValue),
                        Brugte_produkter: this.BrugteProdukter,
                        Opsatstatus: this.SelectedOption.value,
                        Systemnavn: this.SystemNavn


                    });

                console.log("Updated " + this.$store.state.systemer[this.$store.state.TempIndex].id + " from: test");

                if (this.Opsatstatus == true) {

                    for (const item in this.BrugteProdukter){
                        console.log(item.id)
                    }

                }

                this.refreshSystmer()
                this.goToSystemPage()

                } catch (error) {
                console.error("ERROR deleting " + this.$store.state.systemer[this.$store.state.TempIndex].id + " from: test " + error);
            }
            
        }
    },

    async mounted(){
        console.log(this.$store.state.systemer[this.$store.state.TempIndex])

        console.log(this.$store.state.systemer[this.$store.state.TempIndex].Brugsdato)

        this.dateValue = new Date((this.$store.state.systemer[this.$store.state.TempIndex].Brugsdato.seconds)*1000).toISOString().substr(0, 10),
        this.SystemNavn = this.$store.state.systemer[this.$store.state.TempIndex].Systemnavn

        if (this.$store.state.systemer[this.$store.state.TempIndex].Opsatstatus == false) {
            this.SelectedOption = {lable: "Ikke opsat", value: false}
        }
        else {
            this.SelectedOption = {lable: "Opsat", value: true}
        }
 
        this.BrugteProdukter = this.$store.state.systemer[this.$store.state.TempIndex].Brugte_produkter

 
    }

}
</script>