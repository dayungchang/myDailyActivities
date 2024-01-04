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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import Modal from "react-native-modal";
import { auth, db } from "../../data/Firebase";
import { Feather } from "@expo/vector-icons";
import {
   DateString,
   DurationHM,
   TimeSting,
   dateFormat,
   dateTimeFormat,
   timeFormat,
} from "../../utils/Library";
import Button from "../../components/controls/Button";
import COLORS from "../../constants/COLORS";
import GlobalStyle from "../../styles/GlobalStyle";
import ExerciseSchema from "../../data/schemas/ExerciseSchema";
import Images from "../../constants/Images";
import RoutineCard from "../../components/RoutineCard";
import ExerciseEquipment from "../../data/meta/ExerciseEquipment";
import Likes from "../../components/Likes";
import Picker from "../../components/controls/Picker";
import Input from "../../components/controls/Input";
import ExerciseAdd from "../../components/ExerciseAdd";
import RoutineDialog from "../../components/RoutineDialog";
import RoutineSetDialog from "../../components/RoutineSetDialog";
import { useExerciseStore } from "../../stores/ExerciseStore";
import NavBar from "../../components/controls/NavBar";

const ExerciseDetail = () => {
   const navigation = useNavigation();
   const route = useRoute();

   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const currentRoutine = useExerciseStore((state) => state.currentRoutine);
   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

   const [openAddExercise, setOpenAddExercise] = useState(
      route.params.addExercise
   );
   // const userState = useSelector((state) => state.user.data);
   const [routineRecs, setRoutineRecs] = useState(route.params.routineRecs);
   const [values, setValues] = useState(route.params.values);
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
   const fetchRoutine = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js

      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", values.id),
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
      setOpenRoutineDialog(true);
   };
   const handleSelectRotuine = () => {
      setOpenRoutinePicker(false);
   };
   useEffect(() => {
      if (!openAddExercise) fetchRoutine();
   }, [currentRoutine]);

   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Detail"
            backScreen="Exercise"
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
                        <RoutineCard
                           record={routine}
                           index={index}
                           setShowRoutineSetDialog={setShowRoutineSetDialog}
                        />
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
                  flex: 0.1,
                  alignItems: "flex-end",
                  marginHorizontal: 20,
               }}
            >
               <TouchableOpacity
                  style={{
                     width: 50,
                     height: 50,
                     marginTop: -80,
                     marginRight: 20,
                     alignItems: "center",
                     justifyContent: "center",
                     backgroundColor: COLORS.lighterGrey,
                     borderRadius: 24,
                  }}
                  onPress={handleAddRoutinePressed}
               >
                  <Feather
                     name="plus-circle"
                     size={46}
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
               onRequestClose={() => setOpenAddExercise(false)}
               visible={openAddExercise}
               animationType="slideInUp"
               animationOut="slideOutDown"
               backdropColor={COLORS.white}
               coverScreen={true}
               backdropOpacity={0.8}
            >
               <ExerciseAdd
                  values={values}
                  setValues={setValues}
                  setOpenAddExercise={setOpenAddExercise}
               />
            </Modal>
         </KeyboardAvoidingView>
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
               <RoutineDialog
                  exerciseValues={values}
                  setExerciseValues={setValues}
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
                  values={values}
                  setValues={setValues}
                  setShowRoutineSetDialog={setShowRoutineSetDialog}
                  showRoutineSetDialog={showRoutineSetDialog}
               />
            </Modal>
         </KeyboardAvoidingView>
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
