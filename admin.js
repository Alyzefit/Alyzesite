
const form = document.getElementById("product-form");
const list = document.getElementById("product-list-admin");

function renderAdmin() {
    const stored = localStorage.getItem("alyze_products");
    if (!stored) return;
    const products = JSON.parse(stored);
    list.innerHTML = "";
    products.forEach((prod, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${prod.name}</strong> - R$ ${prod.price.toFixed(2)}<br>
            <small>${prod.description}</small><br>
            <button onclick="removeProduct(${i})">Remover</button>
        `;
        list.appendChild(li);
    });
}

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem("alyze_products"));
    products.splice(index, 1);
    localStorage.setItem("alyze_products", JSON.stringify(products));
    renderAdmin();
}

form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const sizes = document.getElementById("sizes").value.split(",");
    const colors = document.getElementById("colors").value.split(",");
    const description = document.getElementById("description").value;
    const images = document.getElementById("images").value.split(",");

    const newProduct = {
        id: Date.now(),
        name,
        price,
        sizes,
        colors,
        description,
        images
    };

    let products = JSON.parse(localStorage.getItem("alyze_products")) || [];
    products.push(newProduct);
    localStorage.setItem("alyze_products", JSON.stringify(products));

    form.reset();
    renderAdmin();
};

renderAdmin();
