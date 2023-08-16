<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl justify-center p-5 items-right relative flex flex-row gap-4 text-[14px]">

            <div>
                <h1 class="font-bold text-[24px] text-[#00214B] mb-2">Ændr combo (vælg)</h1>

                <div class="overflow-y-scroll w-[400px] h-[458px]">
                    <button v-on:click="comboClick($event, index)" v-for="(item, index) in this.$store.state.combos" v-bind:key="index" class="h-[40px] w-[100%] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                            {{ item.comboNavn }}
                    </button>
                </div>

                <button @click="$router.push('/tilfoej_combo')" class="bg-[#0097ff] text-white w-fit text-[14px] font-medium mt-[20px] rounded-lg p-2">Tilføj ny</button>

            </div>

            <div v-if="this.showComboInstance == true" class="relative">

                
                    <h1 class="font-bold text-[24px] text-[#00214B] mb-2">({{ this.ComboInstanceName }})</h1>

                <input type="text" placeholder="Combo navn" class="indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 mb-2 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold" v-model="nytComboNavn" />

                <div v-for="(item, index) in this.comboItemArray" v-bind:key="index"
                    class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p>{{ item.navn }}</p>
                    <input type="number"
                        class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                        v-model="comboItemArray[index].qt" />
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>

                <button @click="updateCombo()" class="bg-[#0097ff] text-white w-fit text-[14px] font-medium rounded-lg p-2 mt-[20px] right-2">
                    Opdater
                </button>

                <fa style="cursor: pointer" @click="deleteFromDB()" icon="trash-can" class="text-[20px] absolute right-0 bottom-3 text-[#D24848]" />

            </div>



        </div>

    </div>
</template>

<script>
//firebase
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase'

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            showComboInstance: false,
            ComboInstanceName: "",
            comboItemArray: [],
            nytComboNavn: "",
            selectedItemIndex: null,
            tempIndex: null
        }
    },
    components: {
    },
    methods: {

        async deleteFromDB() {
            console.log(this.tempIndex)
            try {
                await deleteDoc(doc(db, "combos", this.$store.state.combos[this.tempIndex].id));

                console.log("deleted " + this.$store.state.combos[this.tempIndex].id + " from: combos");

                this.showComboInstance = false

                this.queryFirestore()

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Slettede " + this.$store.state.combos[this.tempIndex].id + " fra combos."
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)


            } catch (error) {

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke slette " + this.$store.state.combos[this.tempIndex].id + ": " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }

        },

        comboClick(ev, i) {
            this.tempIndex = i
            this.selectedItemIndex = null
            this.comboItemArray = []

            console.log(this.$store.state.combos[i])
            this.showComboInstance = true
            this.ComboInstanceName = this.$store.state.combos[i].comboNavn
            this.nytComboNavn = this.$store.state.combos[i].comboNavn
            this.selectedItemIndex = i

            this.$store.state.lager.forEach((lagerItem) => {
                this.comboItemArray.push({ navn: lagerItem.Produktnavn, id: lagerItem.id, qt: 0  })
            })

            this.$store.state.combos[i].comboIds.forEach((comboItem) => {

                let index = this.comboItemArray.indexOf(this.comboItemArray.find((item) => item.id === comboItem));

                this.comboItemArray[index].qt += 1;

            })

        },

        async updateCombo() {

            let tempArr = []
            let selectedArr = []

            this.comboItemArray.forEach((comboItem) => {
                if (comboItem.qt != 0) {
                    tempArr.push(comboItem)
                }
                else {
                    return
                }
            })

            tempArr.forEach((item) => {
                
                for (let i = 0; i < item.qt; i++) {
                    selectedArr.push(item.id)
                }

            })

            try {
                const ref = doc(db,"combos",this.$store.state.combos[this.selectedItemIndex].id
                );
                await updateDoc(ref, {
                    navn: this.nytComboNavn,
                    combo: selectedArr
                });

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev opdateret i 'Combo' databasen. "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)
                
                this.queryFirestore()

            } catch (error) {
                console.error("ERROR updating combo from: combos " + error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke opdaterer data i 'Combo' databasen: " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }

        }
    },

    mixins: [queryFirestore]
}
</script>