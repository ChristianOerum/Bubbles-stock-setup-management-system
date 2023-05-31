<template>
    <div v-if="name != '/login'" class="h-[100vh] w-[130px]">
        <SVGcreater style="cursor: pointer" @click="$router.push('/')" name="logo" class="h-auto w-[200px] left-[30px] top-[20px] absolute"></SVGcreater>
        <p class="absolute w-max text-black text-[12px] left-[225px] top-[56px]">v1.23</p>

        <div v-auto-animate class="w-[100px] h-auto absolute top-[100px] flex flex-col justify-center items-center">

            <fa style="cursor: pointer" @click="$router.push('/')" icon="house" class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[10px]"></div>

            <div class="w-[40px] h-[5px] rounded-md bg-[#00214B] opacity-5 m-4"></div>


            <fa style="cursor: pointer" @click="$router.push('/lager')" icon="database"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/lager'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[95px]"></div>

            <fa style="cursor: pointer" @click="$router.push('/tilfoej_stock')" icon="cart-flatbed"
                class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
            <div v-if="name == '/tilfoej_stock'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[143px]"></div>

            <div class="w-[40px] h-[5px] rounded-md bg-[#00214B] opacity-5 m-4"></div>

            <fa style="cursor: pointer" @click="$router.push('/systemer')" icon="database"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/systemer'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[230px]"></div>

            <fa style="cursor: pointer" @click="$router.push('/tilfoej_system')" icon="square-plus"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/tilfoej_system'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[278px]"></div>

            <div class="w-[40px] h-[5px] rounded-md bg-[#00214B] opacity-5 m-4"></div>

            <fa style="cursor: pointer" @click="$router.push('/demo_systemer')" icon="database"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/demo_systemer'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[365px]"></div>

            <fa style="cursor: pointer" @click="$router.push('/tilfoej_demo_system')" icon="square-plus"
                class="text-[#00214B] w-full h-[34px] ml-2 text-center m-2" />
            <div v-if="name == '/tilfoej_demo_system'"
                class="bg-[#0097ff] w-[8px] h-[34px] absolute left-0 rounded-r-md top-[416px]"></div>

        </div>

        <button @click="$router.push('/manage_combos')" class="opacity-20 absolute left-5 bottom-[136px] font-semibold">
            <fa style="cursor: pointer" icon="cube" class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
        </button>

        <button @click="refreshWindow" class="opacity-20 absolute left-5 bottom-[85px] font-semibold">
            <fa style="cursor: pointer" icon="arrows-rotate" class="text-[#00214B] w-full h-[30px] ml-2 text-center m-2" />
        </button>

        <button @click="clearLocalStorage" class="opacity-30 absolute left-5 bottom-[30px] font-semibold">
            <fa style="cursor: pointer" icon="right-from-bracket"
                class="text-[#C40000] w-full h-[30px] ml-2 text-center m-2" />
        </button>


    </div>
</template>

<script>
import SVGcreater from "../components/svgCreater.vue";

export default {
    props: ["name"],
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