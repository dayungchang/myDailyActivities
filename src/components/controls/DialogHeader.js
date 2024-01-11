import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/COLORS";

const DialogHeader = ({ headerTitle }) => {
   return (
      <View style={styles.dialogHeaderStyle}>
         <Text style={{ fontSize: 20, fontWeight: "700" }}>{headerTitle}</Text>
      </View>
   );
};

export default DialogHeader;

const styles = StyleSheet.create({
   dialogHeaderStyle: {
      padding: 10,
      marginTop: 50,
      backgroundColor: COLORS.grey,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: "center",
   },
});
