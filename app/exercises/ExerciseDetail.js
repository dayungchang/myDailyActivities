import { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
   Timestamp,
   collection,
   collectionGroup,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { DateString, DurationHM, TimeSting } from "../../src/utils/Library";
import { db } from "../../src/data/Firebase";
import RoutineCard from "./components/RoutineCard";
import ExerciseHeader from "./components/ExerciseHeader";
import COLORS from "../../src/constants/COLORS";
import NavBar from "../../src/components/controls/NavBar";
import Button from "../../src/components/controls/Button";
import DisplayIcon from "../../src/components/DisplayIcon";
import Likes from "../../src/components/Likes";
import GlobalStyle from "../../src/styles/GlobalStyle";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";

const ExerciseDetail = () => {
   const params = useLocalSearchParams();
   const navigation = useNavigation();

   console.log("params", params);

   const [values, setValues] = useState(params);
   const [routineRecs, setRoutineRecs] = useState(null);
   const [routineCount, setRoutineCount] = useState(0);
   const [openNewRoutine, setOpenNewRoutine] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [modalVisible, setModalVisible] = useState(false);

   // const [weekDay, setweekDay] = useState(values.exerciseDate.getDay());
   const [timeString, setTimeString] = useState(TimeSting(values.exerciseDate));
   const handleAddRoutineToExercise = () => {
      console.log("handleSelected - Pressed ...");
   };
   const handleNewRoutinePressed = () => {
      navigation.navigate("RoutineSelect", {
         focusArea: values.focusArea,
         handleAddRoutineToExercise: { handleAddRoutineToExercise },
      });
   };
   const handleExerciseDone = () => {};

   const fetchRoutines = async () => {
      console.log("values.id", values.id);

      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", values.id),
         orderBy("routineDate", "desc")
      );

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            console.log("doc.id", doc.id);
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutineRecs(records);
         setRoutineCount(records.length);
      });
   };

   useEffect(() => {
      // console.log("Timestamp", timestampDate);

      fetchRoutines();
   }, []);

   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Exercise Detail"
            backScreen="Exercises"
            backScreenPath="/exercises/Exercise"
         />

         <View
            style={{
               flex: 1,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <View
               style={{
                  flex: 1,
                  width: "100%",
                  height: 20,
                  paddingBottom: 20,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
               }}
            >
               <ExerciseHeader
                  exerciseRec={values}
                  handleExerciseDone={handleExerciseDone}
               />
            </View>
            <View style={{ flex: 4, width: "100%", margin: 10 }}>
               {routineRecs && (
                  <View style={{ paddingVertical: 10, gap: 10 }}>
                     <ScrollView style={{ marginHorizontal: 10 }}>
                        {routineRecs.map((routine, index) => (
                           <View
                              key={index}
                              style={[
                                 GlobalStyle.boarderWithShadow.elevation,
                                 {
                                    marginHorizontal: 10,
                                    marginBottom: 15,
                                 },
                              ]}
                           >
                              {console.log("routine -- ", routine)}
                              {routine && (
                                 <RoutineCard
                                    routineRec={routine}
                                    exerciseUID={params.id}
                                    exerciseStatus={params.status}
                                 />
                              )}
                           </View>
                        ))}
                     </ScrollView>
                  </View>
               )}
            </View>
            <View
               style={{
                  width: "100%",
                  height: 60,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  position: "absolute", //Here is the trick
                  bottom: 0, //Here is the trick
                  marginBottom: 20,
               }}
            >
               <TouchableOpacity
                  style={{
                     marginRight: 30,
                     backgroundColor: COLORS.lightBlue01,
                     borderRadius: 30,
                  }}
                  onPress={handleNewRoutinePressed}
               >
                  <DisplayIcon
                     iconName="pluscircleo"
                     iconFamily="AntDesign"
                     size={60}
                     color={COLORS.appBackground}
                  />
               </TouchableOpacity>
            </View>
         </View>
         <BottomModal
            onBackdropPress={() => setModalVisible(!isModalVisible)}
            onHardwareBackPress={() => setModalVisible(!isModalVisible)}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            modalTitle={
               <ModalTitle
                  title="Add an Routine"
                  style={{
                     backgroundColor: COLORS.lightBlue,
                  }}
               />
            }
            modalAnimation={
               new SlideAnimation({
                  slideFrom: "bottom",
               })
            }
            visible={openNewRoutine}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 380 }}>
               {/* <NewExercise
                  setOpenNewExercise={setOpenNewExerciseModal}
                  newExerciseRec={exerciseRec}
                  setNewExerciseRec={setExerciseRec}
                  handleSaveNewExercise={handleSaveNewExercise}
               /> */}
            </ModalContent>
         </BottomModal>
      </View>
   );
};

export default ExerciseDetail;

const styles = StyleSheet.create({});
