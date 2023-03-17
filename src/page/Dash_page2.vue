<template>
    <div class="bg-[#0097ff] w-100 h-screen flex flex-col justify-center items-center flex-col p-10">

      <div class="w-[220px] h-[180px] bg-[#149FFF] rounded-sm flex flex-col justify-center items-center flex-col rounded-b-[35px] rounded-t-[55px]">

        <div class="w-[200px] h-[100px] flex flex-row justify-center items-center gap-4 mb-2">

          <div class="w-[90px] h-[90px] bg-white rounded-full flex flex-col justify-center items-center">

            <svgCreater class="h-[60%] w-[60%]" name="settings_wificonnected"></svgCreater>

          </div>

          <div class="w-[90px] h-[90px] bg-white rounded-full flex flex-col justify-center items-center">

            <svgCreater class="h-[70%] w-[70%]" name="chain"></svgCreater>
            <div class="w-[40px] h-[40px] bg-[#0097ff] rounded-full absolute animate-ping opacity-80"></div>

          </div>

        </div>

        <sliderExample></sliderExample>
      </div>
   


  </div>
</template>

<script>
import sliderExample from '../components/Slider_example.vue'
import svgCreater from "@/components/svgCreater.vue"; 

export default {
  name: 'App',
  components: {
    sliderExample,
    svgCreater
  },
  data() {},
  methods: {}
}
</script>