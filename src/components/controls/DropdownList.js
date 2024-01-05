import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../../constants/COLORS";
import DisplayIcon from "../DisplayIcon";

const DropdownList = ({
   label = "Empty label string",
   selectedValue,
   setSelectedValue,
   items,
   setItems,
   iconName,
   iconFamily,
   placeholder,
   // error,
   onChangeValue,
   width,
   dropDownDirection,
   // ...others
}) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(selectedValue);

   const [pickerWidth, setPickerWidth] = useState(width - 20);

   return (
      <View
         style={{
            marginTop: 10,
            // marginBottom: error ? 0 : 10,
            width: width ? width : 280,
         }}
      >
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 0.5,
               // borderBottomColor: error ? COLORS.red : COLORS.darkGrey01,
               justifyContent: "space-between",
            }}
         >
            <View flexDirection="row">
               <View
                  style={{
                     width: iconName ? 30 : 0,
                     alignItems: "center",
                     justifyContent: "flex-end",
                     marginBottom: 2,
                  }}
               >
                  <DisplayIcon
                     displayLocation="Left"
                     iconName={iconName}
                     iconFamily={iconFamily}
                     password={false}
                     hidePassword={true}
                     onPress={() => {}}
                  />
               </View>
               <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{
                     width: pickerWidth,
                     height: 35,
                     borderWidth: 0,
                     backgroundColor: "rgba(52, 52, 52, 0)",
                  }}
                  placeholder={placeholder}
                  onChangeValue={setSelectedValue}
                  dropDownDirection={dropDownDirection}
               />
            </View>
         </View>
         {/* {error && (
            <Text style={{ color: COLORS.red, fontSize: 12 }}>{error}</Text>
         )} */}

         <Text
            style={{
               marginTop: -35,
               fontSize: 10,
               color: COLORS.darkGrey01,
            }}
         >
            {label}
         </Text>
      </View>
   );
};

export default DropdownList;

const styles = StyleSheet.create({});
