<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div class="bg-[#F1F7FF] bottom-0 right-0 left-[100px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[50px] text-[14px] font-semibold text-[#00214B]">
            
            <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-rows: auto 95%">



                <div class="w-full h-full row-span-1 row-start-1">

                    <h1>Velkommen til Bubbles lager system.</h1>
                    <h1 class="text-[40px] text-bold">Dashboard<fa icon="circle" class="text-[#359F4E] pl-1 text-[25px] pb-1" /><fa icon="circle" class="text-[#f1a43e] pl-1 text-[25px] pb-1" /><fa icon="circle" class="text-[#AA2E2E] pl-1 text-[25px] pb-1" /></h1>
                    
                </div>



                <div class="w-full h-full row-span-1 row-start-2 grid gap-[14px]" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 48% 48%">


                    <div class="rounded-2xl w-full h-full bg-white col-start-1 col-span-1 row-start-1 row-span-1 grid" style="grid-template-rows: auto auto 1fr">
                        
                        <div class="row-start-1 row-span-1 w-full h-full">
                            <p v-if="this.$store.state.leverancerDashboard.length == 0" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#359F4E] text-[17px] pr-2" />Produkt leverencer</p>
                            <p v-else class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#f1a43e] text-[17px] pr-2" />Produkt leverencer</p>
                        </div>

                        <div class="row-start-2 row-span-1 bg-[#EAEEF3] w-full h-full">
                            <p class="text-[#9AA8BA] p-3 text-[12px]">Husk at registrerer varer leveringer</p>
                        </div>

                        <div v-if="this.$store.state.leverancerDashboard.length == 0" class="row-start-3 row-span-1 w-full h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden rounded-b-lg overflow-hidden flex justify-center items-center">
                            <p class="text-[18px] opacity-40">Ingen leverencer på vej <fa icon="circle-check" class="text-[#359F4E]"/></p>
                        </div>

                        <div v-else class="row-start-3 row-span-1 w-full h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden rounded-b-lg overflow-hidden">

                            <div v-for="(item, index) in this.$store.state.leverancerDashboard" v-bind:key="index">
                                <div class="h-fit w-full relative p-3 flex items-center gap-2">
                                    
                                    <div class="h-full w-auto bg-[#fff0dd] p-2 rounded-full">
                                        <p class="text-[14px] text-[#CF7C1D]">{{ item.Update + "x"}}</p>
                                    </div>

                                    <div>
                                        <p class="">{{ item.Produktnavn }}</p>

                                        <button class="col-start-3 col-span-1 w-f h-fit bg-[#fff0dd] rounded-full">
                                            <p @click="leverancer($event, index)" class="text-[#CF7C1D] p-1 pl-3 pr-3 text-[12px]">Bekræft leverance {{"(" + (new Date(item.date*1000)).toLocaleDateString() + ")" }}</p>
                                        </button>
                                    </div>


                                    <div class="bg-[#3A567A] opacity-5 bottom-[0px] left-0 w-[100%] h-[3px] absolute"></div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    



                    <div class="rounded-2xl w-full h-full bg-white col-start-2 col-span-1 row-start-1 row-span-1 grid" style="grid-template-rows: auto auto 1fr">
                        
                        <div class="row-start-1 row-span-1 w-full h-full">
                            <p v-if="this.$store.state.systemerDashboard.length == 0" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#359F4E] text-[17px] pr-2" />Systemer til opsætning</p>
                            <p v-else-if="this.$store.state.systemerRed == true" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#AA2E2E] text-[17px] pr-2" />Systemer til opsætning</p>
                            <p v-else class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#f1a43e] text-[17px] pr-2" />Systemer til opsætning</p>
                        </div>

                        <div class="row-start-2 row-span-1 bg-[#EAEEF3] w-full h-full">
                            <p class="text-[#9AA8BA] p-3 text-[12px]">Opsætninger</p>
                        </div>

                        <div v-if="this.$store.state.systemerDashboard.length == 0" class="row-start-3 row-span-1 w-full h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden rounded-b-lg overflow-hidden flex justify-center items-center">
                            <p class="text-[18px] opacity-40">Ingen kommende opstæninger <fa icon="circle-check" class="text-[#359F4E]"/></p>
                        </div>

                        <div v-else class="row-start-3 row-span-1 w-full h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden rounded-b-lg overflow-hidden">

                            <div v-for="(item, index) in this.$store.state.systemerDashboard" v-bind:key="index">
                                

                                <div v-if="new Date(item.Brugsdato.seconds * 1000) <= new Date(new Date().setDate(this.$store.state.todaysDate.getDate() + 2))" class="h-fit w-full relative p-3 items-center gap-2">

                                    <p class="">{{ item.Systemnavn }}</p>

                                    <button class="col-start-3 col-span-1 w-f h-fit bg-[#ffdbdb] rounded-full">
                                       <p @click="systemer($event, index)" class="text-[#AA2E2E] p-1 pl-3 pr-3 text-[12px]">Bekræft opsættelse {{"(" + (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() + ")" }}</p>
                                    </button>



                                    <div class="bg-[#3A567A] opacity-5 bottom-[0px] left-0 w-[100%] h-[3px] absolute"></div>
                                </div>



                                <div v-else class="h-fit w-full relative p-3 items-center gap-2">

                                    <p class="">{{ item.Systemnavn }}</p>

                                    <button class="col-start-3 col-span-1 w-f h-fit bg-[#fff0dd] rounded-full">
                                        <p @click="systemer($event, index)" class="text-[#CF7C1D] p-1 pl-3 pr-3 text-[12px]">Bekræft opsættelse {{"(" + (new Date(item.Brugsdato.seconds * 1000)).toLocaleDateString() + ")" }}</p>
                                    </button>



                                    <div class="bg-[#3A567A] opacity-5 bottom-[0px] left-0 w-[100%] h-[3px] absolute"></div>
                                </div>



                            </div>

                        </div>

                    </div>




                    <div class="rounded-2xl w-full h-full bg-white col-start-3 col-span-1 row-start-1 row-span-2 grid" style="grid-template-rows: auto auto 1fr">
                        
                        <div class="row-start-1 row-span-1 w-full h-full">
                            <p v-if="this.$store.state.stockStatus == ''" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#359F4E] text-[17px] pr-2" />Lager indkøb</p>
                            <p v-else-if="this.$store.state.stockStatus == 'red'" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#AA2E2E] text-[17px] pr-2" />Lager indkøb</p>
                            <p v-else-if="this.$store.state.stockStatus == 'yellow'" class="p-3 text-[16px] pb-2 text-bold"><fa icon="circle" class="text-[#359F4E] text-[17px] pr-2" />Lager indkøb</p>
                        </div>

                        <div class="row-start-2 row-span-1 bg-[#EAEEF3] w-full h-full">
                            <p class="text-[#9AA8BA] p-3 text-[12px]">Produkter som skal bestilles hjem</p>
                        </div>


                        <div class="row-start-3 row-span-1 w-full h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden rounded-b-lg overflow-hidden">

                            <div v-for="(item, index) in this.$store.state.lager" v-bind:key="index">

                                <div v-if="item.Threshold > item.Qt_på_lager && item.ForfaldDato != null" class="h-fit w-full relative p-3 items-center gap-2 grid" style="grid-template-columns: 1fr 1.5fr" >

                                    <p class="col-start-1 col-span-1">{{ item.Produktnavn }}</p>

                                    <div class="grid gap-1 col-start-2 col-span-1">
                                        <button class="w-fit h-fit bg-[#ffdbdb] rounded-full">
                                            <p @click="stock($event, index)" class="text-[#AA2E2E] p-1 pl-3 pr-3 text-[12px]">Under grænseværdi {{ "(" + item.Qt_på_lager + "/" + item.Threshold + ")"}}</p>
                                        </button>
                                        <button class="w-fit h-fit bg-[#ffdbdb] rounded-full">
                                            <p @click="stock($event, index)" class="text-[#AA2E2E] p-1 pl-3 pr-3 text-[12px] text-left">Skal bruges til opsætning d. <br> {{ item.ForfaldDato }}</p>
                                        </button>
                                    </div>


                                    <div class="bg-[#3A567A] opacity-5 bottom-[0px] left-0 w-[100%] h-[3px] absolute"></div>
                                </div>


                                <div v-else-if="item.Threshold > item.Qt_på_lager" class="h-fit w-full relative p-3 items-center gap-2 grid" style="grid-template-columns: 1fr 1.5fr">

                                    <p class="col-start-1 col-span-1">{{ item.Produktnavn }}</p>

                                    <div class="col-start-2 col-span-1">
                                        <button class="w-fit h-fit bg-[#fff0dd] rounded-full">
                                            <p @click="stock($event, index)" class="text-[#CF7C1D] p-1 pl-3 pr-3 text-[12px] text-left">Under grænseværdi {{ "(" + item.Qt_på_lager + "/" + item.Threshold + ")"}}</p>
                                        </button>
                                    </div>


                                    <div class="bg-[#3A567A] opacity-5 bottom-[0px] left-0 w-[100%] h-[3px] absolute"></div>
                                </div>



                            </div>
                        </div>




                    </div>



                    <div class="rounded-2xl w-full h-full bg-white col-start-1 col-span-2 row-start-2 row-span-1 flex flex-col justify-center items-center">
                        
                        <fa icon="crow" class="text-[#0097ff] text-[30px] pr-2 opacity-80"/>
                        <p class="text-[16px] opacity-50">Hejsa, jeg er et tomt fælt</p>
                        <p class="opacity-30">Måske får jeg noget indhold en dag... det håber jeg</p>

                    </div>




                </div>


                
            </div>

        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {}
    },
    setup() {},
    components: {
    },
    methods: {
        leverancer(e, index){

            this.$store.state.lagerUdInd.forEach((parentItem, parentIndex) => {
                parentItem.LagerUpdatesRef.forEach((childItem, childIndex) => {
                    
                    if (childItem.id == this.$store.state.leverancerDashboard[index].id) {
                    this.$store.state.TempIndex = parentIndex
                    this.$store.state.TempIndex2 = childIndex
                    this.$router.push('/update_stock')
                    }

                })
            })
        },

        systemer(e, index){

            this.$store.state.systemer.forEach((parentItem, parentIndex) => {

                if (parentItem.id == this.$store.state.systemerDashboard[index].id) {
                    this.$store.state.TempIndex = parentIndex
                    this.$router.push('/update_system')
                }
            })
        },

        stock(e, index){
            console.log(this.$store.state.lager[index])
            this.$store.state.TempId = this.$store.state.lager[index].id
            this.$router.push('/tilfoej_stock')
        }

    },
}

</script>