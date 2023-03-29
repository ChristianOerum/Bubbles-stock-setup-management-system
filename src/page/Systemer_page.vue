<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div
            class="bg-[#F1F7FF] bottom-0 right-0 left-[130px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[70px] ">

            <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-rows: 45px 93%">

                <div class="w-[100%] h-[100%] row-start-1 row-span-1 rounded-2xl flex flex-row text-[13px]">

                    <div
                        class="w-auto h-[100%] bg-[#CAD4E1] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">Overskredet</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#FFD4D4] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">1 dag!</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#FCC3F7] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">2 dage</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#BEC4FE] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">3 dage</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#C5DBFF] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">Denne uge</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-[#BFF2FF] text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">2 Uger</p>
                    </div>

                    <div
                        class="w-auto h-[100%] bg-white text-black flex flex-col justify-center items-center rounded-xl font-semibold ml-2">
                        <p class="p-3 opacity-50">> 2 Uger</p>
                    </div>

                </div>


                <div class="w-[100%] h-[100%] row-start-2 grid gap-[14px]" style="grid-template-columns: 55% 45%">

                    <div class="w-[100%] min-h-0 bg-white col-start-1 col-span-1 rounded-2xl grid overflow-hidden"
                        style="grid-template-rows: 60px 60px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 items-center text-[19px] font-semibold flex flex-row relative">
                            <h1 class="relative left-[15px] text-[#00214B]">Systemer til opsæting</h1>


                            <button v-if="this.$store.state.HideOutOfDate" @click="handleCalendar"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-[193px] absolute">
                                <fa style="cursor: pointer" icon="calendar-check" class="w-auto text-[14px]" />
                            </button>
                            <button v-else @click="handleCalendar"
                                class="bg-[#EAEEF3] text-[#9AA8BA] w-fit text-[16px] rounded-lg p-2 right-[193px] absolute">
                                <fa style="cursor: pointer" icon="calendar-check" class="w-auto text-[14px]" />
                            </button>

                            <button v-if="this.$store.state.HideCompleted" @click="handleCompleted"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-[160px] absolute">
                                <fa style="cursor: pointer" icon="check" class="w-auto text-[14px]" />
                            </button>
                            <button v-else @click="handleCompleted"
                                class="bg-[#EAEEF3] text-[#9AA8BA] w-fit text-[16px] rounded-lg p-2 right-[160px] absolute">
                                <fa style="cursor: pointer" icon="check" class="w-auto text-[14px]" />
                            </button>


                            <button @click="goToTilføjSystemPage"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-2 absolute">Tilføj
                                opsætning</button>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-[18px] text-[14px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 3fr 1.5fr 1fr 40px">
                            <h1 class="col-start-1 col-span-1">Opsætingsnavn</h1>
                            <h1 class="col-start-2 col-span-1">Status</h1>
                            <h1 class="col-start-3 col-span-1">Due Dato</h1>

                        </div>

                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[#00214B]">

                            <Systemer_tabs></Systemer_tabs>

                        </div>

                    </div>

                    <div class="w-[100%] min-h-0 bg-white col-start-2 col-span-1 rounded-2xl grid"
                        style="grid-template-rows: 60px 60px 15fr">

                        <div
                            class="w-[100%] h-[100%] row-start-1 row-span-1 grid items-center text-[19px] font-semibold relative">
                            <h1 class="relative left-[15px] text-[#00214B]">Lager status på opsætninger</h1>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-[18px] text-[14px] font-semibold text-[#9AA8BA]"
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

        <Nav_menu class="absolute"></Nav_menu>

    </div>
</template>


<script>

//comp import
import Nav_menu from "../components/nav_menu.vue";
import Systemer_tabs from "../components/systemer_tabs.vue";
import LagerStatus_tabs from "../components/lagerStatus_tabs.vue"


export default {
    data() {
        return {
            hideOpsat: false,
            hidePastSystems: true
        }
    },
    setup() {

    },
    components: {
        Nav_menu,
        Systemer_tabs,
        LagerStatus_tabs
    },
    methods: {

        goToTilføjSystemPage() {
            this.$store.state.visiblePage = "TilføjSystemer"
        },
        handleCalendar() {
            this.$store.state.HideOutOfDate = !this.$store.state.HideOutOfDate
        },
        handleCompleted() {
            this.$store.state.HideCompleted = !this.$store.state.HideCompleted
        }

    }
}
</script>
