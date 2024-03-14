import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../../../src/constants/Images";

const RoutineImage = ({ imageName }) => {
   return (
      <View style={{ justifyContent: "center", marginRight: 10 }}>
         {/* {console.log("imageName", imageName, Images[{ imageName }])} */}
         <View
            style={{
               justifyContent: "center",
               alignSelf: "center",
               marginRight: 10,
               width: 50,
               height: 50,
               backgroundColor: "red",
            }}
         >
            <Text>{imageName}</Text>
            {/* <RoutineImage
                  imageName={routineRec.name.replace(/\s/g, "").toLowerCase()}
               /> */}
         </View>
         {/* {imageName && (
            <Images
               source={Images[imageName]}
               style={{ width: 50, height: 50 }}
            />
         )} */}
      </View>
   );
};

export default RoutineImage;

const styles = StyleSheet.create({});

