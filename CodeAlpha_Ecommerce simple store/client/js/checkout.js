const cart = JSON.parse(localStorage.getItem("cart")) || [];

const user = localStorage.getItem("userId");

const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
}, 0);

document.getElementById("total").innerText = `$${total.toFixed(2)}`;

document.getElementById("placeOrder").addEventListener("click", async () => {

    if (!user) {
        showToast("Please login first!", "error");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
        return;
    }

    const products = cart.map(item => ({
        product: item._id,
        quantity: item.quantity
    }));

    const res = await fetch("http://localhost:5000/api/orders", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            user,
            products,
            total
        })

    });

    const data = await res.json();

    showToast(data.message, res.ok ? "success" : "error");

    if (res.ok) {
        localStorage.removeItem("cart");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }

});