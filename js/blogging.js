import { db, collection, addDoc } from "./firebase.js";
import { storage, ref, uploadBytes } from "./firebase.js";

const colRef = collection(db, "blogs");
const addBlogForm = document.querySelector(".add");
let imgUrl = '';

addBlogForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = addBlogForm.title.value;
    const content = addBlogForm.content.value;
    
    if (title && content && imgUrl !== '') {
        const textFileUrl = await uploadTextFile(content, title); // Upload content as a .txt file

        // Add blog data to Firestore
        try {
            await addDoc(colRef, {
                title: title,
                content: textFileUrl, // Store the path to the .txt file in Firestore
                imgurl: imgUrl,
                publishedAt: new Date().toLocaleString()
            });
            //console.log("Document successfully written!");
            alert('Blog published!');
            addBlogForm.reset(); // Reset the form after submission
        } catch (error) {
            console.error('Error adding document:', error);
        }
    } else { alert("Please provide a title, content, and an image."); }
});
//1VWOdzqbI56ZstLc3Yq9g6_LvuPoPmluG

// --- Image Upload Handling (Google Drive Image ID) --- //
const IdUploadBtn = document.querySelector(".id-upload-btn");
IdUploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const imgId = document.querySelector("#banner-id").value;  
    if (imgId) {
        imgUrl = `https://lh3.googleusercontent.com/d/${imgId}`;
        const bannerStyle = document.querySelector(".banner");
        bannerStyle.style.backgroundImage = `url(${imgUrl})`;
    } else { alert("Image ID is required."); }
});

// --- Upload Text File to Firebase --- //
async function uploadTextFile(content, fileName) {
    const fileContent = content;  // Content from the form
    const blobTxt = new Blob([fileContent], { type: 'text/plain' }); // Create a Blob with text/plain type
    const storageRef = ref(storage, `textDoc/${fileName}.txt`); // Reference to Firebase Storage

    try {
        await uploadBytes(storageRef, blobTxt); // Upload the Blob
        console.log('Text file uploaded successfully to Firebase Storage.');
        return `textDoc/${fileName}.txt`; // Return the URL of the uploaded file for Firestore
    } catch (error) {
        console.error('Error uploading text file:', error);
    }
}

// --- set href for <a> button --- //
const hrefBtn = document.querySelectorAll('.abtn');
hrefBtn.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        anchor.href = "_blank"; //APIscript Upload image and fetch URL outside of firebase reduce DB storage Usage.
    })
})

// --- Resize Text Area --- //
const textBoxResize = document.querySelectorAll("#banner-id, #titleInput, #articleInput");
textBoxResize.forEach(input => {
    input.addEventListener('input', autoResize);
});
function autoResize() {
    this.style.height = '24px'; // Reset the height
    this.style.height = `${this.scrollHeight}px`; // Adjust to fit content
}
