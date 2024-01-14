import { ScrollView, StyleSheet, Text, View } from "react-native";

const RecipeCategory = () => {
   return (
      <View>
         <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
         >
            <Text>RecipeCategory</Text>
            <Text>RecipeCategory</Text>
            <Text>RecipeCategory</Text>
            <Text>RecipeCategory</Text>
            <Text>RecipeCategory</Text>
            <Text>RecipeCategory</Text>
         </ScrollView>
      </View>
   );
};

export default RecipeCategory;

const styles = StyleSheet.create({});
