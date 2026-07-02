// 页面渲染脚本 - 根据fwsmdata.js动态生成页面内容

document.addEventListener('DOMContentLoaded', function() {
    if (typeof FWSM_DATA === 'undefined') {
        console.error('FWSM_DATA未定义，请确保js/fwsmdata.js已正确加载');
        return;
    }
    
    initPage();
    bindEvents();
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (savedTheme) {
        if (savedTheme === 'dark' && !isDark) {
            document.body.classList.add('dark-mode');
        } else if (savedTheme === 'light' && isDark) {
            document.body.classList.remove('dark-mode');
        }
    } else {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    updateThemeIcon(document.body.classList.contains('dark-mode'));
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
    updateSEO();
    renderLogo();
    renderSidebar();
    renderHeaderNav();
    renderQuickTabs();
    renderQuickLinks();
    renderBanner();
    renderCategories();
    renderFooter();
    initLazyLoad();
}

function updateSEO() {
    const title = document.querySelector('title');
    if (title) {
        title.textContent = FWSM_DATA.site.title;
    }
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', FWSM_DATA.site.description);
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', FWSM_DATA.site.keywords);
    }
}

function renderLogo() {
    const logoDomain = FWSM_DATA.footer.logo || 'fwsm.cn';
    const logoPath = getIconPath(logoDomain);
    
    const sidebarLogo = document.querySelector('.sidebar-logo');
    if (sidebarLogo) {
        sidebarLogo.innerHTML = `
            <a href="index.html" target="_self">
                <img src="${logoPath}" alt="${FWSM_DATA.site.name}" data-icon="${logoDomain}" onerror="tryNextImageFormat(this, this.getAttribute('data-icon'))">
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
    
    const topItems = FWSM_DATA.sidebar.filter(item => !item.isBottom);
    const bottomItems = FWSM_DATA.sidebar.filter(item => item.isBottom);
    
    const topHtml = topItems.map(item => {
        let href = item.isExternal ? item.url : `#${item.id}`;
        return `
            <a href="${href}" class="nav-item ${item.active ? 'active' : ''}" ${item.isExternal ? 'target="_self"' : ''} data-icon="${item.id}">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-text">${item.text}</span>
            </a>
        `;
    }).join('');
    
    const bottomHtml = bottomItems.map(item => {
        let href = item.isExternal ? item.url : `#${item.id}`;
        return `
            <a href="${href}" class="nav-item nav-bottom ${item.active ? 'active' : ''}" ${item.isExternal ? 'target="_self"' : ''} data-icon="${item.id}">
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
            url = FWSM_DATA.seo.ogUrl || '/';
        }
        return `<a href="${url}">${item.name}</a>`;
    }).join('');
}

function renderQuickTabs() {
    const quickTabs = document.querySelector('.quick-tabs');
    if (!quickTabs) return;
    
    quickTabs.innerHTML = FWSM_DATA.quickTabs.map(item => {
        const url = item.url || `#${item.id}`;
        const isExternal = url.startsWith('http://') || url.startsWith('https://');
        const target = isExternal ? 'target="_blank"' : '';
        return `
            <a href="${url}" class="tab ${item.active ? 'active' : ''}" ${target}>${item.text}</a>
        `;
    }).join('');
}

function renderQuickLinks() {
    const quickLinks = document.querySelector('.quick-links');
    if (!quickLinks) return;
    
    quickLinks.innerHTML = FWSM_DATA.quickLinks.map((item, index) => `
        <a href="${item.url}" target="${item.url.startsWith('#') ? '' : '_blank'}">${item.name}</a>
        ${index < FWSM_DATA.quickLinks.length - 1 ? '<span>|</span>' : ''}
    `).join('');
}

function renderBanner() {
    const banner = document.querySelector('.banner');
    if (!banner) return;
    
    const banners = FWSM_DATA.banners || [];
    if (banners.length === 0) {
        banner.style.display = 'none';
        return;
    }
    
    if (banners.length === 1) {
        banner.innerHTML = `
            <span>${banners[0].icon}</span>
            <span>${banners[0].text}</span>
            <button class="close-banner">✕</button>
        `;
        return;
    }
    
    banner.innerHTML = `
        <div class="banner-list">
            ${banners.map((item, index) => `
                <div class="banner-item" ${index === 0 ? 'style="display: block"' : ''}>
                    <span>${item.icon}</span>
                    <span>${item.text}</span>
                </div>
            `).join('')}
        </div>
        <button class="close-banner">✕</button>
    `;
    
    startBannerScroll();
}

let bannerInterval = null;

function startBannerScroll() {
    const bannerList = document.querySelector('.banner-list');
    if (!bannerList) return;
    
    const items = bannerList.querySelectorAll('.banner-item');
    if (items.length <= 1) return;
    
    let currentIndex = 0;
    
    bannerInterval = setInterval(() => {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].style.display = 'block';
        items[currentIndex].classList.add('banner-fade-in');
        setTimeout(() => {
            items[currentIndex].classList.remove('banner-fade-in');
        }, 500);
    }, 3000);
}

