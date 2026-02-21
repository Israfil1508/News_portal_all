// Authentication Functions

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem(TOKEN_KEY) !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

// Save auth data
function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Clear auth data
function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

// Logout function
function logout() {
    clearAuth();
    window.location.href = '/index.html';
}

// Update navigation based on auth state
function updateNavigation() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (navAuth) navAuth.style.display = 'none';
        if (navUser) {
            navUser.style.display = 'flex';
            const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'User';
            if (userName) userName.textContent = fullName;
            
            // Add dashboard link based on role
            if (user.role === 'admin' || user.role === 'editor') {
                const adminLink = document.createElement('a');
                adminLink.href = 'admin/dashboard.html';
                adminLink.className = 'btn btn-primary btn-sm';
                adminLink.textContent = user.role === 'admin' ? 'অ্যাডমিন' : 'এডিটর';
                navUser.insertBefore(adminLink, navUser.firstChild);
            } else {
                // Regular user gets dashboard link
                const dashLink = document.createElement('a');
                dashLink.href = 'dashboard.html';
                dashLink.className = 'btn btn-primary btn-sm';
                dashLink.textContent = 'ড্যাশবোর্ড';
                navUser.insertBefore(dashLink, navUser.firstChild);
            }
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navUser) navUser.style.display = 'none';
    }
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Check if user is editor
function isEditor() {
    const user = getCurrentUser();
    return user && user.role === 'editor';
}

// Check if user is admin or editor
function isAdminOrEditor() {
    const user = getCurrentUser();
    return user && (user.role === 'admin' || user.role === 'editor');
}

// Require login - redirect to login if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Require admin or editor - redirect if not admin/editor
function requireAdmin() {
    if (!isLoggedIn()) {
        window.location.href = '../login.html';
        return false;
    }
    if (!isAdminOrEditor()) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navAuth = document.querySelector('.nav-auth');
    const navUser = document.querySelector('.nav-user');
    
    [navMenu, navAuth, navUser].forEach(el => {
        if (el) {
            el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// Show alert message
function showAlert(message, type = 'success') {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('bn-BD', options);
}

// Truncate text
function truncateText(text, length = 150) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    loadCategories();
});

// Load categories for dropdown
async function loadCategories() {
    try {
        const response = await CategoriesAPI.getAll();
        const categories = response.data || response;
        
        const dropdown = document.getElementById('categoryDropdown');
        if (dropdown && categories.length > 0) {
            dropdown.innerHTML = categories.map(cat => 
                `<a href="category.html?id=${cat.id}">${cat.name}</a>`
            ).join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}
