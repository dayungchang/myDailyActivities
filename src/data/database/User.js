import {
   collection,
   documentId,
   onSnapshot,
   query,
   where,
} from "firebase/firestore";
import { db } from "../Firebase";

export const getUserInfo = (userUID) => {
   // Fetch user information from backend
   const colRef = collection(db, "user");
   const qPull = query(colRef, where(documentId(), "==", userUID));

   onSnapshot(qPull, (snapshot) => {
      let records = [];
      snapshot.docs.forEach((doc) => {
         records.push({ ...doc.data(), id: doc.id });
         console.log("userInfo", { ...doc.data(), id: doc.id });

         return { ...doc.data(), id: doc.id };
      });
   });
};
