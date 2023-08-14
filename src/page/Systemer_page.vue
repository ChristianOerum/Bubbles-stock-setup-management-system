<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div
            class="bg-[#F1F7FF] bottom-0 right-0 left-[100px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[70px] ">

            <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-rows: 45px 93%">

                <div class="w-[100%] h-[100%] row-start-1 row-span-1 rounded-2xl flex flex-row text-[13px]">

                    <div
                        class="w-auto h-[100%] bg-[#CAD4E1] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">Overskredet</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#FFD4D4] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">1 dag!</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#FCC3F7] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">2 dage</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#BEC4FE] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">3 dage</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#C5DBFF] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">Denne uge</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#BFF2FF] text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">2 Uger</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-white text-[#00214B] flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">> 2 Uger</p>
                    </div>

                </div>


                <div class="w-[100%] h-[100%] row-start-2 grid gap-[14px]" style="grid-template-columns: 55% 45%">

                    <div class="w-[100%] min-h-0 bg-white col-start-1 col-span-1 rounded-2xl grid overflow-hidden"
                        style="grid-template-rows: 50px 45px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 items-center text-[19px] font-semibold flex flex-row relative">
                            <h1 class="relative left-[15px] text-[16px] text-[#00214B]">Systemer til opsæting</h1>


                            <div class="absolute w-auto flex justify-center right-[10px] gap-1">

                                <button v-if="this.$store.state.completedReQueryRead == false" @click="handleLoad" class="bg-[#EAEEF3] text-[#9AA8BA] w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2 "> Indlæs opsatte</button>

                                <div v-else class="flex gap-1">
                                    <button v-if="this.$store.state.HideCompleted" @click="handleCompleted"
                                        class="bg-[#0097ff] text-white w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                        <fa style="cursor: pointer" icon="wrench" class="w-auto text-[14px]" />
                                    </button>
                                    <button v-else @click="handleCompleted"
                                        class="bg-[#EAEEF3] text-[#9AA8BA] w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                        <fa style="cursor: pointer" icon="wrench" class="w-auto text-[14px]" />
                                    </button>

                                    <button v-if="this.$store.state.HideDelivered" @click="handleDelivered"
                                        class="bg-[#0097ff] text-white w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                        <fa style="cursor: pointer" icon="truck" class="w-auto text-[14px]" />
                                    </button>
                                    <button v-else @click="handleDelivered"
                                        class="bg-[#EAEEF3] text-[#9AA8BA] w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                        <fa style="cursor: pointer" icon="truck" class="w-auto text-[14px]" />
                                    </button>
                                </div>





                                <button v-if="this.$store.state.HideOutOfDate" @click="handleCalendar"
                                    class="bg-[#EAEEF3] text-[#9AA8BA] w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                    <fa style="cursor: pointer" icon="calendar-check" class="w-auto text-[14px]" />
                                </button>
                                <button v-else @click="handleCalendar"
                                    class="bg-[#0097ff] text-white w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2">
                                    <fa style="cursor: pointer" icon="calendar-check" class="w-auto text-[14px]" />
                                </button>

                                <button @click="$router.push('/tilfoej_system')" class="bg-[#0097ff] text-white w-fit h-fit text-[14px] rounded-lg p-1 pl-2 pr-2 right-2">Tilføj Ny</button>

                            </div>

                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-3 pl-[18px] text-[12px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 40px">
                            <h1 class="col-start-1 col-span-1">Opsætingsnavn</h1>
                            <h1 class="col-start-2 col-span-1">Opsat? <fa style="cursor: pointer" icon="wrench" class="w-auto text-[14px]" /></h1>
                            <h1 class="col-start-3 col-span-1">Leveret? <fa style="cursor: pointer" icon="truck" class="w-auto text-[14px]" /></h1>
                            <h1 class="col-start-4 col-span-1">Tilknyttet <fa style="cursor: pointer" icon="user" class="w-auto text-[14px]" /></h1>
                            <h1 class="col-start-5 col-span-1">Due Dato <fa style="cursor: pointer" icon="calendar-check" class="w-auto text-[14px]" /></h1>

                        </div>

                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[#00214B]">

                            <Systemer_tabs></Systemer_tabs>

                        </div>

                    </div>

                    <div class="w-[100%] min-h-0 bg-white col-start-2 col-span-1 rounded-2xl grid"
                        style="grid-template-rows: 50px 45px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 grid items-center text-[19px] font-semibold relative">
                            <h1 class="relative left-[15px] text-[16px] text-[#00214B]">Lager status på opsætninger</h1>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center pl-[18px] text-[12px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 2.5fr 1fr 1fr">
                            <h1 class="col-start-1 col-span-1">Produktnavn</h1>
                            <h1 class="col-start-2 col-span-1">Status</h1>
                            <h1 class="col-start-3 col-span-1">Forfald</h1>

                        </div>


                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden">

                            <LagerStatus_tabs></LagerStatus_tabs>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>


<script>

//comp import
import Systemer_tabs from "../components/systemer_tabs.vue";
import LagerStatus_tabs from "../components/lagerStatus_tabs.vue"


//import mixins
import reQuerOpsat_leveret from "../mixins/reQueryOpsat_Leveret";

export default {
    data() {
        return {
            hideOpsat: false,
            hidePastSystems: true,
        }
    },
    setup() {

    },
    components: {
        Systemer_tabs,
        LagerStatus_tabs
    },
    mixins: [reQuerOpsat_leveret],
    methods: {

        handleCalendar() {
            this.$store.state.HideOutOfDate = !this.$store.state.HideOutOfDate
        },
        handleCompleted() {
            this.$store.state.HideCompleted = !this.$store.state.HideCompleted
        },
        handleDelivered() {
            this.$store.state.HideDelivered = !this.$store.state.HideDelivered
        },

        handleLoad() {
            this.reQuerOpsat_leveret()
        }

    },
}
</script>
