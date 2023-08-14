<template>
    <div class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">
        <div class="bg-[#F1F7FF] w-auto h-auto rounded-xl flex flex-col justify-center p-5 items-right relative">

            <h1 class="mb-2">Ind/Ud oversigt for d.  {{ this.$store.state.lagerUdInd[this.$store.state.TempIndex].Date + " (" + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef.length + " opdateringer)"}}</h1>

            <div class="text-[14px] grid items-center h-[40px] relative w-[600px] bg-[#EAEEF3]  text-[#9AA8BA] font-semibold indent-[15px] text-left" style="grid-template-columns: 2.5fr 1fr 1fr 40px">
                <p class="col-start-1 col-span-1">Produkt navn</p>
                <p class="col-start-2 col-span-1">Update QT</p>
                <p class="col-start-3 col-span-1">Dato</p>

            </div>

            <div v-for="(item, index) in this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef" v-bind:key="index">
                

                <div v-if="item.Update > 0" class="relative grid items-center h-[45px] text-[14px] w-[600px] bg-gradient-to-r to-[#CBF6C3] from-white text-[#00214B] font-semibold indent-[15px] text-left" style="grid-template-columns: 2.5fr 1fr 1fr 40px">
                    <p class="col-start-1 col-span-1">{{ item.Produktnavn }}</p>
                    <p class="col-start-2 col-span-1 text-[#359F4E]">{{ "+" +item.Update }}</p>
                    <p class="col-start-3 col-span-1 text-[#00214B] opacity-50">{{ (new Date(item.date*1000)).toLocaleDateString() }}</p>

                    <div class="col-start-4 col-span-1 text-[#00214B] opacity-30 flex">
                        <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
                        <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
                    </div>

                    <div class="absolute bottom-0 h-[3px] w-full bg-[#3A567A] opacity-5"></div>
                </div>


                <div v-else class="relative grid items-center h-[45px] text-[14px] w-[600px] bg-gradient-to-r to-[#FFD4D4] from-white text-[#00214B] font-semibold indent-[15px] text-left" style="grid-template-columns: 2.5fr 1fr 1fr 40px">
                    <p class="col-start-1 col-span-1">{{ item.Produktnavn }}</p>
                    <p class="col-start-2 col-span-1 text-[#AA2E2E]">{{ item.Update }}</p>
                    <p class="col-start-3 col-span-1 text-[#00214B] opacity-50">{{ (new Date(item.date*1000)).toLocaleDateString() }}</p>

                    <div class="col-start-4 col-span-1 text-[#00214B] opacity-30 flex">
                        <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
                        <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
                    </div>

                    <div class="absolute bottom-0 h-[3px] w-full bg-[#3A567A] opacity-5"></div>
                </div>


            </div>

        </div>

    </div>
</template>

<script>
//firebase
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase'

//mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        async editFromDB(e, index) {
            this.$store.state.TempIndex2 = index
            this.$router.push('/update_stock')
        },

        async deleteFromDB(e, index) {
            try {
                await deleteDoc(doc(db, "stock", this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].id));

                console.log(this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].id)

                console.log("deleted " + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].id + "(" + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].Produktnavn + ")" + " from: systemer");
                
                let productForQtCorrection = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].productRefId))
                
                const ref = doc(db, "produkter", this.$store.state.lager[productForQtCorrection].id);

                if (this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].Update > 0) {
                    await updateDoc(ref, {
                        StockQT: this.$store.state.lager[productForQtCorrection].Qt_på_lager - Number(this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].Update)
                    });
                } 
                
                else {
                    await updateDoc(ref, {
                        StockQT: this.$store.state.lager[productForQtCorrection].Qt_på_lager + (Number(this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].Update)*-1)
                    });
                }



                
                
                this.queryFirestore()
                this.$router.push('/lager')

            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.lagerUdInd[this.$store.state.TempIndex].LagerUpdatesRef[index].id + " from: systemer " + error);
            }
        }
    },
    mixins: [queryFirestore]
}
</script>