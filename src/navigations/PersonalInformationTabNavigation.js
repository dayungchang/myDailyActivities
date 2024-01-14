import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalInformationStackNavigation from "./PersonalInformationStackNavigation";
import NavBar from "../components/controls/NavBar";
import InsuranceInformation from "../screens/personalInformation/InsuranceInformation";
import PersonalInformation from "../screens/personalInformation/PersonalInformation";

const PersonalInformationTabNavigation = () => {
   const tab = createMaterialTopTabNavigator();
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Information"
            backScreen="Home"
         />
         {console.log("I am in Personal Information Tab Navigation")}

         <tab.Navigator initialRouteName="personalInformation">
            <tab.Screen
               name="personalInformation"
               component={PersonalInformationStackNavigation}
            />
            <tab.Screen
               name="insurance"
               component={InsuranceInformation}
            />
         </tab.Navigator>
      </View>
   );
};

export default PersonalInformationTabNavigation;

const styles = StyleSheet.create({});
