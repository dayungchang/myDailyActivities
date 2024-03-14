import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Button from "../../../src/components/controls/Button";
import ButtonOnOff from "../../../src/components/controls/ButtonOnOff";
import Input from "../../../src/components/controls/Input";
import COLORS from "../../../src/constants/COLORS";
import ExerciseSchema from "../../../src/data/schemas/ExerciseSchema";
import { auth, db } from "../../../src/data/Firebase";
import { DateString, TimeSting } from "../../../src/utils/Library";

const NewExercise = ({
   setOpenNewExercise,
   newExerciseRec,
   setNewExerciseRec,
   handleSaveNewExercise,
}) => {
   // **************************************************
   const [values, setValues] = useState(newExerciseRec);
   const [errors, setErrors] = useState({});
   const [locations, setLocations] = useState([{}]);
   const [focusAreas, setFocusAreas] = useState([{}]);
   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   const [value, setValue] = useState(null);

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
      setIsFocus(false);
   };
   const handleFeelingPressed = ({ selectedValue }) => {
      setValues({ ...values, ["feeling"]: selectedValue });
   };
   // **************************************************
   const handleSaveClicked = () => {
      setNewExerciseRec(values);
      setOpenNewExercise(false);
      handleSaveNewExercise();
   };
   const handleCancelClicked = () => {
      setNewExerciseRec(ExerciseSchema);
      setOpenNewExercise(false);
   };
   // **************************************************
   const fetchLocations = () => {
      const colRef = collection(db, "setup/exercise/location");
      const qPull = query(colRef, orderBy("name"));

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ label: doc.data().label, value: doc.data().label });
         });
         setLocations(records);
      });
   };
   const fetchFocusAreas = () => {
      const colRef = collection(db, "setup/exercise/focusArea");
      const qPull = query(colRef, orderBy("name"));

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ name: doc.data().name });
         });

         setFocusAreas(records);
      });
   };
   // **************************************************
   useEffect(() => {
      // TODO: Store the last use location in the user document
      fetchLocations();
      fetchFocusAreas();
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
   const [isFocus, setIsFocus] = useState(false);

   const renderLabel = (fieldLabel) => {
      if (value || isFocus) {
         return (
            <View>
               <Text style={[styles.label, isFocus && { color: "blue" }]}>
                  {fieldLabel}
               </Text>
            </View>
         );
      }
      return null;
   };

   return (
      <View>
         {/* Header information */}
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
            {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY&t=100s */}
            <View style={styles.container}>
               {renderLabel((fieldLabel = "Location"))}
               <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={locations}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select a location" : "..."}
                  searchPlaceholder="Search..."
                  value={values.locationName}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                     handleInputs({ name: "location", value: item.value });
                     setIsFocus(false);
                  }}
               />
            </View>
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
               width={300}
               keyboardType="numeric"
            />
            {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY&t=100s */}
            <View style={styles.container}>
               {renderLabel((fieldLabel = "Focus Area"))}
               <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={focusAreas}
                  search
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? "Select a focus area" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                     handleInputs({ name: "focusArea", value: item.name });
                     setIsFocus(false);
                  }}
               />
            </View>

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
};

export default NewExercise;

const styles = StyleSheet.create({
   container: {
      backgroundColor: "white",
      padding: 5,
   },
   dropdown: {
      height: 40,
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: 300,
   },
   icon: {
      marginRight: 5,
   },
   label: {
      position: "absolute",
      backgroundColor: "white",
      top: -10,
      zIndex: 999,
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
