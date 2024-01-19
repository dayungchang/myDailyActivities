import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Location"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Location" />
            <Stack.Screen name="Routine" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
