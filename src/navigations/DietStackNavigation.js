import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diet from "../screens/diet/Diet";

const DietStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View style={{ flex: 1 }}>
         <stack.Navigator
            initialRouteName="diet"
            screenOptions={{ headerShown: false }}
         >
            <stack.Screen
               name="diet"
               component={Diet}
            />
         </stack.Navigator>
      </View>
   );
};

export default DietStackNavigation;

const styles = StyleSheet.create({});
