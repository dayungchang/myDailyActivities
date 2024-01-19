import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout = () => {
   return (
      <>
         <Stack initialRouteName="Login">
            <Stack.Screen
               name="Login"
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name="Regisert"
               options={{ headerShown: false }}
            />
         </Stack>
      </>
   );
};

export default Layout;

const styles = StyleSheet.create({});
