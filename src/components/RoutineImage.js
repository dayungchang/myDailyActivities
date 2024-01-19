import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../constants/Images";

const RoutineImage = ({ imageName }) => {
   return (
      <View style={{ justifyContent: "center", marginRight: 10 }}>
         {/* {console.log(imageName)} */}

         <Image
            source={Images[imageName]}
            style={{ width: 50, height: 50 }}
         />
      </View>
   );
};

export default RoutineImage;

const styles = StyleSheet.create({});

