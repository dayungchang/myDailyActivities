import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import Button from "./controls/Button";
import ButtonOnOff from "./controls/ButtonOnOff";
import Input from "./controls/Input";
import COLORS from "../constants/COLORS";
import { db } from "../data/Firebase";
import { useExerciseStore } from "../stores/ExerciseStore";
import GlobalStyle from "../styles/GlobalStyle";

const RoutineSetDialog = ({
   routineValues,
   setShowRoutineSetDialog,
   showRoutineSetDialog,
}) => {
   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);

   const [values, setValues] = useState({
      ...routineValues,
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
      const colRef = collection(db, "routineSet");
      addDoc(colRef, {
         exerciseUID: currentExercise.id,
         feeling: values.feeling,
         reps: values.routineReps,
         routineUID: currentRoutine.id,
         setDate: new Date(),
         userUID: currentExercise.userUID,
         weight: values.routineWeight,
      }).then(() => {
         setShowRoutineSetDialog(false);
      });
   };
   const handleCancelClicked = () => {
      console.log("handleCancelClicked");
      setShowRoutineSetDialog(false);
   };
   useEffect(() => {
      console.log("currentExercise", currentExercise);
      console.log("currentRoutine", currentRoutine);
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

export default RoutineSetDialog;

const styles = StyleSheet.create({});

