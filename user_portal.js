// Function to search books from the Google Spreadsheet
async function searchBooks() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/getBooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
    });

    const books = await response.json();

    const booksList = document.getElementById('booksList');
    booksList.innerHTML = ''; // Clear previous search results

    if (books.length > 0) {
        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Genre: ${book.genre}</p>
                <button onclick="selectBook('${book.id}')">Add to Reservation</button>
            `;
            booksList.appendChild(bookItem);
        });
    } else {
        booksList.innerHTML = '<p>No books found.</p>';
    }
}

// Function to handle book reservation
function selectBook(bookId) {
    document.getElementById('reservationSection').style.display = 'block';
    // Store the selected bookId for reservation
    window.selectedBookId = bookId;
}

async function reserveBook() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/reserveBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: window.selectedBookId })
    });

    const result = await response.json();
    if (result.status === 'success') {
        document.getElementById('reservationMessage').innerText = `Reservation confirmed! Your code: ${result.code}`;
    } else {
        document.getElementById('reservationMessage').innerText = 'Error reserving the book. Try again.';
    }
}
