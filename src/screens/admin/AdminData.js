import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../components/controls/NavBar";

const AdminData = () => {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
         }}
      >
         <NavBar title="where an i - adminData" />

         <Text>AdminData</Text>
      </View>
   );
};

export default AdminData;

const styles = StyleSheet.create({});
