import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavBar from "../components/NavBar";
import GeneralHealth from "../screens/generalHealth/GeneralHealth";
import BloodPressure from "../screens/generalHealth/BloodPressure";
import Step from "../screens/generalHealth/Step";
import Weight from "../screens/generalHealth/Weight";

const GeneralHealthTopTabNavigation = () => {
   const tab = createMaterialTopTabNavigator();
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="General Health"
            backScreen="Home"
         />
         <tab.Navigator initialRouteName="generalHealth">
            <tab.Screen
               name="generalHealth"
               component={GeneralHealth}
            />
            <tab.Screen
               name="weight"
               component={Weight}
            />
            <tab.Screen
               name="bloodPressure"
               component={BloodPressure}
            />
            <tab.Screen
               name="step"
               component={Step}
            />
         </tab.Navigator>
      </View>
   );
};

export default GeneralHealthTopTabNavigation;

const styles = StyleSheet.create({});
