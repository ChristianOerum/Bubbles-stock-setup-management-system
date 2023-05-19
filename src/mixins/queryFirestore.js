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
            tilknyttet: doc.data().Tilknyttet
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
            id: doc.id,
            beskrivelse: doc.data().beskrivelse,
          });
        });

        console.log("read data from: stock");
      } catch (error) {
        console.error("ERROR reading data from: stock " + error);
      }

      //lager array med tilførte system qt korrektion
      this.$store.state.systemer.forEach((parentItem) => {

        parentItem.Brugte_produkter.forEach((childItem) => {

          for (let i = 0; i < childItem.qt; i++) {
            let index1 = this.$store.state.combos.indexOf(this.$store.state.combos.find((item) => item.id === childItem.id));

            this.$store.state.combos[index1].comboIds.forEach((subChildItem) => {

              let index = this.$store.state.lager.indexOf(this.$store.state.lager.find((item) => item.id === subChildItem));
      
                this.$store.state.lager[index].Qt_behov_til_systemer += 1;
      
                if (this.$store.state.lager[index].ForfaldDato == null && this.$store.state.lager[index].Qt_behov_til_systemer > this.$store.state.lager[index].Qt_på_lager) {
                    this.$store.state.lager[index].ForfaldDato = new Date(parentItem.Brugsdato.seconds * 1000);
                }

          })
          }
        });
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
