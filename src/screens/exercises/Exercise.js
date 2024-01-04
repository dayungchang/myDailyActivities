import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { auth, db } from "../../data/Firebase";
import Button from "../../components/controls/Button";
import ExerciseCard from "../../components/ExerciseCard";
import ExerciseSchema from "../../data/schemas/ExerciseSchema";
import { useExerciseStore } from "../../stores/ExerciseStore";
import NavBar from "../../components/controls/NavBar";

const Exercise = () => {
   const navigation = useNavigation();

   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

   const [exerciseRecs, setExerciseRecs] = useState([]);
   const fetchExercisesByUserUID = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "exercise");
      const qPull = query(
         colRef,
         where("userUID", "==", auth.currentUser.uid),
         orderBy("exerciseDate", "desc")
      );

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setExerciseRecs(records);
      });
   };
   const handleAddExercise = () => {
      navigation.navigate("ExerciseDetail", {
         addExercise: true,
         values: ExerciseSchema,
         routineRecs: [],
      });
   };
   useEffect(() => {
      fetchExercisesByUserUID();
   }, []);

   return (
      <View>
         <NavBar
            title="Exercise"
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
               label="+ Exercise"
               width={150}
               onPress={() => handleAddExercise()}
            />
         </View>
         {exerciseRecs && (
            <ScrollView style={{ marginHorizontal: 10 }}>
               {exerciseRecs.length > 0 ? (
                  exerciseRecs.map((exercise, index) => (
                     <View key={index}>
                        <ExerciseCard exerciseRec={exercise} />
                     </View>
                  ))
               ) : (
                  <Text>No exercise exists</Text>
               )}
            </ScrollView>
         )}
      </View>
   );
};

export default Exercise;

const styles = StyleSheet.create({});
