import { Image, StyleSheet, Text, View } from "react-native";
import Images from "../constants/Images";
import COLORS from "../constants/COLORS";

const Likes = ({ feelingCount }) => {
   const dataArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
   return (
      <View style={{ flexDirection: "row" }}>
         {dataArray.map(
            (item, index) =>
               feelingCount > index && (
                  <View
                     key={index}
                     style={{
                        justifyContent: "center",
                        marginRight: 1,
                     }}
                  >
                     <Image
                        source={Images.star}
                        style={{ width: 15, height: 15, color: COLORS.yellow }}
                     />
                  </View>
               )
         )}
      </View>
   );
};

export default Likes;

const styles = StyleSheet.create({});

