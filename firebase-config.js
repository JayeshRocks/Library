// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyAMoJGj_DJH_PETHpxbAIlZK4X7qV-S1v0",
  authDomain: "lib-management-sys-17120.firebaseapp.com",
  projectId: "lib-management-sys-17120",
  storageBucket: "lib-management-sys-17120.appspot.com",
  messagingSenderId: "800291285303",
  appId: "1:800291285303:web:5423155460105d06a3d2b2",
  measurementId: "G-RKL7RBDP5Q"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();