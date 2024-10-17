async function sendAdminOTP() {
    const email = document.getElementById('adminEmailInput').value;

    // Send the admin email to Google Apps Script to trigger OTP email
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL/sendAdminOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('adminMessage').innerText = 'OTP sent to your admin email!';
        document.getElementById('admin-email-section').style.display = 'none';
        document.getElementById('admin-otp-section').style.display = 'block';
    } else {
        document.getElementById('adminMessage').innerText = 'Error sending OTP. Try again.';
    }
}

async function verifyAdminOTP() {
    const otp = document.getElementById('adminOtpInput').value;

    // Send the OTP to Google Apps Script for verification
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL/verifyAdminOTP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('adminMessage').innerText = 'OTP verified. Set your password.';
        document.getElementById('admin-otp-section').style.display = 'none';
        document.getElementById('admin-password-section').style.display = 'block';
    } else {
        document.getElementById('adminMessage').innerText = 'Invalid OTP. Try again.';
    }
}

async function setAdminPassword() {
    const password = document.getElementById('adminPasswordInput').value;

    // Hash the password
    const hashedPassword = await sha256(password);

    // Send the hashed password to Google Apps Script to be saved
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL/setAdminPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: hashedPassword })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('adminMessage').innerText = 'Password set successfully!';
        // Redirect to the admin portal page
        window.location.href = 'admin_portal.html'; // Change URL if necessary
    } else {
        document.getElementById('adminMessage').innerText = 'Error setting password. Try again.';
    }
}
