import { StyleSheet, View } from "react-native";

const Spacing = ({ variant = "1" }) => {
   return <View style={styles[variant]} />;
};

export default Spacing;

const styles = StyleSheet.create({
   1: {
      marginVertical: 5,
   },
   2: {
      marginVertical: 10,
   },
   3: {
      marginVertical: 15,
   },
});

