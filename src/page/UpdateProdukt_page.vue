<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">
            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">
                Opdater produktnavn
            </h1>
            <input placeholder="Indtast produktnavn"
                class="indent-[16px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl"
                type="text" v-model="fieldValue" />
            <button @click="updateProdukt"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">
                Opdater
            </button>
        </div>
    </div>
</template>

<script>
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            fieldValue:
                this.$store.state.lager[this.$store.state.TempIndex].Produktnavn,
        };
    },
    components: {},
    methods: {
        goToLagerPage() {
            this.$store.state.visiblePage = "Lager";
            this.$store.state.TempIndex = null;
        },

        async updateProdukt() {
            try {
                const ref = doc(
                    db,
                    "produkter",
                    this.$store.state.lager[this.$store.state.TempIndex].id
                );
                await updateDoc(ref, {
                    Produktnavn: this.fieldValue,
                });

                console.log(
                    "Updated " +
                    this.$store.state.lager[this.$store.state.TempIndex].id +
                    "(" +
                    this.$store.state.lager[this.$store.state.TempIndex].Produktnavn +
                    ")" +
                    " from: produkter"
                );

                this.queryFirestore();
                this.goToLagerPage();
            } catch (error) {
                console.error(
                    "ERROR updating " +
                    this.$store.state.lager[this.$store.state.TempIndex].id +
                    " from: produkter " +
                    error
                );
            }
        },
    },
    mixins: [queryFirestore],
};
</script>
