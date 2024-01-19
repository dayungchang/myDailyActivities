import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="FocusArea"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="FocusArea" />
            <Stack.Screen name="User" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
