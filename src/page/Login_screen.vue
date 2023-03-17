<template>
    <div class="w-100 h-screen bg-[#282B30] flex flex-col justify-center items-center">
        <h1 class="text-white text-5xl p-5">Access pin påkrævet</h1>

        <div class="w-[400px] h-[50px] grid grid-cols-7 rounded-lg bg-white relative"> 
            <input v-if="!show" placeholder="•••••••••" class="col-span-7 rounded-lg text-center focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl" type='password' :value="modelValue" v-on:input="updateData($event)"/>
            <input v-else placeholder="Password" class="col-span-7 rounded-lg text-center focus:outline-4 focus:outline outline-offset-4 outline-[#0097ff] font-poppins font-semibold text-xl" type='text' :value="modelValue" v-on:input="updateData($event)"/>
            <button v-if="!show" class="h-[50px] w-[50px] text-black bg-white rounded-lg font-poppins font-semibold text-lg absolute right-0" @click="ShowPasswordToggle()"><fa icon="eye-slash"/></button>
            <button v-else class="h-[50px] w-[50px] text-black bg-white rounded-lg font-poppins font-semibold text-lg absolute right-0" @click="ShowPasswordToggle()"><fa icon="eye"/></button>

        </div>

        <h1 class="absolute bottom-3 font-medium text-white/[0.1] left-1/2 transform -translate-x-1/2">Copyright © 2023 Bubbles ApS</h1>

        
        <p class="w-[400px] text-center p-5 text-sm font-poppins font-medium text-white/[0.15]">Spørg Christian i tilfælde af at du ikke kender eller kan huske den prædefinerede access pinkode.</p>


    </div>  
</template>

<script>


export default {
    data() {
        return {
            show: false,
        }
    },
    props: {
        modelValue: String
    },
    components: {},
    methods: {
        updateData(event){
            localStorage.setItem('Password', event.target.value);
            this.$emit('update:modelValue', localStorage.getItem('Password'))
        },
        ShowPasswordToggle(){

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