<template>
    <div class="h-[100vh] w-[130px]">
        <SVGcreater @click="$router.push('/')" name="logo" class="h-auto w-[200px] left-[30px] top-[20px] absolute"></SVGcreater>

        <div class="w-[130px] h-auto absolute top-[100px] flex flex-col justify-center items-center">

            <fa style="cursor: pointer" @click="$router.push('/')" icon="house" class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="this.$router.currentRoute._value.path == '/'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[10px]"></div>

            <div class="w-[40px] h-[5px] rounded-md bg-[#00214B] opacity-5 m-4"></div>


            <fa style="cursor: pointer" @click="$router.push('/lager')" icon="database"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="this.$router.currentRoute._value.path == '/lager'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[95px]"></div>

            <fa style="cursor: pointer" @click="$router.push('/tilføj_stock')" icon="cart-flatbed"
                class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
            <div v-if="this.$router.currentRoute._value.path == '/tilføj_stock'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[143px]"></div>

            <div class="w-[40px] h-[5px] rounded-md bg-[#00214B] opacity-5 m-4"></div>

            <fa style="cursor: pointer" @click="$router.push('/systemer')" icon="database"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="this.$router.currentRoute._value.path == '/systemer'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[230px]"></div>

            <fa style="cursor: pointer" @click="$router.push('/tilføj_system')" icon="square-plus"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="this.$router.currentRoute._value.path == '/tilføj_system'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[278px]"></div>

        </div>

        <button @click="refreshWindow" class="absolute left-9 bottom-[85px] font-semibold">
            <fa style="cursor: pointer" icon="arrows-rotate" class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
        </button>

        <button @click="clearLocalStorage" class="absolute left-9 bottom-[30px] font-semibold">
            <fa style="cursor: pointer" icon="right-from-bracket"
                class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
        </button>


    </div>
</template>

<script>
import SVGcreater from "../components/svgCreater.vue";

export default {
    components: {
        SVGcreater
    },
    methods: {
        clearLocalStorage() {
            localStorage.clear();
            this.$router.push('/login');

        },
        refreshWindow() {
            location.reload()
            //console.log(this.$router.currentRoute._value.path)
        }

    }
}

</script>