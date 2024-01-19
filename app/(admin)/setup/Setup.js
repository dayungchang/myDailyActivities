import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useRouter } from "expo-router";
import NavBar from "../../../src/components/controls/NavBar";
import Images from "../../../src/constants/Images";

const Setup = () => {
   const router = useRouter();
   const handleAppAccess = (e) => {
      const { screenName } = e;
      router?.replace(screenName);
   };
   return (
      <View>
         <NavBar
            title="App Setup"
            backScreen="Admin"
            backScreenPath="/(admin)/Admin"
         />
         <View>
            <ScrollView>
               <View>
                  <MenuItem
                     screenName="/setup/SetupExercise"
                     image={Images.exercise}
                     label="Setup Exercise"
                     handleAppAccess={handleAppAccess}
                  />
                  <MenuItem
                     screenName="/(admin)/setup"
                     image={Images.setup}
                     label="Application Setup"
                     handleAppAccess={handleAppAccess}
                  />
               </View>
            </ScrollView>
         </View>
      </View>
   );
};

const MenuItem = ({ screenName, image, label, handleAppAccess }) => (
   <TouchableOpacity
      style={{
         flexDirection: "row",
         marginTop: 20,
         marginHorizontal: 20,
         padding: 20,
         backgroundColor: "#fffff5",
         borderRadius: 8,
         alignItems: "center",
      }}
      onPress={() => {
         handleAppAccess({
            screenName: screenName,
         });
      }}
   >
      <Image
         source={image}
         style={{ width: 50, height: 50 }}
      />
      <Text
         style={{
            fontSize: 24,
            fontWeight: 600,
            justifyContent: "center",
            marginHorizontal: 20,
         }}
      >
         {label}
      </Text>
   </TouchableOpacity>
);

export default Setup;

const styles = StyleSheet.create({});
