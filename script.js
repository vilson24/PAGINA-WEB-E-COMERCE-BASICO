// scripts.js

const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en el localStorage
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
}

// Añadir productos al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const id = product.getAttribute('data-id');
        const name = product.getAttribute('data-name');
        const price = product.getAttribute('data-price');

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1; // Incrementar la cantidad
            alert(`${name} ya está en el carrito. Se ha incrementado la cantidad.`);
        } else {
            cart.push({ id, name, price, quantity: 1 }); // Agregar nuevo producto
            alert(`${name} ha sido añadido al carrito`);
        }

        updateCart();
    });
});

// Mostrar productos en el carrito
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;

        li.innerHTML = `
            <img src="bolsa-de-la-compra.png" alt="${item.name}">
            <span>${item.name} - $${item.price} x ${item.quantity} = $${itemTotalPrice.toFixed(2)}</span>
            <div class="quantity-controls">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.appendChild(li);

        // Eliminar producto del carrito
        li.querySelector('.remove-from-cart').addEventListener('click', () => {
            const index = cart.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
                cart.splice(index, 1);
                updateCart();
                displayCart();
            }
        });

        // Aumentar cantidad
        li.querySelector('.increase-quantity').addEventListener('click', () => {
            item.quantity += 1;
            updateCart();
            displayCart();
        });

        // Disminuir cantidad
        li.querySelector('.decrease-quantity').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                const index = cart.findIndex(cartItem => cartItem.id === item.id);
                if (index > -1) {
                    cart.splice(index, 1);
                }
            }
            updateCart();
            displayCart();
        });
    });

    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Inicializar carrito
if (document.getElementById('cart-items')) {
    displayCart();
}

// Inicializar contador de carrito
updateCart();
