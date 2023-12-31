import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Exercise from "../screens/exercises/Exercise";
import ExerciseDetail from "../screens/exercises/ExerciseDetail";

const ExerciseStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View style={{ flex: 1 }}>
         <stack.Navigator initialRouteName="Exercise">
            <stack.Screen
               name="Exercise"
               component={Exercise}
               options={{ headerShown: false }}
            />
            <stack.Screen
               name="ExerciseDetail"
               component={ExerciseDetail}
               options={{ headerShown: false }}
            />
         </stack.Navigator>
      </View>
   );
};

export default ExerciseStackNavigation;

const styles = StyleSheet.create({});

