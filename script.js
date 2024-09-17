document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    let totalSum = 0;
    let cart = [];


    function addToCart(name, price) {
        const cartItem = { name, price };

        cart.push(cartItem);
        totalSum += price;
        updateCartDisplay();
    }


    function deleteFromCart(index) {
        const item = cart[index];
        totalSum -= item.price;
        cart.splice(index, 1); 
        updateCartDisplay();
    }


    function updateCartDisplay() {
        cartItems.innerHTML = '';

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("cart-item");
            li.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(li);
        });

        totalElement.textContent = `Total: ₹${totalSum}`;

        const deleteButtons = document.querySelectorAll(".remove-item");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteFromCart(index);
            });
        });
    }

  
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productCard = this.parentElement;
            const name = productCard.getAttribute("data-name");
            const price = parseInt(productCard.getAttribute("data-price"));

            addToCart(name, price);
        });
    });


    const modal = document.getElementById("loginModal");
    const loginBtn = document.querySelector(".login-btn");
    const closeBtn = document.querySelector(".close-btn");

    loginBtn.addEventListener("click", function() {
        modal.style.display = "flex"; 
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none"; 
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });


    const searchBar = document.getElementById("search-bar");
    const productCards = document.querySelectorAll(".product-card");

    searchBar.addEventListener("keyup", function() {
        const searchText = searchBar.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.getAttribute("data-name").toLowerCase();
            if (productName.includes(searchText)) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none";
            }
        });
    });

   
    const checkoutModal = document.getElementById("checkoutModal");
    const checkoutBtn = document.getElementById("checkout-btn");
    const closeCheckoutBtn = checkoutModal.querySelector(".close-btn");
    const confirmBtn = document.getElementById("confirm-btn");
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

   
    checkoutBtn.addEventListener("click", function() {
        checkoutItems.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${item.name}</span> - ₹${item.price}`;
            checkoutItems.appendChild(li);
        });
        checkoutTotal.textContent = `Total: ₹${totalSum}`;
        checkoutModal.style.display = "flex"; 
    });

    closeCheckoutBtn.addEventListener("click", function() {
        checkoutModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == checkoutModal) {
            checkoutModal.style.display = "none"; 
        }
    });


    confirmBtn.addEventListener("click", function() {
        alert("Purchase Confirmed! Thank you for shopping.");
        cart = []; 
        totalSum = 0;
        updateCartDisplay();
        checkoutModal.style.display = "none"; 
    });
});
