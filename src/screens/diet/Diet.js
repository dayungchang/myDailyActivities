import { useEffect, useState } from "react";
import {
   Dimensions,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import {
   LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart,
} from "react-native-chart-kit";
import * as Progress from "react-native-progress";
import NavBar from "../../components/controls/NavBar";
import COLORS from "../../constants/COLORS";
import GlobalStyle from "../../styles/GlobalStyle";
import Data from "./Data";

const Diet = () => {
   const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
   useEffect(() => {
      const intervalId = setInterval(() => {
         setTimeSpentOnPage((prevTime) => prevTime + 1000); // increment by 1 second
      }, 1000); // every 1 second
      return () => clearInterval(intervalId); // cleanup
   }, []);

   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="Diet"
            backScreen="Home"
         />
         <View
            style={{
               height: 380,
               borderBottomRightRadius: 180,
               borderBottomLeftRadius: 180,
               alignItems: "center",
               backgroundColor: COLORS.grey,
            }}
         >
            <View style={{ marginVertical: 30 }}>
               <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  Intermitten Fasting
               </Text>
            </View>

            <Progress.Circle
               size={250}
               progress={0.85}
               thickness={25}
               strokeCap="round"
               showsText={false}
               color={COLORS.darkBlue}
               unfilledColor={COLORS.lightGrey}
               borderWidth={0}
            />
            <Text style={{ fontSize: 18, marginTop: -160 }}>
               Time Remaining
            </Text>
            <Text
               style={{
                  fontSize: 18,
                  marginTop: 10,
                  fontSize: 25,
                  color: COLORS.darkBlue,
               }}
            >
               {timeSpentOnPage}
            </Text>
         </View>
         <View
            style={[
               GlobalStyle.boarderWithShadow,
               {
                  flex: 1,
                  alignSelf: "stretch",
                  margin: 10,
                  marginBottom: 30,
                  borderRadius: 10,
               },
            ]}
         >
            <DrinkCard />
         </View>
      </View>
   );
};

const DrinkCard = () => (
   <View style={{ padding: 5, paddingTop: 10, backgroundColor: "white" }}>
      <View
         style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
         }}
      >
         <Text>Drink Card</Text>
         <TouchableOpacity
            onPress={() => {}}
            style={{
               width: 80,
               padding: 2,
               backgroundColor: COLORS.darkGrey,
               borderRadius: 15,
               flexDirection: "row",
               gap: 5,
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Text style={{ fontSize: 16, textAlign: "center" }}>+ Drink</Text>
         </TouchableOpacity>
      </View>
      <View style={{ height: 120, alignItems: "center", marginTop: 10 }}>
         <BarChart
            data={Data}
            width={320}
            height={115}
            chartConfig={{
               yAxisLabel: "oz",
               xAxisLabel: "",
               backgroundGradientFrom: COLORS.lightGrey,
               backgroundGradientFromOpacity: 1,
               backgroundGradientTo: COLORS.lightGrey,
               backgroundGradientToOpacity: 0.5,
               color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
               showBarTops: false,
            }}
            withInnerLines={false}
         />
      </View>
   </View>
);

export default Diet;

const styles = StyleSheet.create({});

