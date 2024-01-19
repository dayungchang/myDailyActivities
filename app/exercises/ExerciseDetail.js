import { useEffect, useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import Modal from "react-native-modal";
import { auth, db } from "../../src/data/Firebase";
import { Feather } from "@expo/vector-icons";
import {
   DateString,
   DurationHM,
   TimeSting,
   dateFormat,
   dateTimeFormat,
   timeFormat,
} from "../../src/utils/Library";
import Button from "../../src/components/controls/Button";
import COLORS from "../../src/constants/COLORS";
import GlobalStyle from "../../src/styles/GlobalStyle";
import ExerciseSchema from "../../src/data/schemas/ExerciseSchema";
import Images from "../../src/constants/Images";
import ExerciseEquipment from "../../src/data/meta/ExerciseEquipment";
import Likes from "../../src/components/Likes";
import Picker from "../../src/components/controls/Picker";
import Input from "../../src/components/controls/Input";
import ExerciseAdd from "../../src/components/ExerciseAdd";
import RoutineDialog from "../../src/components/RoutineDialog";
import RoutineSetDialog from "../../src/components/RoutineSetDialog";
import { useExerciseStore } from "../../src/stores/ExerciseStore";
import NavBar from "../../src/components/controls/NavBar";
import FocusArea, {
   ABS_Beginner,
   ARM_Beginner,
   Chest_Beginner,
   Chest_Beginner1,
} from "../../src/data/meta/FocusArea";
import DropdownList from "../../src/components/controls/DropdownList";
import ButtonOnOff from "../../src/components/controls/ButtonOnOff";
import RoutineImage from "../../src/components/RoutineImage";
import { useLocalSearchParams, useRouter } from "expo-router";
import DisplayIcon from "../../src/components/DisplayIcon";

const ExerciseDetail = () => {
   const navigation = useNavigation();
   const router = useRouter();
   const params = useLocalSearchParams();

   // console.log("params", params);
   // console.log("exerciseRec.id", params.id);

   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);
   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );
   let focusAreaSelect = params.focusArea;

   const [values, setValues] = useState(params);

   const [routineRec, setRoutineRec] = useState([]);
   const [routineRecs, setRoutineRecs] = useState([]);
   const [focusAreas, setFocusAreas] = useState(FocusArea);
   const [openAddExercise, setOpenAddExercise] = useState(false);
   // const userState = useSelector((state) => state.user.data);
   const [errors, setErrors] = useState({});
   const [value, setValue] = useState(null);
   const [isFocus, setIsFocus] = useState(false);
   const [dateString, setDateString] = useState(
      DateString(values.exerciseDate)
   );
   const [timeString, setTimeString] = useState(TimeSting(values.exerciseDate));
   const [dateTimeString, setDateTimeString] = useState("");
   const [equipments, setEquipments] = useState(ExerciseEquipment);

   const [openRoutinePicker, setOpenRoutinePicker] = useState(false);
   const [openRoutineDialog, setOpenRoutineDialog] = useState(false);
   const [showRoutineSetDialog, setShowRoutineSetDialog] = useState(false);
   const [openExerciseUpdate, setOpenExerciseUpdate] = useState(false);

   const currentDate = new Date();
   let todate = new Date();

   // https://www.youtube.com/watch?v=O8q8H9c9XZ4
   // Adding blender to the app

   const fetchRoutineRec = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      // console.log("values", params.id);

      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", params.id),
         orderBy("routineDate", "desc")
      );
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutineRecs(records);
      });
   };

   const handleInputs = (e) => {
      const { name, value } = e;

      setValues({ ...values, [name]: value });
   };
   const handleExistWithAdd = () => {
      const colRef = collection(db, "exercise");
      addDoc(colRef, values).then(() => {});

      setOpenAddExercise(false);
   };
   const handleExistWithoutAdd = () => {
      setOpenAddExercise(false);
      navigation.goBack();
   };
   const handleAddRoutinePressed = () => {
      // setOpenRoutineDialog(true);
      // console.log("values before calling RoutineSelect", values);

      router?.push({
         pathname: "/exercises/RoutineSelect",
         params: (exerciseRec = values),
      });
      // navigation.navigate("routineSelect", { exerciseRec: values });
   };
   const handleSelectRotuine = () => {
      setOpenRoutinePicker(false);
   };
   useEffect(() => {
      let focusRoutines = focusAreas.filter(
         (item) => item.value === values.focusArea
      );
      // console.log("Parameter: ", params.focusArea);
      // setRoutines(focusRoutines[0].routines);
      // if (focusRoutines[0]) setValues({ ...values, ["routines"]: routines });
      // console.log("values - ExerciseDetail", values);

      fetchRoutineRec();
   }, [currentRoutine]);

   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Detail"
            backScreen="Exercise"
            backScreenPath="/exercises"
         />
         <TouchableOpacity onPress={() => setOpenExerciseUpdate(true)}>
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     margin: 10,
                     padding: 10,
                     borderRadius: 7,
                     backgroundColor: "#F5F5F5",
                  },
               ]}
            >
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
                        {values.locationName}
                     </Text>
                  </View>
                  <Likes feelingCount={values.feeling} />
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
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                           Start
                        </Text>
                        <Text style={{ fontSize: 16 }}>{timeString}</Text>
                     </View>
                     <View
                        style={{
                           flexDirection: "row",
                           alignItems: "center",
                           gap: 10,
                        }}
                     >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                           Duration
                        </Text>
                        <Text>
                           {DurationHM(
                              (startDateTime = values.exerciseDate),
                              (endDateTime = new Date())
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
                     <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Focus Area
                     </Text>
                     <Text style={{ fontSize: 16 }}>{values.focusArea}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                     <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Weight
                     </Text>
                     <Text style={{ fontSize: 16 }}>{values.weight}</Text>
                     <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        lbs
                     </Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>

         <ScrollView style={{ margin: 5, borderRadius: 10 }}>
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
               <View
                  style={{
                     flex: 1,
                     marginHorizontal: 10,
                  }}
               >
                  {routineRecs.length > 0 ? (
                     routineRecs.map((routine, index) => (
                        <View key={index}>
                           <RoutineCard
                              routineRec={routine}
                              index={index}
                              setRoutineRec={setRoutineRec}
                              setShowRoutineSetDialog={setShowRoutineSetDialog}
                           />
                        </View>
                     ))
                  ) : (
                     <View style={{ margin: 20 }}>
                        <Text>No routine exists</Text>
                     </View>
                  )}
               </View>
            </View>
         </ScrollView>

         {!openAddExercise && (
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
                  onPress={handleAddRoutinePressed}
               >
                  <DisplayIcon
                     iconName="pluscircleo"
                     iconFamily="AntDesign"
                     size={60}
                     color={COLORS.appBackground}
                  />
               </TouchableOpacity>
            </View>
         )}
         <Modal
            visible={openRoutinePicker}
            onRequestClose={() => setOpenRoutinePicker(false)}
            animationType="slideInUp"
            animationOut="slideOutDown"
            backdropColor={COLORS.white}
            coverScreen={true}
            backdropOpacity={0.8}
         >
            <Picker
               values={values}
               equipments={equipments}
               setValues={setValue}
               setOpenRoutinePicker={setOpenRoutinePicker}
            />
         </Modal>
         <Modal visible={openExerciseUpdate}>
            <TouchableOpacity onPress={() => setOpenExerciseUpdate(false)}>
               <Text>Close Update Window</Text>
            </TouchableOpacity>
         </Modal>

         <KeyboardAvoidingView>
            <Modal
               onRequestClose={() => setOpenRoutineDialog(false)}
               visible={openRoutineDialog}
               animationType="slideInUp"
               animationOut="slideOutDown"
               backdropColor={COLORS.white}
               coverScreen={true}
               backdropOpacity={0.8}
            >
               <NewRoutine
                  exerciseRec={values}
                  setOpenRoutineDialog={setOpenRoutineDialog}
               />
            </Modal>
         </KeyboardAvoidingView>
         <KeyboardAvoidingView>
            <Modal
               visible={showRoutineSetDialog}
               onRequestClose={() => setShowRoutineSetDialog(false)}
               animationType="slideInUp"
               animationOut="slideOutDown"
            >
               <RoutineSetDialog
                  routineRec={routineRec}
                  exerciseRec={values}
                  setShowRoutineSetDialog={setShowRoutineSetDialog}
                  showRoutineSetDialog={showRoutineSetDialog}
               />
            </Modal>
         </KeyboardAvoidingView>
      </View>
   );
};

