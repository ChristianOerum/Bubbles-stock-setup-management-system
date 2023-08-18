<template>
   <div class="bg-white w-screen h-screen flex flex-col justify-center items-center relative">

    <div class="bg-[#F1F7FF] p-6 rounded-xl grid grid-cols-2 gap-4">
        <h1 class="font-bold text-[24px] text-[#00214B]">
            Opdater system detaljer
        </h1>

        <div class="w-auto h-auto rounded-xl flex flex-col items-right relative col-start-1 text-[14px]">


            <input v-if="this.stockFratrukket != true" type="text" placeholder="System navn"
            class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold"
            v-model="SystemNavn" />

            <div v-else class="indent-[15px] h-[40px] w-[400px] bg-white text-[#00214B] rounded-lg text-left font-semibold flex items-center opacity-50">
                <p>{{ this.SystemNavn }}</p>
            </div>

            <p class="indent-[3px] font-semibold mt-2 mb-1">Tilhørende ansat</p>

            <button v-if="this.stockFratrukket != true" @click.self="toggleDropdownEmployee"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                {{
                    SelectedOptionEmployee.navn == null ? "Vælg" : SelectedOptionEmployee.navn
                }}
            </button>
            <div v-else 
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg opacity-50 flex items-center">
                {{
                    SelectedOptionEmployee.navn == null ? "Vælg" : SelectedOptionEmployee.navn
                }}
            </div>
            
            <div v-if="this.dropdownOpenEmployee"
                class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelectEmployee($event, index)" v-for="(item, index) in this.DropdownOptionsEmployee"
                    v-bind:key="index"
                    class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    {{ item.navn }}
                </button>
            </div>

            <p class="indent-[3px] font-semibold mt-2 mb-1">Opsat?</p>

            <button v-if="this.stockFratrukket != true" @click.self="toggleDropdownOpsat"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                {{
                    SelectedOptionOpsat.value == null ? "Vælg" : SelectedOptionOpsat.lable
                }}
            </button>
            <div v-else class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg opacity-50 flex items-center">
                <p>{{ SelectedOptionOpsat.value == null ? "Vælg" : SelectedOptionOpsat.lable }}</p>
            </div>


            <div v-if="this.dropdownOpenOpsat"
                class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelectOpsat($event, index)" v-for="(item, index) in this.DropdownOptionsOpsat"
                    v-bind:key="index"
                    class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    {{ item.lable }}
                </button>
            </div>

            <p class="indent-[3px] font-semibold mt-2 mb-1">Leveret?</p>

            <button v-if="this.stockFratrukket != true" @click.self="toggleDropdownLeveret"
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg">
                {{
                    SelectedOptionLeveret.value == null ? "Vælg" : SelectedOptionLeveret.lable
                }}
            </button>
            <div v-else
                class="h-[40px] w-[400px] text-[#00214B] text-left indent-[15px] bg-white font-semibold rounded-lg opacity-50 flex items-center">
                {{
                    SelectedOptionLeveret.value == null ? "Vælg" : SelectedOptionLeveret.lable
                }}
            </div>
            <div v-if="this.dropdownOpenLeveret"
                class="w-[400px] max-h-[200px] h-auto bg-white mt-2 rounded-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <button v-on:click="dropdownSelectLeveret($event, index)" v-for="(item, index) in this.DropdownOptionsLeveret"
                    v-bind:key="index"
                    class="h-[30px] w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    {{ item.lable }}
                </button>
            </div>

            <p class="indent-[3px] font-semibold mt-2 mb-1">Levering dato</p>

            <input v-if="this.stockFratrukket != true" type="date" required pattern="\d{4}-\d{2}-\d{2}" placeholder='MM/DD/YYYY'
                class=" h-[40px] w-[400px] indent-[8px] font-semibold font-[#00214B] rounded-md text-left focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff]" v-model="dateValue" />
            <div v-else class="bg-white opacity-50 flex items-center rounded-md w-full h-[40px] indent-[15px] font-semibold text-[#00214B]">
                <p>{{ this.dateValue }}</p>
            </div>
            

            <textarea v-if="this.stockFratrukket != true" placeholder="Beskrivelse (valgfri)"
                class="resize-none p-3 mt-2 flex-grow w-[400px] bg-white text-[#00214B] rounded-lg focus:outline-[3px] focus:outline outline-[#0097ff] font-poppins font-semibold text-left"
                type="textarea" v-model="beskrivelse" />
            <div v-else class="bg-white opacity-50 flex pt-3 rounded-md w-full h-[40px] indent-[15px] font-semibold text-[#00214B] mt-2 flex-grow">
                <p>{{ this.beskrivelse }}</p>
            </div>

        </div>

        <div class="col-start-2">

            <p class="indent-[3px] font-semibold">Combo på system</p>

            <div v-if="this.stockFratrukket != true" class="mt-1 indent-[14px] h-auto w-[400px] rounded-lg overflow-hidden">
                <div v-for="(item, index) in this.BrugteProdukter" v-bind:key="index" class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p class="text-[14px]">{{ item.navn }}</p>
                    <input type="number"
                        class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 outline-[#0097ff] font-poppins font-semibold"
                        v-model="BrugteProdukter[index].qt" />
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>
            </div>

            <div v-else class="mt-1 indent-[14px] h-auto w-[400px] rounded-lg overflow-hidden opacity-50">
                <div v-for="(item, index) in this.BrugteProdukter" v-bind:key="index" class="flex items-center h-[40px] relative w-[400px] bg-[#DDECFF] text-[#0097ff] font-semibold indent-[15px] text-left">
                    <p class="text-[14px]">{{ item.navn }}</p>

                    <div class="w-[70px] absolute right-7 h-[70%] rounded-md text-right focus:outline-[3px] focus:outline outline-offset-0 bg-white p-1 outline-[#0097ff] font-poppins font-semibold">
                        <p>{{ this.BrugteProdukter[index].qt }}</p>
                    </div>
                    <p class="absolute right-3 text-[#00214B]">x</p>
                </div>
            </div>

        </div>

        <div v-if="this.stockFratrukket != true" class="flex gap-2">
            <button @click="updateSystem" class="bg-[#0097ff] text-white w-fit text-[14px] font-medium rounded-lg p-2 right-2">Opdater</button>
            <button @click="updateAndAddRelatedStock()" class="bg-[#EAEEF3] text-[#9AA8BA] w-fit text-[14px] font-medium rounded-lg p-2 right-2"><fa icon="lock-open" /> Lås og fratræk varer fra lager</button>
        </div>

        <div v-else>
            <button @click="updateAndRemoveRelatedStock()" class="bg-[#ffdbdb] text-[#AA2E2E] w-fit text-[14px] font-medium rounded-lg p-2 right-2"><fa icon="lock" /> Lås op og fjern varer fratræk fra lager</button>
        </div>
        

    </div>

    </div>
</template>

<script>
//import firebase
import { doc, updateDoc, addDoc, collection, getDocs, where, query, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

//import comps

//import mixins
import queryFirestore from "../mixins/queryFirestore";

export default {
    data() {
        return {
            dateValue: null,
            dropdownOpenOpsat: false,
            dropdownOpenLeveret: false,
            dropdownOpenEmployee: false,

            DropdownOptionsOpsat: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            DropdownOptionsLeveret: [
                { lable: "Ja", value: true },
                { lable: "Nej", value: false },
            ],
            DropdownOptionsEmployee: [],

            SelectedOptionOpsat: [],
            SelectedOptionLeveret: [],
            SelectedOptionEmployee: [],
            SystemNavn: "",
            BrugteProdukter: [],
            beskrivelse: "",
            stockFratrukket: null



        };
    },
    components: {

    },
    methods: {
        toggleDropdownOpsat() {
            this.dropdownOpenOpsat = !this.dropdownOpenOpsat;
        }, 

        toggleDropdownLeveret() {
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret;
        }, 

        toggleDropdownEmployee() {
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        dropdownSelectOpsat(ev, i) {
            this.SelectedOptionOpsat = this.DropdownOptionsOpsat[i];
            this.dropdownOpenOpsat = !this.dropdownOpenOpsat;
        },

        dropdownSelectLeveret(ev, i) {
            this.SelectedOptionLeveret = this.DropdownOptionsLeveret[i];
            this.dropdownOpenLeveret = !this.dropdownOpenLeveret;
        },

        dropdownSelectEmployee(ev, i) {
            this.SelectedOptionEmployee = this.DropdownOptionsEmployee[i];
            this.dropdownOpenEmployee = !this.dropdownOpenEmployee;
        },

        async updateSystem() {

            if (this.dateValue != null && this.SelectedOptionOpsat.length != 0 && this.SelectedOptionLeveret.length != 0 && this.SelectedOptionEmployee.length != 0 && this.SystemNavn != '') {

                try {
                    const ref = doc(db, "systemer", this.$store.state.systemer[this.$store.state.TempIndex].id
                    );
                    await updateDoc(ref, {
                        Brugsdato: new Date(this.dateValue),
                        Brugte_produkter: this.BrugteProdukter,
                        Opsatstatus: this.SelectedOptionOpsat.value,
                        Leveretstatus: this.SelectedOptionLeveret.value,
                        Systemnavn: this.SystemNavn,
                        Tilknyttet: this.SelectedOptionEmployee.id,
                        Beskrivelse: this.beskrivelse,
                        StockFratrukket: this.stockFratrukket
                    });

                    this.queryFirestore();
                    this.$router.push('/systemer')


                    console.log("Updated " + this.$store.state.systemer[this.$store.state.TempIndex].id + " from: systemer");

                    this.$store.state.showSuccessMessage = true
                    this.$store.state.successMessage = "Data blev opdateret i 'Systemer' databasen. "
                    console.log(this.$store.state.errorMessage )

                    setTimeout(() => {
                        this.$store.state.showSuccessMessage = false
                        this.$store.state.successMessage = ""
                    }, 5000)


                } catch (error) {
                    console.error("ERROR updating " +  this.$store.state.systemer[this.$store.state.TempIndex].id + " from: systemer " + error);

                    this.$store.state.showErrorMessage = true
                    this.$store.state.errorMessage = "Kunne ikke opdaterer " + this.$store.state.systemer[this.$store.state.TempIndex].id + ": "  + error
                    console.log(this.$store.state.errorMessage )

                    setTimeout(() => {
                        this.$store.state.showErrorMessage = false
                        this.$store.state.errorMessage = ""
                    }, 5000)


                }

            }

            else {

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Du har ikke udfyldt alle fælterne i formularen, check om du har overset et fælt."

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }

        },

        async updateAndAddRelatedStock() {
      
            let tempStockArr = []
            let lagerUpdateArr = []
            //kig i listen med alle systemets brugte combos
            this.BrugteProdukter.forEach((usedCombos) => {

                //vælg kun de combos der har en stk værdi over 0
                if (usedCombos.qt != 0) {

                    //kør denne kode n mængde gange som en bruger har sat combo stk. værdien til
                    for(let i = 0; i < usedCombos.qt; i++){

                        //find produkt id's udfra de forskellige combo'er og gør noget for hver af de tilknyttede produkter
                        this.$store.state.combos.find(combo => combo.id === usedCombos.id).comboIds.forEach((produkt) => {

                            //let tempId = this.$store.state.lager.indexOf(this.$store.state.lager.find(produkt2 => produkt2.id === produkt))

                            tempStockArr.push(produkt)
                            
                        })
                    }
                }
            })

            let produktArrSortedAndSammenlagt = []
            let qtTotal = 0
            let prevId = ''

            //sorter temp array så ids kommer i rækkefølge
            tempStockArr.sort(function (a, b) {
                if (a > b) {
                return -1;
                }
                if (a < b) {
                return 1;
                }
                return 0;
            });
            //sorter temp array så ids kommer i rækkefølge end

            //sammenlæg arr
            tempStockArr.forEach((produktId) => {
                if (prevId == produktId || prevId == '' ) {
                    qtTotal += 1
                    prevId = produktId
                } 
                else {
                    produktArrSortedAndSammenlagt.push({id: prevId, qt: qtTotal})
                    qtTotal = 1
                    prevId = produktId
                }
            })

            produktArrSortedAndSammenlagt.push({id: prevId, qt: qtTotal})
            //sammenlæg arr end

            //console.log(produktArrSortedAndSammenlagt)

            tempStockArr = []
            lagerUpdateArr = []

            produktArrSortedAndSammenlagt.forEach((produkt) => {

                tempStockArr.push({
                    update: -produkt.qt,
                    produkt_ref_id: produkt.id,
                    date: new Date(this.dateValue),
                    beskrivelse: "autogenereret som følge af fratrækkelse af stock fra system med id: " + this.$store.state.systemer[this.$store.state.TempIndex].id,
                    leveret: true,
                    Systemgenereted: true,
                    TilhørendeSystem: this.$store.state.systemer[this.$store.state.TempIndex].id
     
                });

                let productIdForQtCorrection = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === produkt.id))

                let newQTval = this.$store.state.lager[productIdForQtCorrection].Qt_på_lager - produkt.qt

                lagerUpdateArr.push({docId: produkt.id, data: { StockQT: newQTval }})
            }) 

            try {
                const updatePromises = lagerUpdateArr.map(({ docId, data }) =>
                updateDoc(doc(db, 'produkter', docId), data)
                );

                await Promise.all(updatePromises);

                console.log('Documents updated successfully');
            } catch (error) {
                console.error('Error updating documents:', error);
            }
            

            console.log(tempStockArr)

            const promises = tempStockArr.map(async (data) => {
                return addDoc(collection(db, "stock"), data);
            });

            try {
                const results = await Promise.all(promises);
                console.log("Documents created:", results);
                
                const ref = doc(db, "systemer", this.$store.state.systemer[this.$store.state.TempIndex].id);
                    await updateDoc(ref, {
                        StockFratrukket: true
                });





                this.$router.push('/systemer')
                this.queryFirestore()

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev tilføjet til 'stock' databasen. "
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)


            } catch (error) {

                console.error("Error adding document to stock: ", error);

                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Dataindsætnings problem: " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)

            }
            
        },

        async updateAndRemoveRelatedStock() {

            try {
                const stockItemsForDeletion = await getDocs(
                    query(collection(db, "stock"), where("TilhørendeSystem", "==", this.$store.state.systemer[this.$store.state.TempIndex].id))
                );

                let deletionStockArr = []

                stockItemsForDeletion.forEach((doc) => {

                    let productIdForQtCorrection = this.$store.state.lager.indexOf(this.$store.state.lager.find(product => product.id === doc.data().produkt_ref_id))
                    let newQTval = ((doc.data().update)*-1) + this.$store.state.lager[productIdForQtCorrection].Qt_på_lager

                    deletionStockArr.push({id: doc.id, produktRef: doc.data().produkt_ref_id, data: { StockQT: newQTval } })
                })

                try {
                    const deletionPromises = deletionStockArr.map((docId) => deleteDoc(doc(db, 'stock', docId.id)));
    
                    await Promise.all(deletionPromises);

                    const system = doc(db, "systemer", this.$store.state.systemer[this.$store.state.TempIndex].id);
                        await updateDoc(system, {
                            StockFratrukket: false
                        });

                        console.log(deletionStockArr)

                        try {
                            const updatePromises = deletionStockArr.map(({ produktRef, data }) =>
                            updateDoc(doc(db, 'produkter', produktRef), data)
                            );

                            await Promise.all(updatePromises);

                            console.log('Documents updated successfully');
                        } catch (error) {
                            console.error('Error updating documents:', error);
                        }

                } catch (error) {

                    console.error("Error deleting documents ", error);

                }


                this.$router.push('/systemer')
                this.queryFirestore()

                this.$store.state.showSuccessMessage = true
                this.$store.state.successMessage = "Data blev slettet fra 'stock' og lager værdi blev tilpasset i lager "

                setTimeout(() => {
                    this.$store.state.showSuccessMessage = false
                    this.$store.state.successMessage = ""
                }, 5000)

    
            } catch (error) {
                this.$store.state.showErrorMessage = true
                this.$store.state.errorMessage = "Fejl ved fjernelse af 'stock' data, eller redigering af lager status: " + error
                console.log(this.$store.state.errorMessage )

                setTimeout(() => {
                    this.$store.state.showErrorMessage = false
                    this.$store.state.errorMessage = ""
                }, 5000)
            }

        }

    },
    mixins: [queryFirestore],

    async mounted() {

        this.stockFratrukket = this.$store.state.systemer[this.$store.state.TempIndex].stockFratrukket

        try {
            this.beskrivelse = this.$store.state.systemer[this.$store.state.TempIndex].beskrivelse
        } catch (error) {
                console.error("beskrivelse ikke fundet: ", error);
        }

        for (const item of this.$store.state.medarbejdere) {
            this.DropdownOptionsEmployee.push(item);
        }



        

        try {
            if (this.$store.state.systemer[this.$store.state.TempIndex].Opsatstatus == true) {
                this.SelectedOptionOpsat = this.DropdownOptionsOpsat[0]
            }
            else {
                this.SelectedOptionOpsat = this.DropdownOptionsOpsat[1]
            }

            } catch (error) {
                    console.error("Kan ikke bestemme Opsat boolean værdi ", error);
        }

        try {
            if (this.$store.state.systemer[this.$store.state.TempIndex].Leveretstatus == true) {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[0]
            }
            else {
                this.SelectedOptionLeveret = this.DropdownOptionsLeveret[1]
            }

            } catch (error) {
                    console.error("Kan ikke bestemme Leveret boolean værdi ", error);
        }



        try {
            let arraySearchEmployee = (element) => element.id == this.$store.state.systemer[this.$store.state.TempIndex].tilknyttet

            let index = this.$store.state.medarbejdere.findIndex(arraySearchEmployee)

            this.SelectedOptionEmployee = this.$store.state.medarbejdere[index]

            //console.log(this.$store.state.medarbejdere[index])

            } catch (error) {
                    console.error("Id ej fundet, medarbejderen er tidligere blevet slettet fra databasen ", error);
        }



        (this.dateValue = new Date(
            this.$store.state.systemer[this.$store.state.TempIndex].Brugsdato.seconds * 1000).toISOString().substr(0, 10)),(this.SystemNavn = this.$store.state.systemer[this.$store.state.TempIndex].Systemnavn);

        if (
            this.$store.state.systemer[this.$store.state.TempIndex].Opsatstatus ==
            false
        ) {
            this.SelectedOption = { lable: "Ikke opsat", value: false };
        } else {
            this.SelectedOption = { lable: "Opsat", value: true };
        }

        for (const item of this.$store.state.combos) {
            this.BrugteProdukter.push({ navn: item.comboNavn, id: item.id, qt: 0 });
        }
        

        for (const item of (this.$store.state.systemer[this.$store.state.TempIndex].Brugte_produkter)) {

            try {
            let arraySearch = (element) => element.id == item.id

            let index = this.BrugteProdukter.findIndex(arraySearch)

            this.BrugteProdukter[index].qt += item.qt

            } catch (error) {
                    console.error("Id ej fundet, produktet er tidligere blevet slettet fra produkt katalog ", error);
            }


        }
    },
};
</script>
