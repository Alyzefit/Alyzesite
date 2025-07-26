
const cart = [];

function fetchProducts() {
    const list = document.getElementById("product-list");
    const stored = localStorage.getItem("alyze_products");
    if (!stored) return;
    const products = JSON.parse(stored);
    products.forEach(prod => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${prod.images[0]}" onclick="openImage('${prod.images[0]}')" style="width:100%; border-radius:8px;">
            <h4>${prod.name}</h4>
            <p>${prod.description}</p>
            <p><strong>R$ ${prod.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${prod.id})">Adicionar ao carrinho</button>
        `;
        list.appendChild(div);
    });
}

function addToCart(id) {
    const stored = JSON.parse(localStorage.getItem("alyze_products"));
    const item = stored.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const ul = document.getElementById("cart-items");
    ul.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        ul.appendChild(li);
    });
}

function sendToWhatsApp() {
    const phone = "54999995303";
    let message = "Olá! Quero esses produtos da Alyze:%0A";
    cart.forEach(item => {
        message += `• ${item.name} - R$ ${item.price.toFixed(2)}%0A`;
    });
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function openImage(src) {
    const w = window.open("");
    w.document.write(`<img src='${src}' style='width:100%'>`);
}

fetchProducts();
