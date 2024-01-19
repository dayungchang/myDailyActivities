import {
   Alert,
   Image,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import { useState } from "react";
import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { Agenda } from "react-native-calendars";
import { Avatar, Card } from "react-native-paper";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import COLORS from "../../src/constants/COLORS";
import Input from "../../src/components/controls/Input";
import Button from "../../src/components/controls/Button";
import Typography from "../../src/components/controls/Typography";
import NavBar from "../../src/components/controls/NavBar";
import { ToDoEventSchema } from "../../src/data/schemas/ToDoEventSchema";
import { auth, db } from "../../src/data/Firebase";
import GlobalStyle from "../../src/styles/GlobalStyle";
import DisplayIcon from "../../src/components/DisplayIcon";

const MyCalendar = () => {
   // https://www.youtube.com/watch?v=RdaQIkE47Og
   const [selected, setSelected] = useState("");
   const items = undefined;
   const [openAddEvent, setOpenAddEvent] = useState(false);
   // Blue color - #1893F8
   const loadItems = (day) => {
      const items = items || {};
      const colRef = collection(db, "toDoEvent");
      const qPull = query(
         colRef,
         where("userUID", "==", auth.currentUser.uid),
         orderBy("dueDt")
      );
      onSnapshot(qPull, (snapshot) => {
         let records = [];
         let strTime = "";
         snapshot.docs.forEach((doc) => {
            records.push({ ...doc.data(), id: doc.id });
         });
         let j = 1;
         records.map((record) => {
            strTime = timeToString(record.dueDt.toDate());
            if (!items[strTime]) items[strTime] = [];
            items[strTime].push({
               name: record.event,
               height: Math.max(50, Math.floor(Math.random() * 150)),
               day: strTime,
            });
            j++;
         });
      });
      // for (let i = -1; i < 2; i++) {
      //    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //    const dateTime = new Date();
      //    console.log("Testing - ", dateTime.toISOString().split("T")[0]);
      //    const strTime = timeToString(time);
      //    console.log("strTime", strTime);
      //    console.log("time", time);
      //    console.log("day.timestamp", day.timestamp);

      //    if (!items[strTime]) {
      //       items[strTime] = [];

      //       const numItems = Math.floor(Math.random() * 3 + 1);
      //       for (let j = 0; j < numItems; j++) {
      //          items[strTime].push({
      //             name: "Item for " + strTime + " #" + j,
      //             height: Math.max(50, Math.floor(Math.random() * 150)),
      //             day: strTime,
      //          });
      //       }
      //    }
      // }

      const newItems = {};
      // console.log("Object.keys(items)", Object.values(items[1]));
      Object.keys(items).forEach((key) => {
         newItems[key] = items[key];
      });
      // console.log("newItems", newItems);
      // items = newItems;
   };
   // , 1000);
   // };
   const timeToString = (date) => {
      return date.toISOString().split("T")[0];
   };
   const renderItem = (item, isFirst) => {
      const fontSize = isFirst ? 16 : 14;
      const color = isFirst ? "black" : "#43515c";

      return (
         <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
            <Card>
               <Card.Content>
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <Typography style={{ fontSize, color }}>
                        {item.name}
                     </Typography>
                     <Avatar.Text
                        label="D"
                        size={30}
                     />
                  </View>
               </Card.Content>
            </Card>
         </TouchableOpacity>
      );
   };
   const renderEmptyDate = () => {
      return (
         <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
         </View>
      );
   };

   const handleAddEvent = () => {
      setOpenAddEvent(true);
   };
   return (
      <View style={{ flex: 1 }}>
         <NavBar
            title="My Calendar"
            backScreen="Home"
            backScreenPath="/Home"
         />
         <View
            style={[
               GlobalStyle.boarderWithShadow,
               { flex: 9, margin: 10, borderRadius: 7 },
            ]}
         >
            {/* <Calendar
            onDayPress={(day) => {
               setSelected(day.dateString);
            }}
            markedDates={{
               [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
               },
            }}
         /> */}

            <Agenda
               // testID={testIDs.agenda.CONTAINER}
               items={items}
               loadItemsForMonth={loadItems}
               selected={"2023-12-29"}
               renderItem={renderItem}
               renderEmptyDate={renderEmptyDate}

               // renderEmptyDate={this.renderEmptyDate}
               // rowHasChanged={this.rowHasChanged}
               // showClosingKnob={true}

               // renderItem={this.renderItem}
               // renderEmptyDate={this.renderEmptyDate}
               // rowHasChanged={this.rowHasChanged}
               // showClosingKnob={true}
            />
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
               onPress={handleAddEvent}
            >
               <DisplayIcon
                  iconName="pluscircleo"
                  iconFamily="AntDesign"
                  size={60}
                  color={COLORS.appBackground}
               />
            </TouchableOpacity>
         </View>

         <Modal
            isVisible={openAddEvent}
            // onRequestClose={() => setOpenRoutinePicker(false)}
            animationType="slideInUp"
            animationOut="slideOutDown"
            backdropColor={COLORS.white}
            coverScreen={true}
            backdropOpacity={0.8}
         >
            <AddNewEvent setOpenAddEvent={setOpenAddEvent} />
         </Modal>
      </View>
   );
};

export default MyCalendar;

const AddNewEvent = ({ setOpenAddEvent }) => {
   const [values, setValues] = useState(ToDoEventSchema);
   const [errors, setErrors] = useState({});

   const handleInputs = (e) => {
      const { name, value } = e;
      setValues({ ...values, [name]: value });
   };
   const handleSaveClicked = () => {
      // Add event by due date, repeat, repeat start date, repeat end date
      //github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-9/src/index.js
      const colRef = collection(db, "toDoEvent");
      addDoc(colRef, {
         userUID: auth.currentUser.uid,
         assignByUserUID: auth.currentUser.uid,
         assignToUserUID: auth.currentUser.uid,
         event: values.event,
         category: values.category,
         dueDt: values.dueDt,
         repeat: values.repeat,
         repeatStartDt: values.repeatStartDt,
         repeatEndDt: values.repeatEndDt,
         reminder: values.repeat,
         createDT: new Date(),
         modifiedDT: new Date(),
      }).then(() => {
         setOpenAddEvent(false);
      });
   };
   const handleCancelClicked = () => {
      // console.log("handleCancelClicked");
      setOpenAddEvent(false);
   };
   return (
      <View
         style={[
            GlobalStyle.boarderWithShadow,
            {
               borderWidth: 0.25,
               marginTop: -70,
               marginHorizontal: 30,
               borderRadius: 10,
               backgroundColor: COLORS.lightGray01,
            },
         ]}
      >
         <View
            style={{
               padding: 10,
               backgroundColor: COLORS.grey,
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,
               alignItems: "center",
            }}
         >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
               Add New Event
            </Text>
         </View>
         <View
            style={{
               marginTop: 10,
               marginHorizontal: 10,
            }}
         >
            <View style={{ marginHorizontal: 10 }}>
               <View
                  style={{
                     marginHorizontal: 10,
                     alignItems: "center",
                  }}
               >
                  <Input
                     label="Event"
                     value={values.event}
                     iconName="description"
                     iconFamily="MaterialIcons"
                     error={errors.event}
                     placeholder="Event description"
                     onChangeText={(text) =>
                        handleInputs({ name: "event", value: text })
                     }
                     width={225}
                  />
                  <Input
                     label="Event Type"
                     value={values.category}
                     iconName="category"
                     iconFamily="MaterialIcons"
                     error={errors.category}
                     placeholder="Event type"
                     onChangeText={(text) =>
                        handleInputs({ name: "category", value: text })
                     }
                     width={225}
                  />
                  <Input
                     label="Set Due Date"
                     value={values.dueDt}
                     iconName="date"
                     iconFamily="Fontisto"
                     error={errors.dueDt}
                     placeholder="Due date"
                     onChangeText={(text) =>
                        handleInputs({ name: "dueDt", value: text })
                     }
                     width={225}
                  />
                  <Input
                     label="Repeat"
                     value={values.repeat}
                     iconName="md-repeat"
                     iconFamily="Ionicons"
                     error={errors.repeat}
                     placeholder="Repeat"
                     onChangeText={(text) =>
                        handleInputs({ name: "repeat", value: text })
                     }
                     width={225}
                  />
                  <Input
                     label="Set Reminder"
                     value={values.reminder}
                     iconName="date"
                     iconFamily="Fontisto"
                     error={errors.reminder}
                     placeholder="Reminder"
                     onChangeText={(text) =>
                        handleInputs({ name: "reminder", value: text })
                     }
                     width={225}
                  />
               </View>
            </View>
         </View>
         <View
            style={{
               flexDirection: "row",
               justifyContent: "space-between",
               marginTop: 40,
            }}
         >
            <Button
               label="Cancel"
               onPress={() => handleCancelClicked()}
               buttonBlockStyle={{ flex: 2 / 5 }}
               labelStyle={{ textAlign: "center" }}
               labelColor={COLORS.black}
               buttonColor={COLORS.grey}
               width={125}
            />
            <Button
               label="Save"
               onPress={() => handleSaveClicked()}
               buttonBlockStyle={{ flex: 2 / 5 }}
               labelStyle={{ textAlign: "center" }}
               width={125}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   item: {
      backgroundColor: "white",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
   },
   emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
   },
});

