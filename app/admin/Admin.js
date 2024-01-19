import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../../src/constants/Images";
import NavBar from "../../src/components/controls/NavBar";
import { useRouter } from "expo-router";

const Admin = () => {
   const router = useRouter();
   const handleAppAccess = (e) => {
      const { screenName } = e;
      router?.replace(screenName);
   };
   return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
         <NavBar
            title="Administration"
            backScreen="Home"
            backScreenPath="/Home"
         />
         <View>
            <ScrollView>
               <View>
                  <MenuItem
                     screenName="/admin/data"
                     image={Images.familyAndFriends}
                     label="Data Management"
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

export default Admin;

const styles = StyleSheet.create({});
