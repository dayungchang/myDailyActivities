import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import Register from "../screens/login/Register";
import HomeStackNavigation from "./HomeStackNavigation";

const LoginStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="Login"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="Login"
            component={Login}
         />
         <stack.Screen
            name="Register"
            component={Register}
         />
         <stack.Screen
            name="HomeStackNavigation"
            component={HomeStackNavigation}
         />
      </stack.Navigator>
   );
};

export default LoginStackNavigation;

const styles = StyleSheet.create({});

