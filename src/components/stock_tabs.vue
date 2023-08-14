<template>
    <div v-for="(item, index) in this.$store.state.lagerUdInd" v-bind:key="index">

        <div
            class="bg-white w-[100%] h-fit relative grid items-center text-[#00214B] p-3 pl-[18px] text-[14px] font-semibold"
            style="grid-template-columns: 1fr 1fr 0.5fr 0.5fr 1fr">
            <h1 class="col-start-1 col-span-1">{{ item.Date }}</h1>
            <h1 class="col-start-2 col-span-1 text-[12px]">{{ item.LagerUpdatesRef.length + ' Updates' }}</h1>

            <div v-if="item.Ind != 0" class="col-start-3 col-span-1 w-fit h-fit bg-[#dcffe4] text-[#359F4E] rounded-full">
                <p class="p-1 pl-3 pr-3 text-[12px]">{{ item.Ind }} <fa icon="arrow-up" class="w-auto" /></p>
            </div>

            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#EAEEF3] text-[#9AA8BA] rounded-full">
                <p class="p-1 pl-3 pr-3 text-[12px]">{{ item.Ind }} <fa icon="arrow-up" class="w-auto" /></p>
            </div>


            <div v-if="item.Ud != 0" class="col-start-4 col-span-1 w-fit h-fit bg-[#ffdbdb] text-[#AA2E2E] rounded-full">
                <p class="p-1 pl-3 pr-3 text-[12px]">{{ item.Ud }} <fa icon="arrow-down" class="w-auto" /></p>
            </div>

            <div v-else class="col-start-4 col-span-1 w-fit h-fit bg-[#EAEEF3] text-[#9AA8BA] rounded-full">
                <p class="p-1 pl-3 pr-3 text-[12px]">{{ item.Ud }} <fa icon="arrow-down" class="w-auto" /></p>
            </div>


            <button class="col-start-5 col-span-1 w-fit h-fit bg-[#EAEEF3] text-[#9AA8BA] rounded-full">
                <p @click="goToOverview($event, index)" class="p-1 pl-3 pr-3 text-[12px]">Se oversigt</p>
            </button>


            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>
        </div>

    </div>
</template>

<script>
import { deleteDoc, doc } from "firebase/firestore";
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

                this.queryFirestore()

            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.lagerUdInd[index].id + " from: stock " + error);
            }

        },

        editStock(e, index) {
            this.$store.state.TempIndex = index
            console.log(this.$store.state.TempIndex)
            this.$router.push('/update_stock')
        },
        goToOverview(e, index) {
            this.$store.state.TempIndex = index
            this.$router.push('/in_ud_oversigt')
        }
    }

}

</script>