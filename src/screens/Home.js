import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import Images from "../constants/Images";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/controls/NavBar";

const Home = () => {
   const navigation = useNavigation();
   const handleAppAccess = (e) => {
      const { screenName } = e;
      navigation.navigate(screenName);
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
                  screenName="myCalendarStackNavigation"
                  image={Images.calendar}
                  label="My Calendar"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="exerciseStackNavigation"
                  image={Images.exercise}
                  label="Exercises"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="medicationStackNavigation"
                  image={Images.medication}
                  label="Medications"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="recipeStackNavigation"
                  image={Images.recipe}
                  label="Recipes"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="generalHealthTopTabNavigation"
                  image={Images.generalHealth}
                  label="General Health"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="dietStackNavigation"
                  image={Images.diet}
                  label="Diet"
                  handleAppAccess={handleAppAccess}
               />
               <MenuItem
                  screenName="personalInformationStackNavigation"
                  image={Images.personalInformation}
                  label="Personal Information"
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

