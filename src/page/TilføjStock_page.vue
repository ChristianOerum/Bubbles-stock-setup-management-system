<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative text-[14px]">

            <h1 class="font-bold text-[24px] text-[#00214B]">Tilføj nye varer</h1>


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Relaterede produkt</p>

            <button @click.self="toggleDropdown"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">{{
                    SelectedOption.value == null ? "Vælg" : SelectedOption.lable }}</button>
            <div v-if="this.dropdownOpen"
                class="w-[400px] max-h-[200px] bg-[#DDECFF] h-auto rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelect($event, index)" v-for="(item, index) in this.DropdownOptions"
                    v-bind:key="index"
                    class="h-[20px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] mb-1 mt-1 text-left">{{ item.lable}}</button>
            </div>


            <p class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Ind eller ud værdi</p>

            <input placeholder="Vælg korrektions værdi" @keydown="nameKeydown($event)"
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                type='text' v-model="correctionValue" />


            <p v-if="!this.correctionValue.includes('-') && !this.correctionValue == ''" class="indent-[3px] font-semibold mt-2 mb-1 text-[#00214B]">Leverance bekræftet?</p>

            <button v-if="!this.correctionValue.includes('-') && !this.correctionValue == ''" @click.self="toggleDropdownLeveret"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">{{
                    SelectedOptionLeveret.value == null ? "Vælg" : SelectedOptionLeveret.lable }}</button>
            <div v-if="this.dropdownOpenLeveret && !this.correctionValue.includes('-') && !this.correctionValue == ''"
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
                type='textarea' v-model="Beskrivelse" />

            <button @click="createProdukt"
                class="bg-[#0097ff] text-white w-fit text-[14px] font-medium rounded-lg p-2 mt-[20px] right-2 ">Tilføj til stock</button>

        </div>

    </div>
</template>

<script>
//firebase
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase'


//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            correctionValue: "",
            dateValue: null,
            dropdownOpen: false,
            dropdownOpenLeveret: false,
            DropdownOptions: [],
            DropdownOptionsLeveret: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            SelectedOption: [],
            SelectedOptionLeveret: [],
            Beskrivelse: "",
            Systemgenereted: false

        }
    },
    components: {
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen
        },

        dropdownSelect(ev, i) {
            this.SelectedOption = this.DropdownOptions[i]
            this.dropdownOpen = !this.dropdownOpen
        },

        toggleDropdownLeveret() {
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret
        },

        dropdownSelectLeveret(ev, i) {
            this.SelectedOptionLeveret = this.DropdownOptionsLeveret[i]
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret
        },

        nameKeydown(e) {
            if (!/-|^[0-9]*$/.test(e.key) && e.key != "Backspace" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
                
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

        async createProdukt() {

            if (this.correctionValue != "" && this.dateValue != null && this.SelectedOption.length != 0) {

                let deliveryBool = null

                if (this.correctionValue.includes('-')) {
                    deliveryBool = true
                } else {
                    deliveryBool = this.SelectedOptionLeveret.value
                }

                try {
                    await addDoc(collection(db, "stock"), {
                        update: Number(this.correctionValue),
                        produkt_ref_id: this.SelectedOption.value,
                        date: new Date(this.dateValue),
                        beskrivelse: this.Beskrivelse,
                        leveret: deliveryBool,
                        Systemgenereted: false
                    });
                    
                    let productForQtCorrection = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === this.SelectedOption.value))


                    const ref = doc(db, "produkter", this.$store.state.lager[productForQtCorrection].id
                    );
                    if (Number(this.correctionValue) > 0 && deliveryBool != false) {
                        await updateDoc(ref, {
                            StockQT: this.$store.state.lager[productForQtCorrection].Qt_på_lager + Number(this.correctionValue)
                        });
                    }

                    else if (Number(this.correctionValue) < 0 && deliveryBool != false) {
                        await updateDoc(ref, {
                            StockQT: this.$store.state.lager[productForQtCorrection].Qt_på_lager - (Number(this.correctionValue)*-1)
                        });
                    }

                    


                    this.queryFirestore()
                    this.$router.push('/lager')

                    this.$store.state.showSuccessMessage = true
                    this.$store.state.successMessage = "Data blev tilføjet til 'stock' databasen. "
                    console.log(this.$store.state.errorMessage )

                    setTimeout(() => {
                        this.$store.state.showSuccessMessage = false
                        this.$store.state.successMessage = ""
                    }, 5000)


                } catch (error) {

                    console.error("Error adding document to stock: ", error);

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

        }
    },
    mixins: [queryFirestore],
    mounted(){

        this.$store.state.lager.forEach((item) => {
            this.DropdownOptions.push({lable: item.Produktnavn, value: item.id})
        })

        this.SelectedOptionLeveret = this.DropdownOptionsLeveret[1]

        if (this.$store.state.TempId != "") {
            let choosenIndex = this.DropdownOptions.indexOf(this.DropdownOptions.find(item => item.value === this.$store.state.TempId))
            //console.log(choosenIndex)
            this.SelectedOption = this.DropdownOptions[choosenIndex]
        }

        
    },
    unmounted(){
        //sikre at hvis man er kommet til denne side via dashboarded, at væridien som definerer valgt produkt bliver nulstillet.
        this.$store.state.TempId = ""
    }
}
</script>