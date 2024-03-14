import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Timestamp } from "firebase/firestore";
import Button from "../../../src/components/controls/Button";
import Likes from "../../../src/components/Likes";
import {
   DateString,
   DayOfWeekShort,
   DurationHM,
   TimeSting,
} from "../../../src/utils/Library";

const ExerciseHeader = ({ exerciseRec, handleExerciseDone }) => {
   const [dateString, setDateString] = useState(
      DateString(exerciseRec.exerciseDate) +
         " (" +
         DayOfWeekShort(exerciseRec.exerciseDate) +
         ")"
   );
   const [timeString, setTimeString] = useState(
      TimeSting(exerciseRec.exerciseDate)
   );
   return (
      <View style={{ marginBottom: 10 }}>
         <View
            style={{
               flexDirection: "row",
               gap: 10,
               justifyContent: "space-between",
            }}
         >
            <View style={{ flexDirection: "row", gap: 10 }}>
               <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  {dateString}
               </Text>
               <Text style={{ fontSize: 18, fontWeight: 600 }}>
                  {exerciseRec.locationName}
               </Text>
            </View>
            <Likes feelingCount={exerciseRec.feeling} />
         </View>
         <View style={{ marginTop: 10 }}>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  justifyContent: "space-between",
               }}
            >
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 10,
                  }}
               >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                     Start
                  </Text>
                  <Text style={{ fontSize: 18 }}> {timeString} </Text>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 10,
                  }}
               >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                     Duration
                  </Text>
                  <Text>
                     {DurationHM(
                        (startDateTime = exerciseRec.exerciseDate),
                        (endDateTime = Date.now())
                     )}
                  </Text>
               </View>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
               }}
            >
               <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Focus Area
               </Text>
               <Text style={{ fontSize: 18 }}>{exerciseRec.focusArea}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
               <Text style={{ fontSize: 18, fontWeight: "bold" }}>Weight</Text>
               <Text style={{ fontSize: 18 }}>{exerciseRec.weight}</Text>
               <Text style={{ fontSize: 18, fontWeight: "bold" }}>lbs</Text>
            </View>
         </View>
         <View style={{ alignItems: "flex-end" }}>
            {exerciseRec.status === "A" && (
               <Button
                  label="Done"
                  width={150}
                  onPress={handleExerciseDone}
               />
            )}
         </View>
      </View>
   );
};

export default ExerciseHeader;

const styles = StyleSheet.create({});
