import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "./controls/Button";
import COLORS from "../constants/COLORS";
import GlobalStyle from "../styles/GlobalStyle";
import Input from "./controls/Input";
import ButtonOnOff from "./controls/ButtonOnOff";
import { useExerciseStore } from "../stores/ExerciseStore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../data/Firebase";

const RoutineSetDialog = ({
   routineRec,
   exerciseRec,
   setShowRoutineSetDialog,
   showRoutineSetDialog,
}) => {
   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);

   const [values, setValues] = useState({
      ["routineName"]: "",
      ["routineWeight"]: "",
      ["routineReps"]: "",
      ["feeling"]: "",
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
      console.log("values - inside handleSaveClicked", values);

      const colRef = collection(db, "routineSet");
      addDoc(colRef, {
         exerciseUID: exerciseRec.id,
         feeling: values.feeling,
         reps: values.routineReps,
         routineUID: routineRec.id,
         setDate: Date.now(),
         userUID: exerciseRec.userUID,
         weight: values.routineWeight,
      }).then(() => {
         setShowRoutineSetDialog(false);
      });
   };
   const handleCancelClicked = () => {
      setShowRoutineSetDialog(false);
   };
   useEffect(() => {
      console.log("exerciseRec", exerciseRec);
      console.log("routineRec", routineRec);
   }, []);

   return (
      <View
         style={[
            GlobalStyle.boarderWithShadow,
            {
               borderWidth: 0.25,
               marginTop: -70,
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
               {values.userUID
                  ? "Routine Set Dialog"
                  : "Routine Set Dialog - Add"}
            </Text>
         </View>
         <View
            style={{
               marginTop: 10,
               marginHorizontal: 10,
            }}
         >
            <View style={{ marginHorizontal: 10 }}>
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
                     keyboardType="number-pad"
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

export default RoutineSetDialog;

const styles = StyleSheet.create({});

