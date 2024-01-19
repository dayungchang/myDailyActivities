import { useEffect, useState } from "react";
import {
   Alert,
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
   addDoc,
   collection,
   doc,
   getDoc,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import NavBar from "../../src/components/controls/NavBar";
import { auth, db } from "../../src/data/Firebase";
import Images from "../../src/constants/Images";
import GlobalStyle from "../../src/styles/GlobalStyle";
import Button from "../../src/components/controls/Button";
import Checkbox from "expo-checkbox";
import COLORS from "../../src/constants/COLORS";
import RoutineImage from "../../src/components/RoutineImage";
import RoutineSchema from "../../src/data/schemas/RoutineSchema";
import Input from "../../src/components/controls/Input";

const RoutineSelect = () => {
   const router = useRouter();
   const navigation = useNavigation();
   const params = useLocalSearchParams();
   // console.log("params", params);

   const [exerciseRec, setExerciseRec] = useState(params);
   const [routines, setRoutines] = useState(RoutineSchema);
   const [buttonLabel, setButtonLabel] = useState("Select");
   const [tempRec, setTempRec] = useState(RoutineSchema);

   const fetchRoutineByFocusArea = () => {
      const colRef = collection(db, "lookUp");
      const qPull = query(
         colRef,
         where("type", "==", exerciseRec.focusArea),
         orderBy("label")
      );
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutines(records);
      });
   };
   const handleRoutineSelected = (routineRec) => {
      navigation.goBack();
      // router.
   };
   const handleAddRoutine = async () => {
      // console.log("FocusArea", exerciseRec.focusArea);

      const colRef = collection(db, "focusArea");
      const qPull = query(
         colRef,
         where("focusArea", "==", exerciseRec.focusArea),
         orderBy("label")
      );
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setTempRec(records);
         Alert.alert("Number of records ...", records.length.toString());
      });
      // console.log("Handle Add Routine ...", tempRec);
   };
   useEffect(() => {
      // console.log("exerciseRec", exerciseRec);

      fetchRoutineByFocusArea();
   }, []);

   return (
      <>
         <NavBar
            title="Select Routine"
            backScreen="Cancel"
         />
         <View style={{ flex: 1 }}>
            <View
               style={{
                  alignItems: "center",
                  marginVertical: 20,
               }}
            >
               <Text
                  style={{
                     fontSize: 24,
                     fontWeight: "bold",
                  }}
               >
                  Focus Area: {exerciseRec.focusArea}
               </Text>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  gap: 20,
                  marginHorizontal: 20,
                  height: 50,
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <Input
                  placeholder="Name of Routine"
                  autoCapitalize="words"
               />
               <Button
                  label="Add"
                  width={80}
                  onPress={handleAddRoutine}
               />
            </View>
            <ScrollView>
               <View
                  style={[
                     GlobalStyle.boarderWithShadow,
                     {
                        margin: 10,
                        borderRadius: 7,
                        backgroundColor: "#F0F0F0",
                     },
                  ]}
               >
                  {routines.length > 0 ? (
                     routines.map((routine, index) => (
                        <RoutineCard
                           routine={routine}
                           exerciseRec={exerciseRec}
                           handleSelected={handleRoutineSelected}
                           key={index}
                        />
                     ))
                  ) : (
                     <Text>No routine found</Text>
                  )}
               </View>
            </ScrollView>
            <View
               style={{
                  alignItems: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  margin: 10,
               }}
            >
               <Button
                  label={buttonLabel}
                  width={200}
               />
            </View>
         </View>
      </>
   );
};

const RoutineCard = ({ routine, exerciseRec, handleSelected }) => {
   const imageString = routine.label.replace(/\s/g, "").toLowerCase();

   const [values, setValues] = useState(RoutineSchema);
   const [selected, setSelected] = useState(false);

   const handleCardPressed = () => {
      // console.log("exerciseRec", exerciseRec);

      setValues({
         ...values,
         ["name"]: routine.value,
         ["exerciseUID"]: exerciseRec.id,
         ["routineDate"]: Date.now(),
         ["userUID"]: auth.currentUser.uid,
      });
      const colRef = collection(db, "routine");
      addDoc(colRef, {
         name: routine.value,
         exerciseUID: exerciseRec.id,
         routineDate: Date.now(),
         userUID: auth.currentUser.uid,
         exerciseUID: exerciseRec.id,
      }).then((res) => {
         handleSelected();
      });
   };
   const handleSelectedChecked = () => {
      setSelected(!selected);
   };

   return (
      <>
         <Pressable
            onPress={handleCardPressed}
            style={{
               flexDirection: "row",
               justifyContent: "space-between",
               marginVertical: 20,
               paddingBottom: 20,
               marginRight: 20,
               borderBottomWidth: 0.2,
               borderBottomColor: COLORS.lightBlue,
            }}
         >
            <View style={{ flexDirection: "row" }}>
               <TouchableOpacity style={{ justifyContent: "center" }}>
                  <RoutineImage imageName={imageString} />
               </TouchableOpacity>
               <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                     {routine.label}
                  </Text>
                  <Text
                     numberOfLines={3}
                     style={{ width: 250 }}
                  >
                     {routine.description}
                  </Text>
               </View>
            </View>
            <View style={{ justifyContent: "center" }}>
               <Checkbox
                  onChange={setSelected}
                  value={selected}
               />
            </View>
         </Pressable>
      </>
   );
};

export default RoutineSelect;

const styles = StyleSheet.create({});
