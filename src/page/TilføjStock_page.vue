<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Tilføj nye varer</h1>

            <button @click.self="toggleDropdown"
                class="h-[50px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">{{
                    SelectedOption.value == null ? "Vælg relateret produkt" : SelectedOption.lable }}</button>
            <div v-if="this.dropdownOpen"
                class="w-[400px] max-h-[200px] bg-[#DDECFF] h-auto rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelect($event, index)" v-for="(item, index) in this.DropdownOptions"
                    v-bind:key="index"
                    class="h-[40px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] mb-1 mt-1 text-left">{{ item.lable}}</button>
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
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/firebase'


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
            Beskrivelse: "",
            Systemgenereted: false

        }
    },
    components: {
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
                this.$router.push('/lager')

                console.log("Added document to: stock");
            } catch (error) {
                console.error("Error adding document to stock: ", error);
            }

        }
    },
    mixins: [queryFirestore],
    mounted(){
        this.$store.state.lager.forEach((item) => {
            this.DropdownOptions.push({lable: item.Produktnavn, value: item.id})
        })
    }
}
</script>