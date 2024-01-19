import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Medication"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Medication" />
            <Stack.Screen name="MedicationDetail" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
