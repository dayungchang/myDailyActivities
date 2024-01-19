import { useEffect, useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   Modal,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";
import Button from "../../src/components/controls/Button";
import ExerciseSchema from "../../src/data/schemas/ExerciseSchema";
import { useExerciseStore } from "../../src/stores/ExerciseStore";
import NavBar from "../../src/components/controls/NavBar";
import COLORS from "../../src/constants/COLORS";
import GlobalStyle from "../../src/styles/GlobalStyle";
import Input from "../../src/components/controls/Input";
import DropdownList from "../../src/components/controls/DropdownList";
import ButtonOnOff from "../../src/components/controls/ButtonOnOff";
// import {
//    DateFormat,
//    DateString,
//    DateTimeFormat,
//    TimeFormat,
//    TimeSting,
// } from "../../utils/Library";

import { auth, db } from "../../src/data/Firebase";
import FocusArea from "../../src/data/meta/FocusArea";
import DialogHeader from "../../src/components/controls/DialogHeader";
import Images from "../../src/constants/Images";
import Likes from "../../src/components/Likes";
import { DateString, TimeSting } from "../../src/utils/Library";
import { router, useNavigation, useRouter } from "expo-router";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DisplayIcon from "../../src/components/DisplayIcon";

const Exercise = () => {
   const navigation = useNavigation();

   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

   const [exerciseRecs, setExerciseRecs] = useState([]);
   const [openNewExercise, setOpenNewExercise] = useState(false);
   const [category, setCategory] = useState("All");
   const [todos, setTodos] = useState([]);
   const [todo, setTodo] = useState("");

   const handleNewExercisePressed = () => {
      setOpenNewExercise(true);
   };

   const suggestions = [
      {
         id: "0",
         todo: "Drink Water, keep healthy",
      },
      {
         id: "1",
         todo: "Go Excercising",
      },
      {
         id: "2",
         todo: "Go to bed early",
      },
      {
         id: "3",
         todo: "Take pill reminder",
      },
      {
         id: "4",
         todo: "Go Shopping",
      },
      {
         id: "5",
         todo: "finish assignments",
      },
   ];
   const addTodo = () => {};
   const fetchExercisesByUserUID = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
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
   const handleNewExercise = () => {
      navigation.navigate("ExerciseDetail", {
         NewExercise: true,
         values: ExerciseSchema,
         routineRecs: [],
      });
   };
   useEffect(() => {
      fetchExercisesByUserUID();
   }, []);

   return (
      <>
         <View style={{ height: 65 }}>
            <NavBar
               title="Exercise"
               backScreen="Home"
               backScreenPath="/Home"
            />
         </View>
         <ScrollView style={{ marginHorizontal: 10 }}>
            <View
               style={{
                  marginBottom: 10,
                  justifyContent: "space-between",
               }}
            >
               <View style={{ paddingVertical: 20 }}>
                  {exerciseRecs ? (
                     exerciseRecs.map((exercise, index) => (
                        <View key={index}>
                           <ExerciseCard exerciseRec={exercise} />
                        </View>
                     ))
                  ) : (
                     <Text>No exercise exists</Text>
                  )}
               </View>
            </View>
         </ScrollView>
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
         {/* <Modal
            onRequestClose={() => setOpenNewExercise(false)}
            visible={openNewExercise}
            animationType="slideInUp"
            animationOut="slideOutDown"
            backdropColor={COLORS.white}
            coverScreen={true}
            transparent={true}
         >
            <KeyboardAvoidingView>
               <NewExercise setOpenNewExercise={setOpenNewExercise} />
            </KeyboardAvoidingView>
         </Modal> */}
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
            visible={openNewExercise}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 380 }}>
               <NewExercise setOpenNewExercise={setOpenNewExercise} />
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

const NewExercise = ({ setOpenNewExercise }) => {
   const router = useRouter();
   // **************************************************
   const [values, setValues] = useState(ExerciseSchema);
   const [errors, setErrors] = useState({});
   const [items, setItems] = useState(FocusArea);
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
         setOpenNewExercise(false);
         let temp = { ...values, ["id"]: res.id };
         router?.push({
            pathname: "/ExerciseDetail",
            params: { exerciseRec: temp },
         });
      });
   };
   const handleCancelClicked = () => {
      setOpenNewExercise(false);
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
      // let temp = items.filter((item) => item.value === "ABS Beginner");
      // console.log("temp", temp);
      // console.log("temp.routines", temp[0].routines);
   }, []);
   // **************************************************
   return (
      <View>
         {/* 
         <DialogHeader headerTitle="New Exercise" />
         Header information */}
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
         </View>
         <View
            style={{
               marginHorizontal: 10,
               marginTop: 20,
               alignItems: "center",
            }}
         >
            <Input
               label="Location"
               value={values.locationName}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.locationName}
               placeholder="Location"
               onChangeText={(text) =>
                  handleInputs({ name: "locationName", value: text })
               }
               width={225}
               autoCapitalize="words"
            />
            <Input
               label="Weight"
               value={values.weight}
               iconName="weight"
               iconFamily="FontAwesome5"
               error={errors.weight}
               placeholder="Your body weight"
               onChangeText={(text) =>
                  handleInputs({ name: "weight", value: text })
               }
               width={225}
               keyboardType="numeric"
            />
            {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY */}
            <DropdownList
               label="Focus Area"
               selectedValue={values.focusArea}
               setSelectedValue={(value) =>
                  handleInputs({ name: "focusArea", value: value })
               }
               items={items}
               setItems={setItems}
               iconName="lock-outline"
               iconFamily="MaterialCommunityIcons"
               placeholder="Area of focus"
               error={errors.focusArea}
               width={225}
               dropDownDirection="TOP"
            />
            <View style={{ marginTop: 30 }}>
               <ButtonOnOff setFeelings={handleFeelingPressed} />
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
   //    const navigation = useNavigation();

   //    const setCurrentExercise = useExerciseStore(
   //       (state) => state.setCurrentExercise
   //    );

   //    const [values, setValues] = useState(ExerciseSchema);

   //    const [dateString, setDateString] = useState("");
   //    const [timeString, setTimeString] = useState("");
   //    const [dateTimeString, setDateTimeString] = useState("");
   //    const [errors, setErrors] = useState({});

   //    const [items, setItems] = useState(FocusArea);

   //    const handleInputs = (e) => {
   //       const { name, value } = e;
   //       setValues({ ...values, [name]: value });
   //    };

   //    const handleSaveClicked = () => {
   //       const colRef = collection(db, "exercise");
   //       addDoc(colRef, values).then((res) => {
   //          setValues({ ...values, ["exerciseUID"]: res.id });
   //          setCurrentExercise(values);
   //       });
   //       setOpenNewExercise(false);
   //    };
   //    const handleCancelClicked = () => {
   //       navigation.goBack();
   //    };
   //    useEffect(() => {
   //       const today = new Intl.DateTimeFormat("en-US", DateFormat).format(
   //          Date.now()
   //       );
   //       setDateString(today);
   //       const timeStr = new Intl.DateTimeFormat("en-US", TimeFormat).format(
   //          Date.now()
   //       );
   //       setTimeString(timeStr);
   //       const dateTimeStr = new Intl.DateTimeFormat(
   //          "en-US",
   //          DateTimeFormat
   //       ).format(Date.now());
   //       setDateTimeString(dateTimeStr);

   //       setValues({
   //          ...values,
   //          ["userUID"]: auth.currentUser.uid,
   //          ["exerciseDate"]: Date.now(),
   //       });
   //    }, []);
   //    return (
   //      <View style={[GlobalStyle.boarderWithShadow, styles.newExerciseStyle]}>
   //
   //          <View
   //             style={{
   //                marginHorizontal: 10,
   //                marginTop: 20,
   //                alignItems: "center",
   //             }}
   //          >
   //             <Input
   //                label="Location"
   //                value={values.locationName}
   //                iconName="location-pin"
   //                iconFamily="MaterialIcons"
   //                error={errors.locationName}
   //                placeholder="Location"
   //                onChangeText={(text) =>
   //                   handleInputs({ name: "locationName", value: text })
   //                }
   //                width={225}
   //                autoCapitalize="words"
   //             />
   //             <View style={{ width: 120 }}>
   //                {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY */}
   //                {/* <Dropdown
   //                         style={{
   //                            height: "auto",
   //                            borderColor: "gray",
   //                            borderWidth: 1,
   //                            borderRadius: 8,
   //                            paddingHorizontal: 8,
   //                            marginTop: 7,
   //                            marginLeft: 40,
   //                            width: 300,
   //                            justifyContent: "flex-start",
   //                         }}
   //                         placeholderStyle={styles.placeholderStyle}
   //                         selectedTextStyle={styles.selectedTextStyle}
   //                         inputSearchStyle={styles.inputSearchStyle}
   //                         iconStyle={styles.iconStyle}
   //                         data={data}
   //                         search
   //                         maxHeight={300}
   //                         labelField="label"
   //                         valueField="value"
   //                         placeholder="Input"
   //                         searchPlaceholder="Search..."
   //                         value={value}
   //                         onChange={(item) => {
   //                            setValue(item.value);
   //                         }}
   //                         renderLeftIcon={() => (
   //                            <AntDesign
   //                               style={styles.icon}
   //                               color="black"
   //                               name="Safety"
   //                               size={20}
   //                            />
   //                         )}
   //                      /> */}
   //             </View>
   //             <Input
   //                label="Weight"
   //                value={values.weight}
   //                iconName="weight"
   //                iconFamily="FontAwesome5"
   //                error={errors.location}
   //                placeholder="Your body weight"
   //                onChangeText={(text) =>
   //                   handleInputs({ name: "weight", value: text })
   //                }
   //                width={225}
   //                keyboardType="numeric"
   //             />
   //             {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY */}
   //             <DropdownList
   //                label="Focus Area"
   //                selectedValue={values.focusArea}
   //                setSelectedValue={(value) =>
   //                   setValues({ ...values, focusArea: value })
   //                }
   //                items={items}
   //                setItems={setItems}
   //                iconName="lock-outline"
   //                iconFamily="MaterialCommunityIcons"
   //                placeholder="Area of focus"
   //                // error={errors.test}
   //                onChangeValue={(value) =>
   //                   handleInputs({ name: "test", value: value })
   //                }
   //                width={225}
   //                dropDownDirection="TOP"
   //             />
   //             <View style={{ marginTop: 30 }}>
   //                <ButtonOnOff setFeelings={handleFeelingPressed} />
   //             </View>
   //          </View>

   //       </View>
   //    );
};

