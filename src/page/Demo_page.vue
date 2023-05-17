<template>
    <div class="bg-white b-0 l-0 w-screen h-screen relative">

        <div
            class="bg-[#F1F7FF] bottom-0 right-0 left-[100px] top-[100px] h-auto w-auto absolute rounded-tl-[30px] p-[70px] ">

            <div class="w-[100%] h-[100%] grid gap-[14px]" style="grid-template-rows: 45px 93%">


                <div class="w-[100%] h-[100%] row-start-1 row-span-2 grid gap-[14px]" style="grid-template-columns: 55% 45%">

                    <div class="w-[100%] min-h-0 bg-white col-start-1 col-span-2 rounded-2xl grid overflow-hidden"
                        style="grid-template-rows: 60px 60px 15fr">

                        <div v-auto-animate
                            class="w-[100%] h-[100%] row-start-1 row-span-1 items-center text-[19px] font-semibold flex flex-row relative">
                            <h1 class="relative left-[15px] text-[#00214B]">Demo systemer</h1>

                            <button @click="$router.push('/tilfoej_demo_system')"
                                class="bg-[#0097ff] text-white w-fit text-[16px] rounded-lg p-2 right-2 absolute">Tilføj
                                opsætning</button>
                        </div>

                        <div class="w-[100%] h-[100%] bg-[#EAEEF3] row-start-2 row-span-1 grid items-center p-[18px] text-[14px] font-semibold text-[#9AA8BA]"
                            style="grid-template-columns: 2.5fr 1fr 1fr 1fr 40px">
                            <h1 class="col-start-1 col-span-1">Demonavn</h1>
                            <h1 class="col-start-2 col-span-1">Aktiv</h1>
                            <h1 class="col-start-3 col-span-1">Tilknyttet</h1>
                            <h1 class="col-start-4 col-span-1">Due Dato</h1>

                        </div>

                        <div
                            class="w-[100%] h-[100%] row-start-3 row-span-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden text-[#00214B]">

                            <Demo_tabs></Demo_tabs>

                        </div>

                    </div>


                </div>

            </div>

        </div>

    </div>
</template>


<script>

//comp import
import Demo_tabs from "../components/demo_tabs.vue";


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
        Demo_tabs
    },
    methods: {}
}
</script>
