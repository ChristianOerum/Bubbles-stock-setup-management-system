<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative text-[14px]">

            <h1 class="font-bold text-[24px] text-[#00214B] mb-2">Opret ny combo</h1>

            <input type="text" placeholder="Combo navn" class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] mb-2 focus:outline outline-[#0097ff] font-poppins font-semibold" v-model="comboNavn" />

                <div v-for="(item, index) in this.comboItemArray" v-bind:key="index" class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p>{{ item.navn }}</p>
                    <input type="number"
                        class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                        v-model="comboItemArray[index].qt" />
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>

                <button @click="createCombo()" class="bg-[#0097ff] text-white w-fit text-[14px] font-semibold rounded-lg p-2 mt-[20px] right-2">
                    Opret combo
                </button>

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
            comboItemArray: [],
            comboNavn: ""
        }
    },
    components: {
    },
    methods: {
        async createCombo() {

            if (this.comboNavn != '') {
                
                try {
                    await addDoc(collection(db, "combos"), {
                        combo: this.getArr(),
                        navn: this.comboNavn
                    });

                    this.queryFirestore()
                    this.$router.push('/manage_combos')

                    this.$store.state.showSuccessMessage = true
                    this.$store.state.successMessage = "Data blev tilføjet til 'Combo' databasen. "
                    console.log(this.$store.state.errorMessage )

                    setTimeout(() => {
                        this.$store.state.showSuccessMessage = false
                        this.$store.state.successMessage = ""
                    }, 5000)

                } catch (error) {
                    
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

        getArr(){
            let arr = []

            this.comboItemArray.forEach((item)=> {

                for(var i = 0; i < item.qt; i++){
                    arr.push(item.id)
                }
            })
            return arr
        }
    },

    mixins: [queryFirestore],

    mounted(){
            this.$store.state.lager.forEach((lagerItem) => {
                this.comboItemArray.push({ navn: lagerItem.Produktnavn, id: lagerItem.id, qt: 0  })
            })
    }
}
</script>