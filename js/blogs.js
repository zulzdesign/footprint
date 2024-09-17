import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

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
const colRef = collection(db, "blogs");
const querySnapshot = await getDocs(colRef);

for (const doc of querySnapshot.docs) {
    const storage = getStorage();
    const pathReference = ref(storage, doc.data().image);

    try {
        const gsURL = await getDownloadURL(pathReference); // Await the download URL
        const cardsContainer = document.getElementById('cards-container');

        const figureBox = document.createElement('figure');
        const figimg = document.createElement('img');
        const figCaption = document.createElement('figcaption');
        const readLink = document.createElement('a');

        figureBox.classList.add("box");
        figimg.classList.add("images");
        readLink.classList.add("btn-dark");

        figimg.src = gsURL; // Set the URL after awaiting it
        figCaption.textContent = doc.data().title;
        readLink.textContent = 'Read More';
        readLink.href = 'blogged.html';

        readLink.onclick = function () {
            localStorage.setItem('id', doc.id);
        };
        
        figureBox.setAttribute('id', doc.id);
        figureBox.appendChild(figimg);
        figureBox.appendChild(figCaption);
        figureBox.appendChild(readLink);
        cardsContainer.appendChild(figureBox);
    } catch (error) {
        console.error("Error fetching image URL:", error);
    }
}
