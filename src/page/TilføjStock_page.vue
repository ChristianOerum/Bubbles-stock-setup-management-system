<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <Nav_menu class="absolute left-0 top-0"></Nav_menu>

        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Tilføj nye varer</h1>

            <button @click.self="toggleDropdown"
                class="h-[50px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">{{
                    SelectedOption.value == null ? "Vælg relateret produkt" : SelectedOption.lable }}</button>
            <div v-if="this.dropdownOpen"
                class="w-[400px] max-h-[200px] h-auto bg-white rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelect($event, index)" v-for="(item, index) in this.DropdownOptions"
                    v-bind:key="index"
                    class="h-[40px] w-[400px] bg-white text-[#00214B] font-semibold indent-[15px] text-left">{{ item.lable
                    }}</button>
            </div>

            <input placeholder="Vælg korrektions værdi" @keydown="nameKeydown($event)"
                class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type='text' v-model="correctionValue" />
            <input type="date" required pattern="\d{4}-\d{2}-\d{2}"
                class="mt-2 h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B]" v-model="dateValue" />

            <textarea placeholder="Beskrivelse (valgfri)"
                class="p-3 mt-2 indent-[5px] h-[150px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type='textarea' v-model="Beskrivelse" />

            <button @click="createProdukt"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2 ">Godkend</button>

        </div>

    </div>
</template>

<script>
//firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebase'

//comps
import Nav_menu from "../components/nav_menu.vue";

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            correctionValue: "",
            dateValue: null,
            dropdownOpen: false,
            DropdownOptions: [],
            SelectedOption: [],
            Beskrivelse: ""

        }
    },
    components: {
        Nav_menu
    },
    methods: {
        goToLagerPage() {
            this.$store.state.visiblePage = "Lager"
        },

        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen
        },

        dropdownSelect(ev, i) {
            this.SelectedOption = this.DropdownOptions[i]
            this.dropdownOpen = !this.dropdownOpen
        },

        nameKeydown(e) {
            if (!/-|^[0-9]*$/.test(e.key) && e.key != "Backspace" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
                console.log(e.key)
                e.preventDefault();
            }
        },

        async createProdukt() {
            try {
                await addDoc(collection(db, "stock"), {
                    update: Number(this.correctionValue),
                    produkt_ref_id: this.SelectedOption.value,
                    date: new Date(this.dateValue),
                    beskrivelse: this.Beskrivelse
                });

                this.queryFirestore()
                this.goToLagerPage()

                console.log("Added document to: stock");
            } catch (error) {
                console.error("Error adding document to stock: ", error);
            }

        }
    },
    mixins: [queryFirestore],

    async mounted() {
        try {
            const docRef1 = await getDocs(collection(db, "produkter"));
            this.$store.state.lager = []

            docRef1.forEach((doc) => {
                this.DropdownOptions.push({ lable: doc.data().Produktnavn, value: doc.id })
            });

            console.log("read data from: produkter");
        } catch (error) {
            console.error("ERROR reading data from: produkter " + error);

        }
    }
}
</script>