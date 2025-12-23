const AUTH_TOKEN_KEY = "token";
const AUTH_USER_KEY = "user";

function saveAuthData({ token, user, remember }) {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem(AUTH_TOKEN_KEY, token);
    storage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function clearAuthData() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
}

function getToken() {
    return (
        localStorage.getItem(AUTH_TOKEN_KEY) ||
        sessionStorage.getItem(AUTH_TOKEN_KEY)
    );
}

function getUser() {
    const user =
        localStorage.getItem(AUTH_USER_KEY) ||
        sessionStorage.getItem(AUTH_USER_KEY);

    return user ? JSON.parse(user) : null;
}

function isAuthenticated() {
    return !!getToken();
}

function requireAuth(redirectTo = ROUTES.LOGIN) {
    if (!isAuthenticated()) {
        window.location.href = redirectTo;
    }
}

function logout() {
    clearAuthData();
}
