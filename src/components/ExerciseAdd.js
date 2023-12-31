import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import Input from "./controls/Input";
import Button from "./controls/Button";
import ButtonOnOff from "./controls/ButtonOnOff";
import COLORS from "../constants/COLORS";
import { auth, db } from "../data/Firebase";
import { useExerciseStore } from "../stores/ExerciseStore";
import GlobalStyle from "../styles/GlobalStyle";
import { dateFormat, dateTimeFormat, timeFormat } from "../utils/Library";

const ExerciseAdd = ({ values, setValues, setOpenAddExercise }) => {
   const navigation = useNavigation();

   const setCurrentExercise = useExerciseStore(
      (state) => state.setCurrentExercise
   );

   const [dateString, setDateString] = useState("");
   const [timeString, setTimeString] = useState("");
   const [dateTimeString, setDateTimeString] = useState("");
   const [errors, setErrors] = useState({});

   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
   };
   const handleFeelingPressed = ({ selectedValue }) => {
      setValues({ ...values, ["feeling"]: selectedValue });
   };
   const handleSaveClicked = () => {
      const colRef = collection(db, "exercise");
      addDoc(colRef, values).then((res) => {
         setValues({ ...values, ["exerciseUID"]: res.id });
         console.log("values before setCurrentExercise - ", values);
         setCurrentExercise(values);
      });
      setOpenAddExercise(false);
   };
   const handleCancelClicked = () => {
      navigation.goBack();
   };
   useEffect(() => {
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
      console.log("Values - ", values);

      setValues({
         ...values,
         ["userUID"]: auth.currentUser.uid,
         ["exerciseDate"]: Date.now(),
      });
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
               {values.userUID ? "Add New Exercise" : "Update Exercise"}
            </Text>
         </View>
         <View
            style={{
               flexDirection: "row",
               marginTop: 10,
               marginHorizontal: 10,
            }}
         >
            <Text
               style={{
                  fontSize: 18,
                  fontWeight: "bold",
               }}
            >
               Date
            </Text>
            <Text
               style={{
                  fontSize: 18,
                  marginLeft: 10,
               }}
            >
               {dateTimeString}
            </Text>
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
               keyboardType="name"
            />
            <View style={{ width: 120 }}>
               {/* https://www.youtube.com/watch?v=tN6MpJ9ElJY */}
               {/* <Dropdown
                        style={{
                           height: "auto",
                           borderColor: "gray",
                           borderWidth: 1,
                           borderRadius: 8,
                           paddingHorizontal: 8,
                           marginTop: 7,
                           marginLeft: 40,
                           width: 300,
                           justifyContent: "flex-start",
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Input"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={(item) => {
                           setValue(item.value);
                        }}
                        renderLeftIcon={() => (
                           <AntDesign
                              style={styles.icon}
                              color="black"
                              name="Safety"
                              size={20}
                           />
                        )}
                     /> */}
            </View>
            <Input
               label="Weight"
               value={values.weight}
               iconName="weight"
               iconFamily="FontAwesome5"
               error={errors.location}
               placeholder="Your body weight"
               onChangeText={(text) =>
                  handleInputs({ name: "weight", value: text })
               }
               width={225}
               keyboardType="numeric"
            />
            <ButtonOnOff setFeelings={handleFeelingPressed} />
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

export default ExerciseAdd;

const styles = StyleSheet.create({});

