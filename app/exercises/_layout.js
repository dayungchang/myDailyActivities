import { StyleSheet } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack
            initialRouteName="Exercise"
            screenOptions={{ headerShown: false }}
         >
            <Stack.Screen name="Exercise" />
            <Stack.Screen name="ExerciseDetail" />
            <Stack.Screen name="RoutineSelect" />
         </Stack>
         <ModalPortal />
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
