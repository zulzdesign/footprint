import { db, collection, getDocs, query, orderBy, limit, startAfter, startAt } from "./firebase.js";

let lastVisible = null;
let ssData = JSON.parse(sessionStorage.getItem('queryData')) || [];
let startAtValue = startValue();
const cardsContainer = document.getElementById('cards-container');
const loadMore = document.querySelector('.show-more');
const noData = JSON.parse(sessionStorage.getItem('NoData'));

window.addEventListener('DOMContentLoaded', () => {
    if (!ssData.length) {
        getNextBlog();
    } else {
        loadData();
    }
 
    if (noData) {
        loadMore.remove();
    } else {
        cardsContainer.appendChild(loadMore);
        loadMore.addEventListener('click', handleClick);
    }
});

const getNextBlog = async () => {
    const queRef = query(
        collection(db, "blogs"),
        orderBy("publishedAt", "asc"),
        lastVisible ? startAfter(lastVisible) : startAt(startAtValue),
        limit(1)
    );

    const querySnapshot = await getDocs(queRef);
    if (!querySnapshot.empty) {
        const fragment = document.createDocumentFragment();
        querySnapshot.forEach(doc => {
            const data = { id: doc.id, ...doc.data() };
            createCard(data, fragment);
            saveData(data);
        });
        cardsContainer.appendChild(fragment);
        cardsContainer.appendChild(loadMore);
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        sessionStorage.setItem("startAtValue", JSON.stringify(querySnapshot.docs[0].data().publishedAt));
        localStorage.setItem("lastVisible", JSON.stringify(lastVisible));
        sessionStorage.setItem("NoData", false);
    }
    else {
        sessionStorage.setItem("NoData", true);
        loadMore.remove();
    }
};

const handleClick = () => {
    startAtValue = startValue();
    getNextBlog();
};

const saveData = (entry) => {
    ssData.push(entry);
    sessionStorage.setItem('queryData', JSON.stringify(ssData));
};

const loadData = () => {
    const fragment = document.createDocumentFragment();
    ssData.forEach(entry => {
        createCard(entry, fragment);
    });
    cardsContainer.appendChild(fragment);
    cardsContainer.appendChild(loadMore);
};

const createCard = (entry, fragment) => {

    const cards = document.createElement('div');
    const figureBox = document.createElement('figure');
    const figimg = document.createElement('img');
    const figCaption = document.createElement('figcaption');
    const readLink = document.createElement('a');
    const imageLink = document.createElement('a');

    cards.classList.add("cards");
    figureBox.classList.add("box");
    readLink.classList.add("btn-dark");
    imageLink.classList.add("images");

    figimg.src = entry.imgurl;
    figCaption.textContent = entry.title;
    readLink.textContent = 'Read More';
    readLink.href = 'blogged.html';
    imageLink.href = 'blogged.html';

    readLink.onclick = () => localStorage.setItem('id', entry.id);
    imageLink.onclick = () => localStorage.setItem('id', entry.id);

    imageLink.appendChild(figimg);
    cards.appendChild(imageLink);
    cards.appendChild(figCaption);
    cards.appendChild(readLink);
    figureBox.appendChild(cards);
    figureBox.setAttribute('id', entry.id);

    // cardsContainer.appendChild(figureBox);
    fragment.appendChild(figureBox);
};

function startValue() {
    return sessionStorage.getItem('startAtValue') ? JSON.parse(sessionStorage.getItem('startAtValue')) : "01";
};