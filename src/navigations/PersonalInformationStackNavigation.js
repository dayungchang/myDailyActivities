import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavBar from "../components/controls/NavBar";
import PersonalInformation from "../screens/personalInformation/PersonalInformation";
import InsuranceInformation from "../screens/personalInformation/InsuranceInformation";

const PersonalInformationStackNavigation = () => {
   const tab = createMaterialTopTabNavigator();
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Information"
            backScreen="Home"
         />
         <tab.Navigator initialRouteName="personalInformation">
            <tab.Screen
               name="personal"
               component={PersonalInformation}
            />
            <tab.Screen
               name="insurance"
               component={InsuranceInformation}
            />
         </tab.Navigator>
      </View>
   );
};

export default PersonalInformationStackNavigation;

const styles = StyleSheet.create({});
