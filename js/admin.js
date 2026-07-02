// 管理页面脚本

let currentData = null;
let currentEditType = null;
let currentEditIndex = null;
let currentCategoryIndex = null;
let currentPageType = null; // 'contact' 或 'about'

document.addEventListener('DOMContentLoaded', function() {
    if (typeof FWSM_DATA === 'undefined') {
        showToast('数据文件未加载', 'error');
        return;
    }
    
    currentData = JSON.parse(JSON.stringify(FWSM_DATA));
    
    initBasicPanel();
    initSEOPanel();
    initContactPanel();
    initAboutPanel();
    initSidebarPanel();
    initFriendLinksPanel();
    initBannersPanel();
    initCategoriesPanel();
    initFooterPanel();
    initOtherPanel();
    
    bindNavEvents();
});

function bindNavEvents() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const panelId = this.getAttribute('data-panel');
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`${panelId}-panel`).classList.add('active');
        });
    });
}

// 网站基础信息
function initBasicPanel() {
    document.getElementById('site-name').value = currentData.site.name;
    document.getElementById('site-title').value = currentData.site.title;
    document.getElementById('site-subtitle').value = currentData.site.subtitle || '';
    document.getElementById('site-description').value = currentData.site.description;
    document.getElementById('site-keywords').value = currentData.site.keywords;
    document.getElementById('site-email').value = currentData.site.email;
    document.getElementById('site-slogan').value = currentData.site.slogan;
    document.getElementById('site-icp').value = currentData.site.icp || '';
}

function updateSiteInfo() {
    currentData.site.name = document.getElementById('site-name').value;
    currentData.site.title = document.getElementById('site-title').value;
    currentData.site.subtitle = document.getElementById('site-subtitle').value;
    currentData.site.description = document.getElementById('site-description').value;
    currentData.site.keywords = document.getElementById('site-keywords').value;
    currentData.site.email = document.getElementById('site-email').value;
    currentData.site.slogan = document.getElementById('site-slogan').value;
    currentData.site.icp = document.getElementById('site-icp').value;
    showToast('网站基础信息已保存');
}

// SEO配置
function initSEOPanel() {
    document.getElementById('seo-title').value = currentData.seo.metaTitle;
    document.getElementById('seo-description').value = currentData.seo.metaDescription;
    document.getElementById('seo-keywords').value = currentData.seo.metaKeywords;
    document.getElementById('seo-author').value = currentData.seo.metaAuthor;
    document.getElementById('seo-robots').value = currentData.seo.metaRobots;
    document.getElementById('seo-canonical').value = currentData.seo.canonical;
    document.getElementById('seo-og-title').value = currentData.seo.ogTitle;
    document.getElementById('seo-og-description').value = currentData.seo.ogDescription;
    document.getElementById('seo-og-type').value = currentData.seo.ogType;
    document.getElementById('seo-og-url').value = currentData.seo.ogUrl;
}

function updateSEO() {
    currentData.seo.metaTitle = document.getElementById('seo-title').value;
    currentData.seo.metaDescription = document.getElementById('seo-description').value;
    currentData.seo.metaKeywords = document.getElementById('seo-keywords').value;
    currentData.seo.metaAuthor = document.getElementById('seo-author').value;
    currentData.seo.metaRobots = document.getElementById('seo-robots').value;
    currentData.seo.canonical = document.getElementById('seo-canonical').value;
    currentData.seo.ogTitle = document.getElementById('seo-og-title').value;
    currentData.seo.ogDescription = document.getElementById('seo-og-description').value;
    currentData.seo.ogType = document.getElementById('seo-og-type').value;
    currentData.seo.ogUrl = document.getElementById('seo-og-url').value;
    showToast('SEO配置已保存');
}

// 联系页面配置
function initContactPanel() {
    document.getElementById('contact-title').value = currentData.contactPage.title;
    document.getElementById('contact-subtitle').value = currentData.contactPage.subtitle;
    renderContactSections();
}

