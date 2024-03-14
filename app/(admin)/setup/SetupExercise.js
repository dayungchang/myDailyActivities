import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useRouter } from "expo-router";
import NavBar from "../../../src/components/controls/NavBar";
import Images from "../../../src/constants/Images";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../src/data/Firebase";
import { useEffect, useState } from "react";

const SetupExercise = () => {
   const router = useRouter();
   const [exerciseUID, setExerciseUID] = useState("");
   const [setupExercise, setSetupExercise] = useState({});
   const [locations, setLocations] = useState([]);

   const fetchSetupExercise = async () => {
      // https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "setup/exercise");
      const qPull = query(colRef);

      onSnapshot(qPull, (snapshot) => {
         let records = [];
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
            console.log("SetupExercise - doc.id: ", doc.id);

            setExerciseUID(doc.id);
            setLocations(records.location);
         });
         console.log("SetupExercise.js - records", records);
         console.log("SetupExercise.js - locations", locations);

         setSetupExercise(records);
      });
   };

   const handleAppAccess = (e) => {
      const { screenName } = e;
      console.log("Locations - SetupExercise:", locations);
      console.log("setupExercise - SetupExercise:", { setupExercise });

      router.replace({
         pathname: screenName,
         params: { exerciseUID },
      });
   };
   useEffect(() => {
      fetchSetupExercise();
   }, []);
   return (
      <View>
         <NavBar
            title="Setup Exercise"
            backScreen="Setup"
            backScreenPath="/(admin)/setup/Setup"
         />
         <View>
            <ScrollView>
               <View>
                  <MenuItem
                     screenName="/(admin)/setup/exercise/Location"
                     image={Images.location}
                     label="Location"
                     handleAppAccess={handleAppAccess}
                  />
                  <MenuItem
                     screenName="/(admin)/setup/exercise/Routine"
                     image={Images.routine}
                     label="Exercise Routine"
                     handleAppAccess={handleAppAccess}
                  />
                  <MenuItem
                     screenName="/(admin)/setup/exercise/FocusArea"
                     image={Images.FocusArea}
                     label="Focus Area"
                     handleAppAccess={handleAppAccess}
                  />
               </View>
            </ScrollView>
         </View>
      </View>
   );
};

const MenuItem = ({ screenName, image, label, handleAppAccess }) => (
   <TouchableOpacity
      style={{
         flexDirection: "row",
         marginTop: 20,
         marginHorizontal: 20,
         padding: 20,
         backgroundColor: "#fffff5",
         borderRadius: 8,
         alignItems: "center",
      }}
      onPress={() => {
         handleAppAccess({
            screenName: screenName,
         });
      }}
   >
      <Image
         source={image}
         style={{ width: 50, height: 50 }}
      />
      <Text
         style={{
            fontSize: 24,
            fontWeight: 600,
            justifyContent: "center",
            marginHorizontal: 20,
         }}
      >
         {label}
      </Text>
   </TouchableOpacity>
);

export default SetupExercise;

const styles = StyleSheet.create({});
