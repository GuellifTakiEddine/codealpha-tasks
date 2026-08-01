const container = document.getElementById("products");

async function loadProducts() {

    const res = await fetch("http://localhost:5000/api/products");

    const products = await res.json();

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <button onclick="viewProduct('${product._id}')">View Details</button>
                </div>
            </div>
        `;
    });

}

function viewProduct(id) {
    console.log("Product ID:", id);
    window.location.href = `product.html?id=${id}`;
}

loadProducts();