function renderContactSections() {
    const list = document.getElementById('contact-sections');
    list.innerHTML = currentData.contactPage.sections.map((section, index) => `
        <div class="item-row">
            <div class="item-info">
                <span class="item-name">${section.title}</span>
                <span class="item-id">${section.content.substring(0, 30)}...</span>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editContactSection(${index})">编辑</button>
                <button class="btn-delete" onclick="deleteContactSection(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

function addContactSection() {
    currentEditType = 'section';
    currentPageType = 'contact';
    currentEditIndex = -1;
    showModal('添加内容区块', `
        <div class="form-group"><label>区块标题：</label><input type="text" id="edit-section-title" class="form-input" placeholder="例如：联系方式"></div>
        <div class="form-group"><label>区块内容：</label><textarea id="edit-section-content" class="form-input" rows="5" placeholder="可使用 HTML 链接格式：&lt;a href=&quot;https://example.com&quot;&gt;链接文字&lt;/a&gt;"></textarea></div>
    `);
}

function editContactSection(index) {
    currentEditType = 'section';
    currentPageType = 'contact';
    currentEditIndex = index;
    const section = currentData.contactPage.sections[index];
    showModal('编辑内容区块', `
        <div class="form-group"><label>区块标题：</label><input type="text" id="edit-section-title" class="form-input" value="${section.title}"></div>
        <div class="form-group"><label>区块内容：</label><textarea id="edit-section-content" class="form-input" rows="5" placeholder="可使用 HTML 链接格式：&lt;a href=&quot;https://example.com&quot;&gt;链接文字&lt;/a&gt;">${section.content}</textarea></div>
    `);
}

function deleteContactSection(index) {
    if (confirm('确定要删除此内容区块吗？')) {
        currentData.contactPage.sections.splice(index, 1);
        renderContactSections();
        showToast('删除成功');
    }
}

function updateContactPage() {
    currentData.contactPage.title = document.getElementById('contact-title').value;
    currentData.contactPage.subtitle = document.getElementById('contact-subtitle').value;
    showToast('联系页面配置已保存');
}

// 关于页面配置
function initAboutPanel() {
    document.getElementById('about-title').value = currentData.aboutPage.title;
    document.getElementById('about-subtitle').value = currentData.aboutPage.subtitle;
    renderAboutSections();
}

function renderAboutSections() {
    const list = document.getElementById('about-sections');
    list.innerHTML = currentData.aboutPage.sections.map((section, index) => `
        <div class="item-row">
            <div class="item-info">
                <span class="item-name">${section.title}</span>
                <span class="item-id">${section.content.substring(0, 30)}...</span>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editAboutSection(${index})">编辑</button>
                <button class="btn-delete" onclick="deleteAboutSection(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

function addAboutSection() {
    currentEditType = 'section';
    currentPageType = 'about';
    currentEditIndex = -1;
    showModal('添加内容区块', `
        <div class="form-group"><label>区块标题：</label><input type="text" id="edit-section-title" class="form-input" placeholder="例如：网站简介"></div>
        <div class="form-group"><label>区块内容：</label><textarea id="edit-section-content" class="form-input" rows="5" placeholder="可使用 HTML 链接格式：&lt;a href=&quot;https://example.com&quot;&gt;链接文字&lt;/a&gt;"></textarea></div>
    `);
}

function editAboutSection(index) {
    currentEditType = 'section';
    currentPageType = 'about';
    currentEditIndex = index;
    const section = currentData.aboutPage.sections[index];
    showModal('编辑内容区块', `
        <div class="form-group"><label>区块标题：</label><input type="text" id="edit-section-title" class="form-input" value="${section.title}"></div>
        <div class="form-group"><label>区块内容：</label><textarea id="edit-section-content" class="form-input" rows="5" placeholder="可使用 HTML 链接格式：&lt;a href=&quot;https://example.com&quot;&gt;链接文字&lt;/a&gt;">${section.content}</textarea></div>
    `);
}

function deleteAboutSection(index) {
    if (confirm('确定要删除此内容区块吗？')) {
        currentData.aboutPage.sections.splice(index, 1);
        renderAboutSections();
        showToast('删除成功');
    }
}

function updateAboutPage() {
    currentData.aboutPage.title = document.getElementById('about-title').value;
    currentData.aboutPage.subtitle = document.getElementById('about-subtitle').value;
    showToast('关于页面配置已保存');
}

// 侧边栏导航
function initSidebarPanel() {
    const list = document.getElementById('sidebar-list');
    list.innerHTML = currentData.sidebar.map((item, index) => `
        <div class="item-row">
            <span class="item-icon">${item.icon}</span>
            <div class="item-info">
                <span class="item-name">${item.text}</span>
                <span class="item-id">ID: ${item.id}</span>
            </div>
            <div class="item-actions">
                <button class="btn-move" onclick="moveSidebarUp(${index})" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="btn-move" onclick="moveSidebarDown(${index})" ${index === currentData.sidebar.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="btn-edit" onclick="editSidebarItem(${index})">编辑</button>
                <button class="btn-delete" onclick="deleteSidebarItem(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

// 友情链接管理
function getFriendLinksCategory() {
    return currentData.categories.find(c => c.isFriendLinks);
}

function initFriendLinksPanel() {
    const list = document.getElementById('friendlinks-list');
    const category = getFriendLinksCategory();
    if (!category || !category.links) {
        list.innerHTML = '<p class="empty-tip">暂无友情链接</p>';
        return;
    }
    list.innerHTML = category.links.map((link, index) => `
        <div class="item-row">
            <div class="item-info">
                <span class="item-name">${link.name}</span>
                <span class="item-id">${link.url}</span>
            </div>
            <div class="item-actions">
                <button class="btn-move" onclick="moveFriendLinkItemUp(${index})" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="btn-move" onclick="moveFriendLinkItemDown(${index})" ${index === category.links.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="btn-edit" onclick="editFriendLinkItem(${index})">编辑</button>
                <button class="btn-delete" onclick="deleteFriendLinkItem(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

function addFriendLinkItem() {
    currentEditType = 'friendLinkItem';
    currentEditIndex = -1;
    showModal('添加友情链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input"></div>
    `);
}

function editFriendLinkItem(index) {
    currentEditType = 'friendLinkItem';
    currentEditIndex = index;
    const category = getFriendLinksCategory();
    const link = category.links[index];
    showModal('编辑友情链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input" value="${link.name}"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input" value="${link.url}"></div>
    `);
}

function deleteFriendLinkItem(index) {
    if (confirm('确定要删除此友情链接吗？')) {
        const category = getFriendLinksCategory();
        category.links.splice(index, 1);
        initFriendLinksPanel();
        showToast('删除成功');
    }
}

function moveFriendLinkItemUp(index) {
    const category = getFriendLinksCategory();
    if (index > 0) {
        [category.links[index], category.links[index - 1]] = [category.links[index - 1], category.links[index]];
        initFriendLinksPanel();
        showToast('链接已上移');
    }
}

function moveFriendLinkItemDown(index) {
    const category = getFriendLinksCategory();
    const links = category.links;
    if (index < links.length - 1) {
        [links[index], links[index + 1]] = [links[index + 1], links[index]];
        initFriendLinksPanel();
        showToast('链接已下移');
    }
}

function moveSidebarUp(index) {
    if (index > 0) {
        [currentData.sidebar[index], currentData.sidebar[index - 1]] = [currentData.sidebar[index - 1], currentData.sidebar[index]];
        initSidebarPanel();
        showToast('已上移');
    }
}

function moveSidebarDown(index) {
    if (index < currentData.sidebar.length - 1) {
        [currentData.sidebar[index], currentData.sidebar[index + 1]] = [currentData.sidebar[index + 1], currentData.sidebar[index]];
        initSidebarPanel();
        showToast('已下移');
    }
}

function addSidebarItem() {
    currentEditType = 'sidebar';
    currentEditIndex = -1;
    showModal('添加侧边栏导航', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" placeholder="例如：home"></div>
        <div class="form-group"><label>图标：</label><input type="text" id="edit-icon" class="form-input" placeholder="例如：🏠"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" placeholder="例如：常用"></div>
    `);
}

function editSidebarItem(index) {
    currentEditType = 'sidebar';
    currentEditIndex = index;
    const item = currentData.sidebar[index];
    showModal('编辑侧边栏导航', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" value="${item.id}"></div>
        <div class="form-group"><label>图标：</label><input type="text" id="edit-icon" class="form-input" value="${item.icon}"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" value="${item.text}"></div>
    `);
}

function deleteSidebarItem(index) {
    if (confirm('确定要删除此导航项吗？')) {
        currentData.sidebar.splice(index, 1);
        initSidebarPanel();
        showToast('删除成功');
    }
}

// 公告管理
function initBannersPanel() {
    const list = document.getElementById('banners-list');
    if (!list) return;
    
    const banners = currentData.banners || [];
    list.innerHTML = banners.map((item, index) => `
        <div class="item-row">
            <span class="item-icon">${item.icon}</span>
            <div class="item-info">
                <span class="item-name">${item.text}</span>
            </div>
            <div class="item-actions">
                <button class="btn-move" onclick="moveBannerUp(${index})" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="btn-move" onclick="moveBannerDown(${index})" ${index === banners.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="btn-edit" onclick="editBanner(${index})">编辑</button>
                <button class="btn-delete" onclick="deleteBanner(${index})">删除</button>
            </div>
        </div>
    `).join('');
}

function addBanner() {
    currentEditType = 'banner';
    currentEditIndex = -1;
    showModal('添加公告', `
        <div class="form-group"><label>图标：</label><input type="text" id="edit-icon" class="form-input" placeholder="例如：📢"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" placeholder="例如：欢迎使用良家导航"></div>
    `);
}

function editBanner(index) {
    currentEditType = 'banner';
    currentEditIndex = index;
    const item = currentData.banners[index];
    showModal('编辑公告', `
        <div class="form-group"><label>图标：</label><input type="text" id="edit-icon" class="form-input" value="${item.icon}"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" value="${item.text}"></div>
    `);
}

function deleteBanner(index) {
    if (confirm('确定要删除此公告吗？')) {
        currentData.banners.splice(index, 1);
        initBannersPanel();
        showToast('删除成功');
    }
}

function moveBannerUp(index) {
    if (index > 0) {
        [currentData.banners[index], currentData.banners[index - 1]] = [currentData.banners[index - 1], currentData.banners[index]];
        initBannersPanel();
        showToast('已上移');
    }
}

function moveBannerDown(index) {
    if (index < currentData.banners.length - 1) {
        [currentData.banners[index], currentData.banners[index + 1]] = [currentData.banners[index + 1], currentData.banners[index]];
        initBannersPanel();
        showToast('已下移');
    }
}

// 分类展开状态
let categoryOpenStates = {};

// 分类区域
function initCategoriesPanel() {
    const tree = document.getElementById('categories-tree');
    tree.innerHTML = currentData.categories.map((category, index) => {
        const isOpen = categoryOpenStates[index] === true;
        return `
        <div class="category-item">
            <div class="category-header" onclick="toggleCategory(${index})">
                <h4>${category.title}</h4>
                <div class="item-actions">
                    <span class="category-toggle" id="toggle-${index}">${isOpen ? '▲' : '▼'}</span>
                    <button class="btn-move" onclick="moveCategoryUp(${index}); event.stopPropagation();" ${index === 0 ? 'disabled' : ''}>↑</button>
                    <button class="btn-move" onclick="moveCategoryDown(${index}); event.stopPropagation();" ${index === currentData.categories.length - 1 ? 'disabled' : ''}>↓</button>
                    <button class="btn-edit" onclick="editCategory(${index}); event.stopPropagation();">编辑</button>
                    <button class="btn-delete" onclick="deleteCategory(${index}); event.stopPropagation();">删除</button>
                </div>
            </div>
            <div class="category-content ${isOpen ? 'open' : ''}" id="category-content-${index}">
                ${!category.isSubmitForm && !category.isFriendLinks ? `
                    <div class="panel-actions"><button class="btn-primary" onclick="addSiteToCategory(${index})">添加网站</button></div>
                    <div class="items-list">
                        ${category.sites.map((site, siteIndex) => `
                            <div class="item-row">
                                <img src="${site.icon ? `img/${site.icon}.png` : 'img/logo.png'}" style="width: 32px; height: 32px; border-radius: 4px;" onerror="this.src='img/logo.png'">
                                <div class="item-info"><span class="item-name">${site.name}</span><span class="item-id">${site.url}</span></div>
                                <div class="item-actions">
                                    <button class="btn-move" onclick="moveSiteUp(${index}, ${siteIndex})" ${siteIndex === 0 ? 'disabled' : ''}>↑</button>
                                    <button class="btn-move" onclick="moveSiteDown(${index}, ${siteIndex})" ${siteIndex === category.sites.length - 1 ? 'disabled' : ''}>↓</button>
                                    <button class="btn-edit" onclick="editSite(${index}, ${siteIndex})">编辑</button>
                                    <button class="btn-delete" onclick="deleteSite(${index}, ${siteIndex})">删除</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${category.isFriendLinks ? `
                    <div class="panel-actions"><button class="btn-primary" onclick="addFriendLink(${index})">添加链接</button></div>
                    <div class="items-list">
                        ${category.links.map((link, linkIndex) => `
                            <div class="item-row">
                                <div class="item-info"><span class="item-name">${link.name}</span><span class="item-id">${link.url}</span></div>
                                <div class="item-actions">
                                    <button class="btn-move" onclick="moveFriendLinkUp(${index}, ${linkIndex})" ${linkIndex === 0 ? 'disabled' : ''}>↑</button>
                                    <button class="btn-move" onclick="moveFriendLinkDown(${index}, ${linkIndex})" ${linkIndex === category.links.length - 1 ? 'disabled' : ''}>↓</button>
                                    <button class="btn-edit" onclick="editFriendLink(${index}, ${linkIndex})">编辑</button>
                                    <button class="btn-delete" onclick="deleteFriendLink(${index}, ${linkIndex})">删除</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
}

function moveCategoryUp(index) {
    if (index > 0) {
        [currentData.categories[index], currentData.categories[index - 1]] = [currentData.categories[index - 1], currentData.categories[index]];
        initCategoriesPanel();
        showToast('分类已上移');
    }
}

function moveCategoryDown(index) {
    if (index < currentData.categories.length - 1) {
        [currentData.categories[index], currentData.categories[index + 1]] = [currentData.categories[index + 1], currentData.categories[index]];
        initCategoriesPanel();
        showToast('分类已下移');
    }
}

function moveSiteUp(categoryIndex, siteIndex) {
    if (siteIndex > 0) {
        [currentData.categories[categoryIndex].sites[siteIndex], currentData.categories[categoryIndex].sites[siteIndex - 1]] = 
        [currentData.categories[categoryIndex].sites[siteIndex - 1], currentData.categories[categoryIndex].sites[siteIndex]];
        initCategoriesPanel();
        showToast('网站已上移');
    }
}

function moveSiteDown(categoryIndex, siteIndex) {
    const sites = currentData.categories[categoryIndex].sites;
    if (siteIndex < sites.length - 1) {
        [sites[siteIndex], sites[siteIndex + 1]] = [sites[siteIndex + 1], sites[siteIndex]];
        initCategoriesPanel();
        showToast('网站已下移');
    }
}

function moveFriendLinkUp(categoryIndex, linkIndex) {
    if (linkIndex > 0) {
        [currentData.categories[categoryIndex].links[linkIndex], currentData.categories[categoryIndex].links[linkIndex - 1]] = 
        [currentData.categories[categoryIndex].links[linkIndex - 1], currentData.categories[categoryIndex].links[linkIndex]];
        initCategoriesPanel();
        showToast('链接已上移');
    }
}

function moveFriendLinkDown(categoryIndex, linkIndex) {
    const links = currentData.categories[categoryIndex].links;
    if (linkIndex < links.length - 1) {
        [links[linkIndex], links[linkIndex + 1]] = [links[linkIndex + 1], links[linkIndex]];
        initCategoriesPanel();
        showToast('链接已下移');
    }
}

function toggleCategory(index) {
    const content = document.getElementById(`category-content-${index}`);
    const toggle = document.getElementById(`toggle-${index}`);
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        toggle.textContent = '▼';
        categoryOpenStates[index] = false;
    } else {
        content.classList.add('open');
        toggle.textContent = '▲';
        categoryOpenStates[index] = true;
    }
}

function addCategory() {
    currentEditType = 'category';
    currentEditIndex = -1;
    showModal('添加分类', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" placeholder="例如：tools"></div>
        <div class="form-group"><label>标题：</label><input type="text" id="edit-title" class="form-input" placeholder="例如：软件工具"></div>
    `);
}

function editCategory(index) {
    currentEditType = 'category';
    currentEditIndex = index;
    const category = currentData.categories[index];
    showModal('编辑分类', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" value="${category.id}"></div>
        <div class="form-group"><label>标题：</label><input type="text" id="edit-title" class="form-input" value="${category.title}"></div>
    `);
}

function deleteCategory(index) {
    if (confirm('确定要删除此分类吗？这将同时删除分类下的所有网站链接！')) {
        currentData.categories.splice(index, 1);
        initCategoriesPanel();
        showToast('删除成功');
    }
}

// 网站链接
function addSiteToCategory(categoryIndex) {
    currentCategoryIndex = categoryIndex;
    showSiteModal();
}

function editSite(categoryIndex, siteIndex) {
    currentEditType = 'site';
    currentCategoryIndex = categoryIndex;
    currentEditIndex = siteIndex;
    const site = currentData.categories[categoryIndex].sites[siteIndex];
    showModal('编辑网站', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input" value="${site.name}"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input" value="${site.url}"></div>
        <div class="form-group"><label>简介：</label><input type="text" id="edit-desc" class="form-input" value="${site.desc}"></div>
        <div class="form-group"><label>图标：</label><input type="text" id="edit-icon" class="form-input" value="${site.icon || ''}" placeholder="域名，如github.com"></div>
    `);
}

function deleteSite(categoryIndex, siteIndex) {
    if (confirm('确定要删除此网站吗？')) {
        currentData.categories[categoryIndex].sites.splice(siteIndex, 1);
        initCategoriesPanel();
        showToast('删除成功');
    }
}

// 友情链接
function addFriendLink(categoryIndex) {
    currentEditType = 'friendLink';
    currentCategoryIndex = categoryIndex;
    currentEditIndex = -1;
    showModal('添加友情链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input"></div>
    `);
}

function editFriendLink(categoryIndex, linkIndex) {
    currentEditType = 'friendLink';
    currentCategoryIndex = categoryIndex;
    currentEditIndex = linkIndex;
    const link = currentData.categories[categoryIndex].links[linkIndex];
    showModal('编辑友情链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input" value="${link.name}"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input" value="${link.url}"></div>
    `);
}

function deleteFriendLink(categoryIndex, linkIndex) {
    if (confirm('确定要删除此链接吗？')) {
        currentData.categories[categoryIndex].links.splice(linkIndex, 1);
        initCategoriesPanel();
        showToast('删除成功');
    }
}

// 顶部导航
function initOtherPanel() {
    // 快捷标签
    const quickTabsList = document.getElementById('quickTabs-list');
    if (quickTabsList) {
        quickTabsList.innerHTML = currentData.quickTabs.map((item, index) => `
            <div class="item-row">
                <div class="item-info">
                    <span class="item-name">${item.text}</span>
                    <span class="item-id">${item.url || '#' + item.id}</span>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editQuickTab(${index})">编辑</button>
                    <button class="btn-delete" onclick="deleteQuickTab(${index})">删除</button>
                </div>
            </div>
        `).join('');
    }
    
    // 快捷链接
    const quickLinksList = document.getElementById('quickLinks-list');
    if (quickLinksList) {
        quickLinksList.innerHTML = currentData.quickLinks.map((item, index) => `
            <div class="item-row">
                <div class="item-info"><span class="item-name">${item.name}</span><span class="item-id">${item.url}</span></div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editQuickLink(${index})">编辑</button>
                    <button class="btn-delete" onclick="deleteQuickLink(${index})">删除</button>
                </div>
            </div>
        `).join('');
    }
}

function addQuickTab() {
    currentEditType = 'quickTabs';
    currentEditIndex = -1;
    showModal('添加快捷标签', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" placeholder="例如：home"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" placeholder="例如：常用推荐"></div>
        <div class="form-group"><label>网址：</label><input type="text" id="edit-url" class="form-input" placeholder="例如：#home 或 https://example.com"></div>
    `);
}

function editQuickTab(index) {
    currentEditType = 'quickTabs';
    currentEditIndex = index;
    const item = currentData.quickTabs[index];
    showModal('编辑快捷标签', `
        <div class="form-group"><label>ID：</label><input type="text" id="edit-id" class="form-input" value="${item.id}"></div>
        <div class="form-group"><label>文字：</label><input type="text" id="edit-text" class="form-input" value="${item.text}"></div>
        <div class="form-group"><label>网址：</label><input type="text" id="edit-url" class="form-input" value="${item.url || ''}" placeholder="#home 或 https://example.com"></div>
    `);
}

function deleteQuickTab(index) {
    if (confirm('确定要删除此标签吗？')) {
        currentData.quickTabs.splice(index, 1);
        initOtherPanel();
        showToast('删除成功');
    }
}

function addHeaderNav() {
    currentEditType = 'headerNav';
    currentEditIndex = -1;
    showModal('添加顶部导航', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input"></div>
    `);
}

function editHeaderNav(index) {
    currentEditType = 'headerNav';
    currentEditIndex = index;
    const item = currentData.headerNav[index];
    showModal('编辑顶部导航', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input" value="${item.name}"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input" value="${item.url}"></div>
    `);
}

function deleteHeaderNav(index) {
    if (confirm('确定要删除此导航吗？')) {
        currentData.headerNav.splice(index, 1);
        initOtherPanel();
        showToast('删除成功');
    }
}

function addQuickLink() {
    currentEditType = 'quickLinks';
    currentEditIndex = -1;
    showModal('添加快捷链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input"></div>
    `);
}

function editQuickLink(index) {
    currentEditType = 'quickLinks';
    currentEditIndex = index;
    const item = currentData.quickLinks[index];
    showModal('编辑快捷链接', `
        <div class="form-group"><label>名称：</label><input type="text" id="edit-name" class="form-input" value="${item.name}"></div>
        <div class="form-group"><label>地址：</label><input type="text" id="edit-url" class="form-input" value="${item.url}"></div>
    `);
}

function deleteQuickLink(index) {
    if (confirm('确定要删除此链接吗？')) {
        currentData.quickLinks.splice(index, 1);
        initOtherPanel();
        showToast('删除成功');
    }
}

// 页脚配置
function initFooterPanel() {
    document.getElementById('footer-name').value = currentData.footer.name;
    document.getElementById('footer-email').value = currentData.footer.email;
    document.getElementById('footer-slogan').value = currentData.footer.slogan;
    document.getElementById('footer-copyright').value = currentData.footer.copyright || '';
}

function updateFooter() {
    currentData.footer.name = document.getElementById('footer-name').value;
    currentData.footer.email = document.getElementById('footer-email').value;
    currentData.footer.slogan = document.getElementById('footer-slogan').value;
    currentData.footer.copyright = document.getElementById('footer-copyright').value;
    showToast('页脚配置已保存');
}

// 弹窗操作
function showModal(title, bodyHtml) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('edit-modal').classList.add('open');
}

function closeModal() {
    document.getElementById('edit-modal').classList.remove('open');
    currentEditType = null;
    currentEditIndex = null;
    currentCategoryIndex = null;
}

function showSiteModal() {
    document.getElementById('add-site-modal').classList.add('open');
}

function closeSiteModal() {
    document.getElementById('add-site-modal').classList.remove('open');
    document.getElementById('add-site-name').value = '';
    document.getElementById('add-site-url').value = '';
    document.getElementById('add-site-desc').value = '';
    document.getElementById('add-site-icon').value = '';
}

function saveNewSite() {
    const name = document.getElementById('add-site-name').value;
    const url = document.getElementById('add-site-url').value;
    const desc = document.getElementById('add-site-desc').value;
    const icon = document.getElementById('add-site-icon').value;
    
    if (!name || !url) {
        showToast('请填写名称和地址', 'error');
        return;
    }
    
    if (!currentData.categories[currentCategoryIndex].sites) {
        currentData.categories[currentCategoryIndex].sites = [];
    }
    
    currentData.categories[currentCategoryIndex].sites.push({ name, url, desc, icon });
    categoryOpenStates[currentCategoryIndex] = true;
    initCategoriesPanel();
    closeSiteModal();
    showToast('添加成功');
}

function saveModalData() {
    const id = document.getElementById('edit-id')?.value;
    const name = document.getElementById('edit-name')?.value;
    const text = document.getElementById('edit-text')?.value;
    const title = document.getElementById('edit-title')?.value;
    const url = document.getElementById('edit-url')?.value;
    const desc = document.getElementById('edit-desc')?.value;
    const icon = document.getElementById('edit-icon')?.value;
    const sectionTitle = document.getElementById('edit-section-title')?.value;
    const sectionContent = document.getElementById('edit-section-content')?.value;
    
    switch (currentEditType) {
        case 'sidebar':
            if (currentEditIndex === -1) {
                currentData.sidebar.push({ id, icon, text, active: false });
            } else {
                currentData.sidebar[currentEditIndex] = { ...currentData.sidebar[currentEditIndex], id, icon, text };
            }
            initSidebarPanel();
            break;
            
        case 'quickTabs':
            const tabUrl = document.getElementById('edit-url')?.value || `#${id}`;
            if (currentEditIndex === -1) {
                currentData.quickTabs.push({ id, text, url: tabUrl, active: false });
            } else {
                currentData.quickTabs[currentEditIndex] = { ...currentData.quickTabs[currentEditIndex], id, text, url: tabUrl };
            }
            initOtherPanel();
            break;
            
        case 'banner':
            if (currentEditIndex === -1) {
                currentData.banners.push({ icon, text });
            } else {
                currentData.banners[currentEditIndex] = { ...currentData.banners[currentEditIndex], icon, text };
            }
            initBannersPanel();
            break;
            
        case 'category':
            if (currentEditIndex === -1) {
                currentData.categories.push({ id, title, showMore: false, sites: [] });
            } else {
                currentData.categories[currentEditIndex] = { ...currentData.categories[currentEditIndex], id, title };
            }
            initCategoriesPanel();
            break;
            
        case 'site':
            if (!name || !url) {
                showToast('请填写名称和地址', 'error');
                return;
            }
            currentData.categories[currentCategoryIndex].sites[currentEditIndex] = { name, url, desc, icon };
            categoryOpenStates[currentCategoryIndex] = true;
            initCategoriesPanel();
            break;
            
        case 'friendLink':
            if (!name || !url) {
                showToast('请填写名称和地址', 'error');
                return;
            }
            if (currentEditIndex === -1) {
                currentData.categories[currentCategoryIndex].links.push({ name, url });
            } else {
                currentData.categories[currentCategoryIndex].links[currentEditIndex] = { name, url };
            }
            categoryOpenStates[currentCategoryIndex] = true;
            initCategoriesPanel();
            break;
            
        case 'friendLinkItem':
            if (!name || !url) {
                showToast('请填写名称和地址', 'error');
                return;
            }
            const friendLinksCategory = getFriendLinksCategory();
            if (!friendLinksCategory.links) {
                friendLinksCategory.links = [];
            }
            if (currentEditIndex === -1) {
                friendLinksCategory.links.push({ name, url });
            } else {
                friendLinksCategory.links[currentEditIndex] = { name, url };
            }
            initFriendLinksPanel();
            break;
            
        case 'headerNav':
            if (currentEditIndex === -1) {
                currentData.headerNav.push({ name, url });
            } else {
                currentData.headerNav[currentEditIndex] = { name, url };
            }
            initOtherPanel();
            break;
            
        case 'quickLinks':
            if (currentEditIndex === -1) {
                currentData.quickLinks.push({ name, url });
            } else {
                currentData.quickLinks[currentEditIndex] = { name, url };
            }
            initOtherPanel();
            break;
            
        case 'section':
            const section = { title: sectionTitle, content: sectionContent };
            if (currentPageType === 'contact') {
                if (currentEditIndex === -1) {
                    currentData.contactPage.sections.push(section);
                } else {
                    currentData.contactPage.sections[currentEditIndex] = section;
                }
                renderContactSections();
            } else if (currentPageType === 'about') {
                if (currentEditIndex === -1) {
                    currentData.aboutPage.sections.push(section);
                } else {
                    currentData.aboutPage.sections[currentEditIndex] = section;
                }
                renderAboutSections();
            }
            break;
    }
    
    closeModal();
    showToast('保存成功');
}

function saveAllData() {
    const dataStr = `// 网站基础数据和SEO配置文件

const FWSM_DATA = ${JSON.stringify(currentData, null, 4)};

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
    
    showToast('数据文件已下载，请将下载的fwsmdata.js文件替换js/fwsmdata.js');
}

function previewChanges() {
    const previewWindow = window.open('index.html', '_blank');
    setTimeout(() => {
        if (previewWindow && previewWindow.updatePageData) {
            previewWindow.updatePageData(currentData);
        }
    }, 500);
    showToast('预览窗口已打开');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}