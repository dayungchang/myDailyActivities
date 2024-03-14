import { useEffect, useState } from "react";
import {
   KeyboardAvoidingView,
   Modal,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
   addDoc,
   arrayUnion,
   collection,
   doc,
   onSnapshot,
   query,
   updateDoc,
   where,
} from "firebase/firestore";
import NavBar from "../../../../src/components/controls/NavBar";
import { db } from "../../../../src/data/Firebase";
import COLORS from "../../../../src/constants/COLORS";
import Button from "../../../../src/components/controls/Button";
import LocationSchema from "../../../../src/data/schemas/LocationSchema";
import Likes from "../../../../src/components/Likes";
import DisplayIcon from "../../../../src/components/DisplayIcon";
import GlobalStyle from "../../../../src/styles/GlobalStyle";
import DialogHeader from "../../../../src/components/controls/DialogHeader";
import Input from "../../../../src/components/controls/Input";
import DropdownList from "../../../../src/components/controls/DropdownList";
import FocusArea from "../../../../src/data/meta/FocusArea";
import {
   BottomModal,
   ModalContent,
   ModalTitle,
   SlideAnimation,
} from "react-native-modals";
import { useLocalSearchParams } from "expo-router";

const Location = () => {
   // console.log("params", params);

   const [exerciseRec, setExerciseRec] = useState({});

   const [locationRecs, setLocationRecs] = useState([{}]);
   const [openLocationModel, setOpenLocationModel] = useState(false);
   const [newLocation, setNewLocation] = useState(false);

   const handlePlusPressed = () => {
      setNewLocation(true);
      setOpenLocationModel(true);
   };
   const fetchLocations = () => {
      const colRef = collection(db, "setup/exercise/location");
      const qPull = query(colRef);

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         setLocationRecs(records);
      });
   };
   useEffect(() => {
      fetchLocations();
      // fetchSetupExercise();
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
                  {locationRecs ? (
                     locationRecs.map((location) => (
                        <View style={{ margin: 10 }}>
                           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                              {location.name}
                           </Text>
                           <Text>{location.description}</Text>
                           <Text>{location.address}</Text>
                           <Text>{location.type}</Text>
                        </View>
                     ))
                  ) : (
                     <Text>No location found!!!</Text>
                  )}

                  {/* {exerciseRec.location.map((location) => {
                  })} */}
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
                  title={newLocation ? "Location - Add" : "Location - Edit"}
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
            visible={openLocationModel}
            onTouchOutside={() => setModalVisible(!isModalVisible)}
         >
            <ModalContent style={{ width: "100%", height: 400 }}>
               <LocationMaintenance
                  setOpenLocationModel={setOpenLocationModel}
                  locations={locationRecs}
               />
            </ModalContent>
         </BottomModal>
      </View>
   );
};

const LocationMaintenance = ({ setOpenLocationModel, locations }) => {
   // const navigation = useNavigation();
   // // **************************************************
   const [values, setValues] = useState(LocationSchema);

   const [errors, setErrors] = useState({});
   const [items, setItems] = useState(FocusArea);
   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   // // **************************************************
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      console.log("fieldValue", fieldValues);

      if ("name" in fieldValues)
         temp.name = fieldValues.name ? "" : "Name of the location is required";
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
         console.log("values", values);
         console.log("items", items);
         console.log("errors", errors);
         const colRef = collection(db, "setup/exercise/location");
         addDoc(colRef, values).then((res) => {
            setOpenLocationModel(false);
         });
      }
   };
   const handleCancelClicked = () => {
      setOpenLocationModel(false);
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
               label="Location Name"
               value={values.name}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.name}
               placeholder="Name of location"
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
            <Input
               label="Address"
               value={values.address}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.address}
               placeholder="Address of location"
               onChangeText={(text) =>
                  handleInputs({ name: "address", value: text })
               }
               width={225}
               autoCapitalize="words"
            />
            <Input
               label="Type"
               value={values.type}
               iconName="location-pin"
               iconFamily="MaterialIcons"
               error={errors.type}
               placeholder="Type of location"
               onChangeText={(text) =>
                  handleInputs({ name: "type", value: text })
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

const LocationCard = ({ locationRec }) => {
   const navigation = useNavigation();

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
      if (exerciseRec.status === "A") {
         navigation.navigate("exerciseDetail", { exerciseRec: exerciseRec });
         // navigation.navigate("ExerciseDetail", {
         //    NewExercise: false,
         //    values: exerciseRec,
         //    routineRecs: routineRecs,
         // });
      } else {
         Alert.alert("Exercise Completed");
      }
   };
   useEffect(() => {
      setExerciseDateString(DateString(exerciseRec.exerciseDate));
      setExerciseTimeString(TimeSting(exerciseRec.exerciseDate));
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
               exerciseRec.status === "A" ? "white" : COLORS.lightGrey,
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
};
export default Location;

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
