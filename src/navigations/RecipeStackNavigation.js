import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "../screens/recipes/Recipe";

const RecipeStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <stack.Navigator
         initialRouteName="recipe"
         screenOptions={{ headerShown: false }}
      >
         <stack.Screen
            name="recipe"
            component={Recipe}
         />
      </stack.Navigator>
   );
};

export default RecipeStackNavigation;

const styles = StyleSheet.create({});
