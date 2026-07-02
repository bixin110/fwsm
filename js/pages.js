// 联系和关于页面脚本

document.addEventListener('DOMContentLoaded', function() {
    initPage();
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.title = isDark ? '切换到白天模式' : '切换到暗色模式';
    }
    const floatBtn = document.querySelector('.float-theme');
    if (floatBtn) {
        floatBtn.textContent = isDark ? '☀️' : '🌙';
        floatBtn.title = isDark ? '切换到白天模式' : '切换到暗色模式';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function initPage() {
    renderLogo();
    renderSidebar();
    renderHeaderNav();
    renderPageContent();
    renderFooter();
}

function renderLogo() {
    const logoDomain = FWSM_DATA.footer.logo || 'fwsm.cn';
    const logoPath = getIconPath(logoDomain);
    
    const sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.innerHTML = `
            <a href="index.html" target="_self">
                <img src="${logoPath}" data-icon="${logoDomain}" alt="${FWSM_DATA.site.name}" onerror="tryNextImageFormat(this, this.getAttribute('data-icon'))">
            </a>
        `;
    }
    
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.href = 'index.html';
        logoText.target = '_self';
        logoText.textContent = FWSM_DATA.site.name;
    }
}

function renderSidebar() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;
    
    const currentPage = window.location.pathname;
    
    const topItems = FWSM_DATA.sidebar.filter(item => !item.isBottom);
    const bottomItems = FWSM_DATA.sidebar.filter(item => item.isBottom);
    
    const topHtml = topItems.map(item => {
        let href = '';
        if (item.isExternal && item.url) {
            href = item.url;
        } else if (item.id === 'home') {
            href = 'index.html';
        } else {
            href = 'index.html#' + item.id;
        }
        
        const isActive = (!currentPage.includes('contact.html') && !currentPage.includes('about.html') && item.active);
        
        return `
            <a href="${href}" class="nav-item ${isActive ? 'active' : ''}" data-icon="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-text">${item.text}</span>
            </a>
        `;
    }).join('');
    
    const bottomHtml = bottomItems.map(item => {
        let href = '';
        if (item.isExternal && item.url) {
            href = item.url;
        } else if (item.id === 'home') {
            href = 'index.html';
        } else {
            href = 'index.html#' + item.id;
        }
        
        const isActive = (currentPage.includes('contact.html') && item.id === 'contact') ||
                        (currentPage.includes('about.html') && item.id === 'about');
        
        return `
            <a href="${href}" class="nav-item nav-bottom ${isActive ? 'active' : ''}" data-icon="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-text">${item.text}</span>
            </a>
        `;
    }).join('');
    
    sidebarNav.innerHTML = `
        <div class="nav-top">
            ${topHtml}
        </div>
        <div class="nav-bottom-wrapper">
            ${bottomHtml}
        </div>
    `;
}

function renderHeaderNav() {
    const headerNav = document.querySelector('.header-nav');
    if (!headerNav) return;
    
    headerNav.innerHTML = FWSM_DATA.headerNav.map(item => {
        let url = item.url;
        if (url === '__ogUrl__') {
            url = FWSM_DATA.seo.ogUrl || 'index.html';
        }
        if (url === '/contact.html') url = 'contact.html';
        if (url === '/about.html') url = 'about.html';
        return `<a href="${url}">${item.name}</a>`;
    }).join('');
}

function renderPageContent() {
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    const pageSections = document.querySelector('.page-sections');
    
    // 判断是联系页面还是关于页面
    const isContact = window.location.pathname.includes('contact.html');
    const pageData = isContact ? FWSM_DATA.contactPage : FWSM_DATA.aboutPage;
    
    if (pageTitle) {
        pageTitle.textContent = pageData.title;
    }
    
    if (pageSubtitle) {
        pageSubtitle.textContent = pageData.subtitle;
    }
    
    if (pageSections) {
        pageSections.innerHTML = pageData.sections.map(section => `
            <div class="page-section">
                <h2 class="page-section-title">${section.title}</h2>
                <p class="page-section-content">${section.content}</p>
            </div>
        `).join('');
    }
    
    // 更新页面标题
    const title = document.querySelector('title');
    if (title) {
        title.textContent = `${pageData.title} - ${FWSM_DATA.site.name}`;
    }
}

// 支持的图片格式优先级
const IMAGE_EXTENSIONS = ['png', 'ico', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];

function getIconPath(iconDomain) {
    if (!iconDomain || iconDomain === '' || iconDomain === 'logo') {
        return 'img/imgbug.png';
    }
    // 默认返回 png 格式，后续通过 onerror 自动尝试其他格式
    return `img/${iconDomain}.png`;
}

// 图片加载失败时自动尝试其他格式
function tryNextImageFormat(img, iconDomain) {
    if (!iconDomain) {
        img.src = 'img/imgbug.png';
        return;
    }

    // 获取当前尝试的格式索引
    const currentSrc = img.src;
    let currentIndex = -1;

    for (let i = 0; i < IMAGE_EXTENSIONS.length; i++) {
        if (currentSrc.includes(`.${IMAGE_EXTENSIONS[i]}`)) {
            currentIndex = i;
            break;
        }
    }

    // 尝试下一个格式
    const nextIndex = currentIndex + 1;
    if (nextIndex < IMAGE_EXTENSIONS.length) {
        img.src = `img/${iconDomain}.${IMAGE_EXTENSIONS[nextIndex]}`;
    } else {
        // 所有格式都尝试失败，使用默认图片
        img.src = 'img/imgbug.png';
    }
}

function renderFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-logo">
                <img src="${getIconPath(FWSM_DATA.footer.logo)}" data-icon="${FWSM_DATA.footer.logo}" alt="${FWSM_DATA.site.name}" onerror="tryNextImageFormat(this, this.getAttribute('data-icon'))">
                <span>${FWSM_DATA.site.name}</span>
            </div>
            <div class="footer-info">
                <p>联系邮箱：<a href="mailto:${FWSM_DATA.footer.email || FWSM_DATA.site.email}">${FWSM_DATA.footer.email || FWSM_DATA.site.email}</a></p>
                <p>${FWSM_DATA.footer.slogan || FWSM_DATA.site.slogan}</p>
                <p>${FWSM_DATA.footer.copyright || ''}</p>
            </div>
        </div>
    `;
}