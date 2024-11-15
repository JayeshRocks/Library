// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

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
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