// **************************************************
// --------------------------------------------------
// **************************************************
const NewRoutine = ({ exerciseRec, setOpenRoutineDialog }) => {
   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);
   const setCurrentRoutine = useExerciseStore(
      (state) => state.setCurrentRoutine
   );

   const [values, setValues] = useState({
      ...exerciseRec,
      ["routineName"]: "",
      ["routineWeight"]: "",
      ["routineReps"]: "",
   });
   const [errors, setErrors] = useState({});
   const [focusAreaRec, setFocusAreaRec] = useState(FocusArea);
   const [routines, setRoutines] = useState([]);

   const handleFeelingPressed = ({ selectedValue }) => {
      setValues({ ...values, ["feeling"]: selectedValue });
   };
   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
   };
   const handleSaveClicked = () => {
      //github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "routine");
      addDoc(colRef, {
         exerciseUID: values.id,
         name: values.name,
         reps: values.routineReps,
         routineDate: new Date(),
         userUID: values.userUID,
         weight: values.routineWeight,
         routineSet: [
            {
               reps: values.routineReps,
               feeling: values.feeling,
               setDate: new Date(),
               weight: values.routineWeight,
            },
         ],
      }).then((res) => {
         const docRef = doc(db, "routine", res.id);
         onSnapshot(docRef, (doc) => {
            setCurrentRoutine(doc.data());
         });
         setValues({ ...values, ["routineSetUID"]: res.id });
         const setRef = collection(db, "routineSet");
         addDoc(setRef, {
            exerciseUID: values.id,
            routineUID: res.id,
            reps: values.routineReps,
            feeling: values.feeling,
            setDate: new Date(),
            userUID: values.userUID,
            weight: values.routineWeight,
         }).then((res) => {});
      });
      setOpenRoutineDialog(false);
   };
   const handleCancelClicked = () => {
      setOpenRoutineDialog(false);
   };
   const fetchRoutines = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      // console.log("values.focusArea", values.focusArea);

      const colRef = collection(db, "lookUp");
      const qPull = query(
         colRef,
         where("type", "==", values.focusArea),
         orderBy("label")
      );
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setRoutines(records);
         // console.log("records --", records);
         // console.log("routines --", routines);
      });
   };
   useEffect(() => {
      // console.log("********** NewRoutine - ExerciseDatail **********");

      // console.log("values", values);
      // console.log("focusAreaRec", focusAreaRec);
      // console.log("exerciseRec.focusArea", exerciseRec.focusArea);

      fetchRoutines();
      // console.log("routines - useEffect", routines);
   }, []);
   return (
      <View
         style={[
            GlobalStyle.boarderWithShadow,
            {
               borderWidth: 0.25,
               marginTop: -30,
               marginHorizontal: 30,
               borderRadius: 10,
               backgroundColor: "#f0f0f0",
            },
         ]}
      >
         <View
            style={{
               padding: 10,
               backgroundColor: COLORS.grey,
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,
               alignItems: "center",
            }}
         >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
               New Routine
            </Text>
         </View>
         <View
            style={{
               marginTop: 10,
               marginHorizontal: 10,
            }}
         >
            <View
               style={{
                  marginHorizontal: 10,
                  marginTop: 20,
                  alignItems: "center",
               }}
            >
               <Input
                  label="Name"
                  value={values.name}
                  iconName=""
                  iconFamily=""
                  error={errors.name}
                  placeholder="Name of routine"
                  onChangeText={(text) =>
                     handleInputs({ name: "name", value: text })
                  }
                  width={225}
               />
               {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY */}
               {/* {console.log("focusAreaRec", focusAreaRec)} */}
               <DropdownList
                  label="Name of the routine"
                  selectedValue={values.name}
                  setSelectedValue={(value) =>
                     setValues({ ...values, focusArea: value })
                  }
                  items={routines}
                  setItems={setRoutines}
                  iconName="lock-outline"
                  iconFamily="MaterialCommunityIcons"
                  placeholder="Name of routine"
                  // error={errors.test}
                  onChangeValue={(value) =>
                     handleInputs({ name: "name", value: value })
                  }
                  width={225}
                  dropDownDirection="TOP"
               />
               {/* <DropdownList /> */}
            </View>
            <View style={{ marginHorizontal: 10, margin: 20 }}>
               <Text
                  style={{
                     fontSize: 16,
                     fontWeight: "bold",
                     justifyContent: "flex-start",
                  }}
               >
                  Set # 1
               </Text>
               <View
                  style={{
                     marginHorizontal: 10,
                     alignItems: "center",
                  }}
               >
                  <Input
                     label="Weight"
                     value={values.routineWeight}
                     iconName="weight"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.routineWeight}
                     placeholder="Weight used"
                     onChangeText={(text) =>
                        handleInputs({ name: "routineWeight", value: text })
                     }
                     width={225}
                     keyboardType="numeric"
                  />
                  <Input
                     label="Reps"
                     value={values.routineReps}
                     iconName="number"
                     iconFamily="Octicons"
                     error={errors.routineReps}
                     placeholder="Number of reps"
                     onChangeText={(text) =>
                        handleInputs({ name: "routineReps", value: text })
                     }
                     width={225}
                     keyboardType="numeric"
                  />
                  <ButtonOnOff setFeelings={handleFeelingPressed} />
               </View>
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
// **************************************************
// --------------------------------------------------
// **************************************************
const RoutineCard = ({
   routineRec,
   index,
   setRoutineRec,
   setShowRoutineSetDialog,
}) => {
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
      setRoutineRec(routineRec);
      setShowRoutineSetDialog(true);
   };

   const fetchRoutinesSetByRoutine = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      // console.log("routineRec", routineRec);

      const colRef = collection(db, "routineSet");
      const qPull = query(
         colRef,
         where("routineUID", "==", routineRec.id),
         orderBy("setDate")
      );

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
      fetchRoutinesSetByRoutine();
   }, []);
   return (
      <View
         key={{ index }}
         style={{
            flex: 1,
            borderBottomWidth: 0.5,
            padding: 10,
            flexDirection: "row",
         }}
      >
         <View style={{ justifyContent: "center", marginRight: 10 }}>
            <RoutineImage
               imageName={routineRec.name.replace(/\s/g, "").toLowerCase()}
            />
         </View>
         <View>
            <View
               style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
               <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {routineRec.name}
               </Text>
               <Likes feelingCount={routineRec.feeling} />
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
               <View
                  style={{
                     width: 100,
                     justifyContent: "flex-end",
                     flexDirection: "row",
                  }}
               >
                  <Text>{routineRec.weight}</Text>
                  <Text>lbs</Text>
               </View>
               <View
                  style={{
                     width: 100,
                     justifyContent: "flex-end",
                     flexDirection: "row",
                  }}
               >
                  <Text>{routineRec.reps}</Text>
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
               <TouchableOpacity
                  onPress={handleAddRoutineSet}
                  style={{
                     padding: 2,
                     paddingHorizontal: 15,
                     backgroundColor: COLORS.grey,
                     borderRadius: 15,
                     flexDirection: "row",
                     gap: 5,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <Text style={{ fontSize: 16, textAlign: "center" }}>
                     + Set
                  </Text>
               </TouchableOpacity>
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

// userUID: "",
//    locationUID: "",
//    locationName: "",
//    exerciseDate: "",
//    feeling: "",
//    weight: 0,

export default ExerciseDetail;

const styles = StyleSheet.create({
   buttonStyle: {
      width: 150,
      backgroundColor: "#318CE7",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
   },
   container: {
      backgroundColor: "white",
      padding: 16,
   },
   dropdown: {
      height: 50,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
   },
   icon: {
      marginRight: 5,
   },
   label: {
      // position: "absolute",
      backgroundColor: "white",
      // left: 22,
      // top: 8,
      // zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
   },
   placeholderStyle: {
      fontSize: 16,
   },
   selectedTextStyle: {
      fontSize: 16,
   },
   iconStyle: {
      width: 20,
      height: 20,
   },
   inputSearchStyle: {
      height: 40,
      fontSize: 16,
   },
});
