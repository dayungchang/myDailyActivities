import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../constants/COLORS";
import GlobalStyle from "../styles/GlobalStyle";

const MedicationCard = ({ medicationRec, handleMedicationEdit }) => {
   useEffect(() => {}, []);

   return (
      <TouchableOpacity
         onPress={() =>
            handleMedicationEdit((medicationRec = { medicationRec }))
         }
         style={[
            GlobalStyle.boarderWithShadow,
            {
               padding: 10,
               borderWidth: 0.2,
               borderRadius: 7,
               backgroundColor: "white",
               marginBottom: 10,
            },
         ]}
      >
         <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {medicationRec.medication}
         </Text>
         <Text>{medicationRec.instruction}</Text>
         <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
               <Text style={{ width: 80, textAlign: "right" }}>
                  {medicationRec.strength}
               </Text>
               <Text style={{ color: COLORS.darkGrey }}>mg</Text>
            </View>
            <Text>{medicationRec.howMany}</Text>
            <Text style={{ color: COLORS.darkGrey }}>per</Text>
            <Text> {medicationRec.howOften}</Text>
            <Text style={{ color: COLORS.darkGrey }}>by</Text>
            <Text>{medicationRec.route}</Text>
         </View>
         <Text>{medicationRec.pharmacy}</Text>
         <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={{ color: COLORS.darkGrey }}>RxID</Text>
            <Text> {medicationRec.rxID}</Text>
            <Text style={{ color: COLORS.darkGrey }}>Disp Date</Text>
            <Text>{medicationRec.dispensedDt}</Text>
         </View>
         <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={{ color: COLORS.darkGrey }}>Status</Text>
            <Text>{medicationRec.status}</Text>
            <Text>{medicationRec.refills}</Text>
            <Text style={{ color: COLORS.darkGrey }}>Refills by</Text>
            <Text>{medicationRec.refillByDt}</Text>
         </View>
         {medicationRec.doctor && (
            <View style={{ flexDirection: "row", gap: 10 }}>
               <Text style={{ color: COLORS.darkGrey }}>Dr.</Text>
               <Text>{medicationRec.doctor}</Text>
            </View>
         )}
         {medicationRec.problem && <Text>{medicationRec.problem}</Text>}
         {medicationRec.problem && <Text>{medicationRec.writtenDt}</Text>}
         {medicationRec.problem && <Text>{medicationRec.endDt}</Text>}
      </TouchableOpacity>
   );
};

export default MedicationCard;

const styles = StyleSheet.create({});

