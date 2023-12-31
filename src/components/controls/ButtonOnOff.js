import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../constants/COLORS";

const ButtonOnOff = ({ setFeelings }) => {
   const [clickCount, setClickCount] = useState(0);

   const handleLikeClicked = ({ likeCount }) => {
      console.log("Like Count - ", likeCount);
      if (likeCount === 1 && clickCount > 0) {
         setClickCount(0);
         setFeelings(0);
      } else {
         setClickCount(likeCount);
         setFeelings({ selectedValue: likeCount });
      }
   };
   return (
      <View style={{ flexDirection: "row", marginTop: 10 }}>
         <AntDesign
            onPress={() => handleLikeClicked({ likeCount: 1 })}
            name={clickCount >= 1 ? "star" : "staro"}
            style={{
               color: COLORS.yellow,
               fontSize: 18,
               marginLeft: 10,
               justifyContent: "flex-end",
            }}
         />

         <AntDesign
            onPress={() => handleLikeClicked({ likeCount: 2 })}
            name={clickCount >= 2 ? "star" : "staro"}
            style={{
               color: COLORS.yellow,
               fontSize: 18,
               marginLeft: 10,
               justifyContent: "flex-end",
            }}
         />
         <AntDesign
            onPress={() => handleLikeClicked({ likeCount: 3 })}
            name={clickCount >= 3 ? "star" : "staro"}
            style={{
               color: COLORS.yellow,
               fontSize: 18,
               marginLeft: 10,
               justifyContent: "flex-end",
            }}
         />
         <AntDesign
            onPress={() => handleLikeClicked({ likeCount: 4 })}
            name={clickCount >= 4 ? "star" : "staro"}
            style={{
               color: COLORS.yellow,
               fontSize: 18,
               marginLeft: 10,
               justifyContent: "flex-end",
            }}
         />
         <AntDesign
            onPress={() => handleLikeClicked({ likeCount: 5 })}
            name={clickCount >= 5 ? "star" : "staro"}
            style={{
               color: COLORS.yellow,
               fontSize: 18,
               marginLeft: 10,
               justifyContent: "flex-end",
            }}
         />
      </View>
   );
};

export default ButtonOnOff;

const styles = StyleSheet.create({});

