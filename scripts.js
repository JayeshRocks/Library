const scriptUrl = 'https://script.google.com/macros/s/AKfycbzZY0TyDqRoekAHYFJwdCTclPhIHHO7Mi5S130fvxgjPKeX_ID1eZuPsk60Yus0IE8/exec';

// Handle Book List Display
async function fetchBooks() {
    const response = await fetch(scriptUrl + '?action=getBooks');
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `<h3>${book.title}</h3>
                              <p>Author: ${book.author}</p>
                              <p>Genre: ${book.genre}</p>
                              <p>Available: ${book.available}</p>
                              <button class="add-to-cart" data-isbn="${book.isbn}">Add to Cart</button>`;
        bookList.appendChild(bookItem);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Handle adding to Cart
function addToCart(event) {
    const isbn = event.target.getAttribute('data-isbn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(isbn);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Book added to cart!');
}

// Handle Checkout
document.getElementById('checkout-btn').addEventListener('click', async function() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart || cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const username = prompt('Enter your username for checkout:');
    const payload = {
        action: 'checkout',
        cart: cart,
        username: username
    };

    const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const result = await response.text();
    alert(result);
    localStorage.removeItem('cart');
});

// Handle Admin: Add Book
document.getElementById('add-book-form').addEventListener('submit', async function(event) {
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

    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const result = await response.text();
    document.getElementById('add-book-result').innerText = result;
    fetchBooks();
});
