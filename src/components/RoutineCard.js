import {
   Image,
   KeyboardAvoidingView,
   Modal,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useEffect, useState } from "react";
import {
   collection,
   collectionGroup,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { db } from "../data/Firebase";
import COLORS from "../constants/COLORS";
import Images from "../constants/Images";
import Likes from "./Likes";
import RoutineImage from "../../app/exercises/components/RoutineImage";
import RoutineSetDialog from "./RoutineSetDialog";
import { useExerciseStore } from "../stores/ExerciseStore";
import Button from "./controls/Button";

const RoutineCard = ({ record, index, setShowRoutineSetDialog }) => {
   const [values, setValues] = useState({});
   const [routineSetRecs, setRoutineSetRecs] = useState([]);
   const [routineSetCount, setRoutineSetCount] = useState(0);
   const [showDetail, setShowDetail] = useState(false);

   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const setCurrentRoutine = useExerciseStore(
      (state) => state.setCurrentRoutine
   );
   // const [showRoutineSetDialog, setShowRoutineSetDialog] = useState(false);

   const handleAddRoutineSet = () => {
      setCurrentRoutine(record);
      setShowRoutineSetDialog(true);
   };

   const fetchRoutineStats = () => {
      const colRef = collectionGroup(db, `exercise\$`);
   };
   const fetchRoutinesSetByRoutine = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "routineSet");
      const qPull = query(colRef, orderBy("setDate"));

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutineSetRecs(records);
         setRoutineSetCount(records.length);
      });
   };

   useEffect(() => {
      console.log("record", record);

      fetchRoutinesSetByRoutine();
   }, []);
   return (
      <View
         key={{ index }}
         style={{
            flex: 1,
            padding: 10,
            flexDirection: "row",
         }}
      >
         <View style={{ justifyContent: "center", marginRight: 10 }}>
            <RoutineImage
               imageName={record.name.replace(/\s/g, "").toLowerCase()}
            />
         </View>
         <View>
            <View
               style={{
                  felx: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
               }}
            >
               <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {record.name}
               </Text>
               <Likes feelingCount={record.feeling} />
            </View>
            <View
               style={{
                  flexDirection: "row",
                  gap: 10,
                  marginVertical: 10,
               }}
            >
               <View
                  style={{
                     width: 100,
                     flexDirection: "row",
                  }}
               >
                  <Text>{record.weight}</Text>
                  <Text>lbs</Text>
               </View>
               <View
                  style={{
                     width: 100,
                     justifyContent: "flex-end",
                     flexDirection: "row",
                  }}
               >
                  <Text>{record.reps}</Text>
                  <Text>x</Text>
               </View>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  justifyContent: "space-between",
               }}
            >
               {routineSetCount > 0 ? (
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
                        {routineSetCount}
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
               ) : (
                  <View></View>
               )}

               <View style={{ alignItems: "flex-end" }}>
                  <Button
                     label="+ Set"
                     width={150}
                  />
               </View>
            </View>
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
                     {routineSetRecs.length > 0 ? (
                        routineSetRecs.map((routineSet, index) => (
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
                        ))
                     ) : (
                        <Text>No set exists</Text>
                     )}
                  </ScrollView>
               )}
            </View>
         </View>
         {/* <KeyboardAvoidingView>
            <Modal
               visible={showRoutineSetDialog}
               onRequestClose={() => setShowRoutineSetDialog(false)}
               animationType="slideInUp"
               animationOut="slideOutDown"
               presentationStyle="pageSheet"
            >
               <RoutineSetDialog
                  values={values}
                  setValues={setValues}
                  setShowRoutineSetDialog={setShowRoutineSetDialog}
                  showRoutineSetDialog={showRoutineSetDialog}
               />
            </Modal>
         </KeyboardAvoidingView> */}
      </View>
   );
};

export default RoutineCard;

const styles = StyleSheet.create({});
