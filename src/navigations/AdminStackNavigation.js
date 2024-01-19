import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "../components/controls/NavBar";
import AdminDataStackNavigation from "./AdminDataStackNavigation";
import Try from "../screens/try/Try";

const AdminStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View>
         <NavBar
            title="Administrative"
            backScreen="Home"
         />
         <stack.Navigator
            initialRouteName="admin"
            screenOptions={{ headerShown: false }}
         >
            <stack.Screen
               name="admin"
               component={AdminDataStackNavigation}
            />
            {/* <stack.Screen
               name="adminData"
               component={AdminDataStackNavigation}
            /> */}
         </stack.Navigator>
      </View>
   );
};

export default AdminStackNavigation;

const styles = StyleSheet.create({});
