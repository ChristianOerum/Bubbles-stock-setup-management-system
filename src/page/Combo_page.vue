<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Ændr combo (vælg)</h1>

            <button @click="$router.push('/tilfoej_combo')" class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-5 top-4 absolute">Tilføj ny</button>

            <div class="overflow-y-scroll w-[400px] h-[200px]">
                <button v-on:click="comboClick($event, index)" v-for="(item, index) in this.$store.state.combos" v-bind:key="index" class="h-[40px] w-[100%] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                        {{ item.comboNavn }}
                </button>
            </div>

            <div v-if="this.showComboInstance == true" class="relative">

                <div class="w-100 h-[4px] bg-black mt-4 rounded-full opacity-10"></div>

                <h1 class="font-semibold text-[24px] text-[#00214B] mt-4 mb-2">({{ this.ComboInstanceName }})</h1>

                <fa style="cursor: pointer" @click="deleteFromDB()" icon="trash-can" class="absolute w-auto right-4 top-11 h-[16px] ml-2" />

                <input type="text" placeholder="Combo navn" class="indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 mb-2 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold" v-model="nytComboNavn" />

                <div v-for="(item, index) in this.comboItemArray" v-bind:key="index"
                    class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p>{{ item.navn }}</p>
                    <input type="number"
                        class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                        v-model="comboItemArray[index].qt" />
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>

                <button @click="updateCombo()" class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">
                    Opdater
                </button>

            </div>



        </div>

    </div>
</template>

<script>
//firebase
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
        goToLagerPage() {
            this.$store.state.visiblePage = "Lager"
        },

        async createProdukt() {
            try {
                await addDoc(collection(db, "produkter"), {
                    Produktnavn: this.fieldValue
                });

                this.queryFirestore()
                this.$router.push('/lager')

                console.log("Added document to: produkter");
            } catch (error) {
                console.error("Error adding document to produkter: ", error);
            }

        },

        async deleteFromDB() {
            console.log(this.tempIndex)
            try {
                await deleteDoc(doc(db, "combos", this.$store.state.combos[this.tempIndex].id));

                console.log("deleted " + this.$store.state.combos[this.tempIndex].id + " from: combos");

                this.showComboInstance = false

                this.queryFirestore()

            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.combos[this.tempIndex].id + " from: combos " + error);
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

                console.log("Updated combo from: combos");
                
                this.queryFirestore();
                location.reload()

            } catch (error) {
                console.error("ERROR updating combo from: combos " + error);
            }

        }
    },

    mixins: [queryFirestore]
}
</script>