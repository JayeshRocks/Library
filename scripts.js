const scriptUrl = 'your_google_apps_script_url_here'; // Replace with your deployed Apps Script URL

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

// Initialize the app by fetching books on page load
fetchBooks();

// Attach event listener for the checkout form submission
document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
