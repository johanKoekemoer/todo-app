import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB6ezBp256iSR6ILgZDhjg1PJwqorIjADs",
  authDomain: "todo-app-292be.firebaseapp.com",
  databaseURL: "https://todo-app-292be-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todo-app-292be",
  storageBucket: "todo-app-292be.appspot.com",
  messagingSenderId: "322417231528",
  appId: "1:322417231528:web:3b39b0dfeb8af59a99249d"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}