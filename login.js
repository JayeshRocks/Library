async function sendOTP() {
    const email = document.getElementById('emailInput').value;

    // Send the email to Google Apps Script to trigger OTP email
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/sendOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('message').innerText = 'OTP sent to your email!';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('otp-section').style.display = 'block';
    } else {
        document.getElementById('message').innerText = 'Error sending OTP. Try again.';
    }
}

async function verifyOTP() {
    const otp = document.getElementById('otpInput').value;

    // Send the OTP to Google Apps Script for verification
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/verifyOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('message').innerText = 'OTP verified. Set your password.';
        document.getElementById('otp-section').style.display = 'none';
        document.getElementById('password-section').style.display = 'block';
    } else {
        document.getElementById('message').innerText = 'Invalid OTP. Try again.';
    }
}

async function setPassword() {
    const password = document.getElementById('passwordInput').value;

    // Hash the password
    const hashedPassword = await sha256(password);

    // Send the hashed password to Google Apps Script to be saved
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/setPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: hashedPassword })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('message').innerText = 'Password set successfully!';
        // Redirect to the login page
        window.location.href = 'user_portal.html'; // Change URL if necessary
    } else {
        document.getElementById('message').innerText = 'Error setting password. Try again.';
    }
}
