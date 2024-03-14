import { useState } from "react";
import {
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import COLORS from "../../constants/COLORS";
import DisplayIcon from "../DisplayIcon";

const Input = ({
   label = "",
   value,
   iconName,
   iconFamily,
   actionIconName = "",
   actionIconFamily,
   secondActionIconName = "",
   secondActionIconFamily,
   onActionClicked,
   placeholder,
   password = false,
   error,
   onChangeText,
   width,
   autoCapitalize = "none",
   keyboardType = "default",
   ...others
}) => {
   const [actionIcon, setActionIcon] = useState(actionIconName);
   const [actionFamily, setActionFamily] = useState(actionIconFamily);
   const [previousState, setPreviousState] = useState(false);
   const [hidePassword, setHidePassword] = useState(password);

   const handleActionIconClicked = () => {
      // Right icon available
      setPreviousState((prevValue) => !prevValue);
      if (password) setHidePassword((prevState) => !prevState);

      if (previousState) {
         setActionIcon(secondActionIconName);
         setActionFamily(secondActionIconFamily);
      } else {
         setActionIcon(actionIconName);
         setActionFamily(actionIconFamily);
      }
      if (onActionClicked) {
         console.log("onActionClicked");
         {
            onActionClicked();
         }

         // onActionClicked();
      }
   };
   const handleShowPasswordClicked = () => {
      setHidePassword((prevState) => !prevState);
   };
   return (
      <View
         style={{
            marginTop: 5,
            marginBottom: error ? 20 : 15,
            width: width ? width : 280,
         }}
      >
         <Text
            style={{
               fontSize: 14,
               color: COLORS.darkGrey01,
               marginBottom: 5,
            }}
         >
            {label}
         </Text>
         {/* {console.log(label, "autoCapitalize", autoCapitalize)} */}
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
                     iconName={iconName}
                     iconFamily={iconFamily}
                     password={password}
                     hidePassword={true}
                     onPress={() => handleActionIconClicked()}
                  />
               </View>
               <Text></Text>
               <TextInput
                  style={{
                     color: COLORS.black,
                     fontSize: 16,
                  }}
                  value={value}
                  placeholder={placeholder}
                  secureTextEntry={hidePassword}
                  onChangeText={onChangeText}
                  autoCapitalize={autoCapitalize}
                  keyboardType={keyboardType}
                  {...others}
               />
            </View>
            {actionIconName && (
               <TouchableOpacity
                  onPress={() => {
                     handleActionIconClicked();
                  }}
               >
                  <DisplayIcon
                     iconName={actionIcon}
                     iconFamily={actionFamily}
                  />
               </TouchableOpacity>
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

