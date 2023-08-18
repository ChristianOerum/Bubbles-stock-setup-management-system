import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {};
  },
  methods: {
    queryFirestore: async function () {

      this.$store.state.showPreloader = true

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
            Deliveries: []
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


        //console.log("read data from: produkter");
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

        //console.log("read data from: combos");
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
              beskrivelse: doc.data().Beskrivelse,
              stockFratrukket: doc.data().StockFratrukket
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
  
          //console.log("read data from: systemer");
        } catch (error) {
          console.error("ERROR reading data from: systemer " + error);
        }

      } else {
        
        //hent alle systemer
        try {
          const docRef = await getDocs(
            query(collection(db, "systemer"), orderBy("Opsatstatus"), limit((this.$store.state.systemQueryAmountMultiplier*10) + this.$store.state.systemer.length))
          );
  
          this.$store.state.systemer = [];


          //console.log((this.$store.state.systemQueryAmountMultiplier*10) + this.$store.state.systemer.length)


          docRef.forEach((doc) => {
            this.$store.state.systemer.push({
              Systemnavn: doc.data().Systemnavn,
              Opsatstatus: doc.data().Opsatstatus,
              Leveretstatus: doc.data().Leveretstatus,
              Brugsdato: doc.data().Brugsdato,
              Brugte_produkter: doc.data().Brugte_produkter,
              id: doc.id,
              tilknyttet: doc.data().Tilknyttet,
              beskrivelse: doc.data().Beskrivelse,
              stockFratrukket: doc.data().StockFratrukket
            });
          });

          //sorter array så de kommer i dato rækkefølge
          this.$store.state.systemer .sort(function(a,b){
            return (a.Brugsdato.seconds) - (b.Brugsdato.seconds) ;
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
  
          //console.log("read data from: systemer");
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

        //console.log("read data from: demoSystemer");
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

        //console.log("read data from: medarbejdere");
      } catch (error) {
        console.error("ERROR reading data from: medarbejdere " + error);
      }



      //let allStockItems = []

      //query 1, alle med ikke leveret
      try {
        const docRef1 = await getDocs(
          query(collection(db, "stock"), where("leveret", "==", false), orderBy("date"))
        );

        //query 2, x antal som er leveret
        try {
          const docRef2 = await getDocs(
            query(collection(db, "stock"), where("leveret", "==", true), orderBy("date"), limit((this.$store.state.stockQueryAmountMultiplier*10)))
          );
  
          //udpak query 1 og tillæg dets id'er
          const queryResult1 = docRef1.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { ...data, id }
          })

          //udpak query 2 og tillæg dets id'er
          const queryResult2 = docRef2.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { ...data, id }
          })

          //sammenlæg de 2 querys
          const combinedData = queryResult1.concat(queryResult2);
          
          //sorter arrayet efter dato
          combinedData.sort((a, b) => a.date.toDate() - b.date.toDate());

          //calc related to stock items.
          this.$store.state.lagerUdInd = [];
          let previousDate = 0
          let tempArr = []
          let qtInd = 0
          let qtUd = 0
          let qtPåVej = 0

          combinedData.forEach((doc) => {

            let temp_indexing_of_arr = this.$store.state.lager.map((ref) => ref.id).indexOf(doc.produkt_ref_id);
            if (doc.leveret != true) {
  
              this.$store.state.lager[temp_indexing_of_arr].LagerIncommingDelivery = true
  
              //Indsæt stock som er under levering til arrayet i .lager for hvert produkt.
              if (this.$store.state.lager[temp_indexing_of_arr].LagerDeliveryDate == null) {
                this.$store.state.lager[temp_indexing_of_arr].Deliveries.unshift({LagerDeliveryDate: doc.date.seconds, LagerDeliveryQT: doc.update})
              }
  
            }
            

            //stock tab group beregning
            if (previousDate == new Date((doc.date.seconds)*1000).toLocaleDateString() || previousDate == 0) {

              previousDate = new Date((doc.date.seconds)*1000).toLocaleDateString()
            } 
            
            else {
  
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
  
              this.$store.state.lagerUdInd.unshift({Date: previousDate, LagerUpdatesRef: tempArr, Ind: qtInd, Ud: qtUd, PåVej: qtPåVej});
              tempArr = []
              qtInd = 0
              qtUd = 0
              qtPåVej = 0
              previousDate = new Date((doc.date.seconds)*1000).toLocaleDateString()
            }
  
            if (doc.update > 0 && doc.leveret == true) {
              qtInd += doc.update
            } 
            
            else if (doc.update > 0 && doc.leveret == false) {
              qtPåVej += doc.update
            }
            
            else if (doc.leveret == true) {
              qtUd += doc.update
            }
  
            tempArr.push({Produktnavn: this.$store.state.lager[temp_indexing_of_arr].Produktnavn, date: doc.date.seconds, Update: doc.update, id: doc.id, productRefId: doc.produkt_ref_id,  beskrivelse: doc.beskrivelse, leveret: doc.leveret, systemgenereted: doc.Systemgenereted, tilhørendeSystem: doc.TilhørendeSystem});
          
          });
  
          this.$store.state.lagerUdInd.unshift({Date: previousDate, LagerUpdatesRef: tempArr, Ind: qtInd, Ud: qtUd, PåVej: qtPåVej});


      


          //dashboard alerts

          //leverancer
          this.$store.state.leverancerDashboard = []

          this.$store.state.lagerUdInd.forEach((parentItem) => {
            parentItem.LagerUpdatesRef.forEach((childItem) => {
       
                if (childItem.leveret == false) {
                  this.$store.state.leverancerDashboard.unshift({Produktnavn: childItem.Produktnavn, Update: childItem.Update, beskrivelse: childItem.beskrivelse, date: childItem.date, id: childItem.id, leveret: childItem.leveret, productRefId: childItem.productRefId});
                }

            });
          });


          //systemer
          this.$store.state.systemerDashboard = []
          this.$store.state.systemerRed = false
          
          this.$store.state.systemer.forEach((parentItem) => {
            if (parentItem.Opsatstatus == false) {

              this.$store.state.systemerRed = true

              this.$store.state.systemerDashboard.push({
                Systemnavn: parentItem.Systemnavn,
                Opsatstatus: parentItem.Opsatstatus,
                Leveretstatus: parentItem.Leveretstatus,
                Brugsdato: parentItem.Brugsdato,
                Brugte_produkter: parentItem.Brugte_produkter,
                id: parentItem.id,
                tilknyttet: parentItem.tilknyttet,
                beskrivelse: parentItem.beskrivelse
              });


            }

          })


          //stock
          this.$store.state.lager.forEach((item) => {
            if (item.Threshold > item.Qt_på_lager && item.ForfaldDato != null) {
              this.$store.state.stockStatus = "red"
            }

            else if (this.$store.state.stockStatus == "" && item.Threshold > item.Qt_på_lager) {
              this.$store.state.stockStatus = "yellow"
            }

          })


          //console.log(this.$store.state.lagerUdInd)

          this.$store.state.showPreloader = false

        } catch (error) {
          console.error("ERROR reading data2 from: stock " + error);
        }

      } catch (error) {
        console.error("ERROR reading data1 from: stock " + error);
      }









      
        }
      }
}
