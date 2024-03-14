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
import { useLocalSearchParams, useRouter } from "expo-router";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import NavBar from "../../src/components/controls/NavBar";
import { auth, db } from "../../src/data/Firebase";
import GlobalStyle from "../../src/styles/GlobalStyle";
import Button from "../../src/components/controls/Button";
import Checkbox from "expo-checkbox";
import COLORS from "../../src/constants/COLORS";
import RoutineSchema from "../../src/data/schemas/RoutineSchema";
import Input from "../../src/components/controls/Input";
import RoutineImage from "./components/RoutineImage";
import RoutineCardSelect from "./components/RoutineCardSelect";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";

const RoutineSelect = () => {
   const router = useRouter();
   const navigation = useNavigation();

   const { focusArea, handleAddRoutineToExercise } = useLocalSearchParams();

   const [routines, setRoutines] = useState(RoutineSchema);
   const [buttonLabel, setButtonLabel] = useState("Select");
   const [tempRec, setTempRec] = useState(RoutineSchema);
   const [modalVisible, setModalVisible] = useState(false);
   const [radioItem, setRadioItem] = useState(2);

   const handleRadioAll = () => {
      console.log("All clicked");
      setRadioItem(1);
   };
   const handleRadioFocusArea = () => {
      console.log("Focus Area clicked");
      setRadioItem(2);
   };
   const handleRoutineSelected = (routineRec) => {
      navigation.goBack();
      // router.
   };
   const handleSearchRoutine = async (e) => {
      const { name, value } = e;
      setRoutines({ ...routines, [name]: value });
      console.log("routine ...", routines, name, value.toLowerCase());

      if (value === "") setTempRec(routines);
      else {
         setTempRec(
            tempRec.filter((x) =>
               x.name.toLowerCase().includes(value.toLowerCase())
            )
         );
      }
      console.log("TempRec ", tempRec);

      // console.log("FocusArea", exerciseRec.focusArea);

      // const colRef = collection(db, "focusArea");
      // const qPull = query(
      //    colRef,
      //    where("focusArea", "==", exerciseRec.focusArea),
      //    orderBy("label")
      // );
      // onSnapshot(qPull, (snapshot) => {
      //    let records = [];
      //    snapshot.docs.forEach((doc) => {
      //       records.push({ ...doc.data(), id: doc.id });
      //    });
      //    setTempRec(records);
      //    Alert.alert("Number of records ...", records.length.toString());
      // });
      // console.log("Handle Add Routine ...", tempRec);
   };
   const fetchRoutineByFocusArea = () => {
      const colRef = collection(db, "setup/exercise/routine");
      const qPull = query(colRef, orderBy("name"));
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutines(records);
         setTempRec(records);
      });
   };
   useEffect(() => {
      // console.log("exerciseRec - RoutineSelect.js", exerciseRec);

      fetchRoutineByFocusArea();
   }, []);

   return (
      <>
         <NavBar
            title="Select Routine"
            backScreen="Cancel"
            backScreenPath="GOBACK"
         />
         <View style={{ flex: 1 }}>
            <View
               style={{
                  alignItems: "center",
                  marginVertical: 20,
               }}
            >
               <Text
                  style={{
                     fontSize: 24,
                     fontWeight: "bold",
                  }}
               >
                  Focus Area: {focusArea}
               </Text>
            </View>
            <View
               style={{
                  flexDirection: "row",
                  gap: 10,
                  marginHorizontal: 10,
                  height: 50,
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <Input
                  placeholder="Name of Routine"
                  autoCapitalize="words"
                  onChangeText={(text) =>
                     handleSearchRoutine({ name: "search", value: text })
                  }
               />
               <Button
                  label="Search"
                  width={100}
                  onPress={handleSearchRoutine}
               />
            </View>
            <View
               style={{
                  margin: 10,
                  flexDirection: "row",
                  gap: 20,
                  alignItems: "center",
               }}
            >
               <Text>Search by</Text>
               <TouchableOpacity onPress={handleRadioAll}>
                  <View
                     style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <View
                        style={{
                           width: 25,
                           height: 25,
                           borderRadius: 15,
                           borderColor: "blue",
                           borderWidth: 1,
                           backgroundColor: radioItem === 1 ? "black" : null,
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     ></View>

                     <Text>All</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={handleRadioFocusArea}
                  style={{
                     flexDirection: "row",
                     alignContent: "center",
                     gap: 10,
                  }}
               >
                  <View
                     style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <View
                        style={{
                           width: 25,
                           height: 25,
                           borderRadius: 15,
                           borderColor: "blue",
                           borderWidth: 1,
                           backgroundColor: radioItem === 2 ? "black" : null,
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     ></View>
                     <Text>Focus Area</Text>
                  </View>
               </TouchableOpacity>
            </View>
            <ScrollView>
               <View
                  style={[
                     GlobalStyle.boarderWithShadow,
                     {
                        margin: 10,
                        borderRadius: 7,
                        backgroundColor: "#F0F0F0",
                     },
                  ]}
               >
                  {tempRec.length > 0 ? (
                     tempRec.map((routine, index) => (
                        <View style={{ marginBottom: 15 }}>
                           <RoutineCardSelect
                              routineRec={routine}
                              handleSelected={handleAddRoutineToExercise}
                              key={index}
                           />
                        </View>
                     ))
                  ) : (
                     <Text>No routine found</Text>
                  )}
               </View>
            </ScrollView>
            <View
               style={{
                  alignItems: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  margin: 10,
               }}
            >
               <Button
                  label={buttonLabel}
                  width={200}
               />
            </View>
         </View>
         <BottomModal
            onBackdropPress={() => setModalVisible(!isModalVisible)}
            onHardwareBackPress={() => setModalVisible(!isModalVisible)}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            modalTitle={
               <ModalTitle
                  title="Routine Not Found!!!"
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
            visible={modalVisible}
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
      </>
   );
};

// const RoutineCard = ({ routine, exerciseRec, handleSelected }) => {
//    const imageString = routine.label.replace(/\s/g, "").toLowerCase();

//    const [values, setValues] = useState(RoutineSchema);
//    const [selected, setSelected] = useState(false);

//    const handleCardPressed = () => {
//       // console.log("exerciseRec", exerciseRec);

//       setValues({
//          ...values,
//          ["name"]: routine.value,
//          ["exerciseUID"]: exerciseRec.id,
//          ["routineDate"]: Date.now(),
//          ["userUID"]: auth.currentUser.uid,
//       });
//       const colRef = collection(db, "routine");
//       addDoc(colRef, {
//          name: routine.value,
//          exerciseUID: exerciseRec.id,
//          routineDate: Date.now(),
//          userUID: auth.currentUser.uid,
//          exerciseUID: exerciseRec.id,
//       }).then((res) => {
//          handleSelected();
//       });
//    };
//    const handleSelectedChecked = () => {
//       setSelected(!selected);
//    };

//    return (
//       <>
//          <Pressable
//             onPress={handleCardPressed}
//             style={{
//                flexDirection: "row",
//                justifyContent: "space-between",
//                marginVertical: 20,
//                paddingBottom: 20,
//                marginRight: 20,
//                borderBottomWidth: 0.2,
//                borderBottomColor: COLORS.lightBlue,
//             }}
//          >
//             <View style={{ flexDirection: "row" }}>
//                <TouchableOpacity style={{ justifyContent: "center" }}>
//                   <RoutineImage imageName={imageString} />
//                </TouchableOpacity>
//                <View style={{ marginLeft: 10 }}>
//                   <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//                      {routine.label}
//                   </Text>
//                   <Text
//                      numberOfLines={3}
//                      style={{ width: 250 }}
//                   >
//                      {routine.description}
//                   </Text>
//                </View>
//             </View>
//             <View style={{ justifyContent: "center" }}>
//                <Checkbox
//                   onChange={setSelected}
//                   value={selected}
//                />
//             </View>
//          </Pressable>
//       </>
//    );
// };

export default RoutineSelect;

const styles = StyleSheet.create({});
