// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Firebase configuration object (use your own credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAMoJGj_DJH_PETHpxbAIlZK4X7qV-S1v0",
    authDomain: "lib-management-sys-17120.firebaseapp.com",
    projectId: "lib-management-sys-17120",
    storageBucket: "lib-management-sys-17120.appspot.com",
    messagingSenderId: "800291285303",
    appId: "1:800291285303:web:bdc678c791bc1e09a3d2b2",
    measurementId: "G-PQ2KM5ZC5W"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);  // Firestore instance
const auth = getAuth(app);  // Firebase Auth instance

// Export db and auth so that they can be accessed in index.html
export { db, auth };