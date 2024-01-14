import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../data/Firebase";
import Button from "../../components/controls/Button";
import Input from "../../components/controls/Input";
import NavBar from "../../components/controls/NavBar";

const MedicationDetail = () => {
   const navigation = useNavigation();
   const route = useRoute();

   const [values, setValues] = useState({
      ...route.params.record,
      ["userUID"]: auth.currentUser.uid,
   });
   const [errors, setErrors] = useState({});
   const [validateOnChange, setValidateOnChange] = useState(true);
   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
      if (validateOnChange) validate({ [name]: value });
   };
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ("medication" in fieldValues)
         temp.medication = fieldValues.medication
            ? ""
            : "Name of medication is required";

      setErrors({ ...temp });
      if (fieldValues === values)
         return Object.values(temp).every((x) => x === "");
   };
   const handleCancelButtonPressed = () => {
      navigation.goBack();
   };
   const handleSaveButtonPressed = async () => {
      if (validate()) {
         if (values.id) {
            //stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
            // console.log(
            //    "MedicationDetial - handleSaveButtonPressed - ID Exists"
            // );
            https: await updateDoc(doc(db, "medication", values.id), values);
         } else {
            // console.log(
            //    "MedicationDetial - handleSaveButtonPressed - New medication"
            // );
            const colRef = collection(db, "medication");
            addDoc(colRef, values).then(() => {
               navigation.goBack();
            });
         }
      }
   };
   return (
      <View>
         <NavBar
            title="Detail"
            backScreen="Medication"
         />
         {/* Input Container */}
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{
               height: "100%",
               width: "100%",
               background: "#fff",
            }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
         >
            <View style={{ marginTop: 30, alignItems: "center" }}>
               <Input
                  label="Medication"
                  value={values.medication}
                  error={errors.medication}
                  placeholder="Name of medication"
                  onChangeText={(text) =>
                     handleInputs({ name: "medication", value: text })
                  }
                  width={280}
                  autoCapitalize={"words"}
                  autoCorrect={false}
               />
               <Input
                  label="Instruction"
                  value={values.instruction}
                  error={errors.instruction}
                  placeholder="Provided instruction"
                  onChangeText={(text) =>
                     handleInputs({ name: "instruction", value: text })
                  }
                  width={280}
               />
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     gap: 10,
                     width: 280,
                  }}
               >
                  <Input
                     label="Count"
                     value={values.howMany}
                     error={errors.howMany}
                     placeholder="Count"
                     onChangeText={(text) =>
                        handleInputs({ name: "howMany", value: text })
                     }
                     width={30}
                  />
                  <View
                     style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                     }}
                  >
                     {/* Amount of medication you take at one time. */}
                     <Input
                        label="Dose"
                        value={values.strength}
                        error={errors.strength}
                        placeholder="Dose "
                        onChangeText={(text) =>
                           handleInputs({ name: "strength", value: text })
                        }
                        width={50}
                     />
                     <Text style={{ marginLeft: 3, fontWeight: "bold" }}>
                        mg
                     </Text>
                  </View>
                  <Input
                     label="Frequency"
                     value={values.howOften}
                     error={errors.howOften}
                     placeholder="Frequency"
                     onChangeText={(text) =>
                        handleInputs({ name: "howOften", value: text })
                     }
                     width={55}
                  />
                  <Input
                     label="How"
                     value={values.route}
                     error={errors.route}
                     placeholder="How"
                     onChangeText={(text) =>
                        handleInputs({ name: "route", value: text })
                     }
                     width={80}
                  />
               </View>
               <Input
                  label="Pharmacy"
                  value={values.pharmacy}
                  error={errors.pharmacy}
                  placeholder="Pharmacy"
                  onChangeText={(text) =>
                     handleInputs({ name: "pharmacy", value: text })
                  }
                  width={280}
               />
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     gap: 20,
                  }}
               >
                  <Input
                     label="Rx ID"
                     value={values.rxID}
                     error={errors.rxID}
                     placeholder="rxID"
                     onChangeText={(text) =>
                        handleInputs({ name: "rxID", value: text })
                     }
                     width={160}
                  />
                  <Input
                     label="Dispensed Date"
                     value={values.dispensedDt}
                     error={errors.dispensedDt}
                     placeholder="Date"
                     onChangeText={(text) =>
                        handleInputs({ name: "dispensedDt", value: text })
                     }
                     width={100}
                  />
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     width: 280,
                  }}
               >
                  <Input
                     label="Status"
                     value={values.status}
                     error={errors.status}
                     placeholder="Status"
                     onChangeText={(text) =>
                        handleInputs({ name: "status", value: text })
                     }
                     width={70}
                  />
                  <View
                     style={{
                        marginLeft: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                     }}
                  >
                     <Input
                        label="Refill #"
                        value={values.refills}
                        error={errors.refills}
                        placeholder="Refill #"
                        onChangeText={(text) =>
                           handleInputs({ name: "refills", value: text })
                        }
                        width={40}
                     />
                     <Text style={{ fontWeight: "bold" }}>by</Text>
                     <Input
                        label="Refill by"
                        value={values.refillByDt}
                        error={errors.refillByDt}
                        placeholder="Refill by date"
                        onChangeText={(text) =>
                           handleInputs({ name: "refillByDt", value: text })
                        }
                        width={100}
                     />
                  </View>
               </View>
               <Input
                  label="Doctor's name"
                  value={values.doctor}
                  error={errors.doctor}
                  placeholder="Doctor's name"
                  onChangeText={(text) =>
                     handleInputs({ name: "doctor", value: text })
                  }
                  width={280}
               />
               <Input
                  label="For treatment of"
                  value={values.problem}
                  error={errors.problem}
                  placeholder="Medical Problem"
                  onChangeText={(text) =>
                     handleInputs({ name: "problem", value: text })
                  }
                  width={280}
               />
               <Input
                  label="Prescribed Date"
                  value={values.writtenDt}
                  error={errors.writtenDt}
                  placeholder="Prescribed Date"
                  onChangeText={(text) =>
                     handleInputs({ name: "writtenDt", value: text })
                  }
                  width={280}
               />
               {/* : "", : "", effDt: "", endDt: "", : "",
               : "", : "", : "", : "", :
               "", : "", notes: "", patient: "", : "",
               : "", : "", : "", : "", : "",
               status: "", : "", userUID: "", : "", */}
            </View>
            <View
               style={{
                  flexDirection: "row",
                  margin: 50,
                  alignItems: "center",
                  gap: 20,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Button
                  label="Cancel"
                  onPress={handleCancelButtonPressed}
                  width={150}
               />
               <Button
                  label="Save"
                  onPress={handleSaveButtonPressed}
                  width={150}
               />
            </View>
         </KeyboardAvoidingView>
      </View>
   );
};

export default MedicationDetail;

const styles = StyleSheet.create({});

