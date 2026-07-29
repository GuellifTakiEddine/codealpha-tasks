function isLoggedIn() {
    return !!(localStorage.getItem("userId") && localStorage.getItem("token"));
}

function updateNavAuth() {
    const loginLink = document.getElementById("navLogin");
    const registerLink = document.getElementById("navRegister");
    const logoutBtn = document.getElementById("navLogout");

    if (!loginLink || !registerLink || !logoutBtn) return;

    const loggedIn = isLoggedIn();

    loginLink.classList.toggle("hidden", loggedIn);
    registerLink.classList.toggle("hidden", loggedIn);
    logoutBtn.classList.toggle("hidden", !loggedIn);
}

function guardAuthPages() {
    const path = window.location.pathname;
    const onAuthPage = path.includes("login.html") || path.includes("register.html");

    if (isLoggedIn() && onAuthPage) {
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    showToast("Logged out successfully", "success");
    updateNavAuth();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavAuth();
    guardAuthPages();

    const logoutBtn = document.getElementById("navLogout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
