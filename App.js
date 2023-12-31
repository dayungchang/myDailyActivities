import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginStackNavigation from "./src/navigations/LoginStackNavigation";

export default function App() {
   return (
      <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
         <NavigationContainer>
            <LoginStackNavigation />
         </NavigationContainer>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
   },
   androidSafeArea: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS === "android" ? 30 : 0,
   },
});

