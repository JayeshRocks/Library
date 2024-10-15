const API_URL = 'https://script.google.com/macros/s/AKfycbxXkMHZRoFi6WdTV7MIfHNzse4i22PLr7bZf7PzSKsWSAPhqRL8bCdz8jwZJxp_XAkw/exec'; // Replace with your Google Apps Script Web App URL

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('index.html')) {
    fetchProducts();
  } else if (window.location.pathname.includes('admin.html')) {
    fetchAdminProducts();
  } else if (window.location.pathname.includes('login.html')) {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', login);
  }
});

// Fetch products for the main page
function fetchProducts() {
  fetch(`${API_URL}?action=getProducts`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        displayProducts(data.products);
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Display products on the main page
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    productDiv.innerHTML = `
      <img src="${product.ImageURL}" alt="${product.Name}">
      <h3>${product.Name}</h3>
      <p>${product.Description}</p>
      <p>Price: $${product.Price}</p>
      <p>Stock: ${product.Stock}</p>
    `;
    
    productList.appendChild(productDiv);
  });
}

// Fetch products for the admin panel
function fetchAdminProducts() {
  fetch(`${API_URL}?action=getProducts`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        displayAdminProducts(data.products);
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error fetching admin products:', error));
}

// Display products with stock editing for admins
function displayAdminProducts(products) {
  const adminProductList = document.getElementById('admin-product-list');
  adminProductList.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'admin-product';
    
    productDiv.innerHTML = `
      <h3>${product.Name}</h3>
      <p>Price: $${product.Price}</p>
      <p>Stock: <input type="number" id="stock-${product.ProductID}" value="${product.Stock}"></p>
      <button onclick="updateStock(${product.ProductID})">Update Stock</button>
    `;
    
    adminProductList.appendChild(productDiv);
  });
}

// Update stock in the backend
function updateStock(productId) {
  const stockValue = document.getElementById(`stock-${productId}`).value;
  fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      action: 'updateStock',
      productId: productId,
      stock: stockValue
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Stock updated successfully!');
      fetchAdminProducts();
    } else {
      alert(data.message);
    }
  })
  .catch(error => console.error('Error updating stock:', error));
}

// Login function
function login(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(`${API_URL}?action=login`, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      if (data.userRole === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      document.getElementById('login-error').textContent = data.message;
    }
  })
  .catch(error => console.error('Error logging in:', error));
}
