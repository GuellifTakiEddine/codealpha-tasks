const cartContainer = document.getElementById("cartItems");
const totalElement = document.getElementById("total");
const cartSummary = document.getElementById("cartSummary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart(){

    cartContainer.innerHTML="";

    let total = 0;

    if(cart.length===0){
        cartContainer.innerHTML = `
            <div class="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
                <a href="index.html"><button class="btn-outline">Browse Products</button></a>
            </div>
        `;
        cartSummary.classList.add("hidden");
        return;
    }

    cartSummary.classList.remove("hidden");

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="card">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-body">
                    <div class="card-info">
                        <h3>${item.name}</h3>
                        <p class="price">$${item.price}</p>
                        <span class="quantity-badge">Qty: ${item.quantity}</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn-danger" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;

    });

    totalElement.innerText = `$${total.toFixed(2)}`;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

document.getElementById("checkoutBtn").addEventListener("click",()=>{

    if(cart.length===0){
        showToast("Your cart is empty!", "info");
        return;
    }

    window.location.href="checkout.html";

});

displayCart();
