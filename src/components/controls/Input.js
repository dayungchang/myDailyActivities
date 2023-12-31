import { StyleSheet, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFA from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import AuthSchema from "../../data/schemas/AuthSchema";
import COLORS from "../../constants/COLORS";
import DisplayIcon from "../DisplayIcon";

const Input = ({
   label = "Empty label",
   value,
   iconName,
   iconFamily,
   placeholder,
   password = false,
   error,
   onChangeText,
   width,
   ...others
}) => {
   const [values, setValues] = useState(AuthSchema);
   const [hidePassword, setHidePassword] = useState(password);
   return (
      <View
         style={{
            marginTop: 5,
            marginBottom: error ? 0 : 10,
            width: width ? width : 280,
         }}
      >
         <Text
            style={{
               fontSize: 10,
               color: COLORS.darkGrey01,
            }}
         >
            {label}
         </Text>
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 0.5,
               borderBottomColor: error ? COLORS.red : COLORS.darkGrey01,
               justifyContent: "space-between",
            }}
         >
            <View flexDirection="row">
               <View style={{ width: iconName ? 30 : 0, alignItems: "center" }}>
                  <DisplayIcon
                     displayLocation="Left"
                     iconName={iconName}
                     iconFamily={iconFamily}
                     password={password}
                     hidePassword={true}
                     onPress={() => {}}
                  />
               </View>
               <TextInput
                  style={{
                     color: COLORS.black,
                     fontSize: 16,
                  }}
                  value={value}
                  placeholder={placeholder}
                  secureTextEntry={hidePassword}
                  onChangeText={onChangeText}
                  {...others}
                  // keyboardType='phone-pad'
               />
            </View>
            {password && (
               <DisplayIcon
                  displayLocation="Right"
                  iconFamily={iconFamily}
                  password={password}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
               />
            )}
         </View>
         {error && (
            <Text style={{ color: COLORS.red, fontSize: 12 }}>{error}</Text>
         )}
      </View>
   );
};

export default Input;

const styles = StyleSheet.create({});

