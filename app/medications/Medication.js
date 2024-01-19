import { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../src/data/Firebase";
import Button from "../../src/components/controls/Button";
import MedicationCard from "./MedicationCard";
import NavBar from "../../src/components/controls/NavBar";
import MedicationSchema from "../../src/data/schemas/MedicationSchema";
import COLORS from "../../src/constants/COLORS";
import DisplayIcon from "../../src/components/DisplayIcon";
import { useRouter } from "expo-router";

// List of drug - https://www.drugs.com/
const Medication = () => {
   const navigation = useNavigation();
   const router = useRouter();

   const [medicationRecs, setMedicationRecs] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleAddMedication = () => {
      navigation.navigate("medicationDetail", { record: MedicationSchema });
   };
   const handleMedicationEdit = ({ medicationRec }) => {
      router?.push({
         pathname: "/medications/MedicationDetail",
         params: { record: medicationRec },
      });
      // navigation.navigate("medicationDetail", { record: medicationRec });
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
            backScreenPath="/Home"
         />

         {medicationRecs ? (
            <ScrollView style={{ marginHorizontal: 10 }}>
               {medicationRecs.length > 0 ? (
                  medicationRecs.map((medication, index) => (
                     <MedicationCard
                        medicationRec={medication}
                        handleMedicationEdit={handleMedicationEdit}
                        key={index}
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
         <View
            style={{
               position: "absolute",
               right: 0,
               bottom: 20,
               alignItems: "flex-end",
            }}
         >
            <TouchableOpacity
               style={{
                  marginRight: 30,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.lightBlue01,
                  borderRadius: 30,
               }}
               // onPress={() => handleAddMedication()}
            >
               <DisplayIcon
                  iconName="pluscircleo"
                  iconFamily="AntDesign"
                  size={60}
                  color={COLORS.appBackground}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default Medication;

const styles = StyleSheet.create({});

