import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOUTKC3w9_Xs6KWU8RfSLseGWrHatVew8",
  authDomain: "eid-project-7ea45.firebaseapp.com",
  projectId: "eid-project-7ea45",
  storageBucket: "eid-project-7ea45.appspot.com",
  messagingSenderId: "857659291828",
  appId: "1:857659291828:web:0e589f214cb0a86134bfe1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let thanks = new Audio('./Assets/Thanks.mp3');

document.addEventListener('DOMContentLoaded', async (event) => {
  await loadAllData();

  var btn = document.querySelector('#submit');
  btn.addEventListener('click', async (event) => {
    event.preventDefault();

    var userName = document.getElementById('userName');
    var meatQuantity = document.getElementById('meatQuantity');

    if (userName.value.trim() === "" || meatQuantity.value.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Eid-data"), {
        personName: userName.value,
        quantity: meatQuantity.value,
      });
      userName.value = "";
      meatQuantity.value = "";
      console.log("Document written with ID: ", docRef.id);

      await loadAllData();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

  document.querySelector('#Table').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const tr = event.target.closest('tr');
      const personName = tr.querySelector('td:nth-child(1)').innerText.trim();
      const quantity = tr.querySelector('td:nth-child(2)').innerText.trim();
      event.target.closest('tr').style.backgroundColor = 'rgba(188, 143, 143, 0.354)'
      try {
        const querySnapshot = await getDocs(collection(db, "Eid-data"));
        querySnapshot.forEach(async (doc) => {
          if (doc.data().personName === personName && doc.data().quantity === quantity) {
            await deleteDoc(doc.ref);
            thanks.play();
            console.log("Document successfully deleted!");

            tr.remove();
          }
        });
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  });
});

async function loadAllData() {
  const querySnapshot = await getDocs(collection(db, "Eid-data"));
  const tableBody = document.getElementById('Table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  querySnapshot.forEach((doc) => {
    tableBody.innerHTML += `
      <tr>
        <td>${doc.data().personName}</td>
        <td>${doc.data().quantity}</td>
        <td><button class="delete-btn">Done</button></td>
      </tr>
    `;
  });
}
