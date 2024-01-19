import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Setup"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Setup" />
            <Stack.Screen name="SetupExercise" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
