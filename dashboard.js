async function login() {
    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    // Hash the input password to compare with the stored hashed password
    const hashedPassword = await sha256(passwordInput); // Ensure you have the sha256 function defined.

    // Check user credentials using Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/checkLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: hashedPassword })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('message').innerText = 'Login successful! Redirecting...';
        // Redirect to main page or dashboard
        window.location.href = 'main.html'; // Change to your main page URL
    } else {
        document.getElementById('message').innerText = 'Invalid email or password.';
    }
}
