<template>
    <div @click.self="goToLagerPage" class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="font-semibold text-[24px] text-[#00214B] mb-2">Tilføj et nyt produkt</h1>
            <input placeholder="Indtast produktnavn"
                class="indent-[16px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type='text' v-model="fieldValue" />
                <input placeholder="Min Grænseværdi" @keydown="nameKeydown($event)"
                class="mt-2 indent-[15px] h-[50px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold"
                type="text" v-model="threshold" />
            <button @click="createProdukt"
                class="bg-[#0097ff] text-white w-fit text-[18px] font-semibold rounded-lg p-2 mt-[20px] right-2">Godkend</button>

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
            fieldValue: "",
            threshold: null
        }
    },
    components: {
    },
    methods: {
        goToLagerPage() {
            this.$store.state.visiblePage = "Lager"
        },

        async createProdukt() {
            try {
                await addDoc(collection(db, "produkter"), {
                    Produktnavn: this.fieldValue,
                    Threshold: this.threshold
                });

                this.queryFirestore()
                this.$router.push('/lager')

                console.log("Added document to: produkter");
            } catch (error) {
                console.error("Error adding document to produkter: ", error);
            }

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
    },
    mixins: [queryFirestore]
}
</script>