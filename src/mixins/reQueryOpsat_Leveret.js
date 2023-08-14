import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {};
  },
  methods: {
    reQuerOpsat_leveret: async function () {
      this.$store.state.todaysDate = new Date(new Date().setHours(0, 0, 0, 0));

      try {
        const docRef = await getDocs(
          query(collection(db, "systemer"), where("Opsatstatus", "==", true), orderBy("Brugsdato"))
        );

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

        console.log("read data from: systemer");


        //resort array så systemerne stadig står i dato rækkefølge
        let tempArr = this.$store.state.systemer.sort(function(a, b) {
            return a.Brugsdato.seconds - b.Brugsdato.seconds;
        });

        this.$store.state.systemer = tempArr

        this.$store.state.completedReQueryRead = true



      } catch (error) {
        console.error("ERROR reading data from: systemer " + error);
      }
    },
  },
};
