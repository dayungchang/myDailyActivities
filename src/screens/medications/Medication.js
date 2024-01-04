import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../data/Firebase";
import Button from "../../components/controls/Button";
import MedicationCard from "../../components/MedicationCard";
import NavBar from "../../components/controls/NavBar";
import MedicationSchema from "../../data/schemas/MedicationSchema";

const Medication = () => {
   const navigation = useNavigation();

   const [medicationRecs, setMedicationRecs] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleAddMedication = () => {
      navigation.navigate("medicationDetail", { record: MedicationSchema });
   };
   const handleMedicationEdit = ({ medicationRec }) => {
      navigation.navigate("medicationDetail", { record: medicationRec });
   };
   const fetchMedicationsByUserUID = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      // console.log(
      //    "Medication - fetchMedicationsByUserUID - auth.currentUser.uid",
      //    auth.currentUser.uid
      // );
      setIsLoading(true);
      const colRef = collection(db, "medication");
      const qPull = query(colRef, where("userUID", "==", auth.currentUser.uid));

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setMedicationRecs(records);
      });
      setIsLoading(false);
   };
   useEffect(() => {
      fetchMedicationsByUserUID();
   }, []);

   return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
         <NavBar
            title="Medication"
            backScreen="Home"
         />
         <View
            style={{
               marginTop: 10,
               marginRight: 20,
               height: 60,
               alignItems: "flex-end",
            }}
         >
            <Button
               label="+ Medication"
               width={150}
               onPress={() => handleAddMedication()}
            />
         </View>
         {medicationRecs ? (
            <ScrollView style={{ marginHorizontal: 10 }}>
               {medicationRecs.length > 0 ? (
                  medicationRecs.map((medication, index) => (
                     <MedicationCard
                        medicationRec={medication}
                        handleMedicationEdit={handleMedicationEdit}
                     />
                  ))
               ) : (
                  <View>
                     {isLoading ? (
                        <Text>Loading ...</Text>
                     ) : (
                        <Text>No medication exists</Text>
                     )}
                  </View>
               )}
            </ScrollView>
         ) : (
            <View>
               {isLoading ? (
                  <Text>Loading ...</Text>
               ) : (
                  <Text>No medication exists</Text>
               )}
            </View>
         )}
      </View>
   );
};

export default Medication;

const styles = StyleSheet.create({});

