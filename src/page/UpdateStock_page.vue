<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative text-[14px]">
            <h1 class="font-bold text-[24px] text-[#00214B]">Opdater stock </h1>

            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Relaterede produkt</p>

            <div
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] opacity-40 rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold">
                <p class="relative top-[14px]">{{ this.name }}</p>
            </div>


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Ind eller ud værdi</p>

            <input placeholder="Vælg korrektions værdi" @keydown="nameKeydown($event)"
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                type="text" v-model="correctionValue" />


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Leverance bekræftet?</p>

            <button @click.self="toggleDropdownLeveret"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">{{
                    SelectedOptionLeveret.value == null ? "Vælg" : SelectedOptionLeveret.lable }}</button>
            <div v-if="this.dropdownOpenLeveret"
                class="w-[400px] max-h-[200px] bg-[#DDECFF] h-auto rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelectLeveret($event, index)" v-for="(item, index) in this.DropdownOptionsLeveret"
                    v-bind:key="index"
                    class="h-[20px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] mb-1 mt-1 text-left">{{ item.lable}}</button>
            </div>



            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Leverings dato</p>

            <input type="date" required pattern="\d{4}-\d{2}-\d{2}"
                class="h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B] rounded-lg" v-model="dateValue" />
            
            <textarea placeholder="Beskrivelse (valgfri)"
                class="resize-none p-3 mt-2 indent-[5px] h-[150px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                type="textarea" v-model="beskrivelse" />

            <button @click="updateStock()"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">
                Opdater
            </button>
        </div>
    </div>
</template>

<script>
//import firebase
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

//import mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            name: this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].Produktnavn,
            correctionValue: this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].Update,
            dateValue: new Date(this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].date * 1000).toISOString().substr(0, 10),
            beskrivelse: this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].beskrivelse,
            oldCorrectionValue: this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].Update,

            dropdownOpenLeveret: false,
            DropdownOptionsLeveret: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            SelectedOptionLeveret: [],

        };
    },
    components: {
    },
    methods: {
        nameKeydown(e) {
            if (
                !/-|^[0-9]*$/.test(e.key) &&
                e.key != "Backspace" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight"
            ) {
                console.log("Only Numbers allowed");
                e.preventDefault();
            }
        },

        toggleDropdownLeveret() {
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret
        },

        dropdownSelectLeveret(ev, i) {
            this.SelectedOptionLeveret = this.DropdownOptionsLeveret[i]
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret
        },

        async updateStock() {

            if (this.correctionValue != "" && this.dateValue != null && this.DropdownOptionsLeveret.length != 0) {

                try {
                const ref = doc(db, "stock", this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].id
                );
                await updateDoc(ref, {
                    date: new Date(this.dateValue),
                    update: Number(this.correctionValue),
                    beskrivelse: this.beskrivelse,
                    leveret: this.SelectedOptionLeveret.value
                });



                let productForQtCorrection = this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].productRefId
                let productForQtCorrectionId = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].productRefId))

                console.log()

                const ref2 = doc(db, "produkter", productForQtCorrection);

                if (Number(this.correctionValue) > 0) {
                    await updateDoc(ref2, {
                        StockQT: (Number(this.correctionValue) - this.oldCorrectionValue) + this.$store.state.lager[productForQtCorrectionId].Qt_på_lager
                    });
                    console.log("1")
                } 
                
                else {
                    await updateDoc(ref2, {
                        StockQT: ((this.oldCorrectionValue - Number(this.correctionValue))*-1) + this.$store.state.lager[productForQtCorrectionId].Qt_på_lager
                    });
                    console.log("2")
                }

                this.queryFirestore();
                this.$router.push('/lager')


                console.log("Updated " + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].id + " from: stock");

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev opdateret i 'Stock' databasen. "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)

            } catch (error) {
                
                console.error("Error updating" + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].id  +  ": " + error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke opdaterer " + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].id + ": " + error
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
    },
    mixins: [queryFirestore],

    async mounted() {

        try {
            if (this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[this.$store.state.TempIndex2].leveret == true) {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[0]
            }
            else {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[1]
            }

            } catch (error) {
            console.error("Kan ikke bestemme Opsat boolean værdi ", error);
        }

    }
};
</script>
