const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("remember");


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormError();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMe = rememberCheckbox.checked;

    // Empty fields
    if (!email || !password) {
        showFormError("Please fill in all required fields");
        return;
    }

    // Email format
    if (!isValidEmail(email)) {
        showFormError("Please enter a valid email address");
        return;
    }

    clearAuthData(); 

    saveAuthData({
        token: "ui-demo-token",
        user: { email },
        remember: rememberMe
    });

    // Redirect
    window.location.href = ROUTES.CARS_LIST;
});
