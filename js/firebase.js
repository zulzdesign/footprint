import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import { query, limit, orderBy, startAfter, startAt } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCC_Q7TFbNJSG3w9nH9c06nQK6mz5omA9Y",
    authDomain: "blogging-tutorial.firebaseapp.com",
    projectId: "blogging-tutorial",
    storageBucket: "blogging-tutorial.appspot.com",
    messagingSenderId: "507163058260",
    appId: "1:507163058260:web:0283152793254d764f8dc1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, addDoc, getDocs, getDoc, deleteDoc, doc, setDoc, updateDoc };
export { storage, ref, uploadBytes, getDownloadURL};
export { query, limit, orderBy, startAfter, startAt };