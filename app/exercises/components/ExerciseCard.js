import { useEffect, useState } from "react";
import {
   Alert,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import COLORS from "../../../src/constants/COLORS";
import Images from "../../../src/constants/Images";
import Button from "../../../src/components/controls/Button";
import {
   DateString,
   DayOfWeekShort,
   DurationHM,
   TimeSting,
} from "../../../src/utils/Library";
import {
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { db } from "../../../src/data/Firebase";
import Likes from "../../../src/components/Likes";
import { useRouter } from "expo-router";

const ExerciseCard = ({ exerciseRec }) => {
   const router = useRouter();

   const [exerciseDateString, setExerciseDateString] = useState("");
   const [exerciseTimeString, setExerciseTimeString] = useState("");
   const [routineRecs, setRoutineRecs] = useState([{}]);

   const [routineCount, setRoutineCount] = useState(0);
   const [showDetail, setShowDetail] = useState(false);

   const handleExerciseCardPressed = () => {
      if (exerciseRec.status !== "A") {
         Alert.alert("Exercise Completed");
      }
      router?.push({
         pathname: "/exercises/ExerciseDetail",
         params: (exerciseRec = exerciseRec),
      });
   };

   const fetchRoutinesByExercise = () => {
      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", exerciseRec.id),
         orderBy("routineDate", "desc")
      );

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutineRecs(records);
         setRoutineCount(records.length);
         // console.log("exerciseRec.id", exerciseRec.id, records.length);
      });
   };

   useEffect(() => {
      console.log("Exercise inside ExerciseCard", exerciseRec);

      if (exerciseRec.id) {
         setExerciseDateString(
            DateString(exerciseRec.exerciseDate) +
               " (" +
               DayOfWeekShort(exerciseRec.exerciseDate) +
               ")"
         );
         setExerciseTimeString(TimeSting(exerciseRec.exerciseDate));
         fetchRoutinesByExercise();
      }
   }, []);

   return (
      <TouchableOpacity
         style={{
            padding: 10,
            borderWidth: 0.2,
            borderRadius: 7,
            marginBottom: 10,
            paddingHorizontal: 15,
            backgroundColor:
               exerciseRec.status === "A"
                  ? COLORS.lightBlue01
                  : COLORS.lightGray01,
         }}
         onPress={() => handleExerciseCardPressed()}
      >
         {/* Header */}
         <View
            style={{
               flexDirection: "row",
               gap: 20,
               paddingVertical: 10,
               borderBottomWidth: 1,
            }}
         >
            <Text style={styles.headerLabelStyle}>{exerciseDateString}</Text>
            <Text style={styles.headerLabelStyle}>
               {exerciseRec.locationName}
            </Text>
         </View>
         {/* Start time and duration */}
         <View
            style={{
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               marginRight: 8,
               gap: 15,
            }}
         >
            <View style={{ flexDirection: "row", gap: 10 }}>
               <Text style={{ fontSize: 18 }}>{exerciseTimeString}</Text>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  {exerciseRec.status === "D" ? (
                     <Text style={{ fontSize: 18 }}>
                        ({exerciseRec.duration})
                     </Text>
                  ) : (
                     <Text>
                        {DurationHM(
                           (startDateTime = exerciseRec.exerciseDate),
                           (endDateTime = Date.now())
                        )}
                     </Text>
                  )}
               </View>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
               <Text style={styles.headerLabelStyle}>Weight</Text>
               <Text style={{ fontSize: 18 }}>{exerciseRec.weight}</Text>
               <Text style={styles.headerLabelStyle}>lbs</Text>
            </View>
         </View>
         {/* Focus area */}
         <View
            style={{
               marginTop: 5,
               flexDirection: "row",
               alignItems: "center",
               gap: 15,
            }}
         >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Focus area</Text>
            <Text style={{ fontSize: 18 }}>{exerciseRec.focusArea}</Text>
         </View>
         {/* Duration and feeling */}
         <View
            style={{
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               gap: 15,
            }}
         >
            <View style={{ flexDirection: "row", gap: 10 }}>
               <Text style={styles.headerLabelStyle}>Duration</Text>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  {exerciseRec.duration === "D" ? (
                     <Text style={{ fontSize: 18 }}>
                        ({exerciseRec.duration})
                     </Text>
                  ) : (
                     <Text></Text>
                  )}
               </View>
            </View>
            <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
               <Text style={styles.headerLabelStyle}>Feeling</Text>
               <Text style={{ fontSize: 18, width: 50 }}>
                  {exerciseRec.feeling}
               </Text>
            </View>
         </View>

         {/* Routines and close out exercise */}
         <View>
            <View
               style={{
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  justifyContent: "space-between",
               }}
            >
               {routineCount > 0 ? (
                  <Button
                     leftImage={showDetail ? Images.upArrow : null}
                     label={routineCount}
                     rightImage={showDetail ? null : Images.downArrow}
                     width={100}
                     onPress={() => setShowDetail(!showDetail)}
                  />
               ) : (
                  <View></View>
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
      </TouchableOpacity>
   );
};

export default ExerciseCard;

const styles = StyleSheet.create({
   headerLabelStyle: { fontSize: 18, fontWeight: "bold" },
});
