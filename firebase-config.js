// firebase-config.js

// Import the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

// Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyAMoJGj_DJH_PETHpxbAIlZK4X7qV-S1v0",
    authDomain: "lib-management-sys-17120.firebaseapp.com",
    projectId: "lib-management-sys-17120",
    storageBucket: "lib-management-sys-17120.appspot.com",
    messagingSenderId: "800291285303",
    appId: "1:800291285303:web:bdc678c791bc1e09a3d2b2",
    measurementId: "G-PQ2KM5ZC5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the Firestore instance
export { db };
