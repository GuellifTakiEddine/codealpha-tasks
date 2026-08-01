const container = document.getElementById("product");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        const product = await res.json();

        container.innerHTML = `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price}</p>
                    <p>${product.description}</p>
                    <button id="addCartBtn">Add to Cart</button>
                </div>
            </div>
        `;

        document
            .getElementById("addCartBtn")
            .addEventListener("click", () => addToCart(product));

    } catch (err) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Product not found</h3>
                <p>Sorry, we couldn't load this product.</p>
                <a href="index.html"><button class="btn-outline">Back to Shop</button></a>
            </div>
        `;
        console.error(err);
    }
}

function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Added to cart!", "success");
    setTimeout(() => {
        window.location.href = "cart.html";
    }, 800);
}

loadProduct();
