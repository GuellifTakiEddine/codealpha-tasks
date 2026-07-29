function showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");

    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const icons = {
        success: "✓",
        error: "✕",
        info: "i"
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" type="button" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    const dismiss = () => {
        toast.classList.remove("show");
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", dismiss);
    setTimeout(dismiss, 4000);
}
