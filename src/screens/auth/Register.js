import {
   Image,
   KeyboardAvoidingView,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../../constants/Images";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import { useState } from "react";
import AuthSchema from "../../data/schemas/AuthSchema";

const Register = () => {
   const navigation = useNavigation();

   const [values, setValues] = useState(AuthSchema);
   const [errors, setErrors] = useState({});
   const [validateOnChange, setValidateOnChange] = useState(true);

   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
      if (
         validateOnChange &&
         name !== "confirmPassword" &&
         name !== "passwordassword"
      )
         validate({ [name]: value });
   };
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ("name" in fieldValues)
         temp.name = fieldValues.name ? "" : "Name is required";
      if ("eMail" in fieldValues)
         temp.eMail = /$^|.+@.+..+/.test(fieldValues.eMail)
            ? ""
            : "Email is not valid.";
      if ("phone" in fieldValues)
         temp.phone =
            fieldValues.phone.length > 9 ? "" : "Minimum 10 numbers required.";
      if ("password" in fieldValues)
         temp.password =
            fieldValues.password.length < 8
               ? ""
               : "Minimum 8 characters required.";
      if ("confirmPassword" in fieldValues)
         temp.confirmPassword =
            fieldValues.confirmPassword === fieldValues.password
               ? ""
               : "Passwords missed match.";
      setErrors({ ...temp });
      if (fieldValues === values)
         return Object.values(temp).every((x) => x === "");
   };
   const handleLoginPressed = () => {
      navigation.goBack();
   };
   const handleRegisterPressed = () => {};
   return (
      <View style={{ alignItems: "center" }}>
         <View style={{ alignItems: "center", margin: 20 }}>
            <Image
               source={Images.myDailyActivities}
               style={{ height: 150, width: 150 }}
            />
         </View>
         {/* Header */}
         <Text
            style={{
               fontSize: 30,
               fontWeight: 600,
               color: "#3333ff",
            }}
         >
            myDailyActivities
         </Text>
         <Text
            style={{
               marginTop: 4,
               fontSize: 18,
            }}
         >
            Create your account
         </Text>
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
            <ScrollView
               contentContainerStyle={{ paddingBottom: 60 }}
               contentInset={{ bottom: 0 }}
            >
               <View style={{ marginTop: 20, alignItems: "center" }}>
                  <Input
                     label="Name"
                     value={values.name}
                     iconName="account-outline"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.name}
                     placeholder="Name"
                     onChangeText={(text) =>
                        handleInputs({ name: "name", value: text })
                     }
                     width={280}
                  />
                  <Input
                     label="eMail"
                     value={values.eMail}
                     iconName="email-outline"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.eMail}
                     placeholder="eMail"
                     onChangeText={(text) =>
                        handleInputs({ name: "eMail", value: text })
                     }
                     keyboardType="email-address"
                  />
                  <Input
                     label="Phone"
                     value={values.phone}
                     iconName="phone-outline"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.phone}
                     placeholder="Phone"
                     onChangeText={(text) =>
                        handleInputs({ name: "phone", value: text })
                     }
                     width={280}
                     keyboardType="phone-pad"
                  />
                  <Input
                     label="Password"
                     value={values.password}
                     iconName="lock-outline"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.password}
                     password={true}
                     placeholder="Password"
                     onChangeText={(text) =>
                        handleInputs({ name: "password", value: text })
                     }
                     width={280}
                  />
                  <Input
                     label="Confirm Password"
                     value={values.confirmPassword}
                     iconName="lock-outline"
                     iconFamily="MaterialCommunityIcons"
                     error={errors.confirmPassword}
                     password={true}
                     placeholder="Confirm Password"
                     onChangeText={(text) =>
                        handleInputs({ name: "confirmPassword", value: text })
                     }
                     width={280}
                  />
               </View>
               <View style={{ marginTop: 30, alignItems: "center" }}>
                  <Button
                     label="Register"
                     onPress={handleRegisterPressed}
                     width={200}
                  />
                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                     <Text>Already have an account? </Text>
                     <TouchableOpacity onPress={handleLoginPressed}>
                        <Text>Login</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </View>
   );
};

export default Register;

const styles = StyleSheet.create({});

