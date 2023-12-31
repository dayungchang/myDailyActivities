import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Home from "../screens/Home";
import ExerciseStackNavigation from "./ExerciseStackNavigation";

const HomeStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="home"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="home"
            component={Home}
         />
         <stack.Screen
            name="ExerciseStackNavigation"
            component={ExerciseStackNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Exercises",
            })}
         />
      </stack.Navigator>
   );
};

export default HomeStackNavigation;

const styles = StyleSheet.create({});

