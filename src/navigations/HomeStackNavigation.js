import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MyCalendarStackNavigation from "./MyCalendarStackNavigation";
import ExerciseStackNavigation from "./ExerciseStackNavigation";
import MedicationStackNavigation from "./MedicationStackNavigation";
import RecipeStackNavigation from "./RecipeStackNavigation";
import GeneralHealthTopTabNavigation from "./GeneralHealthTopTabNavigation";
import DietStackNavigation from "./DietStackNavigation";
import PersonalInformationTabNavigation from "./PersonalInformationTabNavigation";

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
            name="myCalendarStackNavigation"
            component={MyCalendarStackNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Exercises",
            })}
         />
         <stack.Screen
            name="exerciseStackNavigation"
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
         <stack.Screen
            name="recipeStackNavigation"
            component={RecipeStackNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Medications",
            })}
         />
         <stack.Screen
            name="generalHealthTopTabNavigation"
            component={GeneralHealthTopTabNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Medications",
            })}
         />
         <stack.Screen
            name="dietStackNavigation"
            component={DietStackNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Medications",
            })}
         />
         <stack.Screen
            name="personalInformationTabNavigation"
            component={PersonalInformationTabNavigation}
            options={({ navigationBarColor, route }) => ({
               headerBackTitle: "Home",
               headerBackTitleStyle: { fontSize: 15 },
               title: "Information",
            })}
         />
      </stack.Navigator>
   );
};

export default HomeStackNavigation;

const styles = StyleSheet.create({});

