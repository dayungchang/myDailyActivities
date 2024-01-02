import { useEffect, useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import Modal from "react-native-modal";
import { auth, db } from "../../data/Firebase";
import COLORS from "../../constants/COLORS";
import Button from "../../components/controls/Button";
import NavBar from "../../components/controls/NavBar";
import RoutineCard from "../../components/RoutineCard";
import Picker from "../../components/controls/Picker";
import Likes from "../../components/Likes";
import ExerciseAdd from "../../components/ExerciseAdd";
import RoutineDialog from "../../components/RoutineDialog";
import RoutineSetDialog from "../../components/RoutineSetDialog";
import ExerciseEquipment from "../../data/meta/ExerciseEquipment";
import { useExerciseStore } from "../../stores/ExerciseStore";
import GlobalStyle from "../../styles/GlobalStyle";
import { dateFormat, dateTimeFormat, timeFormat } from "../../utils/Library";

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
   const [values, setValues] = useState({
      ...route.params.values,
      ["userUID"]: auth.currentUser.uid,
      ["exerciseDate"]: Date.now(),
   });
   const [errors, setErrors] = useState({});
   const [value, setValue] = useState({});
   const [isFocus, setIsFocus] = useState(false);
   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   const [dateTimeString, setDateTimeString] = useState("");
   const [equipments, setEquipments] = useState(ExerciseEquipment);

   const [openRoutinePicker, setOpenRoutinePicker] = useState(false);
   const [openRoutineDialog, setOpenRoutineDialog] = useState(false);
   const [showRoutineSetDialog, setShowRoutineSetDialog] = useState(false);

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
      console.log("values.name", values.name);
   };
   const initiateDataTime = () => {
      const today = new Intl.DateTimeFormat("en-US", dateFormat).format(
         Date.now()
      );
      setDateString(today);
      const timeStr = new Intl.DateTimeFormat("en-US", timeFormat).format(
         Date.now()
      );
      setTimeString(timeStr);
      const dateTimeStr = new Intl.DateTimeFormat(
         "en-US",
         dateTimeFormat
      ).format(Date.now());
      setDateTimeString(dateTimeStr);
   };
   useEffect(() => {
      console.log("values"), values;
      // initiateDataTime();

      // setValues({
      //    ...values,
      // });
      // if (!openAddExercise) fetchRoutine();
   }, []);

   return (
      <View>
         <NavBar
            title="Detail"
            backScreen="Exercise"
         />
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
                  <Text style={{ fontSize: 16 }}>{timeString}</Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                     <Text style={{ fontSize: 16 }}>Weight</Text>
                     <Text style={{ fontSize: 16 }}>{values.weight}</Text>
                     <Text style={{ fontSize: 16 }}>lbs</Text>
                  </View>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     gap: 10,
                  }}
               >
                  <Text style={{ fontSize: 16 }}>Focus Area</Text>
                  <Text style={{ fontSize: 16 }}>{values.focusArea}</Text>
               </View>
            </View>
         </View>

         <View
            style={{
               marginRight: 10,
               alignItems: "flex-end",
            }}
         >
            <Button
               label="+ Routine"
               onPress={handleAddRoutinePressed}
               width={130}
               buttonStyle={styles.buttonStyle}
               // buttonBlockStyle={ExerciseStyles.exerciseAddButtonBlockStyle}
               labelStyle={{}}
            />
         </View>

         {/* // ) : ( )} */}
         <View
            style={[
               GlobalStyle.boarderWithShadow,
               { margin: 10, borderRadius: 7, backgroundColor: "#F0F0F0" },
            ]}
         >
            <ScrollView>
               <View style={{ marginHorizontal: 10 }}>
                  {routineRecs.length > 0 ? (
                     routineRecs.map((routine, index) => (
                        <View key={index}>
                           <RoutineCard
                              record={routine}
                              index={index}
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
            </ScrollView>
         </View>
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
