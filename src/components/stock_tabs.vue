<template>
    <div v-for="(item, index) in this.$store.state.lagerUdInd" v-bind:key="index">

        <div v-if="(item.Update > 0) == false"
            class="bg-gradient-to-r from-[#FFFFFF] to-[#FFD4D4] w-[100%] h-[60px] relative grid items-center p-[18px] text-[#00214B] text-[15px] font-semibold"
            style="grid-template-columns: 3fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>
            <h1 class="col-start-2 col-span-1 text-[#AA2E2E]">{{ item.Update }}</h1>
            <h1 class="col-start-3 col-span-1 opacity-50">{{ (new Date(item.date * 1000)).toLocaleDateString() }}</h1>

            <div class="col-start-4 col-span-1 opacity-50">
                <fa v-if="item.Systemgenereted == false" style="cursor: pointer" @click="editStock($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
                <fa v-if="item.Systemgenereted == false" style="cursor: pointer" @click="deleteStock($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
                <fa v-if="item.Systemgenereted != false" @click="deleteStock($event, index)" icon="lock" class="w-auto h-[16px] ml-3" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>
        </div>

        <div v-else
            class="bg-gradient-to-r from-[#FFFFFF] to-[#CBF6C3] w-[100%] h-[60px] relative grid items-center p-[18px] text-[#00214B] text-[15px] font-semibold"
            style="grid-template-columns: 3fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>
            <h1 class="col-start-2 col-span-1 text-[#359F4E]">{{ item.Update }}</h1>
            <h1 class="col-start-3 col-span-1 opacity-50">{{ (new Date(item.date * 1000)).toLocaleDateString() }}</h1>

            <div class="col-start-4 col-span-1 opacity-50">
                <fa v-if="item.Systemgenereted == false" style="cursor: pointer" @click="editStock($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
                <fa v-if="item.Systemgenereted == false" style="cursor: pointer" @click="deleteStock($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
                <fa v-if="item.Systemgenereted != false" @click="deleteStock($event, index)" icon="lock" class="w-auto h-[16px] ml-3" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>
        </div>

    </div>
</template>

<script>
import { deleteDoc, doc, getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from '@/firebase'

export default {
    data() {
        return {}
    },
    components: {},
    methods: {
        async deleteStock(e, index) {
            console.log(index)
            try {
                await deleteDoc(doc(db, "stock", this.$store.state.lagerUdInd[index].id));

                console.log("deleted " + this.$store.state.lagerUdInd[index].id + " from: stock");

                this.reloadData()

            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.lagerUdInd[index].id + " from: stock " + error);
            }

        },

        async reloadData() {
            try {
                const docRef1 = await getDocs(collection(db, "produkter"));
                this.$store.state.lager = []

                docRef1.forEach((doc) => {
                    this.$store.state.lager.push({ Produktnavn: doc.data().Produktnavn, Qt_på_lager: 0, Qt_prøveperiode: 0, id: doc.id })
                });

                console.log("read data from: produkter");
            } catch (error) {
                console.error("ERROR reading data from: produkter " + error);

            }

            try {
                const docRef2 = await getDocs(query(collection(db, "stock"), orderBy('date')));

                this.$store.state.lagerUdInd = []

                docRef2.forEach((doc) => {
                    let temp_indexing_of_arr = this.$store.state.lager.map(ref => ref.id).indexOf(doc.data().produkt_ref_id);
                    this.$store.state.lager[temp_indexing_of_arr].Qt_på_lager += doc.data().update

                    this.$store.state.lagerUdInd.unshift({ Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.data().date.seconds, Update: doc.data().update })
                });

                console.log("read data from: stock");
            } catch (error) {
                console.error("ERROR reading data from: stock " + error);

            }
        },

        editStock(e, index) {
            this.$store.state.TempIndex = index
            this.$router.push('/update_stock')
        },
    }

}

</script>