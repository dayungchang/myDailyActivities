import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import Images from "../src/constants/Images";
import NavBar from "../src/components/controls/NavBar";
import COLORS from "../src/constants/COLORS";
import { useUserProfileStore } from "../src/stores/UserStore";

const Home = () => {
   const navigation = useNavigation();
   const userProfile = useUserProfileStore((state) => state.userProfile);
   const handleAppAccess = (e) => {
      const { screenName } = e;
      router.replace(screenName);
   };

   return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
         <NavBar
            title="myDailyActivities"
            sourceScreen="Home"
         />
         <ScrollView>
            <View>
               <MenuItem
                  screenName="\myCalendar"
                  image={Images.calendar}
                  label="My Calendar"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\exercises"
                  image={Images.exercise}
                  label="Exercises"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\medications"
                  image={Images.medication}
                  label="Medications"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\recipes"
                  image={Images.recipe}
                  label="Recipes"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\generalHealth"
                  image={Images.generalHealth}
                  label="General Health"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\diet"
                  image={Images.diet}
                  label="Diet"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\personalInformation"
                  image={Images.personalInformation}
                  label="Personal Information"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="\admin"
                  image={Images.personalInformation}
                  label="Adminstrative"
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
         backgroundColor: COLORS.lightGray01,
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

export default Home;

const styles = StyleSheet.create({
   bottom: {
      backgroundColor: "aquamarine",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
   },
   fab: {
      position: "absolute",
      right: 16,
   },
});

