<template>

<div class="w-full f-fit h-fit top-[40px] font-medium pt-4 flex justify-center">

    <div class="relative max-w-[500px] bg-[#ffdbdb] text-[#AA2E2E] rounded-lg p-4 w-fit h-fit">

            <p class="font-bold"><fa icon="triangle-exclamation"/> Fejl!</p>
            <fa style="cursor: pointer" @click="hideError()" icon="xmark" class="absolute right-2 top-[2px]" />
            <p>{{ this.$store.state.errorMessage }}</p>

        </div>

    </div>

</template>

<script>

export default {
    props: ["name"],
    components: {},
    methods: {
        hideError() {
            this.$store.state.showErrorMessage = false
            this.$store.state.errorMessage = ""
        }

    }
}

</script>