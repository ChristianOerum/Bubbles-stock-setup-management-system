import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {};
  },
  methods: {
    queryFirestore: async function () {
      this.$store.state.todaysDate = new Date(new Date().setHours(0, 0, 0, 0));

      try {
        const docRef = await getDocs(
          query(collection(db, "systemer"), orderBy("Brugsdato"))
        );

        this.$store.state.systemer = [];

        docRef.forEach((doc) => {
          this.$store.state.systemer.push({
            Systemnavn: doc.data().Systemnavn,
            Opsatstatus: doc.data().Opsatstatus,
            Brugsdato: doc.data().Brugsdato,
            Brugte_produkter: doc.data().Brugte_produkter,
            id: doc.id,
            tilknyttet: doc.data().Tilknyttet,
            beskrivelse: doc.data().Beskrivelse
          });
        });

        console.log("read data from: systemer");
      } catch (error) {
        console.error("ERROR reading data from: systemer " + error);
      }

      try {
        const docRef1 = await getDocs(collection(db, "produkter"));
        this.$store.state.lager = [];

        docRef1.forEach((doc) => {
          this.$store.state.lager.push({
            Produktnavn: doc.data().Produktnavn,
            Threshold: doc.data().Threshold,
            Qt_på_lager: 0,
            Qt_prøveperiode: 0,
            id: doc.id,
            Qt_behov_til_systemer: 0,
            ForfaldDato: null,
          });
        });

        console.log("read data from: produkter");
      } catch (error) {
        console.error("ERROR reading data from: produkter " + error);
      }


      try {
        const docRef6 = await getDocs(
          query(collection(db, "demo-systemer"), orderBy("Brugsdato"))
        );

        this.$store.state.demoSystemer = [];

        docRef6.forEach((doc) => {
          this.$store.state.demoSystemer.push({
            Systemnavn: doc.data().Systemnavn,
            Opsatstatus: doc.data().Opsatstatus,
            Brugsdato: doc.data().Brugsdato,
            Brugte_produkter: doc.data().Brugte_produkter,
            id: doc.id,
            tilknyttet: doc.data().Tilknyttet
          });
        });

        console.log("read data from: demoSystemer");
      } catch (error) {
        console.error("ERROR reading data from: demoSystemer " + error);
      }


      try {
        const docRef5 = await getDocs(collection(db, "combos"));
        this.$store.state.combos = [];

        docRef5.forEach((doc) => {
          this.$store.state.combos.push({
            comboNavn: doc.data().navn,
            comboIds: doc.data().combo,
            id: doc.id
          });
        });

        console.log("read data from: combos");
      } catch (error) {
        console.error("ERROR reading data from: combos " + error);
      }


      try {
        const docRef4 = await getDocs(collection(db, "medarbejdere"));
        this.$store.state.medarbejdere = [];

        docRef4.forEach((doc) => {
          this.$store.state.medarbejdere.push({
            navn: doc.data().Navn,
            adresse: doc.data().Adresse,
            id: doc.id
          });
        });

        console.log("read data from: medarbejdere");
      } catch (error) {
        console.error("ERROR reading data from: medarbejdere " + error);
      }


      try {
        const docRef2 = await getDocs(
          query(collection(db, "stock"), orderBy("date"))
        );

        this.$store.state.lagerUdInd = [];

        docRef2.forEach((doc) => {
          let temp_indexing_of_arr = this.$store.state.lager.map((ref) => ref.id).indexOf(doc.data().produkt_ref_id);
          this.$store.state.lager[temp_indexing_of_arr].Qt_på_lager +=
            doc.data().update;

          this.$store.state.lagerUdInd.unshift({Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.data().date.seconds, Update: doc.data().update, id: doc.id, beskrivelse: doc.data().beskrivelse, Systemgenereted: doc.data().Systemgenereted});
        });

        console.log("read data from: stock");
      } catch (error) {
        console.error("ERROR reading data from: stock " + error);
      }


      //system automations medregnelse af varer ud, som følge af opsat system fra system siden.
      let parentArr = []
      let childArr = []

      this.$store.state.systemer.forEach((system)=> {

        if (system.Opsatstatus == true) {
          if (childArr.length == 0 || new Date(system.Brugsdato.seconds*1000).toLocaleDateString() == new Date(childArr[0].Brugsdato.seconds*1000).toLocaleDateString()) {
            childArr.unshift(system)
          }

          else {
            parentArr.push(childArr)
            childArr = []

            childArr.unshift(system)
          }
          
        }
      })
      parentArr.push(childArr)
      childArr = []
      
      parentArr.forEach((group)=> {
        group.forEach((parentItem)=>{

          let tempArr = []

          this.$store.state.lager.forEach((lagerItems) => {
            tempArr.push({id: lagerItems.id, qt: 0, navn: lagerItems.Produktnavn })
          })

          //console.log("_____")
          parentItem.Brugte_produkter.forEach((childItem)=>{
            
            if (childItem.qt != 0) {
              let index1 = this.$store.state.combos.indexOf(this.$store.state.combos.find((item) => item.id === childItem.id));
              this.$store.state.combos[index1].comboIds.forEach((subChildItem) => {

                let tempIndex = tempArr.indexOf(tempArr.find((item) => item.id === subChildItem));
                tempArr[tempIndex].qt += 1
                //console.log(tempArr)
              })
            }
          })

          tempArr.forEach((item)=>{
            if (item.qt != 0) {
              let index = this.$store.state.lager.indexOf(this.$store.state.lager.find((element) => element.id === item.id));
              this.$store.state.lager[index].Qt_på_lager -= item.qt

              this.$store.state.lagerUdInd.unshift({Produktnavn: item.navn, date: group[0].Brugsdato.seconds, Update: -item.qt, beskrivelse: "Korrektion som følge af opsætningen af: " + item.navn, Systemgenereted: true });
            }
          })
        })
      })


      //lager array med tilførte system qt korrektion
      this.$store.state.systemer.forEach((parentItem) => {

        if (parentItem.Opsatstatus != true) {

          parentItem.Brugte_produkter.forEach((childItem) => {

            for (let i = 0; i < childItem.qt; i++) {
              let index1 = this.$store.state.combos.indexOf(this.$store.state.combos.find((item) => item.id === childItem.id));
  
              this.$store.state.combos[index1].comboIds.forEach((subChildItem) => {
  
                try {
                
                  let index = this.$store.state.lager.indexOf(this.$store.state.lager.find((item) => item.id === subChildItem));
        
                  this.$store.state.lager[index].Qt_behov_til_systemer += 1;
        
                  if (this.$store.state.lager[index].ForfaldDato == null && this.$store.state.lager[index].Qt_behov_til_systemer > this.$store.state.lager[index].Qt_på_lager) {
                      this.$store.state.lager[index].ForfaldDato = new Date(parentItem.Brugsdato.seconds * 1000);
                  }
        
                  } catch (error) {
                    console.log("FEJL: Et system har tilknyttet et produkt, som er blevet slettet fra produkt kataloget: " + subChildItem.id)
                  }
  
            })
            }
          });
        }
      });


      this.$store.state.demoSystemer.forEach((parentItem) => {

        parentItem.Brugte_produkter.forEach((childItem) => {

          for (let i = 0; i < childItem.qt; i++) {
            let index1 = this.$store.state.combos.indexOf(this.$store.state.combos.find((item) => item.id === childItem.id));

            this.$store.state.combos[index1].comboIds.forEach((subChildItem) => {

              try {
              
                let index = this.$store.state.lager.indexOf(this.$store.state.lager.find((item) => item.id === subChildItem));
      
                this.$store.state.lager[index].Qt_prøveperiode += 1;
                this.$store.state.lager[index].Qt_på_lager -= 1;
      
                } catch (error) {
                  console.log("FEJL: Et system har tilknyttet et produkt, som er blevet slettet fra produkt kataloget: " + subChildItem.id)
                }
          })
          }
        });
      });
    },
  },
};
