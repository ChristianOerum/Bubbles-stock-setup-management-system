<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div
            class="bg-[#F1F7FF] bottom-0 right-0 left-[100px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[50px] ">

            <div class="w-[100%] h-[100%] grid gap-[14px]">


                <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-columns: 55% 45%">

                    <div class="w-[100%] min-h-0 bg-white col-start-1 col-span-1 rounded-2xl grid overflow-hidden"
                        style="grid-template-rows: 50px 45px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 items-center text-[19px] font-semibold flex flex-row relative">
                            <h1 class="relative left-[15px] text-[16px] text-[#00214B] font-bold">Lager</h1>
                            <button @click="$router.push('/tilfoej_produkt')"
                                class="bg-[#0097ff] text-white w-fit text-[14px] rounded-lg p-1 pl-2 pr-2 right-2 absolute font-medium">Tilføj
                                produkter</button>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center text-[12px] font-bold text-[#9AA8BA] p-3 pl-[18px]"
                            style="grid-template-columns: 1.5fr 0.5fr 2fr 40px">
                            <h1 class="col-start-1 col-span-1">Produktnavn</h1>
                            <h1 class="col-start-2 col-span-1">På lager</h1>
                            <h1 class="col-start-3 col-span-1">Status opdateringer</h1>

                        </div>

                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[#00214B]">

                            <Lager_tabs></Lager_tabs>

                        </div>

                    </div>

                    <div class="w-[100%] min-h-0 bg-white col-start-2 col-span-1 rounded-2xl grid"
                        style="grid-template-rows: 50px 45px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 grid items-center text-[19px] font-semibold relative">
                            <h1 class="relative left-[15px] text-[#00214B] text-[16px] font-bold">In/Out oversigt</h1>

                            <div class="right-2 absolute flex gap-2">

                                <button @click="handleLoadMore" class="bg-[#EAEEF3] text-[#9AA8BA] w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2 font-medium"> Indlæs 10 mere</button>

                                <button @click="$router.push('/tilfoej_stock')" class="bg-[#0097ff] text-white w-fit text-[14px] rounded-lg p-1 pl-2 pr-2 font-medium">Tilføj lager</button>

                            </div>

                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center text-[12px] font-bold text-[#9AA8BA] p-3 pl-[18px]"
                            style="grid-template-columns: 1fr 1fr 0.7fr 0.7fr 0.7fr 1fr">
                            <h1 class="col-start-1 col-span-1">Dato</h1>
                            <h1 class="col-start-2 col-span-1">Antal Updates</h1>
                            <h1 class="col-start-3 col-span-2">Ind/Ud total</h1>

                        </div>


                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden">

                            <StockGroup_tabs></StockGroup_tabs>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>


<script>
//import firebase
//import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
//import { db } from '@/firebase'

//mixins
import queryFirestore from "../mixins/queryFirestore"

//comp import
import Lager_tabs from "../components/lager_tabs.vue";
import StockGroup_tabs from "../components/stock_tabs.vue";


export default {
    data() {
        return {}
    },
    setup() {

    },
    components: {
        Lager_tabs,
        StockGroup_tabs
    },
    methods: {
        handleLoadMore() {
            this.$store.state.stockQueryAmountMultiplier = this.$store.state.stockQueryAmountMultiplier + 1
            this.queryFirestore()

        }

    },
    mixins: [queryFirestore]
}
</script>
