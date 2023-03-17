<template>

    <div v-show="KPI_value == '🚀'" state class="bg-gradient-to-b from-[#36393E] to-[#434343] rounded-2xl col-span-1 row-span-1 m-2 flex flex-col justify-center items-left p-5">
            <p class="text-[#7A7D7E] text-2xl font-semibold">{{ KPI_name }}</p>
            <h1 class="text-white text-4xl font-semibold"><fa icon="cloud-arrow-down" class="animate-pulse"/></h1>
            <p class="text-white/[0.2] text-3xl font-semibold"><fa icon="calculator" class="animate-pulse"/></p>
    </div>

    <div v-show="KPI_value !== '🚀'" v-if="KPI_percentage < 0" state class="bg-gradient-to-b from-[#36393E] to-[#3E3636] rounded-2xl col-span-1 row-span-1 m-2 flex flex-col justify-center items-left p-5">
        <p class="text-[#7A7D7E] text-2xl font-semibold">{{ KPI_name }}</p>
            <h1 class="text-white text-4xl font-semibold">{{ KPI_value }}</h1>
            <p class="text-[#C04545] text-3xl font-semibold">{{ KPI_percentage }}%</p>
    </div>

    <div v-show="KPI_value !== '🚀'" v-else-if="KPI_percentage >= 20" state class="bg-gradient-to-b from-[#36393E] to-[#364053] rounded-2xl col-span-1 row-span-1 m-2 flex flex-col justify-center items-left p-5">
        <p class="text-[#7A7D7E] text-2xl font-semibold">{{ KPI_name }}</p>
            <h1 class="text-white text-4xl font-semibold">{{ KPI_value }}</h1>
            <p class="text-[#0097ff] text-3xl font-semibold">{{ KPI_percentage }}%</p>
    </div>

    <div v-show="KPI_value !== '🚀'" v-else-if="KPI_percentage >= 0" state class="bg-gradient-to-b from-[#36393E] to-[#363E39] rounded-2xl col-span-1 row-span-1 m-2 flex flex-col justify-center items-left p-5">
            <p class="text-[#7A7D7E] text-2xl font-semibold">{{ KPI_name }}</p>
            <h1 class="text-white text-4xl font-semibold">{{ KPI_value }}</h1>
            <p class="text-[#43B14C] text-3xl font-semibold">{{ KPI_percentage }}%</p>
    </div>
    
</template>

<script>
export default {
    props: ["state","KPI_name","KPI_value","KPI_percentage"]
}
</script>