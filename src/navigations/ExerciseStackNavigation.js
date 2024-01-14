import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Exercise from "../screens/exercises/Exercise";
import ExerciseDetail from "../screens/exercises/ExerciseDetail";
import RoutineSelect from "../screens/exercises/RoutineSelect";

const ExerciseStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View style={{ flex: 1 }}>
         <stack.Navigator initialRouteName="exercise">
            <stack.Screen
               name="exercise"
               component={Exercise}
               options={{ headerShown: false }}
            />
            <stack.Screen
               name="exerciseDetail"
               component={ExerciseDetail}
               options={{ headerShown: false }}
            />
            <stack.Screen
               name="routineSelect"
               component={RoutineSelect}
               options={{ headerShown: false }}
            />
         </stack.Navigator>
      </View>
   );
};

export default ExerciseStackNavigation;

const styles = StyleSheet.create({});
