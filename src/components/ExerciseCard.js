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
import { DateString, TimeSting } from "../utils/Library";
import {
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { db } from "../data/Firebase";
import COLORS from "../constants/COLORS";
import Images from "../constants/Images";
import Likes from "./Likes";
import { useExerciseStore } from "../stores/ExerciseStore";

const ExerciseCard = ({ exerciseRec }) => {
   const navigation = useNavigation();

   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

   const [exerciseDateString, setExerciseDateString] = useState(
      DateString(exerciseRec.exerciseDate)
   );
   const [exerciseTimeString, setExerciseTimeString] = useState(
      TimeSting(exerciseRec.exerciseDate)
   );
   const [routineRecs, setRoutineRecs] = useState([]);
   const [routineCount, setRoutineCount] = useState(0);
   const [showDetail, setShowDetail] = useState(false);
   const [feelings, setFeelings] = useState([]);

   const dataArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

   const handleFeeling = () => {
      var feelings = [];
      for (let i = 0; i < routineCount; i++) {
         feelings.push(<Image source={Images.thumbUp} />);
      }
      return;
   };
   const handleExerciseCardPressed = () => {
      setCurrentExercise(exerciseRec);
      if (exerciseRec.status === "A") {
         navigation.navigate("ExerciseDetail", {
            addExercise: false,
            values: exerciseRec,
            routineRecs: routineRecs,
         });
      } else {
         Alert.alert("Exercise Completed");
      }
   };
   const fetchRoutinesByExercise = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", exerciseRec.id),
         orderBy("routineDate", "desc")
      );

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({
               ...doc.data(),
               id: doc.id,
            });
         });
         setRoutineRecs(records);
         setRoutineCount(records.length);
      });
   };
   useEffect(() => {
      fetchRoutinesByExercise();
   }, []);

   return (
      <Pressable
         onPress={() => handleExerciseCardPressed()}
         style={{
            padding: 10,
            borderWidth: 0.2,
            borderRadius: 7,
            backgroundColor:
               exerciseRec.status === "A" ? "white" : COLORS.lightGrey,
            marginBottom: 10,
         }}
      >
         <View
            style={{
               alignItems: "flex-start",
               flexDirection: "row",
               marginBottom: 5,
               gap: 20,
               justifyContent: "space-between",
            }}
         >
            <View
               style={{
                  flexDirection: "row",
                  gap: 20,
                  alignSelf: "center",
               }}
            >
               <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  {exerciseDateString}
               </Text>
               <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  {exerciseRec.locationName}
               </Text>
            </View>
            <Likes feelingCount={exerciseRec.feeling} />
         </View>
         <View style={{ marginHorizontal: 10 }}>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
               }}
            >
               <Text style={{ fontSize: 16 }}>{exerciseTimeString}</Text>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                     Weight
                  </Text>
                  <Text style={{ fontSize: 16 }}>{exerciseRec.weight}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>lbs</Text>
               </View>
            </View>
            <View
               style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
               }}
            >
               <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Focus area
               </Text>
               <Text>{exerciseRec.focusArea}</Text>
            </View>
            <View
               style={{
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  justifyContent: "space-between",
               }}
            >
               {routineRecs.length > 0 && (
                  <TouchableOpacity
                     onPress={() => setShowDetail(!showDetail)}
                     style={{
                        width: 50,
                        padding: 2,
                        backgroundColor: COLORS.grey,
                        borderRadius: 15,
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <Text style={{ fontSize: 16, textAlign: "center" }}>
                        {routineCount}
                     </Text>
                     {showDetail ? (
                        <Image
                           source={Images.upArrow}
                           style={{ width: 15, height: 15 }}
                        />
                     ) : (
                        <Image
                           source={Images.downArrow}
                           style={{ width: 15, height: 15 }}
                        />
                     )}
                  </TouchableOpacity>
               )}
            </View>
            {showDetail && (
               <ScrollView
                  style={{
                     marginHorizontal: 10,
                     marginTop: 5,
                     borderWidth: 0.25,
                     borderRadius: 7,
                  }}
               >
                  {routineRecs.length > 0 ? (
                     routineRecs.map((routine, index) => (
                        <View
                           key={index}
                           style={{
                              flexDirection: "row",
                              gap: 10,
                              padding: 1,
                              backgroundColor:
                                 index % 2 === 0 ? COLORS.grey : null,
                              justifyContent: "space-between",
                           }}
                        >
                           <View style={{ flexDirection: "row" }}>
                              <Text style={{ marginHorizontal: 5 }}>
                                 {index + 1}
                              </Text>
                              {routine.name ? (
                                 <Text style={{ width: 80 }}>
                                    {routine.name}
                                 </Text>
                              ) : (
                                 <Text style={{ width: 80 }}></Text>
                              )}
                              {routine.weight ? (
                                 <Text
                                    style={{ width: 50, textAlign: "right" }}
                                 >
                                    {routine.weight}lbs
                                 </Text>
                              ) : (
                                 <Text style={{ width: 50 }}></Text>
                              )}
                              {routine.reps ? (
                                 <Text
                                    style={{ width: 40, textAlign: "right" }}
                                 >
                                    {routine.reps}x
                                 </Text>
                              ) : (
                                 <Text style={{ width: 40 }}></Text>
                              )}
                           </View>
                           <Likes feelingCount={routine.feeling} />
                        </View>
                     ))
                  ) : (
                     <Text>No exercise exists</Text>
                  )}
               </ScrollView>
            )}
         </View>
      </Pressable>
   );
};

export default ExerciseCard;

const styles = StyleSheet.create({});
