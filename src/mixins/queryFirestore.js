import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {};
  },
  methods: {
    queryFirestore: async function () {
      this.$store.state.todaysDate = new Date(new Date().setHours(0, 0, 0, 0));


      //hent produkt/lager
      try {
        const docRef1 = await getDocs(collection(db, "produkter"));

        this.$store.state.lager = [];

        docRef1.forEach((doc) => {
          this.$store.state.lager.push({
            Produktnavn: doc.data().Produktnavn,
            Threshold: doc.data().Threshold,
            Qt_på_lager: doc.data().StockQT,
            Qt_prøveperiode: 0,
            id: doc.id,
            Qt_behov_til_systemer: 0,
            ForfaldDato: null,
          });
        });

        //sorter lager i alfabetisk rækkefølge
        this.$store.state.lager.sort(function (a, b) {
          if (a.Produktnavn < b.Produktnavn) {
            return -1;
          }
          if (a.Produktnavn > b.Produktnavn) {
            return 1;
          }
          return 0;
        });


        console.log("read data from: produkter");
      } catch (error) {
        console.error("ERROR reading data from: produkter " + error);
      }

      //hent combos
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



      //sikre at hvis reQuery har været gjort, så bliver alle systemer indlæst næste gang queryFirestore funktionen køres
      if (this.$store.state.completedReQueryRead == false) {

        //Hent systemer som ikke er opsat
        try {
          const docRef = await getDocs(
            query(collection(db, "systemer"), where("Opsatstatus", "==", false), orderBy("Brugsdato"))
          );
  
          this.$store.state.systemer = [];
  
          docRef.forEach((doc) => {
            this.$store.state.systemer.push({
              Systemnavn: doc.data().Systemnavn,
              Opsatstatus: doc.data().Opsatstatus,
              Leveretstatus: doc.data().Leveretstatus,
              Brugsdato: doc.data().Brugsdato,
              Brugte_produkter: doc.data().Brugte_produkter,
              id: doc.id,
              tilknyttet: doc.data().Tilknyttet,
              beskrivelse: doc.data().Beskrivelse
            });
          });

          let tempDato

          this.$store.state.systemer.forEach((parent) => {
            if (parent.Opsatstatus != true) {
              
              tempDato = parent.Brugsdato.seconds

              parent.Brugte_produkter.forEach((child) =>{
                
                if (child.qt > 0) {

                  for(let i = 0; i < child.qt; i++){
    
                    let childRelatedCombo = this.$store.state.combos.find(combo => combo.id === child.id)
                    
                    childRelatedCombo.comboIds.forEach((relatedProductId) => {
                      let tempProductIndex = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === relatedProductId))
                      this.$store.state.lager[tempProductIndex].Qt_behov_til_systemer += 1

                      if (this.$store.state.lager[tempProductIndex].ForfaldDato == null && this.$store.state.lager[tempProductIndex].Qt_behov_til_systemer > this.$store.state.lager[tempProductIndex].Qt_på_lager ) {
                        this.$store.state.lager[tempProductIndex].ForfaldDato = (new Date(tempDato*1000)).toLocaleDateString()
                      }

                    })
 
                }
              }
            })
          }
          })
  
          console.log("read data from: systemer");
        } catch (error) {
          console.error("ERROR reading data from: systemer " + error);
        }

      } else {
        
        //hent alle systemer
        try {
          const docRef = await getDocs(
            query(collection(db, "systemer"), orderBy("Brugsdato"))
          );
  
          this.$store.state.systemer = [];
  
          docRef.forEach((doc) => {
            this.$store.state.systemer.push({
              Systemnavn: doc.data().Systemnavn,
              Opsatstatus: doc.data().Opsatstatus,
              Leveretstatus: doc.data().Leveretstatus,
              Brugsdato: doc.data().Brugsdato,
              Brugte_produkter: doc.data().Brugte_produkter,
              id: doc.id,
              tilknyttet: doc.data().Tilknyttet,
              beskrivelse: doc.data().Beskrivelse
            });
          });

          let tempDato

          this.$store.state.systemer.forEach((parent) => {
            if (parent.Opsatstatus != true) {
              
              tempDato = parent.Brugsdato.seconds

              parent.Brugte_produkter.forEach((child) =>{
                
                if (child.qt > 0) {

                  for(let i = 0; i < child.qt; i++){
    
                    let childRelatedCombo = this.$store.state.combos.find(combo => combo.id === child.id)
                    
                    childRelatedCombo.comboIds.forEach((relatedProductId) => {
                      let tempProductIndex = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === relatedProductId))
                      this.$store.state.lager[tempProductIndex].Qt_behov_til_systemer += 1
                      
                      if (this.$store.state.lager[tempProductIndex].ForfaldDato == null && this.$store.state.lager[tempProductIndex].Qt_behov_til_systemer > this.$store.state.lager[tempProductIndex].Qt_på_lager ) {
                        this.$store.state.lager[tempProductIndex].ForfaldDato = (new Date(tempDato*1000)).toLocaleDateString()
                      }

                    })
 
                }
              }
            })
          }
          })
  
          console.log("read data from: systemer");
        } catch (error) {
          console.error("ERROR reading data from: systemer " + error);
        }

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
        const docRef4 = await getDocs(collection(db, "medarbejdere"));
        this.$store.state.medarbejdere = [];

        docRef4.forEach((doc) => {
          this.$store.state.medarbejdere.push({
            navn: doc.data().Navn,
            adresse: doc.data().Adresse,
            id: doc.id,
            color: doc.data().Color
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
        let previousDate = 0
        let tempArr = []
        let qtInd = 0
        let qtUd = 0

        docRef2.forEach((doc) => {
          let temp_indexing_of_arr = this.$store.state.lager.map((ref) => ref.id).indexOf(doc.data().produkt_ref_id);

          //stock tab group beregning
          if (previousDate == new Date((doc.data().date.seconds)*1000).toLocaleDateString() || previousDate == 0) {
            previousDate = new Date((doc.data().date.seconds)*1000).toLocaleDateString()
          } else {

            //sorter lager opdaterings array efter alfabetisk orden.
            tempArr.sort(function (a, b) {
              if (a.Produktnavn < b.Produktnavn) {
                return -1;
              }
              if (a.Produktnavn > b.Produktnavn) {
                return 1;
              }
              return 0;
            });

            this.$store.state.lagerUdInd.unshift({Date: previousDate, LagerUpdatesRef: tempArr, Ind: qtInd, Ud: qtUd});
            tempArr = []
            qtInd = 0
            qtUd = 0
            previousDate = new Date((doc.data().date.seconds)*1000).toLocaleDateString()
          }

          if (doc.data().update > 0) {
            qtInd += doc.data().update
          } else {
            qtUd += doc.data().update
          }

          tempArr.push({Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.data().date.seconds, Update: doc.data().update, id: doc.id, productRefId: doc.data().produkt_ref_id,  beskrivelse: doc.data().beskrivelse, Systemgenereted: doc.data().Systemgenereted});
        
        });

        this.$store.state.lagerUdInd.unshift({Date: previousDate, LagerUpdatesRef: tempArr, Ind: qtInd, Ud: qtUd});

        console.log(this.$store.state.lagerUdInd)

        console.log("read data from: stock");

      } catch (error) {
        console.error("ERROR reading data from: stock " + error);
      }







      
        }
      }
}
