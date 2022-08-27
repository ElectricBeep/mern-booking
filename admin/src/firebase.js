import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4YaxlWL0aHVXGG2TVG1wMQVqXZOEgom4",
    authDomain: "graceful-design-346013.firebaseapp.com",
    projectId: "graceful-design-346013",
    storageBucket: "graceful-design-346013.appspot.com",
    messagingSenderId: "621187135897",
    appId: "1:621187135897:web:6e0ddf289e30aa37affb08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);