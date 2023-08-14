<template>
    <div v-for="(item, index) in this.$store.state.lager" v-bind:key="index">

        <div v-if="item.Qt_på_lager >= item.Qt_behov_til_systemer"
            class="text-[#00214B] bg-gradient-to-r to-[#CBF6C3] from-white w-[100%] h-fit relative grid text-[14px] font-semibold p-4 pl-[18px]"
            style="grid-template-columns: 2.5fr 1fr 1fr">
            <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>

            <h1 class="col-start-2 text-[#359F4E] col-span-1">{{ item.Qt_på_lager + " / " + item.Qt_behov_til_systemer }}
            </h1>

            <h1 class="col-start-3 opacity-50 col-span-1">N/A</h1>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>
        </div>


        <div v-else
            class="text-[#00214B] bg-gradient-to-r to-[#FFD4D4] from-white w-[100%] h-fit relative grid text-[14px] font-semibold p-4"
            style="grid-template-columns: 2.5fr 1fr 1fr">
            <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>

            <h1 class="col-start-2 text-[#AA2E2E] col-span-1">{{ item.Qt_på_lager + " / " + item.Qt_behov_til_systemer }}
            </h1>

            <h1 class="col-start-3 opacity-50 col-span-1">{{ item.ForfaldDato }}</h1>

            <div class="bg-[#3A567A] opacity-5 bottom-[0px] w-[100%] h-[4px] absolute"></div>
        </div>
        

    </div>
</template>


<script>


export default {
    data() {
        return {}
    },
    components: {},
    methods: {

    }



}
</script>
