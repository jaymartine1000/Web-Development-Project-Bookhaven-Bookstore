document.addEventListener("DOMContentLoaded", function () {
  // SUBSCRIBE BUTTON
  const subscribeBtn = document.getElementById("subscribe-btn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      alert("Thank you for subscribing.");
    });
  }

  // CART FUNCTIONALITY
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const viewCartBtn = document.getElementById("view-cart");
  const clearCartBtn = document.getElementById("clear-cart");
  const processOrderBtn = document.getElementById("process-order");
  const cartModal = document.getElementById("cart-modal");
  const closeModal = document.getElementById("close-modal");
  const cartList = document.getElementById("cart-items");

  function saveCartToSession() {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // ADD TO CART
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productCard = btn.parentElement;
      const productImage = productCard.querySelector("img").src;
      const productName = productCard.querySelector("p").textContent;

      const existingItem = cartItems.find(item => item.name === productName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ name: productName, image: productImage, quantity: 1 });
      }

      saveCartToSession();
      alert("Item added to the cart");
    });
  });

  // VIEW CART
  if (viewCartBtn && cartModal) {
    viewCartBtn.addEventListener("click", function () {
      cartList.innerHTML = "";

      if (cartItems.length === 0) {
        cartList.innerHTML = "<li>Your cart is empty.</li>";
      } else {
        cartItems.forEach((item, index) => {
          const li = document.createElement("li");

          li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" style="vertical-align: middle; margin-right: 10px;">
            <strong>${item.name}</strong> 
            <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input" style="width: 50px; margin: 0 10px;">
            <button class="remove-item" data-index="${index}">X</button>
          `;

          cartList.appendChild(li);
        });
      }

      cartModal.style.display = "block";

      // Quantity update
      document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", function () {
          const i = this.getAttribute("data-index");
          cartItems[i].quantity = parseInt(this.value) || 1;
          saveCartToSession();
        });
      });

      // Remove item
      document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          cartItems.splice(i, 1);
          saveCartToSession();
          viewCartBtn.click(); // Refresh cart
        });
      });
    });
  }

  // CLOSE MODAL
  if (closeModal) {
    closeModal.addEventListener("click", function () {
      cartModal.style.display = "none";
    });
  }

  // CLEAR CART
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", function () {
      if (cartItems.length > 0) {
        cartItems = [];
        sessionStorage.removeItem("cartItems");
        sessionStorage.removeItem("cart"); // <-- This clears the leftover key
        alert("Cart cleared");
      } else {
        alert("No items to clear");
      }
    });
  }

  // PROCESS ORDER
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", function () {
      if (cartItems.length > 0) {
        alert("Thank you for your order");
        cartItems = [];
        sessionStorage.removeItem("cartItems");
        sessionStorage.removeItem("cart"); // <-- Also clear here
      } else {
        alert("Cart is empty");
      }
    });
  }

  // CONTACT FORM (LOCALSTORAGE)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      localStorage.setItem("contactFormData", JSON.stringify({ name, email, message }));

      alert("Thank you for your message");
      contactForm.reset();
    });
  }
});