import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import COLORS from "../constants/COLORS";

const DisplayIcon = ({
   iconName,
   iconFamily,
   size = 24,
   color = COLORS.grey,
}) => {
   renderIcon = () => {
      switch (iconFamily) {
         case "AntDesign":
            return (
               <AntDesign
                  name={iconName}
                  style={{
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
                  color={color}
               />
            );
            break;
         case "FontAwesome5":
            return (
               <FontAwesome5
                  name={iconName}
                  style={{
                     color: COLORS.darkBlue,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         case "Fontisto":
            return (
               <Fontisto
                  name={iconName}
                  style={{
                     color: COLORS.grey,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         case "Ionicons":
            return (
               <Ionicons
                  name={iconName}
                  style={{
                     color: COLORS.grey,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         case "MaterialCommunityIcons":
            return (
               <MaterialCommunityIcons
                  name={iconName}
                  style={{
                     color: COLORS.grey,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         case "MaterialIcons":
            return (
               <MaterialIcons
                  name={iconName}
                  style={{
                     color: COLORS.grey,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         case "Octicons":
            return (
               <Octicons
                  name={iconName}
                  style={{
                     color: COLORS.grey,
                     fontSize: 18,
                     justifyContent: "flex-end",
                     marginRight: 5,
                  }}
                  size={size}
               />
            );
            break;
         default:
            return <></>;
            break;
      }
   };
   return renderIcon();
};

export default DisplayIcon;

const styles = StyleSheet.create({});

