// Function to load books from the Google Spreadsheet
async function loadBooks() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/getAllBooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const books = await response.json();

    const booksTable = document.getElementById('booksTable');
    booksTable.innerHTML = '<h3>Books Available in Library</h3>';
    
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.innerHTML = `
            <p><strong>${book.title}</strong> by ${book.author} (Genre: ${book.genre}) - Quantity: ${book.quantity}</p>
        `;
        booksTable.appendChild(bookItem);
    });
}

// Function to load user checkouts and reservations
async function loadCheckouts() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzssFhy_ek3XQnZxI_NR5ZdkyMKWIifq7TMqQjULY4r-TQ-DvFL-f_8FnoPPq1MDEJ6/exec/getCheckouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const checkouts = await response.json();

    const checkoutsTable = document.getElementById('checkoutsTable');
    checkoutsTable.innerHTML = '<h3>User Checkouts and Reservations</h3>';
    
    checkouts.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.innerHTML = `
            <p><strong>${item.name}</strong> checked out <em>${item.bookTitle}</em> on ${item.checkoutDate}. Status: ${item.status}</p>
        `;
        checkoutsTable.appendChild(checkoutItem);
    });
}
