<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative text-[14px]">
            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2"> Opdater produkt</h1>

            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Produktnavn</p>
            <input placeholder="Indtast produktnavn" class="indent-[16px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-semibold" type="text" v-model="fieldValue" />


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">På lager</p>
            <div class="h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left flex items-center indent-[16px] opacity-40">
                <p class="font-semibold">{{this.påLager}}</p> 
            </div>


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Lager grænseværdi</p>
            <input placeholder="Min Grænseværdi" @keydown="nameKeydown($event)"
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-semibold"
                type="text" v-model="threshold" />
            <button @click="updateProdukt"
                class="bg-[#0097ff] text-white w-fit font-medium rounded-lg p-2 mt-[20px] right-2">
                Opdater
            </button>
        </div>
    </div>
</template>

<script>
//firebase
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            fieldValue: this.$store.state.lager[this.$store.state.TempIndex].Produktnavn,
            threshold: this.$store.state.lager[this.$store.state.TempIndex].Threshold,
            påLager: this.$store.state.lager[this.$store.state.TempIndex].Qt_på_lager
        };
    },
    components: {
    },
    methods: {

        async updateProdukt() {

            if (this.fieldValue != "" && this.threshold != null) {
                
            try {
                const ref = doc(db, "produkter", this.$store.state.lager[this.$store.state.TempIndex].id );
                await updateDoc(ref, {
                    Produktnavn: this.fieldValue,
                    Threshold: this.threshold
                });

                console.log( "Updated " + this.$store.state.lager[this.$store.state.TempIndex].id +  "(" +  this.$store.state.lager[this.$store.state.TempIndex].Produktnavn + ")" + " from: produkter");

                this.queryFirestore();
                this.$store.state.TempIndex = null;

                this.$router.push('/lager')

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev opdateret i 'Produkter' databasen. "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)

            } catch (error) {
                console.error("Kunne ikke opdaterer " + this.$store.state.lager[this.$store.state.TempIndex].id + ": " + error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke opdaterer " + this.$store.state.lager[this.$store.state.TempIndex].id + ": " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }

            } 

            else {

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Du har ikke udfyldt alle fælterne i formularen, check om du har overset et fælt."
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }

        },

        nameKeydown(e) {
            if (
                !/-|^[0-9]*$/.test(e.key) &&
                e.key != "Backspace" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight"
            ) {
                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kun tal(0-9) og '-' tilladt i dette fælt"
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)
                
                e.preventDefault();
            }
        },
    },
    mixins: [queryFirestore],
};
</script>