const ExerciseCard = ({ exerciseRec }) => {
   const router = useRouter();

   const currentExercise = useExerciseStore((state) => state.currentExercise);
   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

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
   const handleExerciseCardPressed = () => {
      setCurrentExercise(exerciseRec);
      // console.log("exerciseRec", exerciseRec);

      if (exerciseRec.status === "A") {
         router?.push({
            pathname: "/exercises/ExerciseDetail",
            params: exerciseRec,
         });
         // navigation.navigate("exerciseDetail", { exerciseRec: exerciseRec });
         // navigation.navigate("ExerciseDetail", {
         //    NewExercise: false,
         //    values: exerciseRec,
         //    routineRecs: routineRecs,
         // });
      } else {
         Alert.alert("Exercise Completed");
      }
   };
   const fetchRoutinesByExercise = () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "routine");
      const qPull = query(
         colRef,
         where("exerciseUID", "==", exerciseRec.id),
         orderBy("routineDate", "desc")
      );

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({
               ...doc.data(),
               id: doc.id,
            });
         });
         setRoutineRecs(records);
         setRoutineCount(records.length);
      });
   };
   useEffect(() => {
      setExerciseDateString(DateString(exerciseRec.exerciseDate));
      setExerciseTimeString(TimeSting(exerciseRec.exerciseDate));
      fetchRoutinesByExercise();
   }, []);

   return (
      <Pressable
         onPress={() => handleExerciseCardPressed()}
         style={{
            padding: 10,
            borderWidth: 0.2,
            borderRadius: 7,
            marginBottom: 10,
            paddingHorizontal: 15,
            backgroundColor:
               exerciseRec.status === "A"
                  ? COLORS.lightBlue01
                  : COLORS.lightGray01,
         }}
      >
         <View
            style={{
               alignItems: "flex-start",
               flexDirection: "row",
               paddingBottom: 10,
               marginBottom: 5,
               gap: 20,
               justifyContent: "space-between",
               borderBottomWidth: 0.5,
            }}
         >
            <View
               style={{
                  flexDirection: "row",
                  gap: 20,
               }}
            >
               <Text style={styles.headerLabelStyle}>{exerciseDateString}</Text>
               <Text style={styles.headerLabelStyle}>
                  {exerciseRec.locationName}
               </Text>
            </View>
            <Likes feelingCount={exerciseRec.feeling} />
         </View>
         <View style={{ gap: 10 }}>
            <View
               style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 15,
               }}
            >
               <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text style={{ fontSize: 16 }}>{exerciseTimeString}</Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                     {exerciseRec.duration === "D" ? (
                        <Text style={{ fontSize: 16 }}>
                           ({exerciseRec.duration})
                        </Text>
                     ) : (
                        <Text></Text>
                     )}
                  </View>
               </View>
               <View style={{ flexDirection: "row", gap: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                     Weight
                  </Text>
                  <Text style={{ fontSize: 16 }}>{exerciseRec.weight}</Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>lbs</Text>
               </View>
            </View>
            <View
               style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
               }}
            >
               <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Focus area
               </Text>
               <Text style={{ fontSize: 16 }}>{exerciseRec.focusArea}</Text>
            </View>
         </View>
         <View>
            <View
               style={{
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  justifyContent: "space-between",
               }}
            >
               {routineCount > 0 && (
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
                        {routineCount}
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
               )}
            </View>
            {showDetail && (
               <ScrollView
                  style={{
                     marginHorizontal: 10,
                     marginTop: 5,
                     borderWidth: 0.25,
                     borderRadius: 7,
                  }}
               >
                  {routineRecs.length > 0 ? (
                     routineRecs.map((routine, index) => (
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
                              <Text style={{ marginHorizontal: 5 }}>
                                 {index + 1}
                              </Text>
                              {routine.name ? (
                                 <Text style={{ width: 80 }}>
                                    {routine.name}
                                 </Text>
                              ) : (
                                 <Text style={{ width: 80 }}></Text>
                              )}
                              {routine.weight ? (
                                 <Text
                                    style={{ width: 50, textAlign: "right" }}
                                 >
                                    {routine.weight}lbs
                                 </Text>
                              ) : (
                                 <Text style={{ width: 50 }}></Text>
                              )}
                              {routine.reps ? (
                                 <Text
                                    style={{ width: 40, textAlign: "right" }}
                                 >
                                    {routine.reps}x
                                 </Text>
                              ) : (
                                 <Text style={{ width: 40 }}></Text>
                              )}
                           </View>
                           <Likes feelingCount={routine.feeling} />
                        </View>
                     ))
                  ) : (
                     <Text>No exercise exists</Text>
                  )}
               </ScrollView>
            )}
         </View>
      </Pressable>
   );
   //
   //       <View style={styles.exerciseCardBodyStyle}>
   //          <View style={styles.exerciseCardBodyRowStyle}>
   //             <Text style={{ fontSize: 16 }}>{exerciseTimeString}</Text>
   //             <View style={{ flexDirection: "row", gap: 5 }}>
   //                <Text style={styles.headerLabelStyle}>Weight</Text>
   //                <Text style={{ fontSize: 16 }}>{exerciseRec.weight}</Text>
   //                <Text style={styles.headerLabelStyle}>lbs</Text>
   //             </View>
   //          </View>
   //          <View
   //             style={{
   //                marginTop: 5,
   //                flexDirection: "row",
   //                alignItems: "center",
   //                gap: 15,
   //             }}
   //          >
   //             <Text style={styles.exerciseheaderLabelStyle}>Focus area</Text>
   //             <Text>{exerciseRec.focusArea}</Text>
   //          </View>
   //          <View
   //             style={{
   //                marginTop: 15,
   //                flexDirection: "row",
   //                alignItems: "center",
   //                gap: 15,
   //                justifyContent: "space-between",
   //             }}
   //          >
   //             {routineCount > 0 && (
   //                <TouchableOpacity
   //                   onPress={() => setShowDetail(!showDetail)}
   //                   style={{
   //                      width: 50,
   //                      padding: 2,
   //                      backgroundColor: COLORS.grey,
   //                      borderRadius: 15,
   //                      flexDirection: "row",
   //                      gap: 5,
   //                      alignItems: "center",
   //                      justifyContent: "center",
   //                   }}
   //                >
   //                   <Text style={{ fontSize: 16, textAlign: "center" }}>
   //                      {routineCount}
   //                   </Text>
   //                   {showDetail ? (
   //                      <Image
   //                         source={Images.upArrow}
   //                         style={{ width: 15, height: 15 }}
   //                      />
   //                   ) : (
   //                      <Image
   //                         source={Images.downArrow}
   //                         style={{ width: 15, height: 15 }}
   //                      />
   //                   )}
   //                </TouchableOpacity>
   //             )}
   //          </View>
   //       </View>
   //       <View style={styles.exerciseCardListStyle}>
   //          {showDetail && (
   //             <ScrollView
   //                style={{
   //                   marginHorizontal: 10,
   //                   marginTop: 5,
   //                   borderWidth: 0.25,
   //                   borderRadius: 7,
   //                }}
   //             >
   //                {routineRecs.length > 0 ? (
   //                   routineRecs.map((routine, index) => (
   //                      <View
   //                         key={index}
   //                         style={{
   //                            flexDirection: "row",
   //                            gap: 10,
   //                            padding: 1,
   //                            backgroundColor:
   //                               index % 2 === 0 ? COLORS.grey : null,
   //                            justifyContent: "space-between",
   //                         }}
   //                      >
   //                         <View style={{ flexDirection: "row" }}>
   //                            <Text style={{ marginHorizontal: 5 }}>
   //                               {index + 1}
   //                            </Text>
   //                            {routine.name ? (
   //                               <Text style={{ width: 80 }}>
   //                                  {routine.name}
   //                               </Text>
   //                            ) : (
   //                               <Text style={{ width: 80 }}></Text>
   //                            )}
   //                            {routine.weight ? (
   //                               <Text
   //                                  style={{ width: 50, textAlign: "right" }}
   //                               >
   //                                  {routine.weight}lbs
   //                               </Text>
   //                            ) : (
   //                               <Text style={{ width: 50 }}></Text>
   //                            )}
   //                            {routine.reps ? (
   //                               <Text
   //                                  style={{ width: 40, textAlign: "right" }}
   //                               >
   //                                  {routine.reps}x
   //                               </Text>
   //                            ) : (
   //                               <Text style={{ width: 40 }}></Text>
   //                            )}
   //                         </View>
   //                         <Likes feelingCount={routine.feeling} />
   //                      </View>
   //                   ))
   //                ) : (
   //                   <Text>No exercise exists</Text>
   //                )}
   //             </ScrollView>
   //          )}
   //       </View>
   //    </Pressable>
   // );
};

export default Exercise;

const styles = StyleSheet.create({
   newExerciseStyle: {
      borderWidth: 0.25,
      marginTop: -30,
      marginHorizontal: 30,
      borderRadius: 10,
      backgroundColor: "#f0f0f0",
   },
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