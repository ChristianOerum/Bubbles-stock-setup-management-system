<template>
  <div v-for="(item, index) in this.$store.state.lager" v-bind:key="index">
    <div class="bg-white w-full h-fit relative grid text-[14px] font-semibold p-3" style="grid-template-columns: 1.5fr 0.5fr 2fr 40px">
      <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>
   
      <div class="col-start-2 col-span-1 w-fit h-fit bg-[#dbf1ff] rounded-full">
          <p class="text-[#0097FF] p-1 pl-3 pr-3 text-[12px]">{{ item.Qt_på_lager + 'x'}}</p>
        </div>

      <div class="flex flex-col gap-1">
        <div v-if="item.Threshold >= item.Qt_på_lager">
          <div class="col-start-3 col-span-1 w-fit h-fit bg-[#ffdbdb] rounded-full">
            <p class="text-[#AA2E2E] p-1 pl-3 pr-3 text-[12px]">Lav lagerstatus!</p>
          </div>
        </div>

        <div v-if="item.Deliveries.length != 0">
            <div v-for="(childItem, childIndex) in item.Deliveries" v-bind:key="childIndex">
              <div class="col-start-3 col-span-1 w-fit h-fit bg-[#fff0dd] rounded-full" >
                <p class="text-[#CF7C1D] p-1 pl-3 pr-3 text-[12px]">{{ childItem.LagerDeliveryQT + "x på vej (" + (new Date(childItem.LagerDeliveryDate*1000)).toLocaleDateString() + ")" }}</p>
              </div>
            </div>
        </div>
      </div>

      <div class="col-start-4 col-span-1 text-[#9AA8BA]">
        <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
      </div>

      <div class="bg-[#EFF3F8] bottom-[0px] w-full h-[3px] absolute"></div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  components: {},
  methods: {
    async editFromDB(e, index) {
      this.$store.state.TempIndex = index;
      this.$router.push('/update_produkt')
    },
  },
};
</script>
