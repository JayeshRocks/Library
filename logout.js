// Import necessary Firebase modules
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMoJGj_DJH_PETHpxbAIlZK4X7qV-S1v0",
    authDomain: "lib-management-sys-17120.firebaseapp.com",
    projectId: "lib-management-sys-17120",
    storageBucket: "lib-management-sys-17120.appspot.com",
    messagingSenderId: "800291285303",
    appId: "1:800291285303:web:5423155460105d06a3d2b2",
    measurementId: "G-RKL7RBDP5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to log out the user
function logoutUser() {
    // Sign out the user
    signOut(auth).then(() => {
        console.log('User logged out');
        
        // Optionally clear session storage
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page after logout
        window.location.href = 'login.html'; // Adjust this URL as needed
    }).catch((error) => {
        console.error('Logout error: ', error);
    });
}

// Add event listener to logout button when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        // Add click event to trigger logout
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();  // Prevent default <a> behavior
            logoutUser();            // Call the logout function
        });
    }
});
