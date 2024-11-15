import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAMoJGj_DJH_PETHpxbAIlZK4X7qV-S1v0",
    authDomain: "lib-management-sys-17120.firebaseapp.com",
    projectId: "lib-management-sys-17120",
    storageBucket: "lib-management-sys-17120.appspot.com",
    messagingSenderId: "800291285303",
    appId: "1:800291285303:web:bdc678c791bc1e09a3d2b2",
    measurementId: "G-PQ2KM5ZC5W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
