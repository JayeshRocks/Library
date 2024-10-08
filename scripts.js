const scriptUrl = 'https://script.google.com/macros/s/AKfycbwOgmUXEHAq8Qm2wMVlbj4hGoVIe6rd0GhXVIgwYHHCK0YxEZfTJkX_0-dn4-s8nDM/exec'; // Replace with your deployed Apps Script URL

// Fetch the list of books
async function fetchBooks() {
    try {
        const response = await fetch(scriptUrl);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Display books in the HTML
function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    let html = '<ul>';
    books.forEach((book) => {
        html += `<li><strong>${book.title}</strong> by ${book.author} (Available: ${book.available})</li>`;
    });
    html += '</ul>';
    bookList.innerHTML = html;
}

// Handle book checkout
async function handleCheckout(event) {
    event.preventDefault();
    
    const bookTitle = document.getElementById('book-title').value;
    const userName = document.getElementById('user-name').value;

    const payload = {
        action: 'checkout',
        bookTitle: bookTitle,
        userName: userName
    };

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.text();
        document.getElementById('checkout-result').innerText = result;
        fetchBooks(); // Refresh the list of books after checkout
    } catch (error) {
        console.error('Error during checkout:', error);
        document.getElementById('checkout-result').innerText = 'Checkout failed. Try again.';
    }

    document.getElementById('checkout-form').reset();
}

// Handle admin login
async function handleAdminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    const payload = {
        action: 'login',
        username: username,
        password: password
    };

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.text();
        if (result === 'Success') {
            document.getElementById('admin-login-result').innerText = 'Login successful!';
            document.getElementById('admin-add-book-section').style.display = 'block';
        } else {
            document.getElementById('admin-login-result').innerText = 'Invalid credentials.';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('admin-login-result').innerText = 'Login failed. Try again.';
    }

    document.getElementById('admin-login-form').reset();
}

// Handle adding a new book
async function handleAddBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const genre = document.getElementById('genre').value;
    const quantity = document.getElementById('quantity').value;

    const payload = {
        action: 'addBook',
        title: title,
        author: author,
        isbn: isbn,
        genre: genre,
        quantity: quantity
    };

    try {
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await response.text();
        document.getElementById('add-book-result').innerText = result;
        fetchBooks(); // Refresh the list of books after adding
    } catch (error) {
        console.error('Error adding book:', error);
        document.getElementById('add-book-result').innerText = 'Failed to add book. Try again.';
    }

    document.getElementById('add-book-form').reset();
}

// Initialize the app by fetching books on page load
fetchBooks();

// Attach event listeners
document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
document.getElementById('add-book-form').addEventListener('submit', handleAddBook);
