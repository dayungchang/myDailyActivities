import { Text, TouchableOpacity } from "react-native";
import COLORS from "../../constants/COLORS";
import GlobalStyle from "../../styles/GlobalStyle";

const Button = ({
   label,
   width,
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
               backgroundColor: buttonColor,
               fontWeight: "bold",
               fontSize: 18,
               borderRadius: 10,
            },
         ]}
         activeOpacity={0.7}
      >
         <Text
            style={{
               color: labelColor,
               fontWeight: "bold",
               fontSize: 18,
               textAlign: "center",
               paddingVertical: 10,
            }}
         >
            {label}
         </Text>
      </TouchableOpacity>
   );
};

export default Button;

