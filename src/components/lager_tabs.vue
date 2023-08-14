<template>
  <div v-for="(item, index) in this.$store.state.lager" v-bind:key="index">
    <div v-if="index % 2 == 0" class="bg-white w-[100%] h-fit relative grid text-[14px] font-semibold p-3 pl-[18px]"
      style="grid-template-columns: 2fr 1fr 1.5fr 40px">
      <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>
   
      <div class="col-start-2 col-span-1 w-fit h-fit bg-[#0097FF] rounded-full">
          <p class="text-[#ffffff] p-1 pl-3 pr-3 text-[12px]">{{ item.Qt_på_lager + ' x'}}</p>
        </div>

      <div v-if="item.Threshold >= item.Qt_på_lager" class="col-start-3 col-span-1 w-fit h-fit bg-[#D24848] rounded-full">
        <p class="text-[#ffffff] p-1 pl-3 pr-3 text-[12px]">LAV LAGERSTATUS!</p>
      </div>

      <div class="col-start-4 col-span-1 text-[#9AA8BA]">
        <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
        <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
      </div>

      <div class="bg-[#EFF3F8] bottom-[0px] w-[100%] h-[4px] absolute"></div>
    </div>

    <div v-else class="bg-[#F6FAFF] w-[100%] h-fit relative grid text-[14px] font-semibold p-3 pl-[18px]"
      style="grid-template-columns: 2fr 1fr 1.5fr 40px">
      <h1 class="col-start-1 col-span-1">{{ item.Produktnavn }}</h1>

        <div class="col-start-2 col-span-1 w-fit h-fit bg-[#0097FF] rounded-full">
          <p class="text-[#ffffff] p-1 pl-3 pr-3 text-[12px]">{{ item.Qt_på_lager  + ' x'}}</p>
        </div>

        <div v-if="item.Threshold >= item.Qt_på_lager" class="col-start-3 col-span-1 w-fit h-fit bg-[#D24848] rounded-full">
          <p class="text-[#ffffff] p-1 pl-3 pr-3 text-[12px]">LAV LAGERSTATUS!</p>
        </div>

      <div class="col-start-4 col-span-1 text-[#9AA8BA]">
        <fa style="cursor: pointer" @click="editFromDB($event, index)" icon="pen-to-square" class="w-auto h-[16x]" />
        <fa style="cursor: pointer" @click="deleteFromDB($event, index)" icon="trash-can" class="w-auto h-[16px] ml-2" />
      </div>

      <div class="bg-[#EFF3F8] bottom-[0px] w-[100%] h-[4px] absolute"></div>
    </div>
  </div>
</template>

<script>
import {deleteDoc, doc, collection, query, where, getDocs, orderBy, } from "firebase/firestore";
import { db } from "@/firebase";

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

    async deleteFromDB(e, index) {
      try {
        await deleteDoc(
          doc(db, "produkter", this.$store.state.lager[index].id)
        );

        console.log(
          "deleted " +
          this.$store.state.lager[index].id +
          "(" +
          this.$store.state.lager[index].Produktnavn +
          ")" +
          " from: produkter"
        );

        //let tempArr = []

        try {
          const q = query(
            collection(db, "stock"),
            where("produkt_ref_id", "==", this.$store.state.lager[index].id)
          );

          const docRef = await getDocs(q);
          docRef.forEach((document) => {
            deleteDoc(doc(db, "stock", document.id));
            console.log("deleted " + document.id + " from: stock");
          });

          console.log("read data from: stock");
        } catch (error) {
          console.error("ERROR reading data from: stock " + error);
        }
        this.reloadData();
      } catch (error) {
        console.error(
          "ERROR deleting " +
          this.$store.state.lager[index].id +
          " from: produkter " +
          error
        );
      }
    },

    async reloadData() {
      try {
        const docRef1 = await getDocs(collection(db, "produkter"));
        this.$store.state.lager = [];

        docRef1.forEach((doc) => {
          this.$store.state.lager.push({
            Produktnavn: doc.data().Produktnavn,
            Qt_på_lager: 0,
            Qt_prøveperiode: 0,
            id: doc.id,
          });
        });

        console.log("read data from: produkter");
      } catch (error) {
        console.error("ERROR reading data from: produkter " + error);
      }

      try {
        const docRef2 = await getDocs(
          query(collection(db, "stock"), orderBy("date"))
        );

        this.$store.state.lagerUdInd = [];

        docRef2.forEach((doc) => {
          let temp_indexing_of_arr = this.$store.state.lager
            .map((ref) => ref.id)
            .indexOf(doc.data().produkt_ref_id);
          this.$store.state.lager[temp_indexing_of_arr].Qt_på_lager +=
            doc.data().update;

          this.$store.state.lagerUdInd.unshift({
            Produktnavn:
              this.$store.state.lager[temp_indexing_of_arr].Produktnavn,
            date: doc.data().date.seconds,
            Update: doc.data().update,
          });
        });

        console.log("read data from: stock");
      } catch (error) {
        console.error("ERROR reading data from: stock " + error);
      }
    },
  },
};
</script>
