import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NavBar from "../../components/controls/NavBar";

const Recipe = () => {
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Recipe"
            backScreen="Home"
         />
         <Text>Recipe</Text>
      </View>
   );
};

export default Recipe;

const styles = StyleSheet.create({});

