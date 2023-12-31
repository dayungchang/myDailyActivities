import { StyleSheet, Text } from "react-native";

const Typography = ({ children, style, variant = "body" }) => {
   return (
      <Text style={[styles[variant], styles.common, style]}>{children}</Text>
   );
};

export default Typography;

const styles = StyleSheet.create({
   header: {
      fontSize: 26,
      fontWeight: "bold",
   },
   body: {
      fontSize: 16,
   },
   subheader: {
      fontSize: 22,
      textTransform: "uppercase",
   },
   common: {
      // fontFamily: "Roboto",
   },
});

