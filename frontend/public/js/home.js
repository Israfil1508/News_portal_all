// Home Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedArticles();
    loadLatestArticles();
    loadCategoriesGrid();
});

// Load featured articles
async function loadFeaturedArticles() {
    const container = document.getElementById('featuredArticles');
    
    try {
        const response = await ArticlesAPI.getFeatured();
        const articles = response.data || response;
        
        if (articles.length === 0) {
            container.innerHTML = '<p class="text-center">কোন বিশেষ খবর নেই</p>';
            return;
        }
        
        // First article as main featured
        const mainArticle = articles[0];
        const otherArticles = articles.slice(1, 3);
        
        let html = `
            <div class="article-card featured">
                <img src="${mainArticle.imageUrl || 'https://via.placeholder.com/800x400?text=News'}" alt="${mainArticle.title}">
                <div class="article-card-body">
                    <span class="category">${mainArticle.category?.name || 'সাধারণ'}</span>
                    <h3><a href="article.html?id=${mainArticle.id}">${mainArticle.title}</a></h3>
                    <p>${truncateText(mainArticle.content || mainArticle.summary || '', 200)}</p>
                    <div class="meta">
                        <span>✍️ ${mainArticle.author?.firstName || 'অজানা'}</span>
                        <span>📅 ${formatDate(mainArticle.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div class="featured-side">
        `;
        
        otherArticles.forEach(article => {
            html += `
                <div class="article-card">
                    <img src="${article.imageUrl || 'https://via.placeholder.com/400x200?text=News'}" alt="${article.title}">
                    <div class="article-card-body">
                        <span class="category">${article.category?.name || 'সাধারণ'}</span>
                        <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                        <div class="meta">
                            <span>📅 ${formatDate(article.createdAt)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<p class="text-center">খবর লোড করতে সমস্যা হয়েছে</p>';
        console.error('Error loading featured articles:', error);
    }
}

// Load latest articles
async function loadLatestArticles() {
    const container = document.getElementById('latestArticles');
    
    try {
        const response = await ArticlesAPI.getLatest(6);
        const articles = response.data || response;
        
        if (articles.length === 0) {
            container.innerHTML = '<p class="text-center">কোন খবর নেই</p>';
            return;
        }
        
        container.innerHTML = articles.map(article => `
            <div class="article-card">
                <img src="${article.imageUrl || 'https://via.placeholder.com/400x200?text=News'}" alt="${article.title}">
                <div class="article-card-body">
                    <span class="category">${article.category?.name || 'সাধারণ'}</span>
                    <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                    <p>${truncateText(article.content || article.summary || '', 100)}</p>
                    <div class="meta">
                        <span>✍️ ${article.author?.firstName || 'অজানা'}</span>
                        <span>📅 ${formatDate(article.createdAt)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p class="text-center">খবর লোড করতে সমস্যা হয়েছে</p>';
        console.error('Error loading latest articles:', error);
    }
}

// Load categories grid
async function loadCategoriesGrid() {
    const container = document.getElementById('categoriesGrid');
    
    try {
        const response = await CategoriesAPI.getAll();
        const categories = response.data || response;
        
        if (categories.length === 0) {
            container.innerHTML = '<p class="text-center">কোন ক্যাটাগরি নেই</p>';
            return;
        }
        
        container.innerHTML = categories.map(category => `
            <a href="category.html?id=${category.id}" class="category-card">
                <h3>${category.name}</h3>
                <span>${category.articleCount || 0} টি খবর</span>
            </a>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p class="text-center">ক্যাটাগরি লোড করতে সমস্যা হয়েছে</p>';
        console.error('Error loading categories:', error);
    }
}
