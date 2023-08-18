<template>
    <div @click="close()" class="w-full h-full bg-[#ffffff]/[0.9] flex flex-col justify-center items-center">
      
        <div class="w-fit h-fit p-5 text-[#AA2E2E] bg-[#ffdbdb] rounded-2xl font-semibold flex flex-col gap-1">

            <h1 class="font-bold text-[20px]">Stop en halv!</h1>
            <h1 >Er du sikker på at du vil gennemføre denne handling?</h1>
            
            <input placeholder="Indtast 'bananflue' for at godkende" @keydown="nameKeydown($event)"
                class="mt-2 indent-[15px] h-[40px] w-full bg-[#ffffff] text-[#9AA8BA] rounded-lg text-left focus:outline-[3px] focus:text-[#d80a0a] focus:outline outline-[#d80a0a] font-semibold"
                type="text" v-model="confirmField" />

        </div>

    </div>
</template>

<script>

export default {
    data() {
        return {
            confirmField: "",
        }
    },
    setup() {

    },
    components: {},
    methods: {
        close(){
            this.$store.state.showConfirmation = false
        }
    }
}

</script>