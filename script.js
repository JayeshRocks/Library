// Fetch book data from Google Apps Script
async function fetchBooks() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwAajOV6-lysaRgKrj65eqcjXXebBvRzASgIq8EWtJ77zmqijfRW2uLbuuPKQOekIev/exec');
    const books = await response.json();
    displayBooks(books);  // Use the same displayBooks function to render the data
}

// Initial fetch of books when page loads
fetchBooks();


// Example array of book data to be replaced by Google Spreadsheet data
const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", image: "https://via.placeholder.com/150" },
    { title: "1984", author: "George Orwell", genre: "Dystopian", image: "https://via.placeholder.com/150" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", image: "https://via.placeholder.com/150" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic", image: "https://via.placeholder.com/150" },
    { title: "Brave New World", author: "Aldous Huxley", genre: "Science Fiction", image: "https://via.placeholder.com/150" },
];

// Function to render the books in a grid
function displayBooks(books) {
    const bookGrid = document.getElementById("bookGrid");
    bookGrid.innerHTML = ""; // Clear the grid first
    books.forEach(book => {
        const bookCard = `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p><em>${book.genre}</em></p>
            </div>
        `;
        bookGrid.innerHTML += bookCard;
    });
}

// Initial display of all books
displayBooks(books);

// Search function
function searchBooks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput) ||
        book.genre.toLowerCase().includes(searchInput)
    );
    displayBooks(filteredBooks);
}
