import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: `${process.env.EXPO_PUBLIC_FirebaseAPIKey}`,
   // apiKey: "AIzaSyDnEq2IjnWSelkSAVwCqUrzXDPDEq0G0Bk",
   authDomain: `${process.env.EXPO_PUBLIC_FirebaseAuthDomain}`,
   // authDomain: "myapps-386713.firebaseapp.com",
   databaseURL: `${process.env.EXPO_PUBLIC_FirebaseDatabaseURL}`,
   // databaseURL: "https://myapps-386713-default-rtdb.firebaseio.com",
   projectId: `${process.env.EXPO_PUBLIC_FirebaseProjectId}`,
   // projectId: "myapps-386713",
   storageBucket: `${process.env.EXPO_PUBLIC_FirebaseStorageBucket}`,
   // storageBucket: "myapps-386713.appspot.com",
   messagingSenderId: `${process.env.EXPO_PUBLIC_FirebaseMessagingSenderId}`,
   // messagingSenderId: "905106723377",
   appId: `${process.env.EXPO_PUBLIC_FirebaseAppId}`,
   // appId: "1:905106723377:web:64b0c8000a570bc85cbb10",
   measurementId: `${process.env.EXPO_PUBLIC_FirebaseMeasurementId}`,
   // measurementId: "G-1NP3TXN3CP",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
