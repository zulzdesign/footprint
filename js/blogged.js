import { db, getDoc, doc, } from "./firebase.js";
import { storage, ref, getDownloadURL } from "./firebase.js";

console.log(localStorage.getItem('id'));

// get specified 'id' document data from the database
const savedId = localStorage.getItem('id');

const docRef = doc(db, "blogs", savedId);
const docSnap = await getDoc(docRef);

const data = docSnap.data(); //<-----skip writing 'construct.data()'
const title = data.title; //<-----get data from firebase
const content = data.content; //<-----get data from firebase //textDoc/blog1.txt
const publishAt = data.publishedAt;
const imageURL = data.imgurl; //<-----get data from firebase
//const imageURL = docSnap.data().image; //<-----get data from firebase //uploaded_images/html5.png <-- firebase ID input

// pupulate the page by creating Html elements
const blogOutPut = document.getElementById('outPut');
const blogOut = document.createElement('div');
const titleDiv = document.createElement('h1');
const datePublish = document.createElement('p');
const contentDiv = document.createElement('p');

titleDiv.classList.add('blog-title');
datePublish.classList.add('date-publish');
contentDiv.classList.add('blog-content');

// Input data from the database reference to ID collection
titleDiv.textContent = title;
datePublish.textContent = publishAt;
try {
    const textFileRef = ref(storage, content);
    getDownloadURL(textFileRef).then((url) => {
    fetch(url)
        .then((response) => response.text())
        .then((text) => {
        contentDiv.textContent = text;
        })
    })
    .catch((error) => {
    console.error('Error fetching text file:', error);
    });
} 
catch (error) {
console.error('Error fetching text file:', error);
contentDiv.textContent = 'Failed to load content.';
}

blogOut.appendChild(titleDiv);
blogOut.appendChild(datePublish);
blogOut.appendChild(contentDiv);
blogOutPut.appendChild(blogOut);

//insert imgurl
const blogImage = document.getElementById('blog-image');
try {
    blogImage.src = imageURL;
} catch (error) {
    console.error('Error fetching image:', error);
}

// back button
document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
});

document.getElementById('nav-back-button').addEventListener('click', () => {
    window.history.back();
});