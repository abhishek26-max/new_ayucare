let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart counter in navigation bars across pages
function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count-badge");
  const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  badges.forEach(b => {
    b.innerText = totalCount;
    b.style.display = totalCount > 0 ? "inline-flex" : "none";
  });
}

// ADD TO CART
function addToCart(name, price, image) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name: name, price: Number(price), image: image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200', qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();

  // Toast feedback
  showToast(`✅ ${name} Added to Cart!`);
}

function showToast(text) {
  const existing = document.getElementById("ayucare-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "ayucare-toast";
  toast.style.cssText = "position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:#0d9488; color:white; padding:12px 24px; border-radius:30px; font-weight:bold; font-size:14px; box-shadow:0 10px 25px rgba(0,0,0,0.2); z-index:9999;";
  toast.innerText = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// LOAD CART PAGE
function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("cart-subtotal");
  const deliveryElement = document.getElementById("cart-delivery");
  const totalElement = document.getElementById("cart-total");

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartBadge();

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-12 text-slate-500">
        <p class="text-4xl mb-3">🛒</p>
        <p class="text-lg font-bold text-slate-700">Your cart is currently empty!</p>
        <p class="text-sm text-slate-500 mb-6">Browse our online pharmacy and order genuine medicines.</p>
        <a href="medicine.html" class="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-md">
          Browse Medicines
        </a>
      </div>
    `;
    if (subtotalElement) subtotalElement.innerText = "0";
    if (deliveryElement) deliveryElement.innerText = "0";
    if (totalElement) totalElement.innerText = "0";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const qty = item.qty || 1;
    const itemTotal = item.price * qty;
    subtotal += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-item flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all gap-4">
        <div class="flex items-center gap-4">
          <img src="${item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200'}" onerror="this.src='https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200'" class="w-16 h-16 object-cover rounded-lg border border-slate-200" alt="${item.name}">
          <div>
            <h4 class="font-bold text-slate-800 text-base">${item.name}</h4>
            <p class="text-xs text-slate-500">Price: ₹${item.price} each</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
            <button onclick="changeQty(${index}, -1)" class="px-3 py-1 font-bold hover:bg-slate-200 text-slate-700 text-sm">-</button>
            <span class="px-3 py-1 text-sm font-semibold text-slate-800">${qty}</span>
            <button onclick="changeQty(${index}, 1)" class="px-3 py-1 font-bold hover:bg-slate-200 text-slate-700 text-sm">+</button>
          </div>
          <span class="font-bold text-slate-900 text-sm min-w-[70px] text-right">₹${itemTotal}</span>
          <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 p-2 text-sm font-bold" title="Remove Item">&times;</button>
        </div>
      </div>
    `;
  });

  const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;

  if (subtotalElement) subtotalElement.innerText = subtotal;
  if (deliveryElement) deliveryElement.innerText = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
  if (totalElement) totalElement.innerText = grandTotal;
}

function changeQty(index, delta) {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    cart = [];
    loadCart();
  }
}

function openForm() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const modal = document.getElementById("orderFormModal") || document.getElementById("orderForm");
  if (modal) modal.style.display = "flex";
}

function closeForm() {
  const modal = document.getElementById("orderFormModal") || document.getElementById("orderForm");
  if (modal) modal.style.display = "none";
}

async function submitOrder(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Kripya sabhi details bharein.");
    return;
  }

  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);
  const delivery = subtotal >= 299 ? 0 : 40;
  const totalAmount = subtotal + delivery;

  // Send to server API
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        items: cart,
        totalAmount
      })
    });
  } catch(err) {
    console.log("Server API offline, proceeding with local receipt");
  }

  alert(`🎉 Order Placed Successfully!\n\nOrder Total: ₹${totalAmount}\nCustomer: ${name}\nPhone: ${phone}\nDelivery Address: ${address}\n\nYour medicines will be delivered in 2 hours.`);

  localStorage.removeItem("cart");
  cart = [];
  closeForm();
  loadCart();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  if (window.location.pathname.includes("cart.html")) {
    loadCart();
  }
});