import { StyleSheet, View } from "react-native";

const Container = ({ children, style, fullHeight }) => {
   const finalStyles = [style, styles.Container];

   if (fullHeight) {
      finalStyles.push(styles.fullHeight);
   }
   return <View style={finalStyles}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
   Container: {
      paddingHorizontal: 20,
   },
   fullHeight: {
      flex: 1,
   },
});

