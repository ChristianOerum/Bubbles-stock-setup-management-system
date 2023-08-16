<template>
    <div class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <div class="bg-[#F1F7FF] p-6 rounded-xl grid grid-cols-2 gap-4">
            <h1 class="font-bold text-[24px] text-[#00214B]">
                Tilføj nyt system
            </h1>

            <div class="w-auto h-auto rounded-xl flex flex-col items-right relative col-start-1 text-[14px]">


                <input type="text" placeholder="System navn"
                class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
                v-model="SystemNavn" />

                <p class="indent-[3px] font-semibold mt-2 mb-1">Tilhørende ansat</p>

                <button @click.self="toggleDropdownEmployee"
                    class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                    {{
                        SelectedOptionEmployee.navn == null ? "Vælg" : SelectedOptionEmployee.navn
                    }}
                </button>
                
                <div v-if="this.dropdownOpenEmployee"
                    class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <button v-on:click="dropdownSelectEmployee($event, index)" v-for="(item, index) in this.DropdownOptionsEmployee"
                        v-bind:key="index"
                        class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                        {{ item.navn }}
                    </button>
                </div>

                <p class="indent-[3px] font-semibold mt-2 mb-1">Opsat?</p>

                <button @click.self="toggleDropdownOpsat"
                    class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                    {{
                        SelectedOptionOpsat.value == null ? "Vælg" : SelectedOptionOpsat.lable
                    }}
                </button>
                <div v-if="this.dropdownOpenOpsat"
                    class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <button v-on:click="dropdownSelectOpsat($event, index)" v-for="(item, index) in this.DropdownOptionsOpsat"
                        v-bind:key="index"
                        class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                        {{ item.lable }}
                    </button>
                </div>

                <p class="indent-[3px] font-semibold mt-2 mb-1">Leveret?</p>

                <button @click.self="toggleDropdownLeveret"
                    class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                    {{
                        SelectedOptionLeveret.value == null ? "Vælg" : SelectedOptionLeveret.lable
                    }}
                </button>
                <div v-if="this.dropdownOpenLeveret"
                    class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                    <button v-on:click="dropdownSelectLeveret($event, index)" v-for="(item, index) in this.DropdownOptionsLeveret"
                        v-bind:key="index"
                        class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                        {{ item.lable }}
                    </button>
                </div>

                <p class="indent-[3px] font-semibold mt-2 mb-1">Levering dato</p>

                <input type="date" required pattern="\d{4}-\d{2}-\d{2}" placeholder='MM/DD/YYYY'
                    class=" h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B] rounded-md text-left focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff]" v-model="dateValue" />

                <textarea placeholder="Beskrivelse (valgfri)"
                    class="resize-none p-3 mt-2 indent-[5px] flex-grow w-[400px] bg-white text-[#00214B] rounded-lg focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold text-left"
                    type="textarea" v-model="beskrivelse" />

            </div>

            <div class="col-start-2">

                <p class="indent-[3px] font-semibold">Produkter på system</p>

                <div class="mt-1 indent-[14px] h-auto w-[400px] rounded-lg rounded-lg overflow-hidden">
                    <div v-for="(item, index) in this.BrugteProdukter" v-bind:key="index"
                        class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                        <p class="text-[14px]">{{ item.navn }}</p>
                        <input type="number"
                            class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                            v-model="BrugteProdukter[index].qt" />
                        <p class="absolute right-3 text-[#00214B]">x</p>
                    </div>
                </div>

            </div>

            <button @click="createSystem"
                class="bg-[#0097ff] text-white w-fit text-[14px] font-medium rounded-lg p-2 right-2">
                Tilføj system
            </button>

        </div>

    </div>

</template>

<script>
//firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

//date picker

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            dateValue: null,
            dropdownOpenOpsat: false,
            dropdownOpenLeveret: false,
            dropdownOpenEmployee: false,

            DropdownOptionsOpsat: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            DropdownOptionsLeveret: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            DropdownOptionsEmployee: [],

            SelectedOptionOpsat: [],
            SelectedOptionLeveret: [],
            SelectedOptionEmployee: [],
            SystemNavn: "",
            BrugteProdukter: [],
            beskrivelse: ""
        };
    },
    components: {
    },
    methods: {
        toggleDropdownOpsat() {
            this.dropdownOpenOpsat = !this.dropdownOpenOpsat;
        }, 

        toggleDropdownLeveret() {
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret;
        }, 

        toggleDropdownEmployee() {
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        dropdownSelectOpsat(ev, i) {
            this.SelectedOptionOpsat = this.DropdownOptionsOpsat[i];
            this.dropdownOpenOpsat = !this.dropdownOpenOpsat;
        },

        dropdownSelectLeveret(ev, i) {
            this.SelectedOptionLeveret = this.DropdownOptionsLeveret[i];
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret;
        },

        dropdownSelectEmployee(ev, i) {
            this.SelectedOptionEmployee = this.DropdownOptionsEmployee[i];
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        nameKeydown(e) {
            if (
                !/-|^[0-9]*$/.test(e.key) &&
                e.key != "Backspace" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight"
            ) {
                console.log(e.key);
                e.preventDefault();
            }
        },

        async createSystem() {


            if (this.dateValue != null && this.SelectedOptionOpsat.length != 0 && this.SelectedOptionLeveret.length != 0 && this.SelectedOptionEmployee.length != 0 && this.SystemNavn != '') {

                try {
                await addDoc(collection(db, "systemer"), {
                    Brugsdato: new Date(this.dateValue),
                    Brugte_produkter: this.BrugteProdukter,
                    Opsatstatus: this.SelectedOptionOpsat.value,
                    Leveretstatus: this.SelectedOptionLeveret.value,
                    Systemnavn: this.SystemNavn,
                    Tilknyttet: this.SelectedOptionEmployee.id,
                    Beskrivelse: this.beskrivelse
                });

                this.queryFirestore();
                this.$router.push('/systemer')

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev tilføjet til 'Systemer' databasen. "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)

            } catch (error) {
                
                console.error("Error adding document to systemer: ", error);

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
    },
    mixins: [queryFirestore],

    async mounted() {
        for (const item of this.$store.state.combos) {
            this.BrugteProdukter.push({ navn: item.comboNavn, id: item.id, qt: 0 });
        }

        for (const item of this.$store.state.medarbejdere) {
            this.DropdownOptionsEmployee.push(item);
        }
    },
};
</script>
