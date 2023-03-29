<template>
    <div class="w-100 h-screen bg-white flex flex-col justify-center items-center relative">

        <SVGcreater name="logo" class="w-[22%] h-auto relative left-[7px] p-[10px]"></SVGcreater>

        <h1 class="text-[#00214B] opacity-80 text-4xl font-semibold p-5">Access pin påkrævet</h1>

        <div class="w-[400px] h-[50px] grid grid-cols-7 rounded-lg bg-[#F1F7FF] relative">
            <input v-if="!show" placeholder="•••••••••"
                class="col-span-7 bg-[#F1F7FF] text-[#00214B] rounded-lg text-center focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl"
                type='password' :value="modelValue" v-on:input="updateData($event)" />
            <input v-else placeholder="Password"
                class="col-span-7 bg-[#F1F7FF] text-[#00214B] rounded-lg text-center focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl"
                type='text' :value="modelValue" v-on:input="updateData($event)" />
            <button v-if="!show"
                class="h-[50px] w-[50px] text-[#00214B] bg-[#F1F7FF] rounded-lg font-poppins font-semibold text-lg absolute right-0"
                @click="ShowPasswordToggle()">
                <fa icon="eye-slash" />
            </button>
            <button v-else
                class="h-[50px] w-[50px] text-[#00214B] bg-[#F1F7FF] rounded-lg font-poppins font-semibold text-lg absolute right-0"
                @click="ShowPasswordToggle()">
                <fa icon="eye" />
            </button>

        </div>

        <h1 class="absolute bottom-3 font-semibold text-[#00214B]/[0.3] left-1/2 transform -translate-x-1/2">Copyright ©
            2023 Bubbles ApS</h1>


        <p class="w-[400px] text-center p-5 text-sm font-poppins font-semibold text-[#00214B]/[0.4]">Spørg Christian i
            tilfælde af at du ikke kender eller kan huske den prædefinerede access pinkode.</p>


    </div>
</template>

<script>
import SVGcreater from '../components/svgCreater.vue'

export default {
    data() {
        return {
            show: false,
        }
    },
    props: {
        modelValue: String
    },
    components: {
        SVGcreater
    },
    methods: {
        updateData(event) {
            localStorage.setItem('Password', event.target.value);
            this.$emit('update:modelValue', localStorage.getItem('Password'))
        },
        ShowPasswordToggle() {

            console.log(process.env.VUE_APP_ACCESS_PIN)

            if (this.show == false) {
                this.show = true
            }
            else {
                this.show = false
            }
        }
    }
}
</script>