import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import NavBar from "../../components/controls/NavBar";
import Input from "../../components/controls/Input";
import { useState } from "react";
import RecipeCategory from "../../components/RecipeCategory";
import COLORS from "../../constants/COLORS";
import { Feather } from "@expo/vector-icons";
import DisplayIcon from "../../components/DisplayIcon";

const Recipe = () => {
   const [search, setSearch] = useState("");

   const handleInputs = (e) => {
      const { value } = e;
      setSearch(value);
   };
   const handleSearch = () => {
      console.log("Searching ...", search);
   };
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Recipe"
            backScreen="Home"
         />
         <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>Recipes</Text>
         </View>
         <View
            style={{
               alignItems: "center",
               marginHorizontal: 20,
            }}
         >
            <Input
               label=""
               value={search}
               placeholder="Search for a recipe"
               actionIconName="search"
               actionIconFamily="MaterialIcons"
               secondActionIconName="search"
               secondActionIconFamily="MaterialIcons"
               onActionClicked={handleSearch}
               onChangeText={(text) => handleInputs({ value: text })}
               width={hp("50%")}
            />
         </View>
         <View>
            <RecipeCategory />
         </View>
         <View style={{ flex: 1 }}>
            <Text>Recipes</Text>
         </View>
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
               // onPress={() => handleAddMedication()}
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

export default Recipe;

const styles = StyleSheet.create({});

