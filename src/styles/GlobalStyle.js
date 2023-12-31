import { StyleSheet } from "react-native";

const GlobalStyle = StyleSheet.create({
   boarderWithShadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,
      elevation: 5,
   },
});

export default GlobalStyle;
