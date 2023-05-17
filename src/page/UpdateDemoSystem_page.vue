<template>
    <div @click.self="goToSystemPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">
            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">
                Opdater demmo system
            </h1>

            <input type="text" placeholder="System navn"
                class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                v-model="SystemNavn" />


            <button @click.self="toggleDropdownEmployee"
                class="h-[50px] w-[400px] text-[#00214B] text-left mt-2 indent-[15px] bg-white font-semibold rounded-lg">
                {{
                    SelectedOptionEmployee.navn == null ? "Ansat" : SelectedOptionEmployee.navn
                }}
            </button>
            <div v-if="this.dropdownOpenEmployee"
                class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelectEmployee($event, index)" v-for="(item, index) in this.DropdownOptionsEmployee"
                    v-bind:key="index"
                    class="h-[40px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    {{ item.navn }}
                </button>
            </div>


            <button @click.self="toggleDropdown"
                class="h-[50px] w-[400px] text-[#00214B] text-left mt-2 indent-[15px] bg-white font-semibold rounded-lg">
                {{
                    SelectedOption.value == null ? "Opsat status" : SelectedOption.lable
                }}
            </button>
            <div v-if="this.dropdownOpen"
                class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelect($event, index)" v-for="(item, index) in this.DropdownOptions"
                    v-bind:key="index"
                    class="h-[40px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    {{ item.lable }}
                </button>
            </div>

            <input type="date" required pattern="\d{4}-\d{2}-\d{2}"
                class="mt-2 h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B]" v-model="dateValue" />

            <p class="indent-[3px] mt-4 font-semibold">Produkter på system</p>

            <div class="mt-2 indent-[15px] h-auto w-[400px] rounded-lg rounded-lg overflow-hidden">
                <div v-for="(item, index) in this.BrugteProdukter" v-bind:key="index"
                    class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p>{{ item.navn }}</p>
                    <input type="number"
                        class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                        v-model="BrugteProdukter[index].qt" />
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>
            </div>

            <button @click="updateSystem"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">
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
            dropdownOpen: false,
            dropdownOpenEmployee: false,
            DropdownOptions: [
                { lable: "Opsat", value: true },
                { lable: "Ikke opsat", value: false },
            ],
            SelectedOptionEmployee: [],
            DropdownOptionsEmployee: [],
            SelectedOption: [],
            SystemNavn: "",
            BrugteProdukter: [],
        };
    },
    components: {

    },
    methods: {
        goToSystemPage() {
            this.$store.state.visiblePage = "Systemer";
        },

        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },

        toggleDropdownEmployee() {
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        dropdownSelectEmployee(ev, i) {
            this.SelectedOptionEmployee = this.DropdownOptionsEmployee[i];
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        dropdownSelect(ev, i) {
            this.SelectedOption = this.DropdownOptions[i];
            this.dropdownOpen = !this.dropdownOpen;
        },

        async updateSystem() {
            try {
                const ref = doc(
                    db,
                    "systemer",
                    this.$store.state.demoSystemer[this.$store.state.TempIndex].id
                );
                await updateDoc(ref, {
                    Brugsdato: new Date(this.dateValue),
                    Brugte_produkter: this.BrugteProdukter,
                    Opsatstatus: this.SelectedOption.value,
                    Systemnavn: this.SystemNavn,
                    Tilknyttet: this.SelectedOptionEmployee.id,
                });

                console.log(
                    "Updated " +
                    this.$store.state.demoSystemer[this.$store.state.TempIndex].id +
                    " from: test"
                );

                if (this.Opsatstatus == true) {
                    for (const item in this.BrugteProdukter) {
                        console.log(item.id);
                    }
                }

                this.queryFirestore();
                this.$router.push('/demo_systemer')

            } catch (error) {
                console.error(
                    "ERROR deleting " +
                    this.$store.state.systemer[this.$store.state.TempIndex].id +
                    " from: test " +
                    error
                );
            }
        },
    },
    mixins: [queryFirestore],

    async mounted() {

        for (const item of this.$store.state.medarbejdere) {
            this.DropdownOptionsEmployee.push(item);
        }

        console.log(this.$store.state.demoSystemer[this.$store.state.TempIndex]);

        console.log(
            this.$store.state.demoSystemer[this.$store.state.TempIndex].Brugsdato
        );



        try {
            let arraySearchEmployee = (element) => element.id == this.$store.state.demoSystemer[this.$store.state.TempIndex].tilknyttet

            let index = this.$store.state.medarbejdere.findIndex(arraySearchEmployee)

            this.SelectedOptionEmployee = this.$store.state.medarbejdere[index]

            console.log(this.$store.state.medarbejdere[index])

            } catch (error) {
                    console.error("Id ej fundet, medarbejderen er tidligere blevet slettet fra databasen ", error);
        }



        (this.dateValue = new Date(
            this.$store.state.demoSystemer[this.$store.state.TempIndex].Brugsdato.seconds * 1000).toISOString().substr(0, 10)),(this.SystemNavn = this.$store.state.demoSystemer[this.$store.state.TempIndex].Systemnavn);

        if (
            this.$store.state.demoSystemer[this.$store.state.TempIndex].Opsatstatus ==
            false
        ) {
            this.SelectedOption = { lable: "Ikke aktiv", value: false };
        } else {
            this.SelectedOption = { lable: "Aktiv", value: true };
        }

        for (const item of this.$store.state.combos) {
            this.BrugteProdukter.push({ navn: item.comboNavn, id: item.id, qt: 0 });
        }
        

        for (const item of (this.$store.state.demoSystemer[this.$store.state.TempIndex].Brugte_produkter)) {

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
