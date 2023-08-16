<template>
    <div v-for="(item, index) in this.$store.state.demoSystemer" v-bind:key="index">

        <div class="bg-gradient-to-r to-[#FFFFFF] from-[#FFFFFF] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]" style="grid-template-columns: 2.5fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke Aktiv</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Aktiv</p>
            </div>

            <div class="col-start-3 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-4 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-5 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>

        </div>


    </div>
</template>


<script>
import queryFirestore from "../mixins/queryFirestore";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from '@/firebase'


export default {
    data() {
        return {}
    },
    components: {
    },
    methods: {
        async editFromDB(e, index) {
            this.$store.state.TempIndex = index
            this.$router.push('/update_demo_system')
        },

        async deleteFromDB(e, index) {
            try {
                await deleteDoc(doc(db, "demo-systemer", this.$store.state.demoSystemer[index].id));

                console.log(this.$store.state.demoSystemer)

                this.queryFirestore()


                console.log("deleted " + this.$store.state.demoSystemer[index].id + "(" + this.$store.state.demoSystemer[index].Systemnavn + ")" + " from: demo-systemer");

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev slettet i 'Demo system' databasen."
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)


            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.systemer[index].id + " from: demo-systemer " + error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke slette data fra 'Demo-systemer' databasen: " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }
        }
    },
    mixins: [queryFirestore]
    



}
</script>
