import {
   Alert,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import GlobalStyle from "../styles/GlobalStyle";
import COLORS from "../constants/COLORS";
import Typography from "../components/controls/Typography";
import { signOut } from "firebase/auth";
import { auth } from "../data/Firebase";

const NavBar = ({ title, backScreen }) => {
   const navigation = useNavigation();
   const _goBack = () => console.log("Went back");
   const _handleSearch = () => console.log("Searching");

   const _handleMore = () => console.log("Shown more");
   const handleMenuPressed = () => {
      if (title === "myDailyActivities") Alert.alert("Home menu pressed");
      else navigation.goBack();
   };
   const handleLogout = () => {
      signOut(auth)
         .then(() => {
            navigation.replace("Login");
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <View>
         <View style={[GlobalStyle.boarderWithShadow, styles.topBar]}>
            <TouchableOpacity onPress={handleMenuPressed}>
               {title == "myDailyActivities" ? (
                  <MaterialIcons
                     name="menu"
                     size={30}
                     color={COLORS.lightBlack}
                  />
               ) : (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <MaterialIcons
                        name="arrow-back-ios"
                        size={30}
                        color={COLORS.lightBlack}
                     />
                     <Typography
                        style={{ color: COLORS.lightBlue01, fontSize: 18 }}
                     >
                        {backScreen}
                     </Typography>
                  </View>
               )}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View
               style={[
                  styles.avatar,
                  {
                     backgroundColor: COLORS.green,
                     height: 34,
                     width: 34,
                     justifyContent: "center",
                     alignItems: "center",
                  },
               ]}
            >
               <TouchableOpacity onPress={() => handleLogout()}>
                  <Typography
                     style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: COLORS.white,
                     }}
                  >
                     DY
                  </Typography>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default NavBar;

const styles = StyleSheet.create({
   topBar: {
      backgroundColor: "#1893F8",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      marginBottom: 5,
   },
   title: { fontSize: 24, color: COLORS.white, fontWeight: "bold" },
   avatar: {
      borderRadius: 17,
   },
});

