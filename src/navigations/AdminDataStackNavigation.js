import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "../components/controls/NavBar";
import AdminData from "../screens/admin/AdminData";

const AdminDataStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View>
         <NavBar
            title="Data Admin"
            backScreen="Admin"
         />
         <stack.Navigator initialRouteName="data">
            <stack.Screen
               name="data"
               component={AdminData}
            />
         </stack.Navigator>
      </View>
   );
};

export default AdminDataStackNavigation;

const styles = StyleSheet.create({});
