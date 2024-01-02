import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownList = (
   label = "Empty label",
   value,
   items,
   iconName,
   iconFamily,
   placeholder,
   error,
   onChangeValue,
   width,
   ...others
) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(null);
   const [items, setItems] = useState([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
   ]);

   return (
      <View
         style={{
            marginTop: 5,
            marginBottom: error ? 0 : 10,
            width: width ? width : 280,
         }}
      >
         <View
            style={{
               flexDirection: "row",
               borderBottomWidth: 0.5,
               borderBottomColor: error ? COLORS.red : COLORS.darkGrey01,
               justifyContent: "space-between",
            }}
         >
            <View flexDirection="row">
               <View style={{ width: iconName ? 30 : 0, alignItems: "center" }}>
                  <DisplayIcon
                     displayLocation="Left"
                     iconName={iconName}
                     iconFamily={iconFamily}
                     password={password}
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
                  placeholder={placeholder}
                  onChangeValue={onChangeValue}
               />
            </View>
         </View>
         {error && (
            <Text style={{ color: COLORS.red, fontSize: 12 }}>{error}</Text>
         )}

         <Text
            style={{
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
