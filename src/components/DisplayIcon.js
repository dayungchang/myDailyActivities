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
   displayLocation,
   iconName,
   iconFamily,
   password,
   hidePassword,
   setHidePassword,
}) => {
   renderIcon = () => {
      switch (iconFamily) {
         case "Ionicons":
            if (displayLocation === "Left") {
               return (
                  <Ionicons
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <Ionicons
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
            break;
         case "MaterialCommunityIcons":
            if (displayLocation === "Left") {
               return (
                  <MaterialCommunityIcons
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <MaterialCommunityIcons
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
            break;
         case "MaterialIcons":
            if (displayLocation === "Left") {
               return (
                  <MaterialIcons
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <MaterialIcons
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
            break;
         case "FontAwesome5":
            if (displayLocation === "Left") {
               return (
                  <FontAwesome5
                     name={iconName}
                     style={{
                        color: COLORS.darkBlue,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <FontAwesome5
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
         case "AntDesign":
            if (displayLocation === "Left") {
               return (
                  <AntDesign
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <AntDesign
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
            break;
         case "Octicons":
            if (displayLocation === "Left") {
               return (
                  <Octicons
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <Octicons
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
            break;
         case "Fontisto":
            if (displayLocation === "Left") {
               return (
                  <Fontisto
                     name={iconName}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        justifyContent: "flex-end",
                        marginRight: 5,
                     }}
                  />
               );
            } else {
               return (
                  <Fontisto
                     onPress={() => {
                        setHidePassword(!hidePassword);
                     }}
                     name={hidePassword ? "eye-off-outline" : "eye-outline"}
                     style={{
                        color: COLORS.grey,
                        fontSize: 18,
                        marginLeft: 10,
                        justifyContent: "flex-end",
                     }}
                  />
               );
            }
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

