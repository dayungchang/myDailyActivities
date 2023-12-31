import { StyleSheet, Text, View } from "react-native";

const Picker = () => {
   return (
      <View>
         <Text>Picker</Text>
      </View>
   );
};

export default Picker;

const styles = StyleSheet.create({});
// import { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { Picker as ReactPicker } from "@react-native-picker/picker";
// import GlobalStyle from "../../styles/GlobalStyle";
// import COLORS from "../../constants/COLORS";
// import ExerciseEquipment from "../../data/meta/ExerciseEquipment";
// import Button from "./Button";

// const Picker = ({ values, equipments, setValues, setOpenRoutinePicker }) => {
//    const handleSelectRotuine = () => {
//       setOpenRoutinePicker(false);
//       console.log("values.name", values.name);
//    };
//    return (
//       <View
//          style={[
//             GlobalStyle.boarderWithShadow,
//             {
//                borderWidth: 0.25,
//                margin: 50,
//                borderRadius: 10,
//                backgroundColor: "#f0f0f0",
//             },
//          ]}
//       >
//          <View
//             style={{
//                padding: 10,
//                backgroundColor: COLORS.grey,
//                borderTopLeftRadius: 10,
//                borderTopRightRadius: 10,
//             }}
//          >
//             <Text
//                style={{
//                   fontSize: 18,
//                   fontWeight: "bold",
//                   textAlign: "center",
//                }}
//             >
//                Add Routine
//             </Text>
//          </View>
//          <ReactPicker
//             selectedValue={values.name}
//             // style={{ backgroundColor: COLORS.grey }}
//             onValueChange={(itemValue, itemIndex) => {
//                console.log("itemValue", itemValue);
//                setValues({ ...values, ["name"]: itemValue });
//                // setOpenRoutinePicker(false);
//             }}
//          >
//             {equipments.map((equipment) => (
//                <ReactPicker.Item
//                   label={equipment.label}
//                   value={equipment.value}
//                />
//             ))}
//          </ReactPicker>
//          <Button
//             label="Add"
//             onPress={handleSelectRotuine}
//          />
//       </View>
//    );
// };

// export default Picker;

// const styles = StyleSheet.create({});

