<template>
   <div class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

    <div class="bg-[#F1F7FF] p-6 rounded-xl grid grid-cols-2 gap-4">
        <h1 class="font-semibold text-[24px] text-[#00214B]">
            Opdater system detaljer
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
                class="resize-none p-3 mt-2 flex-grow w-[400px] bg-white text-[#00214B] rounded-lg focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold text-left"
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

        <button @click="updateSystem"
            class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 right-2">
            Opdater
        </button>

    </div>

    </div>
</template>

<script>
//import firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

//import comps

//import mixins
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

        async updateSystem() {
            try {
                const ref = doc(db, "systemer", this.$store.state.systemer[this.$store.state.TempIndex].id
                );
                await updateDoc(ref, {
                    Brugsdato: new Date(this.dateValue),
                    Brugte_produkter: this.BrugteProdukter,
                    Opsatstatus: this.SelectedOptionOpsat.value,
                    Leveretstatus: this.SelectedOptionLeveret.value,
                    Systemnavn: this.SystemNavn,
                    Tilknyttet: this.SelectedOptionEmployee.id,
                    Beskrivelse: this.beskrivelse
                });

                console.log("Updated " + this.$store.state.systemer[this.$store.state.TempIndex].id + " from: systemer"
                );

                if (this.Opsatstatus == true) {
                    for (const item in this.BrugteProdukter) {
                        console.log(item.id);
                    }
                }

                this.queryFirestore();
                this.$router.push('/systemer')

            } catch (error) {
                console.error("ERROR updating " +  this.$store.state.systemer[this.$store.state.TempIndex].id + " from: systemer " + error
                );
            }
        },
    },
    mixins: [queryFirestore],

    async mounted() {

        try {
            this.beskrivelse = this.$store.state.systemer[this.$store.state.TempIndex].beskrivelse
        } catch (error) {
                console.error("beskrivelse ikke fundet: ", error);
        }

        for (const item of this.$store.state.medarbejdere) {
            this.DropdownOptionsEmployee.push(item);
        }

        console.log(this.$store.state.systemer[this.$store.state.TempIndex]);

        console.log(
            this.$store.state.systemer[this.$store.state.TempIndex].Brugsdato
        );



        

        try {
            if (this.$store.state.systemer[this.$store.state.TempIndex].Opsatstatus == true) {
                this.SelectedOptionOpsat = this.DropdownOptionsOpsat[0]
            }
            else {
                this.SelectedOptionOpsat = this.DropdownOptionsOpsat[1]
            }

            } catch (error) {
                    console.error("Kan ikke bestemme Opsat boolean værdi ", error);
        }

        try {
            if (this.$store.state.systemer[this.$store.state.TempIndex].Leveretstatus == true) {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[0]
            }
            else {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[1]
            }

            } catch (error) {
                    console.error("Kan ikke bestemme Leveret boolean værdi ", error);
        }



        try {
            let arraySearchEmployee = (element) => element.id == this.$store.state.systemer[this.$store.state.TempIndex].tilknyttet

            let index = this.$store.state.medarbejdere.findIndex(arraySearchEmployee)

            this.SelectedOptionEmployee = this.$store.state.medarbejdere[index]

            console.log(this.$store.state.medarbejdere[index])

            } catch (error) {
                    console.error("Id ej fundet, medarbejderen er tidligere blevet slettet fra databasen ", error);
        }



        (this.dateValue = new Date(
            this.$store.state.systemer[this.$store.state.TempIndex].Brugsdato.seconds * 1000).toISOString().substr(0, 10)),(this.SystemNavn = this.$store.state.systemer[this.$store.state.TempIndex].Systemnavn);

        if (
            this.$store.state.systemer[this.$store.state.TempIndex].Opsatstatus ==
            false
        ) {
            this.SelectedOption = { lable: "Ikke opsat", value: false };
        } else {
            this.SelectedOption = { lable: "Opsat", value: true };
        }

        for (const item of this.$store.state.combos) {
            this.BrugteProdukter.push({ navn: item.comboNavn, id: item.id, qt: 0 });
        }
        

        for (const item of (this.$store.state.systemer[this.$store.state.TempIndex].Brugte_produkter)) {

            try {
            let arraySearch = (element) => element.id == item.id

            let index = this.BrugteProdukter.findIndex(arraySearch)

            this.BrugteProdukter[index].qt += item.qt

            } catch (error) {
                    console.error("Id ej fundet, produktet er tidligere blevet slettet fra produkt katalog ", error);
            }


        }
    },
};
</script>
