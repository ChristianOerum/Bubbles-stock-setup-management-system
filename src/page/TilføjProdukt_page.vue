<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
    
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Tilføj et nyt produkt</h1>
            <input placeholder="Indtast produktnavn" class="indent-[16px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl" type='text' v-model="fieldValue"/>
            <button @click="createProdukt" class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">Godkend</button>

        </div>

    </div>
</template>

<script>
import { collection, addDoc} from "firebase/firestore"; 
import { db } from '@/firebase'

export default {
    data() {
        return {
            fieldValue: ""
        }
    },
    components: {

    },
    methods: {
        goToLagerPage(){
            this.$store.state.visiblePage = "Lager"
        },

        async createProdukt(){
                try {
                await addDoc(collection(db, "produkter"), {
                    Produktnavn: this.fieldValue
                }); 
                
                this.$store.state.visiblePage = "Lager"

                console.log("Added document to: produkter");
                } catch (error) {
                console.error("Error adding document to produkter: ", error);
            }
            
        }
    }
}
</script>