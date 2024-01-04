import {
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import COLORS from "../constants/COLORS";
import Input from "./controls/Input";
import Button from "./controls/Button";
import ButtonOnOff from "./controls/ButtonOnOff";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../data/Firebase";
import { useExerciseStore } from "../stores/ExerciseStore";
import DropdownList from "./controls/DropdownList";

const RoutineDialog = ({ exerciseValues, setOpenRoutineDialog }) => {
   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);
   const setCurrentRoutine = useExerciseStore(
      (state) => state.setCurrentRoutine
   );
   const [values, setValues] = useState({
      ...exerciseValues,
      ["routineName"]: "",
      ["routineWeight"]: "",
      ["routineReps"]: "",
   });
   const [errors, setErrors] = useState({});
   const handleFeelingPressed = ({ selectedValue }) => {
      setValues({ ...values, ["feeling"]: selectedValue });
   };
   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
   };
   const handleSaveClicked = () => {
      //github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "routine");
      addDoc(colRef, {
         exerciseUID: values.id,
         name: values.name,
         reps: values.routineReps,
         routineDate: new Date(),
         userUID: values.userUID,
         weight: values.routineWeight,
         routineSet: [
            {
               reps: values.routineReps,
               feeling: values.feeling,
               setDate: new Date(),
               weight: values.routineWeight,
            },
         ],
      }).then((res) => {
         const docRef = doc(db, "routine", res.id);
         onSnapshot(docRef, (doc) => {
            setCurrentRoutine(doc.data());
         });
         setValues({ ...values, ["routineSetUID"]: res.id });
         const setRef = collection(db, "routineSet");
         addDoc(setRef, {
            exerciseUID: values.id,
            routineUID: res.id,
            reps: values.routineReps,
            feeling: values.feeling,
            setDate: new Date(),
            userUID: values.userUID,
            weight: values.routineWeight,
         }).then((res) => {});
      });
      setOpenRoutineDialog(false);
   };
   const handleCancelClicked = () => {
      setOpenRoutineDialog(false);
   };
   useEffect(() => {}, []);

   return (
      <View
         style={[
            GlobalStyle.boarderWithShadow,
            {
               borderWidth: 0.25,
               marginTop: -30,
               marginHorizontal: 30,
               borderRadius: 10,
               backgroundColor: "#f0f0f0",
            },
         ]}
      >
         <View
            style={{
               padding: 10,
               backgroundColor: COLORS.grey,
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,
               alignItems: "center",
            }}
         >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
               {values.userUID ? "Routine Dialog" : "Routine Dialog - Add"}
            </Text>
         </View>
         <View
            style={{
               marginTop: 10,
               marginHorizontal: 10,
            }}
         >
            <View
               style={{
                  marginHorizontal: 10,
                  marginTop: 20,
                  alignItems: "center",
               }}
            >
               <Input
                  label="Name"
                  value={values.name}
                  iconName=""
                  iconFamily=""
                  error={errors.name}
                  placeholder="Name of routine"
                  onChangeText={(text) =>
                     handleInputs({ name: "name", value: text })
                  }
                  width={225}
                  keyboardType="name"
               />
               {/* <DropdownList /> */}
            </View>
            <View style={{ marginHorizontal: 10 }}>
               <Text
                  style={{
                     fontSize: 16,
                     fontWeight: "bold",
                     justifyContent: "left",
                  }}
               >
                  Set # 1
               </Text>
               <View
                  style={{
                     marginHorizontal: 10,
                     alignItems: "center",
                  }}
               >
                  <Input
                     label="Weight"
                     value={values.routineWeight}
                     iconName="weight"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.routineWeight}
                     placeholder="Weight used"
                     onChangeText={(text) =>
                        handleInputs({ name: "routineWeight", value: text })
                     }
                     width={225}
                     keyboardType="numeric"
                  />
                  <Input
                     label="Reps"
                     value={values.routineReps}
                     iconName="number"
                     iconFamily="Octicons"
                     error={errors.routineReps}
                     placeholder="Number of reps"
                     onChangeText={(text) =>
                        handleInputs({ name: "routineReps", value: text })
                     }
                     width={225}
                     keyboardType="numeric"
                  />
                  <ButtonOnOff setFeelings={handleFeelingPressed} />
               </View>
            </View>
         </View>
         <View
            style={{
               flexDirection: "row",
               justifyContent: "space-between",
               marginTop: 40,
            }}
         >
            <Button
               label="Cancel"
               onPress={() => handleCancelClicked()}
               buttonBlockStyle={{ flex: 2 / 5 }}
               labelStyle={{ textAlign: "center" }}
               labelColor={COLORS.black}
               buttonColor={COLORS.grey}
               width={125}
            />
            <Button
               label="Save"
               onPress={() => handleSaveClicked()}
               buttonBlockStyle={{ flex: 2 / 5 }}
               labelStyle={{ textAlign: "center" }}
               width={125}
            />
         </View>
      </View>
   );
};

export default RoutineDialog;

const styles = StyleSheet.create({
   lineStyle: {
      borderBottomColor: COLORS.black,
      borderBottomWidth: 1,
      margin: 10,
      justifyContent: "flex-start",
   },
});
