// API Helper Functions

async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem(TOKEN_KEY);
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'কিছু সমস্যা হয়েছে');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// GET Request
async function apiGet(endpoint) {
    return apiRequest(endpoint, { method: 'GET' });
}

// POST Request
async function apiPost(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// PUT Request
async function apiPut(endpoint, data) {
    return apiRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

// DELETE Request
async function apiDelete(endpoint) {
    return apiRequest(endpoint, { method: 'DELETE' });
}

// Articles API
const ArticlesAPI = {
    getAll: async (params = '') => {
        const res = await apiGet(`/articles${params}`);
        return { data: res.data?.articles || [], total: res.data?.pagination?.total || 0, totalPages: res.data?.pagination?.totalPages || 1 };
    },
    getOne: async (id) => {
        const res = await apiGet(`/articles/${id}`);
        return res.data?.article || res.data;
    },
    getBySlug: (slug) => apiGet(`/articles/slug/${slug}`),
    getFeatured: async () => {
        const res = await apiGet('/articles?featured=true&limit=5');
        return { data: res.data?.articles || [] };
    },
    getLatest: async (limit = 6) => {
        const res = await apiGet(`/articles?limit=${limit}`);
        return { data: res.data?.articles || [] };
    },
    getByCategory: async (categoryId, page = 1) => {
        const res = await apiGet(`/articles?categoryId=${categoryId}&page=${page}`);
        return { data: res.data?.articles || [], totalPages: res.data?.pagination?.totalPages || 1 };
    },
    create: (data) => apiPost('/articles', data),
    update: (id, data) => apiPut(`/articles/${id}`, data),
    delete: (id) => apiDelete(`/articles/${id}`),
};

// Categories API
const CategoriesAPI = {
    getAll: async () => {
        const res = await apiGet('/categories');
        return { data: res.data?.categories || [] };
    },
    getOne: async (id) => {
        const res = await apiGet(`/categories/${id}`);
        return res.data?.category || res.data;
    },
    create: (data) => apiPost('/categories', data),
    update: (id, data) => apiPut(`/categories/${id}`, data),
    delete: (id) => apiDelete(`/categories/${id}`),
};

// Auth API
const AuthAPI = {
    login: async (data) => {
        const res = await apiPost('/auth/login', data);
        return { token: res.data?.token, user: res.data?.user };
    },
    register: async (data) => {
        const res = await apiPost('/auth/register', data);
        return { token: res.data?.token, user: res.data?.user };
    },
    getProfile: async () => {
        const res = await apiGet('/auth/profile');
        return res.data?.user || res.data;
    },
    updateProfile: (data) => apiPut('/auth/profile', data),
};

// Users API (Admin)
const UsersAPI = {
    getAll: async () => {
        const res = await apiGet('/users');
        return { data: res.data?.users || [] };
    },
    getOne: (id) => apiGet(`/users/${id}`),
    update: (id, data) => apiPut(`/users/${id}`, data),
    delete: (id) => apiDelete(`/users/${id}`),
};
