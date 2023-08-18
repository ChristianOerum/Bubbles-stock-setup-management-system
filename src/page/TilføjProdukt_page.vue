<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center text-[14px] p-5 items-right relative">

            <h1 class="font-bold text-[24px] text-[#00214B] mb-2">Tilføj et nyt produkt</h1>

            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Produktnavn</p>
            <input placeholder="Indtast produktnavn"
                class="indent-[16px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                type='text' v-model="fieldValue" />

                <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Grænseværdi</p>

                <input placeholder="Min Grænseværdi" @keydown="nameKeydown($event)"
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                type="text" v-model="threshold" />
            <button @click="createProdukt"
                class="bg-[#0097ff] text-white w-fit text-[14px] font-medium rounded-lg p-2 mt-[20px] right-2">Opret produkt</button>

        </div>

    </div>
</template>

<script>
//firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/firebase'

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            fieldValue: "",
            threshold: null
        }
    },
    components: {
    },
    methods: {

        async createProdukt() {


            if (this.fieldValue != "" && this.threshold != null) {

                try {
                    await addDoc(collection(db, "produkter"), {
                        Produktnavn: this.fieldValue,
                        Threshold: this.threshold
                    });

                    this.queryFirestore()
                    this.$router.push('/lager')

                    this.$store.state.showSuccessMessage = true
                    this.$store.state.successMessage = "Data blev tilføjet til 'Produkter' databasen. "
                    console.log(this.$store.state.errorMessage )

                    setTimeout(() => {
                        this.$store.state.showSuccessMessage = false
                        this.$store.state.successMessage = ""
                    }, 5000)

                } catch (error) {
                    
                    console.error("Error adding document to produkter: ", error);

                    this.$store.state.showErrorMessage = true
                    this.$store.state.errorMessage = "Dataindsætnings problem: " + error
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
    mixins: [queryFirestore]
}
</script>