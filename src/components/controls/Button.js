import { Image, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../constants/COLORS";
import GlobalStyle from "../../styles/GlobalStyle";

const Button = ({
   label,
   leftImage = null,
   rightImage = null,
   width,
   height = 40,
   onPress = () => {},
   labelColor = COLORS.white,
   buttonColor = COLORS.blue,
}) => {
   return (
      <TouchableOpacity
         onPress={onPress}
         style={[
            GlobalStyle.boarderWithShadow,
            {
               width: width,
               height: height,
               backgroundColor: buttonColor,
               fontWeight: "bold",
               fontSize: 18,
               borderRadius: 10,
               justifyContent: "center",
            },
         ]}
         activeOpacity={0.7}
      >
         <View
            style={{
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               marginHorizontal: 20,
            }}
         >
            {leftImage ? (
               <Image
                  source={leftImage}
                  style={{ width: 15, height: 15 }}
               />
            ) : (
               <View></View>
            )}
            <Text
               style={{
                  color: labelColor,
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
               }}
            >
               {label}
            </Text>
            {rightImage ? (
               <Image
                  source={rightImage}
                  style={{ width: 15, height: 15 }}
               />
            ) : (
               <View></View>
            )}
         </View>
      </TouchableOpacity>
   );
};

export default Button;

