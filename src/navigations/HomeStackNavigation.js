import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ExerciseStackNavigation from "./ExerciseStackNavigation";
import MedicationStackNavigation from "./MedicationStackNavigation";

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
         <stack.Screen
            name="medicationStackNavigation"
            component={MedicationStackNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Medications",
            })}
         />
      </stack.Navigator>
   );
};

export default HomeStackNavigation;

const styles = StyleSheet.create({});

