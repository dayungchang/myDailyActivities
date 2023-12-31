import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Medication from "../screens/medications/Medication";
import MedicationDetail from "../screens/medications/MedicationDetail";

const MedicationStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="medication"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="medication"
            component={Medication}
         />
         <stack.Screen
            name="medicationDetail"
            component={MedicationDetail}
         />
      </stack.Navigator>
   );
};

export default MedicationStackNavigation;

const styles = StyleSheet.create({});
