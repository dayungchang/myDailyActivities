import { useEffect, useState } from "react";
import {
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import NavBar from "../../../src/components/controls/NavBar";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../../src/data/Firebase";
import { useRouter } from "expo-router";
import Images from "../../../src/constants/Images";
import COLORS from "../../../src/constants/COLORS";
import DisplayIcon from "../../../src/components/DisplayIcon";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";
import FocusAreaSchema from "../../../src/data/schemas/FocusAreaSchema";
import Input from "../../../src/components/controls/Input";
import DropdownList from "../../../src/components/controls/DropdownList";
import ButtonOnOff from "../../../src/components/controls/ButtonOnOff";
import Button from "../../../src/components/controls/Button";
import { DateString, TimeSting } from "../../../src/utils/Library";

const FocusArea = () => {
   const [focusAreaRecs, setFocusAreaRecs] = useState([{}]);

   const [openFocusAreaMaintenance, setOpenFocusAreaMaintenance] =
      useState(false);
   const handleAddFocusAreaPressed = () => {
      setOpenFocusAreaMaintenance(true);
   };
   const fetchFocusAreaRecs = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "focusArea");
      const qPull = query(colRef);

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setFocusAreaRecs(records);
         console.log(records.length);
      });
   };

   useEffect(() => {
      fetchFocusAreaRecs();
   }, []);

   return (
      <>
         <NavBar
            title="Focus Area"
            backScreen="Admin"
            backScreenPath="/(admin)\Admin"
         />
         <View>
            <Text>FocusArea</Text>
         </View>
         <View>
            <ScrollView style={{ marginHorizontal: 10 }}>
               <View
                  style={{
                     marginBottom: 10,
                     justifyContent: "space-between",
                  }}
               >
                  <View style={{ paddingVertical: 20 }}>
                     {focusAreaRecs ? (
                        focusAreaRecs.map((focusArea, index) => (
                           <View key={index}>
                              {console.log("Display record")}
                              <FocusAreaCard
                                 focusAreaRec={focusArea}
                                 setOpenFocusAreaMaintenance={
                                    setOpenFocusAreaMaintenance
                                 }
                              />
                           </View>
                        ))
                     ) : (
                        <Text>No table exists</Text>
                     )}
                  </View>
               </View>
            </ScrollView>
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
               onPress={handleAddFocusAreaPressed}
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
                  title="Focus Area"
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
            visible={openFocusAreaMaintenance}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 380 }}>
               <FocuseAreaMaintenance
                  focusAreaRec={FocusAreaSchema}
                  setOpenFocusAreaMaintenance={setOpenFocusAreaMaintenance}
               />
               {/* <View
                  style={{
                     marginVertical: 10,
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 10,
                  }}
               >
                  <TextInput
                     value={todo}
                     onChangeText={(text) => setTodo(text)}
                     placeholder="Input a new task here"
                     style={{
                        padding: 10,
                        borderColor: "#E0E0E0",
                        borderWidth: 1,
                        borderRadius: 5,
                        flex: 1,
                     }}
                  />
                  <Ionicons
                     onPress={addTodo}
                     name="send"
                     size={24}
                     color="#007FFF"
                  />
               </View>

               <Text>Choose Category</Text>

               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 10,
                     marginVertical: 10,
                  }}
               >
                  <Pressable
                     onPress={() => setCategory("Work")}
                     style={{
                        borderColor: "#E0E0E0",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 25,
                     }}
                  >
                     <Text>Work</Text>
                  </Pressable>
                  <Pressable
                     onPress={() => setCategory("Personal")}
                     style={{
                        borderColor: "#E0E0E0",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 25,
                     }}
                  >
                     <Text>Personal</Text>
                  </Pressable>
                  <Pressable
                     onPress={() => setCategory("WishList")}
                     style={{
                        borderColor: "#E0E0E0",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 25,
                     }}
                  >
                     <Text>WishList</Text>
                  </Pressable>
               </View>

               <Text>Some sugggestions</Text>
               <View
                  style={{
                     flexDirection: "row",
                     alignItems: "center",
                     gap: 10,
                     flexWrap: "wrap",
                     marginVertical: 10,
                  }}
               >
                  {suggestions?.map((item, index) => (
                     <Pressable
                        onPress={() => setTodo(item?.todo)}
                        style={{
                           backgroundColor: "#F0F8FF",
                           paddingHorizontal: 10,
                           paddingVertical: 4,
                           borderRadius: 25,
                        }}
                        key={index}
                     >
                        <Text style={{ textAlign: "center" }}>
                           {item?.todo}
                        </Text>
                     </Pressable>
                  ))}
               </View> */}
            </ModalContent>
         </BottomModal>
      </>
   );
};

