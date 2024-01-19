import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../src/constants/COLORS";
import DisplayIcon from "../../src/components/DisplayIcon";
import { useState } from "react";

const FamilyFriends = () => {
   const [openNewFamilyAndFriends, setOpenNewFamilyAndFriends] =
      useState(false);

   const handlePlusIconPressed = () => {
      setOpenNewExercise(true);
   };
   return (
      <View style={{ flex: 1 }}>
         <Text>Family and Friends</Text>
         <View
            style={{
               position: "absolute",
               right: 0,
               bottom: 20,
               alignItems: "flex-end",
            }}
         >
            <TouchableOpacity
               style={{
                  marginRight: 30,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.lightBlue01,
                  borderRadius: 30,
               }}
               onPress={handlePlusIconPressed}
            >
               <DisplayIcon
                  iconName="pluscircleo"
                  iconFamily="AntDesign"
                  size={60}
                  color={COLORS.appBackground}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default FamilyFriends;

const styles = StyleSheet.create({});
