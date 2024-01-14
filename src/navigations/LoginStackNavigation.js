import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import HomeStackNavigation from "./HomeStackNavigation";
import Try from "../screens/try/Try";

const LoginStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="login"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="login"
            component={Login}
         />
         <stack.Screen
            name="register"
            component={Register}
         />
         <stack.Screen
            name="HomeStackNavigation"
            component={HomeStackNavigation}
         />
         <stack.Screen
            name="Try"
            component={Try}
         />
      </stack.Navigator>
   );
};

export default LoginStackNavigation;

const styles = StyleSheet.create({});

