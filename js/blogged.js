import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDoc, getDocs, deleteDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Paste in your Firebase config object here
const firebaseConfig = {
    apiKey: "AIzaSyCC_Q7TFbNJSG3w9nH9c06nQK6mz5omA9Y",
    authDomain: "blogging-tutorial.firebaseapp.com",
    projectId: "blogging-tutorial",
    storageBucket: "blogging-tutorial.appspot.com",
    messagingSenderId: "507163058260",
    appId: "1:507163058260:web:0283152793254d764f8dc1"
};

console.log(localStorage.getItem('id'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// get specified 'id' document data from the database
const savedId = localStorage.getItem('id');
const docRef = doc(db, "blogs", savedId);
const docSnap = await getDoc(docRef);

// const data = docSnap.data(); skip writing 'construct.data()'
const title = docSnap.data().title; //<-----get data from firebase
const content = docSnap.data().content; //<-----get data from firebase
const imageURL = docSnap.data().image; //<-----get data from firebase

// pupulate the page by creating Html elements
const blogOutPut = document.getElementById('outPut');
const blogOut = document.createElement('div');
const titleDiv = document.createElement('h1');
const contentDiv = document.createElement('p');
// const contentID = document.createElement('p');

titleDiv.classList.add('blog-title');
contentDiv.classList.add('blog-content');

// Input data from the database reference to ID collection
titleDiv.textContent = title;
contentDiv.textContent = content;
// contentID.textContent = localStorage.getItem('id');

// Adding the data to the created element html page
blogOut.appendChild(titleDiv);
blogOut.appendChild(contentDiv);
// blogOut.appendChild(contentID);

// Adding the blog div into the body div.
blogOutPut.appendChild(blogOut);

// back button
document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
});

//insert image to html
const blogImage = document.getElementById('blog-image');
try {
    const storage = getStorage();
    const pathReference = ref(storage, imageURL);
    const gsUrl = await getDownloadURL(pathReference);
    if (blogImage) {
        blogImage.src = gsUrl; //'../../0.Images-Icon/html5.png'; 
    }

} catch (error) {
    console.error('Error fetching image:', error);
    // Optionally handle the error (e.g., set a default image or log the error)
}