function renderCategories() {
    const content = document.querySelector('.content');
    if (!content) return;
    
    content.innerHTML = FWSM_DATA.categories.map(category => {
        if (category.isSubmitForm) {
            return renderSubmitForm(category);
        } else if (category.isFriendLinks) {
            return renderFriendLinks(category);
        } else {
            return renderCategorySection(category);
        }
    }).join('');
}

function renderCategorySection(category) {
    const sitesHtml = category.sites.map(site => {
        const displayName = site.name.length > 10 ? site.name.substring(0, 10) + '...' : site.name;
        return `
        <a href="${site.url}" target="${site.url.startsWith('#') || site.url === '#' ? '' : '_blank'}" class="site-card">
            <img data-src="${getIconPath(site.icon)}" data-icon="${site.icon}" alt="${site.name}" class="site-icon lazy">
            <div class="site-info">
                <span class="site-name" title="${site.name}">${displayName}</span>
                <span class="site-desc">${site.desc}</span>
            </div>
        </a>
        `;
    }).join('');
    
    return `
        <section id="${category.id}" class="category-section">
            <div class="section-header">
                <h3 class="category-title">${category.title}</h3>
                ${category.showMore ? '<a href="#" class="more-link">more+</a>' : ''}
            </div>
            <div class="sites-grid">
                ${sitesHtml}
            </div>
        </section>
    `;
}

function renderSubmitForm(category) {
    return `
        <section id="${category.id}" class="category-section">
            <div class="section-header">
                <h3 class="category-title">${category.title}</h3>
            </div>
            <div class="submit-form">
                <p>欢迎提交优质网站！请发送邮件至 <a href="mailto:${FWSM_DATA.site.email}">${FWSM_DATA.site.email}</a>，请务必包含以下信息：</p>
                <ul>
                    <li>网站名称：</li>
                    <li>网站地址：</li>
                    <li>网站简介：</li>
                    <li>网站图标（可选）：</li>
                </ul>
                <p class="submit-note">提交前请确保您的网站内容合法合规，我们会在24小时内审核并回复。</p>
            </div>
        </section>
    `;
}

function renderFriendLinks(category) {
    const linksHtml = category.links.map((link, index) => `
        <a href="${link.url}" target="${link.url.startsWith('/') || link.url.startsWith('#') ? '' : '_blank'}">${link.name}</a>
        ${index < category.links.length - 1 ? '<span>|</span>' : ''}
    `).join('');
    
    return `
        <section class="category-section">
            <div class="section-header">
                <h3 class="category-title">${category.title}</h3>
            </div>
            <div class="friend-links">
                ${linksHtml}
            </div>
        </section>
    `;
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

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    const icon = img.getAttribute('data-icon');
                    img.src = src;
                    img.onerror = function() {
                        tryNextImageFormat(this, icon);
                    };
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            const icon = img.getAttribute('data-icon');
            img.src = src;
            img.onerror = function() {
                tryNextImageFormat(this, icon);
            };
            img.classList.remove('lazy');
        });
    }
}

function bindEvents() {
    const sidebarItems = document.querySelectorAll('.nav-item');
    const quickTabs = document.querySelectorAll('.quick-tabs .tab');
    const searchInput = document.querySelector('.search-input');
    const siteCards = document.querySelectorAll('.site-card');
    const closeBanner = document.querySelector('.close-banner');
    const banner = document.querySelector('.banner');
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                sidebarItems.forEach(i => i.classList.remove('active'));
                quickTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = href.substring(1);
                const targetTab = document.querySelector(`.quick-tabs .tab[href="#${targetId}"]`);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
                
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    quickTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                quickTabs.forEach(t => t.classList.remove('active'));
                sidebarItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = href.substring(1);
                const targetNav = document.querySelector(`.nav-item[href="#${targetId}"]`);
                if (targetNav) {
                    targetNav.classList.add('active');
                }
                
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    siteCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    if (closeBanner && banner) {
        closeBanner.addEventListener('click', function() {
            banner.style.display = 'none';
        });
    }

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', function() {
            if (sidebar.style.display === 'none' || sidebar.style.display === '') {
                sidebar.style.display = 'flex';
            } else {
                sidebar.style.display = 'none';
            }
        });
    }

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.category-section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height && id) {
                sidebarItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
                quickTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.getAttribute('href') === '#' + id) {
                        tab.classList.add('active');
                    }
                });
            }
        });
    });
}

function updatePageData(newData) {
    if (newData) {
        Object.assign(FWSM_DATA, newData);
    }
    initPage();
    bindEvents();
}

function getCurrentData() {
    return FWSM_DATA;
}

function saveDataToLocal(data) {
    const dataStr = `// 网站基础数据和SEO配置文件

const FWSM_DATA = ${JSON.stringify(data, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FWSM_DATA;
}`;
    
    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fwsmdata.js';
    a.click();
    URL.revokeObjectURL(url);
    
    return dataStr;
}