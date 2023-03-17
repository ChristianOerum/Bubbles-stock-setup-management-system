<template>
    <button @click="test">Add to Mongo DB atlas test</button>
    <h1>{{ this.$store.state.word }}</h1>

</template>


<script>
//import mongoose

export default {
    data() {},
    components: {},
    methods: {
        test(){
            console.log("whoop")
        }
    }
}
</script>