const FocusAreaCard = ({ focusAreaRec, setOpenFocusAreaMaintenance }) => {
   const router = useRouter();

   const [exerciseDateString, setExerciseDateString] = useState("");
   const [exerciseTimeString, setExerciseTimeString] = useState("");
   const [routineRecs, setRoutineRecs] = useState([]);
   const [routineCount, setRoutineCount] = useState(0);
   const [showDetail, setShowDetail] = useState(false);
   const [feelings, setFeelings] = useState([]);

   const dataArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

   const handleFeeling = () => {
      var feelings = [];
      for (let i = 0; i < routineCount; i++) {
         feelings.push(<Image source={Images.thumbUp} />);
      }
      return;
   };
   const handleFocusAreaCardPressed = () => {
      setOpenFocusAreaMaintenance(true);
   };

   return (
      <View>
         <Pressable
            // onPress={() => handleExerciseCardPressed()}
            style={{
               padding: 10,
               borderWidth: 0.2,
               borderRadius: 7,
               marginBottom: 10,
               paddingHorizontal: 15,
               backgroundColor:
                  focusAreaRec.status === "A"
                     ? COLORS.lightBlue01
                     : COLORS.lightGray01,
            }}
            onPress={handleFocusAreaCardPressed}
         >
            <View>
               <Text>{focusAreaRec.name}</Text>
               <Text>{focusAreaRec.userUID}</Text>
            </View>
         </Pressable>
      </View>
   );
};

const FocuseAreaMaintenance = ({
   focusAreaRec,
   setOpenFocusAreaMaintenance,
}) => {
   const router = useRouter();
   // **************************************************
   const [values, setValues] = useState(FocusAreaSchema);
   const [errors, setErrors] = useState({});
   const [items, setItems] = useState(focusAreaRec);
   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   // **************************************************
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      // console.log("fieldValues", fieldValues);

      if ("locationName" in fieldValues)
         temp.locationName = fieldValues.locationName
            ? ""
            : "Location is required";
      if ("weight" in fieldValues)
         temp.weight = fieldValues.weight ? "" : "Weight is required";
      if ("focusArea" in fieldValues)
         temp.weight = fieldValues.focusArea ? "" : "Area of focus is required";
      setErrors({ ...temp });
      if (fieldValues === values)
         return Object.values(temp).every((x) => x === "");
   };
   const handleInputs = (e) => {
      const { name, value } = e;

      setValues({ ...values, [name]: value });
      validate({ [name]: value });
   };
   const handleFeelingPressed = ({ selectedValue }) => {
      setValues({ ...values, ["feeling"]: selectedValue });
   };
   const handleSaveClicked = () => {
      const colRef = collection(db, "exercise");
      addDoc(colRef, values).then((res) => {
         setOpenFocusAreaMaintenance(false);
         let temp = { ...values, ["id"]: res.id };
         router?.push({
            pathname: "/ExerciseDetail",
            params: { exerciseRec: temp },
         });
      });
   };
   const handleCancelClicked = () => {
      setOpenFocusAreaMaintenance(false);
   };

   useEffect(() => {
      // TODO: Store the last use location in the user document
      setValues({
         ...values,
         locationName: "Planet Fittness",
         userUID: auth.currentUser.uid,
         exerciseDate: Date.now(),
      });
      setDateString(DateString(Date.now()));
      setTimeString(TimeSting(Date.now()));
   }, []);
   // **************************************************
   return (
      <View>
         <View style={{ margin: 10 }}>
            <View
               style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  paddingBottom: 10,
                  gap: 10,
                  borderBottomWidth: 0.5,
               }}
            >
               <Text style={styles.headerLabelStyle}>Date</Text>
               <Text style={styles.headerTextStyle}>{dateString}</Text>
               <Text style={styles.headerTextStyle}>{timeString}</Text>
            </View>
            <View></View>
         </View>
      </View>
   );
};

export default FocusArea;

const styles = StyleSheet.create({
   dialogHeaderStyle: {
      padding: 10,
      backgroundColor: COLORS.grey,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: "center",
   },
   exerciseCardStyle: {
      padding: 10,
      borderWidth: 0.2,
      borderRadius: 7,
      backgroundColor: COLORS.lightGrey,
      marginBottom: 10,
   },
   exerciseCardHeaderStyle: {
      alignItems: "flex-start",
      flexDirection: "row",
      marginBottom: 5,
      gap: 20,
      justifyContent: "space-between",
   },
   exerciseCardBodyStyle: { marginHorizontal: 10 },
   exerciseCardBodyRowStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 15,
   },
   exerciseCardListStyle: {
      marginHorizontal: 10,
      marginTop: 5,
      borderWidth: 0.25,
      borderRadius: 7,
   },
   headerLabelStyle: { fontSize: 18, fontWeight: "600" },
   headerTextStyle: { fontSize: 18 },
});
