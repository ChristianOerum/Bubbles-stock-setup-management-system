<template>
    <div @click.self="goToSystemPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <div v-auto-animate class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">
            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">
                Tilføj nyt system
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

            <textarea placeholder="Beskrivelse (valgfri)"
                class="p-3 mt-2 indent-[5px] h-[100px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type="textarea" v-model="beskrivelse" />

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

            <button @click="createSystem"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">
                Godkend
            </button>
        </div>
    </div>
</template>

<script>
//firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

//mixins
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
            DropdownOptionsEmployee: [],
            SelectedOption: [],
            SelectedOptionEmployee: [],
            SystemNavn: "",
            BrugteProdukter: [],
            beskrivelse: ""
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

        dropdownSelect(ev, i) {
            this.SelectedOption = this.DropdownOptions[i];
            this.dropdownOpen = !this.dropdownOpen;
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
            try {
                await addDoc(collection(db, "systemer"), {
                    Brugsdato: new Date(this.dateValue),
                    Brugte_produkter: this.BrugteProdukter,
                    Opsatstatus: this.SelectedOption.value,
                    Systemnavn: this.SystemNavn,
                    Tilknyttet: this.SelectedOptionEmployee.id,
                    Beskrivelse: this.beskrivelse
                });

                this.queryFirestore();
                this.$router.push('/systemer')

                console.log("Added document to: stock");
            } catch (error) {
                console.error("Error adding document to stock: ", error);
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
