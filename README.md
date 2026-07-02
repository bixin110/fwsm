# 良家导航

一个简洁、实用的网址导航网站，支持白天/暗色模式切换，数据可通过管理后台动态配置。

# 案例网站
https://www.fwsm.cn/

## 功能特点

- **响应式布局**：PC端显示6列链接，自适应不同屏幕尺寸
- **主题切换**：支持白天/暗色模式切换
- **数据管理**：通过管理后台配置网站所有数据
- **SEO优化**：支持自定义SEO元数据
- **公告滚动**：多条公告自动滚动展示
- **图片懒加载**：提升页面加载速度
- **图片格式自动识别**：支持 png、ico、jpg、jpeg、svg、gif、webp 等多种格式
- **错误处理**：图片加载失败自动尝试其他格式，最终显示默认图片

## 项目结构

```
.
├── index.html          # 首页
├── about.html          # 关于页面
├── contact.html        # 联系页面
├── admin.html          # 管理后台
├── ico.ico             # 网站图标
├── css/
│   ├── style.css       # 首页样式
│   ├── pages.css       # 关于/联系页面样式
│   └── admin.css       # 管理后台样式
├── js/
│   ├── fwsmdata.js     # 网站数据配置
│   ├── script.js       # 首页逻辑
│   ├── pages.js        # 关于/联系页面逻辑
│   ├── admin.js        # 管理后台逻辑
│   └── data.js         # 备用数据
└── img/
    ├── imgbug.png      # 默认错误图片
    └── *.png           # 各网站图标
```

## 快速开始

### 本地运行

```bash
# 方法1：使用 Python
python -m http.server 8000

# 方法2：使用 Node.js
npx serve

# 方法3：直接用浏览器打开 index.html
```

访问 http://localhost:8000 查看网站。

### 管理后台

访问 http://localhost:8000/admin.html 进入管理后台。

## 使用说明

### 修改网站数据

1. 打开 `admin.html` 管理后台
2. 在各配置面板中修改数据
3. 点击「保存所有数据并下载」按钮
4. 将下载的 `fwsmdata.js` 文件替换到 `js/` 目录中

### 支持的HTML链接

在联系页面、关于页面和页脚配置中，可以使用HTML链接格式：

```html
<a href="https://example.com">链接文字</a>
```

### 添加新网站

在管理后台的「分类区域」面板中：
1. 选择一个分类
2. 点击「添加网站」
3. 填写网站名称、描述、网址和图标

### 图片格式自动识别

网站支持多种图片格式的自动识别，只需填写图片名称（不带后缀）：

- **支持格式**：png、ico、jpg、jpeg、svg、gif、webp
- **优先顺序**：png → ico → jpg → jpeg → svg → gif → webp
- **使用方法**：将图片文件放入 `img/` 目录，命名为统一名称（如 `baidu.com.png`），在后台填写 `baidu.com` 即可

例如：
- 图片文件：`img/google.com.png` 或 `img/google.com.ico`
- 后台填写：`google.com`（无需后缀）

### 修改排序

在管理后台中可以直接拖动或点击上移/下移按钮调整顺序。

## 数据结构

网站数据存储在 `js/fwsmdata.js` 中，包含以下结构：

```javascript
const FWSM_DATA = {
    site: {},           // 网站基础信息
    seo: {},            // SEO配置
    sidebar: [],        // 侧边栏导航
    quickTabs: [],      // 快捷标签
    quickLinks: [],     // 快捷链接
    banners: [],        // 公告列表
    categories: [],     // 分类区域
    contactPage: {},    // 联系页面
    aboutPage: {},      // 关于页面
    footer: {}          // 页脚配置
};
```

## 自定义配置

### 修改网站图标

将自定义图标文件命名为 `ico.ico` 放在根目录。

### 修改默认错误图片

替换 `img/imgbug.png` 文件。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Edge
- Safari

## 许可证

Apache License 2.0

## 项目地址

GitHub: [https://github.com/bixin110/fwsm](https://github.com/bixin110/fwsm)

## 贡献

欢迎提交 Issue 和 Pull Request！
