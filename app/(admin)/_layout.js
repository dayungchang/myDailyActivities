import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Admin"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Admin" />
            <Stack.Screen name="AdminData" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
