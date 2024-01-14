import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalInformation from "../screens/personalInformation/PersonalInformation";
import FamilyFriends from "../screens/personalInformation/FamilyFriends";

const PersonalInformationStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="personal"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="personal"
            component={PersonalInformation}
         />
         <stack.Screen
            name="familyAndFriends"
            component={FamilyFriends}
         />
      </stack.Navigator>
   );
};

export default PersonalInformationStackNavigation;

const styles = StyleSheet.create({});
