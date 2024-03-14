import { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import {
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { auth, db } from "../../../src/data/Firebase";
import RoutineImage from "./RoutineImage";
import Button from "../../../src/components/controls/Button";
import { DateString, DayOfWeekShort } from "../../../src/utils/Library";

const RoutineCardSelect = ({ routineRec, handleSelected, key }) => {
   const [record, setRecord] = useState(routineRec);
   const [imageName, setImageName] = useState("");
   const [routineSetCount, setRoutineSetCount] = useState(0);
   const [showDetail, setShowDetail] = useState(false);
   const [routineSetRecs, setRoutineSetRecs] = useState(null);
   const [routinePastSetRecs, setRoutinePastSetRecs] = useState(null);

   const [routineDate, setRoutineDate] = useState("");

   const fetchLastRoutineStat = () => {
      if (record) {
         const colRef = collection(db, "routine");
         const qPull = query(
            colRef,
            where("userUID", "==", auth.currentUser.uid),
            where("name", "==", record.name),
            where("routineDate", "!=", record.routineDate),
            orderBy("routineDate", "desc")
         );
         onSnapshot(qPull, (snapshot) => {
            let rowNo = 1;
            snapshot.docs.forEach((doc) => {
               if (rowNo === 1) {
                  fetchLastRoutineSetByRoutine({
                     routineUID: doc.id,
                     queryType: "Stat",
                  });
                  setRoutineDate(
                     DateString(doc.data().routineDate) +
                        " (" +
                        DayOfWeekShort(doc.data().routineDate) +
                        ")"
                  );
               }
               rowNo++;
            });
         });
      }
   };
   const fetchLastRoutineSetByRoutine = ({ routineUID, queryType = "X" }) => {
      // console.log("routineUID - ", routineUID);
      // console.log("queryType - ", queryType);

      const colRef = collection(db, "routineSet");
      const qPull = query(colRef, where("routineUID", "==", routineUID));
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push(doc.data());
         });
         if (queryType === "Stat") {
            setRoutinePastSetRecs(records);
            // console.log("routinePastSetRecs", records);
         } else {
            setRoutineSetRecs(records);
            // console.log("routineSetRecs", records);
         }
      });
   };

   useEffect(() => {
      // console.log("record", record);
      // console.log("routineRec", routineRec);

      setImageName(routineRec.name);
      fetchLastRoutineStat();
      // console.log("===========================");
      fetchLastRoutineSetByRoutine({ routineUID: routineRec.id });
   }, []);

   return (
      <TouchableOpacity
         style={{
            padding: 10,
            borderWidth: 0.5,
            borderRadius: 7,
         }}
         onPress={() => handleSelected()}
      >
         {/* Line # 1 - Name and action - DONE */}
         <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
         >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
               {routineRec.name}
            </Text>
         </View>
         {/* Grouping of icon and list of last exercises */}
         <View style={{ flexDirection: "row" }}>
            {/* Icon */}
            {/* <View
               style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 10,
                  width: 50,
                  height: 50,
                  backgroundColor: "red",
               }}
            >
               <Text>{routineRec.name}</Text> */}
            <RoutineImage
               imageName={routineRec.name.replace(/\s/g, "").toLowerCase()}
            />
            {/* </View> */}
            {/* Listing of likes and past routine sets */}
            <View
               style={{
                  flexDirection: "column",
                  marginRight: 10,
                  marginTop: 10,
               }}
            >
               {/* Line #2+ listing of routine sets */}
               <View
                  style={{
                     width: "100%",
                     marginHorizontal: 10,
                     marginBottom: 10,
                     gap: 10,
                  }}
               >
                  {routinePastSetRecs ? (
                     <View style={{ flexDirection: "column" }}>
                        {/* Line #2 - Last routine dates */}
                        <View
                           style={{
                              alignItems: "flex-start",
                              flexDirection: "row",
                              width: 250,
                              alignItems: "center",
                           }}
                        >
                           <Text style={{ fontSize: 16 }}>Last - </Text>
                           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {routineDate}
                           </Text>
                        </View>
                        <View>
                           {/* Line #3+ listing of routine sets */}
                           {routinePastSetRecs.map((routinePastSetRec) => (
                              <View
                                 style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                 }}
                              >
                                 <Text>Reps {routinePastSetRec.reps}</Text>
                                 <Text>Weight {routinePastSetRec.weight}</Text>
                                 <Text>E {routinePastSetRec.feeling} H</Text>
                              </View>
                           ))}
                        </View>
                     </View>
                  ) : (
                     <View>
                        <Text>No previous routine ...</Text>
                     </View>
                  )}
               </View>
            </View>
         </View>

         {/* Listing of current routine set */}
         <View>
            <View>
               {showDetail && (
                  <ScrollView
                     style={{
                        marginHorizontal: 10,
                        marginTop: 5,
                        borderWidth: 0.25,
                        borderRadius: 7,
                     }}
                  >
                     {routineSetRecs.map((routineSet, index) => (
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
                              <View style={{ marginHorizontal: 5 }}>
                                 <Text>{index + 1}</Text>
                              </View>

                              {routineSet.weight ? (
                                 <View style={{ width: 50 }}>
                                    <Text style={{ textAlign: "right" }}>
                                       {routineSet.weight}lbs
                                    </Text>
                                 </View>
                              ) : (
                                 <View></View>
                              )}
                              {routineSet.reps ? (
                                 <View style={{ width: 40 }}>
                                    <Text style={{ textAlign: "right" }}>
                                       {routineSet.reps}x
                                    </Text>
                                 </View>
                              ) : (
                                 <View style={{ width: 40 }}></View>
                              )}
                           </View>
                           <Likes feelingCount={routineSet.feeling} />
                        </View>
                     ))}
                  </ScrollView>
               )}
            </View>
         </View>
      </TouchableOpacity>
   );
};

export default RoutineCardSelect;

const styles = StyleSheet.create({});
