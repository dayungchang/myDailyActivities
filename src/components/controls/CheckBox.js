import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const Checkbox = () => {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);

   return (
      <CheckBox
         disabled={false}
         value={toggleCheckBox}
         onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
   );
};

export default Checkbox;

const styles = StyleSheet.create({});
