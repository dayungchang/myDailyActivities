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
import NavBar from "../../src/components/controls/NavBar";
import { auth, db } from "../../src/data/Firebase";
import ExerciseCard from "./components/ExerciseCard";
import DisplayIcon from "../../src/components/DisplayIcon";
import COLORS from "../../src/constants/COLORS";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";
import NewExercise from "./components/NewExercise";
import ExerciseSchema from "../../src/data/schemas/ExerciseSchema";

const Exercise = () => {
   const [exerciseRecs, setExerciseRecs] = useState([{}]);
   const [exerciseRec, setExerciseRec] = useState(ExerciseSchema);

   const [openNewExerciseModal, setOpenNewExerciseModal] = useState(false);

   const handleNewExercisePressed = () => {
      setOpenNewExerciseModal(true);
   };
   const handleSaveNewExercise = () => {
      const colRef = collection(db, "exercise");
      addDoc(colRef, exerciseRec).then((res) => {
         let temp = { ...exerciseRec, ["id"]: res.id };
         console.log(
            "Exercise.js - handleSaveNewExercise - newExerciseRec",
            exerciseRec
         );

         router?.push({
            pathname: "/exercises/ExerciseDetail",
            params: exerciseRec,
         });
         setExerciseRec(ExerciseSchema);
      });
   };

   const fetchExerciseByUserUID = () => {
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
   useEffect(() => {
      fetchExerciseByUserUID();
   }, []);

   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Exercise"
            backScreen="Home"
            backScreenPath="/Home"
         />

         <View
            style={{
               flex: 1,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <View style={{ flex: 1, width: "100%" }}>
               {exerciseRecs.length > 0 ? (
                  <View style={{ paddingVertical: 10 }}>
                     <ScrollView style={{ marginHorizontal: 10 }}>
                        {exerciseRecs.map((exercise, index) => (
                           <View key={index}>
                              {/* {console.log("exercise", exercise)}
                              <Text>{exercise.id}+ '==='</Text> */}
                              <ExerciseCard exerciseRec={exercise} />
                           </View>
                        ))}
                     </ScrollView>
                  </View>
               ) : (
                  <Text>No exercise exists</Text>
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
                  onPress={handleNewExercisePressed}
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
                  title="Add an Exercise"
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
            visible={openNewExerciseModal}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 380 }}>
               <NewExercise
                  setOpenNewExercise={setOpenNewExerciseModal}
                  newExerciseRec={exerciseRec}
                  setNewExerciseRec={setExerciseRec}
                  handleSaveNewExercise={handleSaveNewExercise}
               />
            </ModalContent>
         </BottomModal>
      </View>
   );
};

export default Exercise;

const styles = StyleSheet.create({});
