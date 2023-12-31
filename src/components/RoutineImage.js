import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../constants/Images";

const RoutineImage = ({ imageName }) => {
   return (
      <View>
         {imageName === "Treadmill" && (
            <View style={{ justifyContent: "center", marginRight: 10 }}>
               <Image
                  source={Images.treadmill}
                  style={{ width: 50, height: 50 }}
               />
            </View>
         )}
         {imageName === "Bicep Curl" && (
            <View style={{ justifyContent: "center", marginRight: 10 }}>
               <Image
                  source={Images.bicep_curl}
                  style={{ width: 50, height: 50 }}
               />
            </View>
         )}
         {imageName === "Chest Press" && (
            <View style={{ justifyContent: "center", marginRight: 10 }}>
               <Image
                  source={Images.chest_press}
                  style={{ width: 50, height: 50 }}
               />
            </View>
         )}
      </View>
   );
};

export default RoutineImage;

const styles = StyleSheet.create({});

