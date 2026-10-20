const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const addButtons = document.querySelectorAll('.add-btn');

let cart = [];

function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartCount.textContent = '0';
    totalPrice.textContent = '0';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        <span>$${item.price}</span>
      </div>
      <button class="close-btn" data-index="${index}">×</button>
    `;

    row.querySelector('button').addEventListener('click', () => {
      cart.splice(index, 1);
      renderCart();
    });

    cartItems.appendChild(row);
    total += item.price;
  });

  cartCount.textContent = String(cart.length);
  totalPrice.textContent = String(total);
}

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    cart.push({ name, price });
    renderCart();
    cartPanel.classList.add('open');
  });
});

cartButton.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

renderCart();
