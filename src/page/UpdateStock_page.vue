<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">
            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">
                Opdater stock
            </h1>

            <div
                class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] opacity-40 rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold">
                <p class="relative top-[14px]">{{ this.name }}</p>
            </div>

            <input placeholder="Vælg korrektions værdi" @keydown="nameKeydown($event)"
                class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type="text" v-model="correctionValue" />
            <input type="date" required pattern="\d{4}-\d{2}-\d{2}"
                class="mt-2 h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B]" v-model="dateValue" />

            <textarea placeholder="Beskrivelse (valgfri)"
                class="p-3 mt-2 indent-[5px] h-[150px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
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
            name: this.$store.state.lagerUdInd[this.$store.state.TempIndex]
                .Produktnavn,
            correctionValue:
                this.$store.state.lagerUdInd[this.$store.state.TempIndex].Update,
            dateValue: new Date(
                this.$store.state.lagerUdInd[this.$store.state.TempIndex].date * 1000
            )
                .toISOString()
                .substr(0, 10),
            beskrivelse:
                this.$store.state.lagerUdInd[this.$store.state.TempIndex].beskrivelse,
        };
    },
    components: {},
    methods: {
        goToLagerPage() {
            this.$store.state.visiblePage = "Lager";
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

        async updateStock() {
            try {
                const ref = doc(
                    db,
                    "stock",
                    this.$store.state.lagerUdInd[this.$store.state.TempIndex].id
                );
                await updateDoc(ref, {
                    date: new Date(this.dateValue),
                    update: Number(this.correctionValue),
                });

                console.log(
                    "Updated " +
                    this.$store.state.lagerUdInd[this.$store.state.TempIndex].id +
                    " from: stock"
                );

                this.queryFirestore();
                this.goToLagerPage();
            } catch (error) {
                console.error(
                    "ERROR updating " +
                    this.$store.state.lagerUdInd[this.$store.state.TempIndex].id +
                    " from: stock " +
                    error
                );
            }
        },
    },
    mixins: [queryFirestore],

    mounted() {
        console.log(this.$store.state.lagerUdInd);
    },
};
</script>
