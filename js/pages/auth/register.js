
const registerForm = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const termsCheckbox = document.getElementById("terms");


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFormError(); 

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();
    const acceptedTerms = termsCheckbox.checked;

    // Validation
    if (!username || !email || !password || !confirm) {
        showFormError("Please fill in all required fields");
        return;
    }

    if (username.length < 3) {
        showFormError("Full name must be at least 3 characters");
        return;
    }

    if (!isValidEmail(email)) {
        showFormError("Please enter a valid email address");
        return;
    }

    if (password.length < 6) {
        showFormError("Password must be at least 6 characters");
        return;
    }

    if (password !== confirm) {
        showFormError("Passwords do not match");
        return;
    }

    if (!acceptedTerms) {
        showFormError("You must agree to the terms and conditions");
        return;
    }

    clearAuthData();

    // Fake register success (UI only)
    saveAuthData({
        token: "ui-demo-token",
        user: {
            name: username,
            email: email
        },
        remember: true // Register always LocalStorage
    });

    // Redirect after register
    window.location.href = "/pages/cars_landing/index.html";
});
