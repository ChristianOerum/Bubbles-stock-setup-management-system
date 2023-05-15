<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div
            class="bg-[#F1F7FF] bottom-0 right-0 left-[130px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[70px] ">

            <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-rows: 45px 93%">

                <div class="w-[100%] bg-white h-[100%] opacity-50 row-start-1 row-span-1 rounded-2xl">

                </div>


                <div class="w-[100%] h-[100%] row-start-2 grid gap-[14px]" style="grid-template-columns: 55% 45%">

                    <div class="w-[100%] min-h-0 bg-white col-start-1 col-span-1 rounded-2xl grid overflow-hidden"
                        style="grid-template-rows: 60px 60px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 items-center text-[19px] font-semibold flex flex-row relative">
                            <h1 class="relative left-[15px] text-[#00214B]">Lager</h1>
                            <button @click="$router.push('/tilfoej_produkt')"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-2 absolute">Tilføj
                                produkter</button>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-[18px] text-[14px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 3fr 1fr 1fr 1fr 40px">
                            <h1 class="col-start-1 col-span-1">Produktnavn</h1>
                            <h1 class="col-start-2 col-span-1">Qt i alt</h1>
                            <h1 class="col-start-3 col-span-1">Qt på lager</h1>
                            <h1 class="col-start-4 col-span-1">Qt trail</h1>

                        </div>

                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[#00214B]">

                            <Lager_tabs></Lager_tabs>

                        </div>

                    </div>

                    <div class="w-[100%] min-h-0 bg-white col-start-2 col-span-1 rounded-2xl grid"
                        style="grid-template-rows: 60px 60px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 grid items-center text-[19px] font-semibold relative">
                            <h1 class="relative left-[15px] text-[#00214B]">In/Out oversigt</h1>
                            <button @click="$router.push('/Bubbles-stock-setup-management-system/tilfoej_stock')"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-2 absolute">Tilføj
                                lager</button>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-[18px] text-[14px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 3fr 1fr 1fr 40px">
                            <h1 class="col-start-1 col-span-1">Produktnavn</h1>
                            <h1 class="col-start-2 col-span-1">Opdatering</h1>
                            <h1 class="col-start-3 col-span-1">Dato</h1>

                        </div>


                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden">

                            <Stock_tabs></Stock_tabs>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>


<script>
//import firebase
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase'

//comp import
import Lager_tabs from "../components/lager_tabs.vue";
import Stock_tabs from "../components/stock_tabs.vue";


export default {
    data() {
        return {}
    },
    setup() {

    },
    components: {
        Lager_tabs,
        Stock_tabs
    },
    methods: {
        async createTest() {
            try {
                await addDoc(collection(db, "test"), {
                    first: "Ada",
                    last: "Lovelace",
                    born: 1815
                });

                console.log("Added document to: test");
            } catch (error) {
                console.error("Error adding document: ", error);
            }

        },

        async readTest() {
            try {
                const docRef = await getDocs(collection(db, "test"));
                docRef.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });

                console.log("read data from: test");
            } catch (error) {
                console.error("ERROR reading data from: test " + error);
            }

        },

        async deleteTest(document_id) {
            try {
                await deleteDoc(doc(db, "test", document_id));

                console.log("deleted " + document_id + " from: test");
            } catch (error) {
                console.error("ERROR deleting " + document_id + " from: test " + error);
            }

        },

        async updateTest(document_id) {
            try {
                const ref = doc(db, "test", document_id)
                await updateDoc(ref, {
                    first: "Jensi"
                });

                console.log("Updated " + document_id + " from: test");
            } catch (error) {
                console.error("ERROR deleting " + document_id + " from: test " + error);
            }

        }

    }
}
</script>
