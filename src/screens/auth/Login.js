import { useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../data/Firebase";
import Images from "../../constants/Images";
import Input from "../../components/controls/Input";
import Button from "../../components/controls/Button";
import DropdownList from "../../components/controls/DropdownList";

const loginInitialValues = {
   // eMail: "",
   // password: "",
   eMail: `${process.env.EXPO_PUBLIC_FirebaseEmail}`,
   password: `${process.env.EXPO_PUBLIC_FirebasePassword}`,
   test: "",
};

const Login = () => {
   const navigation = useNavigation();

   const [values, setValues] = useState(loginInitialValues);
   const [errors, setErrors] = useState({});
   const [validateOnChange, setValidateOnChange] = useState(true);

   const [value, setValue] = useState("");
   const [items, setItems] = useState([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
      { label: "Grape", value: "grape" },
      { label: "Pineapple", value: "pineapple" },
   ]);
   const setSelectedValue = (e) => {
      console.log("e", e);
   };

   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
      console.log("values", values);
      console.log("e", e);
      if (validateOnChange && name !== "password") validate({ [name]: value });
   };
   const validate = (fieldValues = values) => {
      let temp = { ...errors };
      if ("eMail" in fieldValues)
         temp.eMail = /$^|.+@.+..+/.test(fieldValues.eMail)
            ? ""
            : "Email is not valid.";
      if ("password" in fieldValues)
         temp.password =
            fieldValues.password.length >= 8
               ? ""
               : `Minimum 8 characters required. ${fieldValues.password.length}`;
      setErrors({ ...temp });
      if (fieldValues === values)
         return Object.values(temp).every((x) => x === "");
   };
   const handleRegisterPressed = () => {
      navigation.navigate("Register");
   };
   const handleLoginPressed = async () => {
      console.log("handleLoginPressed");
      if (validate()) {
         await signInWithEmailAndPassword(auth, values.eMail, values.password)
            .then((userCredential) => {
               navigation.replace("HomeStackNavigation");
            })
            .catch((error) => console.log(error));
      }
   };
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
            Sign into your account
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
            <View style={{ marginTop: 50, alignItems: "center" }}>
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
                  width={280}
                  keyboardType="email-address"
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
                  keyboardType="email-address"
               />
               <DropdownList
                  label="Empty label"
                  selectedValue={values.test}
                  setSelectedValue={(value) =>
                     setValues({ ...values, test: value })
                  }
                  items={items}
                  setItems={setItems}
                  iconName="lock-outline"
                  iconFamily="MaterialCommunityIcons"
                  placeholder="Testing try out 1"
                  // error={errors.test}
                  onChangeValue={(value) =>
                     handleInputs({ name: "test", value: value })
                  }
                  width={280}
               />
            </View>
            <View style={{ marginTop: 50, alignItems: "center" }}>
               <Button
                  label="Login"
                  onPress={handleLoginPressed}
                  width={200}
               />
               <View style={{ marginTop: 10, flexDirection: "row" }}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity onPress={handleRegisterPressed}>
                     <Text>Register</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </KeyboardAvoidingView>
      </View>
   );
};

export default Login;

const styles = StyleSheet.create({});
