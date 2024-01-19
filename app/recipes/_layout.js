import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Recipe"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Recipe" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
