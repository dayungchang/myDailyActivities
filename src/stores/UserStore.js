import { collection, onSnapshot, query, where } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../data/Firebase";
import { getUserInfo } from "../data/database/User";

export const useUserProfileStore = create((set) => ({
   userProfile: {},
   isLoading: false,
   error: null,
   getUserInfo: async (userUID) => {
      console.log("userUID", userUID);
      try {
         set({ isLoading: true });
         const userInfo = await getUserInfo(userUID);
         set({ isLoading: false, userProfile: userInfo });
      } catch (err) {
         set({ error: err.message, isLoading: false });
         console.log("error", err.message);
      }
   },
   setUserInfo: async (userUID) => {
      console.log("userUID", userUID);
      try {
         set({ isLoading: true });
         const userProfileRec = await getUserProfileRec();
      } catch (err) {
         set({ error: err.message, isLoading: false });
      }
      // Fetch user profile information and store in state

      //  const colRef = collection(db, "user");
      //  const qPull = query(
      //     colRef,
      //     where("id", "==", userCredential.uid)
      //  );

      //  await onSnapshot(qPull, (snapshot) => {
      //     let records = [];
      //     snapshot.docs.forEach((doc) => {
      //        records.push({ ...doc.data(), id: doc.id });
      //     });
      //     setRoutineSetRecs(records);
      //     setRoutineSetCount(records.length);
      //  });
      // set({ userProfile: newData });
   },
}));
