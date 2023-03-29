<template>
    <div v-for="(item, index) in this.$store.state.systemer" v-bind:key="index">

        <div v-if="this.$store.state.HideCompleted != item.Opsatstatus && item.Opsatstatus == true"></div>

        <div
            v-else-if="this.$store.state.HideOutOfDate == true && new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() - 1))">
        </div>

        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() - 1)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#CAD4E1] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>

        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 1)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#FFD4D4] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>



        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 2)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#F7D9FA] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>



        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 3)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#D4D9FE] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>



        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 7)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#D8E6FF] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>



        <div v-else-if="(new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 14)))"
            class="bg-gradient-to-r to-[#FFFFFF] from-[#BFF2FF] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
                <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square"
                    class="w-auto h-[16x]" />
                <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can"
                    class="w-auto h-[16px] ml-2" />
            </div>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>


        </div>



        <div v-else
            class="bg-gradient-to-r to-[#FFFFFF] from-[#BFF2FF] w-[100%] h-[60px] relative grid text-[15px] font-semibold p-[18px]"
            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
            <h1 class="col-start-1 col-span-1">{{ item.Systemnavn }}</h1>

            <div v-if="item.Opsatstatus == false" class="col-start-2 col-span-1 w-fit h-auto bg-[#EAEEF3] rounded-full">
                <p class="text-[#8196B1] p-1 pl-3 pr-3 text-[12px]">Ikke opsat</p>
            </div>

            <div v-else class="col-start-2 col-span-1 w-fit h-auto bg-[#A5FFA2] rounded-full">
                <p class="text-[#18742D] p-1 pl-3 pr-3 text-[12px]">Opsat</p>
            </div>

            <h1 class="col-start-3 opacity-60 col-span-1">{{ (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() }}
            </h1>


            <div class="col-start-4 col-span-1 text-[#9AA8BA]">
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
import { deleteDoc, doc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from '@/firebase'


export default {
    data() { },
    components: {
    },
    methods: {
        async editFromDB(e, index) {
            this.$store.state.TempIndex = index
            this.$store.state.visiblePage = "UpdateSystemer"
        },

        async deleteFromDB(e, index) {
            try {
                await deleteDoc(doc(db, "systemer", this.$store.state.systemer[index].id));

                console.log("deleted " + this.$store.state.systemer[index].id + "(" + this.$store.state.systemer[index].Produktnavn + ")" + " from: systemer");

                this.reloadData()



            } catch (error) {
                console.error("ERROR deleting " + this.$store.state.systemer[index].id + " from: systemer " + error);
            }
        },

        async reloadData() {
            this.$store.state.todaysDate = new Date(new Date().setHours(0, 0, 0, 0))

            try {
                const docRef = await getDocs(query(collection(db, "systemer"), orderBy('Brugsdato')));

                this.$store.state.systemer = []


                docRef.forEach((doc) => {

                    this.$store.state.systemer.push({ Systemnavn: doc.data().Systemnavn, Opsatstatus: doc.data().Opsatstatus, Brugsdato: doc.data().Brugsdato, Brugte_produkter: doc.data().Brugte_produkter, id: doc.id })

                });

                console.log("read data from: stock");

            } catch (error) {
                console.error("ERROR reading data from: stock " + error);

            }

            try {
                const docRef1 = await getDocs(collection(db, "produkter"));
                this.$store.state.lager = []

                docRef1.forEach((doc) => {
                    this.$store.state.lager.push({ Produktnavn: doc.data().Produktnavn, Qt_på_lager: 0, Qt_prøveperiode: 0, id: doc.id, Qt_behov_til_systemer: 0, ForfaldDato: null })
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

                    this.$store.state.lagerUdInd.unshift({ Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.data().date.seconds, Update: doc.data().update, id: doc.id, beskrivelse: doc.data().beskrivelse })
                });

                console.log("read data from: stock");
            } catch (error) {
                console.error("ERROR reading data from: stock " + error);

            }

            (this.$store.state.systemer).forEach((parentItem) => {

                (parentItem.Brugte_produkter).forEach((childItem) => {

                    let index = (this.$store.state.lager).indexOf((this.$store.state.lager).find(item => item.id === childItem.id))

                    this.$store.state.lager[index].Qt_behov_til_systemer += childItem.qt

                    if (this.$store.state.lager[index].ForfaldDato == null && this.$store.state.lager[index].Qt_behov_til_systemer > this.$store.state.lager[index].Qt_på_lager) {
                        this.$store.state.lager[index].ForfaldDato = new Date((parentItem.Brugsdato.seconds) * 1000)
                    }

                })
            })

            //lager array med tilførte system qt korrektion
            console.log(this.$store.state.lager)



        }

    }



}
</script>
