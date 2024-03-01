const products = [
    {
        id: 0,
        name: 'Clase de Yoga N°1',
        price: 10.99,
        image: './img/aksaya.jpg'
    },
    {
        id: 1,
        name: 'Clase de Yoga N°2',
        price: 12.99,
        image: './img/rasa.jpg'
    },
    {
        id: 2,
        name: 'Clase de Yoga N°3',
        price: 8.99,
        image: './img/aksaya.jpg'
    },
    {
        id: 3,
        name: 'Clase de Yoga N°4',
        price: 4.99,
        image: './img/rasa.jpg'
    },
  ];
  
  document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const emptyCartButton = document.getElementById('emptyCartButton');
    const cartBody = document.getElementById('cartBody');
    const totalElement = document.getElementById('total');
    const messageContainer = document.getElementById('messageContainer');
    const buyButton = document.getElementById('buyButton');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
  
        cartBody.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="img-thumbnail"></td>
                <td>${item.name}</td>
                <td align="right">$ ${item.price}</td>
                <td>${item.quantity}</td>
            `;
            cartBody.appendChild(row);
        });
  
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalElement.textContent = total.toFixed(2);
    }
  
    buyButton.addEventListener('click', () => {
        if (cart.length > 0) {
            // Validación de reserva
            const isValidPurchase = cart.length > 0;
    
            if (isValidPurchase) {
                // Reservar y mostrar mensaje
                displayMessage('Reserva realizada con éxito!');
  
                buyButton.classList.add('btn-success');
                setTimeout(() => {
                    buyButton.classList.remove('btn-success'); // Quita el estilo verde del boton de reserva después de 2 segundos
                }, 2000);
            } else {
                // Mostrar mensaje de reserva fallida
                displayMessage('No se puede efectuar la reserva. Verifica tu carrito.');
            }
        } else {
            displayMessage('El carrito está vacío. Añade algún tipo de clase antes de reservar.');
        }
    });
  
    function addToCartFromCarousel(productIndex) {
        const selectedProduct = products[productIndex];
        const existingItem = cart.find(item => item.id === selectedProduct.id);
  
        if (cart.length === 0) {
            cart.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
                image: selectedProduct.image
            });
  
            displayMessage('Clase añadida al carrito!');
        } else {
            displayMessage('Solo se permite reservar un tipo de clase a la vez. Vacía el carrito para añadir otro.');
        }
  
        updateCart();
    }
  
    function emptyCart() {
        cart = [];
        updateCart();
        displayMessage('Carrito vacío.');
    }
  
    function displayMessage(message) {
        messageContainer.innerHTML = `<p>${message}</p>`;
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 3000);
    }
  
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => addToCartFromCarousel(index));
    });
  
    emptyCartButton.addEventListener('click', emptyCart);
  
    updateCart();
  });
  