<template>
    <div v-for="(item, index) in this.$store.state.systemer" v-bind:key="index">

        <div v-if="this.$store.state.HideCompleted != item.Opsatstatus && item.Opsatstatus == true"></div>

        <div v-else-if="this.$store.state.HideDelivered != item.Leveretstatus && item.Leveretstatus == true"></div>

        <div
            v-else-if="this.$store.state.HideOutOfDate == true && new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() - 1))">
        </div>

        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() - 1)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#CAD4E1] w-[100%] h-fit relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true" style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>

        <!-- 1 dag due date tab -->
        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 1)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#FFD4D4] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true"  style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>



        <!-- 2 dage due date tab -->
        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 2)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#F7D9FA] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true"  style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>


        <!-- 3 dage due date tab -->
        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 3)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#D4D9FE] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true" style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>


        <!-- denne uge due date tab -->
        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 7)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#D8E6FF] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>


            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true"  style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>


        <!-- 2 uger due date tab -->
        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 14)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#BFF2FF] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>
 

            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true" style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


        </div>


        <!-- mere end 2 uger due date tab -->
        <div v-else
            class="bg-gradient-to-r to-[#FFFFFF] from-[#FFFFFF] w-[100%] h-auto relative grid text-[14px] font-semibold p-3 pl-[18px] items-center"
            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-2 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>


            <div v-if="item.Leveretstatus == false" class="col-start-3 col-span-1 w-fit h-fit bg-[#ffffff] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Nej</p>
            </div>
            <div v-else class="col-start-3 col-span-1 w-fit h-fit bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Ja</p>
            </div>

            
            <div class="col-start-4 col-span-1 w-fit h-fit rounded-full" :style="{backgroundColor: this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].color}">
                <p class="text-[#000000]/[0.6] p-1 pl-3 pr-3 text-[12px]">{{ this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[0].charAt(0) + this.$store.state.medarbejdere[this.$store.state.medarbejdere.findIndex(x => x.id == item.tilknyttet)].navn.split(' ')[1].charAt(0) }}</p>
            </div>

            <h1 class="col-start-5 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-6 col-span-1 text-[#9AA8BA] flex justify-center">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa v-if="item.stockFratrukket != true" style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[3px] absolute"></div>


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
            this.$router.push('/update_system')
        },

        async deleteFromDB(e, index) {
            try {
                await deleteDoc(doc(db, "systemer", this.$store.state.systemer[index].id));

                console.log("deleted " + this.$store.state.systemer[index].id + "(" + this.$store.state.systemer[index].Produktnavn + ")" + " from: systemer");

                this.queryFirestore()

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Systemet blev slettet fra 'Systemer' databasen "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)


            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.systemer[index].id + " from: systemer " + error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Kunne ikke slette data fra 'Systemer' databasen: " + error
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
