import { useEffect, useState } from "react";
import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import NavBar from "../../../../src/components/controls/NavBar";
import COLORS from "../../../../src/constants/COLORS";
import DisplayIcon from "../../../../src/components/DisplayIcon";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";
import Input from "../../../../src/components/controls/Input";
import Button from "../../../../src/components/controls/Button";
import RoutineSchema from "../../../../src/data/schemas/RoutineSchema";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
} from "firebase/firestore";
import { db } from "../../../../src/data/Firebase";

const Routine = () => {
   const [routineRecs, setRoutineRecs] = useState([{}]);
   const [newRoutine, setNewRoutine] = useState(false);
   const [openRoutineModel, setOpenRoutineModel] = useState(false);

   const handlePlusPressed = () => {
      setNewRoutine(true);
      setOpenRoutineModel(true);
   };
   const fetchRoutines = () => {
      const colRef = collection(db, "setup/exercise/routine");
      const qPull = query(colRef, orderBy("name"));

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutineRecs(records);
      });
   };
   useEffect(() => {
      fetchRoutines();
   }, []);

   return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
         <View style={{ gap: 10 }}>
            <NavBar
               title="Setup Location"
               backScreen="exercise"
               backScreenPath="/(admin)/setup/SetupExercise/"
            />
            <View style={{ marginHorizontal: 10, marginBottom: 180 }}>
               <ScrollView
                  style={{
                     borderWidth: 0.25,
                     borderRadius: 7,
                  }}
               >
                  {routineRecs ? (
                     routineRecs.map((routine) => (
                        <View style={{ margin: 10 }}>
                           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {routine.name}
                           </Text>
                           <Text>{routine.description}</Text>
                        </View>
                     ))
                  ) : (
                     <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        No routine found!!!
                     </Text>
                  )}
               </ScrollView>
            </View>
         </View>
         <View
            style={{
               position: "absolute",
               right: 0,
               bottom: 20,
               alignItems: "flex-end",
            }}
         >
            <TouchableOpacity
               style={{
                  marginRight: 30,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.lightBlue01,
                  borderRadius: 30,
               }}
               onPress={() => handlePlusPressed()}
            >
               <DisplayIcon
                  iconName="pluscircleo"
                  iconFamily="AntDesign"
                  size={60}
                  color={COLORS.appBackground}
               />
            </TouchableOpacity>
         </View>
         <BottomModal
            onBackdropPress={() => setModalVisible(!isModalVisible)}
            onHardwareBackPress={() => setModalVisible(!isModalVisible)}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            modalTitle={
               <ModalTitle
                  title={newRoutine ? "Routine - Add" : "Routine - Edit"}
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
            visible={openRoutineModel}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 400 }}>
               <RoutineMaintenance
                  setOpenRoutineModel={setOpenRoutineModel}
                  routines={routineRecs}
               />
            </ModalContent>
         </BottomModal>
      </View>
   );
};
const RoutineMaintenance = ({ setOpenRoutineModel, routines }) => {
   // const navigation = useNavigation();
   // // **************************************************
   const [values, setValues] = useState(RoutineSchema);

   const [errors, setErrors] = useState({});
   const [items, setItems] = useState(FocusArea);
   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   // // **************************************************
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      console.log("fieldValue", fieldValues);

      if ("name" in fieldValues)
         temp.name = fieldValues.name ? "" : "Name of the routine is required";
      setErrors({ ...temp });
      if (fieldValues === values)
         return Object.values(temp).every((x) => x === "");
   };
   const handleInputs = (e) => {
      const { name, value } = e;

      setValues({ ...values, [name]: value });
      validate({ [name]: value });
   };
   // const handleFeelingPressed = ({ selectedValue }) => {
   //    setValues({ ...values, ["feeling"]: selectedValue });
   // };
   const handleSaveClicked = async () => {
      if (validate()) {
         const colRef = collection(db, "setup/exercise/routine");
         addDoc(colRef, values).then((res) => {
            setOpenRoutineModel(false);
         });
      }
   };
   const handleCancelClicked = () => {
      setOpenRoutineModel(false);
   };

   // useEffect(() => {
   // TODO: Store the last use location in the user document
   //    setValues({
   //       ...values,
   //       locationName: "Planet Fittness",
   //       userUID: auth.currentUser.uid,
   //       exerciseDate: Date.now(),
   //    });
   //    setDateString(DateString(Date.now()));
   //    setTimeString(TimeSting(Date.now()));
   //    // let temp = items.filter((item) => item.value === "ABS Beginner");
   //    // console.log("temp", temp);
   //    // console.log("temp.routines", temp[0].routines);
   // }, []);
   // **************************************************
   return (
      <View>
         {/* Header information */}
         <View
            style={{
               marginHorizontal: 10,
               marginTop: 20,
               alignItems: "center",
            }}
         >
            <Input
               label="Routine Name"
               value={values.name}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.name}
               placeholder="Name of routine"
               onChangeText={(text) =>
                  handleInputs({ name: "name", value: text })
               }
               width={225}
               autoCapitalize="words"
            />
            <Input
               label="Description"
               value={values.description}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.description}
               placeholder="Description"
               onChangeText={(text) =>
                  handleInputs({ name: "description", value: text })
               }
               width={225}
               autoCapitalize="words"
            />

            <View style={{ marginTop: 30 }}>
               {/* <ButtonOnOff setFeelings={handleFeelingPressed} /> */}
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
export default Routine;

const styles = StyleSheet.create({});
