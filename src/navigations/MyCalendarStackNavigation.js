import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCalendar from "../screens/calendar/MyCalendar";

const MyCalendarStackNavigation = () => {
   const stack = createNativeStackNavigator();
   return (
      <View style={{ flex: 1 }}>
         <stack.Navigator
            initialRouteName="myCalendar"
            screenOptions={{ headerShown: false }}
         >
            <stack.Screen
               name="myCalendar"
               component={MyCalendar}
            />
         </stack.Navigator>
      </View>
   );
};

export default MyCalendarStackNavigation;

const styles = StyleSheet.create({});
