import { StyleSheet, Text, View } from "react-native";
import NavBar from "../../src/components/controls/NavBar";

const GeneralHealth = () => {
   return (
      <View>
         <NavBar
            title="General Health"
            backScreen="Home"
            backScreenPath="/Home"
         />
         <View>
            <Text>GeneralHealth</Text>
         </View>
      </View>
   );
};

export default GeneralHealth;

const styles = StyleSheet.create({});

