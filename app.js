let allProducts = [];
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const statusMessage = document.getElementById('status-message');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const cartCount = document.getElementById('cart-count');

const statTotal = document.getElementById('stat-total');
const statAvg = document.getElementById('stat-avg');
const statHighest = document.getElementById('stat-highest');
const statLowest = document.getElementById('stat-lowest');

// Fetch data from Fake Store API
function loadDataFromAPI() {
    statusMessage.textContent = "Loading Products..."; 

    fetch('https://fakestoreapi.com/products')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allProducts = data;
            statusMessage.textContent = "Products Loaded Successfully"; 
            
            displayProducts(allProducts);
            showStats(allProducts);
        })
        .catch(function(error) {
            console.log("Something went wrong:", error);
            statusMessage.textContent = "Error loading products.";
        })
        .finally(function() {
            setTimeout(function() {
                if (allProducts.length > 0) {
                    statusMessage.style.display = "none";
                }
            }, 1500);
        });
}

// Generate and append cards to grid
function displayProducts(list) {
    productsGrid.innerHTML = ""; 

    if (list.length === 0) {
        statusMessage.style.display = "block";
        statusMessage.textContent = "No products found.";
        return;
    } else {
        statusMessage.style.display = "none";
    }

    list.forEach(function(product) {
        const card = document.createElement('div');
        card.className = "product-card";

        // Check if item is already in cart to toggle button state
        let inCart = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                inCart = true;
            }
        }

        let buttonHTML = "";
        if (inCart === true) {
            buttonHTML = `<button class="remove-btn" onclick="toggleCart(${product.id})">Remove</button>`;
        } else {
            buttonHTML = `<button class="add-btn" onclick="toggleCart(${product.id})">Add To Cart</button>`;
        }

        card.innerHTML = `
            <div class="img-container">
                <img src="${product.image}">
            </div>
            <div class="p-category">${product.category}</div>
            <div class="p-title">${product.title}</div>
            <div class="p-rating">Rating: ${product.rating.rate} ⭐ (${product.rating.count})</div>
            <div>
                <div class="p-price">$${product.price}</div>
                ${buttonHTML}
            </div>
        `;

        productsGrid.append(card); 
    });
}

// Handle both search box and category filter changes together
function runFilters() {
    const searchWord = searchInput.value.toLowerCase();
    const chosenCategory = categoryFilter.value;

    let filtered = allProducts.filter(function(product) {
        let matchesSearch = product.title.toLowerCase().includes(searchWord);
        
        let matchesCategory = false;
        if (chosenCategory === "all") {
            matchesCategory = true;
        } else if (product.category === chosenCategory) {
            matchesCategory = true;
        }

        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
    showStats(filtered);
}

searchInput.addEventListener('input', runFilters);
categoryFilter.addEventListener('change', runFilters);

// Add or remove item from global cart list
function toggleCart(id) {
    let foundIndex = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            foundIndex = i;
        }
    }

    if (foundIndex === -1) {
        let targetProduct = allProducts.find(function(p) {
            return p.id === id;
        });
        cart.push(targetProduct);
    } else {
        cart = cart.filter(function(item) {
            return item.id !== id;
        });
    }

    cartCount.textContent = cart.length;
    runFilters(); // re-render to update buttons
}

// Calculate values for the dashboard panels
function showStats(currentItems) {
    if (currentItems.length === 0) {
        statTotal.textContent = "0";
        statAvg.textContent = "$0.00";
        statHighest.textContent = "$0.00";
        statLowest.textContent = "$0.00";
        return;
    }

    statTotal.textContent = currentItems.length;

    let sumTotal = currentItems.reduce(function(acc, item) {
        return acc + item.price;
    }, 0);
    let calculatedAverage = sumTotal / currentItems.length;
    statAvg.textContent = "$" + calculatedAverage.toFixed(2);

    // Make copy of array before sorting to avoid modifying original layout order
    let itemsCopy = [];
    currentItems.forEach(function(item) {
        itemsCopy.push(item);
    });

    itemsCopy.sort(function(a, b) {
        return b.price - a.price; 
    });
    statHighest.textContent = "$" + itemsCopy[0].price.toFixed(2);

    itemsCopy.sort(function(a, b) {
        return a.price - b.price; 
    });
    let lowestItem = itemsCopy.find(function(item) {
        return item.price >= 0;
    });
    statLowest.textContent = "$" + lowestItem.price.toFixed(2);
}

loadDataFromAPI();