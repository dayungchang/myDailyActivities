import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../../constants/Images";
import NavBar from "../../components/controls/NavBar";

const PersonalInformation = () => {
   const navigation = useNavigation();
   const handleAppAccess = (e) => {
      const { screenName } = e;
      navigation.navigate(screenName);
   };

   return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
         <ScrollView>
            <View>
               <MenuItem
                  screenName="familyAndFriends"
                  image={Images.familyAndFriends}
                  label="Family and Friends"
                  handleAppAccess={handleAppAccess}
               />
            </View>
         </ScrollView>
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
            fontSize: 30,
            fontWeight: 600,
            justifyContent: "center",
            marginHorizontal: 20,
         }}
      >
         {label}
      </Text>
   </TouchableOpacity>
);

export default PersonalInformation;

const styles = StyleSheet.create({});

