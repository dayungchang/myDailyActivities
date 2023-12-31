import { Image, StyleSheet, Text, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Images from "../../constants/Images";
import COLORS from "../../constants/COLORS";
import GlobalStyle from "../../styles/GlobalStyle";

const InsuranceInformation = () => {
   return (
      <View style={{ marginTop: 45 }}>
         <View
            style={{
               flexDirection: "row",
               padding: 12,
               alignItems: "center",
               gap: 10,
            }}
         >
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <AntDesign
                  name="car"
                  size={24}
                  color="black"
               />
               <Text style={{ marginTop: 5 }}>Auto</Text>
            </View>
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Ionicons
                  name="home-outline"
                  size={24}
                  color="black"
               />
               <Text>Home</Text>
            </View>
         </View>
         <View
            style={{
               flexDirection: "row",
               padding: 12,
               alignItems: "center",
               gap: 10,
            }}
         >
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Ionicons
                  name="medical-outline"
                  size={24}
                  color="black"
               />
               <Text>Medical</Text>
            </View>
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Image
                  source={Images.dentalInsurance}
                  style={{ width: 24, height: 24 }}
               />
               <Text>Dental</Text>
            </View>
         </View>
         <View
            style={{
               flexDirection: "row",
               padding: 12,
               alignItems: "center",
               gap: 10,
            }}
         >
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Image
                  source={Images.lifeInsruance}
                  style={{ width: 24, height: 24 }}
               />
               <Text>Life</Text>
            </View>
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Image
                  source={Images.pet}
                  style={{ width: 24, height: 24 }}
               />
               <Text>Pet</Text>
            </View>
         </View>
         <View
            style={{
               flexDirection: "row",
               padding: 12,
               alignItems: "center",
               gap: 10,
            }}
         >
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Image
                  source={Images.shortTermDisability}
                  style={{ width: 24, height: 24 }}
               />
               <Text>Short Term Disability</Text>
            </View>
            <View
               style={[
                  GlobalStyle.boarderWithShadow,
                  {
                     flex: 1,
                     alignItems: "center",
                     padding: 12,
                     width: 35,
                     height: 65,
                     borderRadius: 7,
                     borderWidth: 0.5,
                  },
               ]}
            >
               <Image
                  source={Images.longTermDisability}
                  style={{ width: 24, height: 24 }}
               />
               <Text>Long Term Disability</Text>
            </View>
         </View>
      </View>
   );
};

export default InsuranceInformation;

const styles = StyleSheet.create({});
