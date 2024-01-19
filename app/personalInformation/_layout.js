import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="PersonalInformation"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="PersonalInformation" />
            <Stack.Screen name="InsuranceInformation" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
