// السلة
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// إظهار إشعار
function showNotification() {
  const notif = document.getElementById('cart-notification');
  notif.classList.add('show');
  setTimeout(() => {
    notif.classList.remove('show');
  }, 2000);
}

// إضافة منتج إلى السلة
function addToCart(name, price, image) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price: parseFloat(price), image, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification();
}

// ربط الأزرار (يُستخدم في صفحات الحلويات والمعجنات)
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const price = card.querySelector('.price').textContent.replace(' ر.ي', '');
    const image = card.querySelector('img').src;
    addToCart(name, price, image);
  });
});

// تحميل محتوى السلة (يُستخدم في cart.html)
function loadCart() {
  const cartContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; font-size:1.2rem;">سلة المشتريات فارغة!</p>';
    if (totalEl) totalEl.textContent = '0.00 ر.ي';
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>السعر: ${item.price.toFixed(2)} ر.ي</p>
        <p>الكمية: ${item.quantity}</p>
      </div>
      <div style="font-weight:700; font-size:1.2rem;">${itemTotal.toFixed(2)} ر.ي</div>
    `;
    cartContainer.appendChild(div);
  });

  if (totalEl) totalEl.textContent = `${total.toFixed(2)} ر.ي`;
}

// عند فتح صفحة السلة
if (document.getElementById('cart-items')) {
  loadCart();
}
// تمييز الرابط النشط في التنقل
document.querySelectorAll('nav a').forEach(link => {
  if (link.href === window.location.href) {
    link.style.color = '#e74c3c';
    link.style.fontWeight = '700';
  }
});