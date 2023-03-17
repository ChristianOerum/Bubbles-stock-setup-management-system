<template>

    <div v-show="kommuner == '🚀'" class="bg-gradient-to-b from-[#36393E] to-[#434343] rounded-2xl col-span-3 row-span-1 m-2 justify-center items-left grid grid-rows-1 pl-5 pr-5 grid-cols-5">

    <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
            <p class="text-[#7A7D7E] text-2xl font-semibold">Antal skoler</p>
            <h1 class="text-white text-5xl font-semibold"><fa icon="cloud-arrow-down" class="animate-pulse"/></h1>
        </div>

    <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
        <p class="text-[#7A7D7E] text-2xl font-semibold">Antal Kommuner</p>
        <h1 class="text-white text-5xl font-semibold"><fa icon="cloud-arrow-down" class="animate-pulse"/></h1>
    </div>

    <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
            <p class="text-[#7A7D7E] text-2xl font-semibold">Antal brugere</p>
            <h1 class="text-white text-5xl font-semibold"><fa icon="cloud-arrow-down" class="animate-pulse"/></h1>
        </div>

    <div class="rounded-xl col-span-2 row-span-1 flex flex-col justify-center items-center relative">
        <p class="text-[#7A7D7E] text-2xl font-semibold">Markedsandele</p>
        <h1 class="text-white/[0.2] text-5xl font-semibold"><fa icon="calculator" class="animate-pulse"/></h1>
        <svgCreater class="h-full w-full absolute" name="DK"></svgCreater>
    </div>  


    </div>


    <div v-show="kommuner !== '🚀'" class="bg-gradient-to-b from-[#36393E] to-[#434343] rounded-2xl col-span-3 row-span-1 m-2 justify-center items-left grid grid-rows-1 pl-5 pr-5 grid-cols-5">

        <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
                <p class="text-[#7A7D7E] text-2xl font-semibold">Antal skoler</p>
                <h1 class="text-white text-5xl font-semibold">{{skoler}}</h1>
            </div>

        <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
            <p class="text-[#7A7D7E] text-2xl font-semibold">Antal Kommuner</p>
            <h1 class="text-white text-5xl font-semibold">{{kommuner}}</h1>
        </div>

        <div class="rounded-xl col-span-1 row-span-1 flex flex-col justify-center items-center">
                <p class="text-[#7A7D7E] text-2xl font-semibold">Antal brugere</p>
                <h1 class="text-white text-5xl font-semibold">{{brugere}}</h1>
            </div>

        <div class="rounded-xl col-span-2 row-span-1 flex flex-col justify-center items-center relative">
            <p class="text-[#7A7D7E] text-2xl font-semibold">Markedsandele</p>
            <h1 class="text-white text-5xl font-semibold">{{ialt}}</h1>
            <svgCreater class="h-full w-full absolute" name="DK"></svgCreater>
        </div>  


    </div>

</template>

<script>

import svgCreater from "@/components/svgCreater.vue"; 

export default {
  name: 'App',
  props: ["skoler","kommuner","brugere","ialt"],
  components: {
    svgCreater
  },
  methods: {}
}
</script>