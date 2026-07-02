// 导航和分类数据配置文件
// 可以在此文件中添加、修改、删除导航项和网站链接

const NAV_DATA = {
    "sidebar": [
        {
            "id": "home",
            "icon": "🏠",
            "text": "常用",
            "active": true
        },
        {
            "id": "tools",
            "icon": "🛠️",
            "text": "工具",
            "active": false
        },
        {
            "id": "video",
            "icon": "🎬",
            "text": "视频",
            "active": false
        },
        {
            "id": "community",
            "icon": "👥",
            "text": "社区",
            "active": false
        },
        {
            "id": "contact",
            "icon": "📧",
            "text": "联系",
            "active": false
        },
        {
            "id": "submit",
            "icon": "✏️",
            "text": "提交",
            "active": false
        },
        {
            "id": "dao",
            "icon": "",
            "text": "测试",
            "active": false
        }
    ],
    "quickTabs": [
        {
            "id": "home",
            "text": "常用推荐",
            "active": true
        },
        {
            "id": "tools",
            "text": "软件工具",
            "active": false
        },
        {
            "id": "video",
            "text": "影视资源",
            "active": false
        },
        {
            "id": "community",
            "text": "社区咨询",
            "active": false
        },
        {
            "id": "contact",
            "text": "联系良家",
            "active": false
        },
        {
            "id": "submit",
            "text": "网站提交",
            "active": false
        }
    ],
    "categories": [
        {
            "id": "home",
            "title": "常用推荐",
            "showMore": true,
            "sites": [
                {
                    "name": "国家税务总局",
                    "url": "https://www.chinatax.gov.cn",
                    "desc": "国家税务总局",
                    "icon": "chinatax.gov.cn"
                },
                {
                    "name": "国家企业信用信息公示系统",
                    "url": "https://www.gsxt.gov.cn",
                    "desc": "国家企业信用信息公示系统",
                    "icon": "gsxt.gov.cn"
                },
                {
                    "name": "国家知识产权局商标局",
                    "url": "https://sbj.cnipa.gov.cn",
                    "desc": "中国商标网",
                    "icon": "sbj.cnipa.gov.cn"
                },
                {
                    "name": "国家知识产权局",
                    "url": "https://www.cnipa.gov.cn",
                    "desc": "国家知识产权局",
                    "icon": "cnipa.gov.cn"
                },
                {
                    "name": "福建省网上办事大厅",
                    "url": "https://zwfw.fujian.gov.cn",
                    "desc": "福建政务服务网",
                    "icon": "zwfw.fujian.gov.cn"
                },
                {
                    "name": "Cloudflare",
                    "url": "https://www.cloudflare.com",
                    "desc": "Cloudflare",
                    "icon": "cloudflare.com"
                },
                {
                    "name": "文件传输助手",
                    "url": "#",
                    "desc": "文件传输助手",
                    "icon": "weixin.qq.com"
                },
                {
                    "name": "服务上门电商导航",
                    "url": "#",
                    "desc": "寻宋内部版",
                    "icon": "fwsm.cn"
                },
                {
                    "name": "良家影视",
                    "url": "#",
                    "desc": "私人影视",
                    "icon": "fwsm.cn"
                },
                {
                    "name": "GitHub",
                    "url": "https://github.com",
                    "desc": "全球最大同兴趣网站",
                    "icon": "github.com"
                },
                {
                    "name": "Gitee",
                    "url": "https://gitee.com",
                    "desc": "中国最大代码托管平台",
                    "icon": "gitee.com"
                },
                {
                    "name": "吾爱破解",
                    "url": "https://www.52pojie.cn",
                    "desc": "老衲.软件安全与病毒分析前沿",
                    "icon": "52pojie.cn"
                },
                {
                    "name": "精易论坛",
                    "url": "https://bbs.125.la",
                    "desc": "专业易语言编程学习交流论坛",
                    "icon": "125.la"
                },
                {
                    "name": "殁漂遥",
                    "url": "#",
                    "desc": "分享优秀好用的软件",
                    "icon": ""
                },
                {
                    "name": "阿里图标库",
                    "url": "https://www.iconfont.cn",
                    "desc": "矢量图标下载、在线存储、格式转换",
                    "icon": "iconfont.cn"
                },
                {
                    "name": "千图网",
                    "url": "https://www.58pic.com",
                    "desc": "专注正版图片设计素材",
                    "icon": "58pic.com"
                }
            ]
        },
        {
            "id": "tools",
            "title": "软件工具 · 软件博客",
            "showMore": false,
            "sites": [
                {
                    "name": "软件SOS",
                    "url": "#",
                    "desc": "软件SOS",
                    "icon": ""
                },
                {
                    "name": "软仓",
                    "url": "#",
                    "desc": "软仓",
                    "icon": ""
                },
                {
                    "name": "六音软件",
                    "url": "#",
                    "desc": "六音软件",
                    "icon": ""
                },
                {
                    "name": "大眼仔",
                    "url": "https://www.dayanzai.me",
                    "desc": "大眼仔",
                    "icon": "dayanzai.me"
                },
                {
                    "name": "果核剥壳",
                    "url": "https://www.ghpym.com",
                    "desc": "绿色资源分享博客",
                    "icon": "ghpym.com"
                },
                {
                    "name": "小众软件",
                    "url": "https://www.appinn.com",
                    "desc": "分享免费、小巧、实用的软件",
                    "icon": "appinn.com"
                },
                {
                    "name": "异次元软件",
                    "url": "https://www.iplaysoft.com",
                    "desc": "极具人气和特色的软件网站",
                    "icon": "iplaysoft.com"
                },
                {
                    "name": "423down",
                    "url": "#",
                    "desc": "专注去广告类软件输出10年",
                    "icon": ""
                },
                {
                    "name": "芊芊精典",
                    "url": "#",
                    "desc": "优质互联网资源分享与交流",
                    "icon": ""
                },
                {
                    "name": "易破解",
                    "url": "#",
                    "desc": "精选互联网优秀软件分享",
                    "icon": ""
                }
            ]
        },
        {
            "id": "online-tools",
            "title": "软件工具 · 在线工具",
            "showMore": false,
            "sites": [
                {
                    "name": "草料二维码",
                    "url": "https://cli.im",
                    "desc": "高效简洁的二维码综合工具",
                    "icon": "cli.im"
                },
                {
                    "name": "Bigjpg",
                    "url": "https://bigjpg.com",
                    "desc": "AI人工智能图片无损放大",
                    "icon": "bigjpg.com"
                },
                {
                    "name": "白描",
                    "url": "https://baimiao.app",
                    "desc": "高效准确的中文OCR文字识别",
                    "icon": "baimiao.app"
                },
                {
                    "name": "短视频解析",
                    "url": "#",
                    "desc": "短视频在线去水印解析下载",
                    "icon": ""
                },
                {
                    "name": "在线PS图片",
                    "url": "#",
                    "desc": "专业精简的在线PS图片处理",
                    "icon": ""
                },
                {
                    "name": "PhotoKit",
                    "url": "https://www.photokit.com",
                    "desc": "基于AI人工智能的在线图片编辑器",
                    "icon": "photokit.com"
                }
            ]
        },
        {
            "id": "netdisk",
            "title": "网盘资源 · 资源分享",
            "showMore": false,
            "sites": [
                {
                    "name": "网盘资源社",
                    "url": "#",
                    "desc": "综合免费资源共享交流论坛",
                    "icon": ""
                },
                {
                    "name": "易搜",
                    "url": "#",
                    "desc": "最优秀的阿里云盘搜索服务的平台",
                    "icon": ""
                },
                {
                    "name": "玩偶哥哥",
                    "url": "#",
                    "desc": "提供最新最快的网盘分享数据",
                    "icon": ""
                },
                {
                    "name": "云盘资源网",
                    "url": "#",
                    "desc": "完全免费的云盘资源分享平台",
                    "icon": ""
                },
                {
                    "name": "Clash官网导航",
                    "url": "#",
                    "desc": "提供最新最快的Clash官网导航数据",
                    "icon": ""
                }
            ]
        },
        {
            "id": "video",
            "title": "影视资源 · 在线",
            "showMore": false,
            "sites": [
                {
                    "name": "VIP解析",
                    "url": "#",
                    "desc": "VIP解析",
                    "icon": ""
                },
                {
                    "name": "洛雪音乐",
                    "url": "#",
                    "desc": "洛雪音乐",
                    "icon": ""
                },
                {
                    "name": "良家影视",
                    "url": "#",
                    "desc": "私人影视",
                    "icon": "fwsm.cn"
                },
                {
                    "name": "不太灵影视",
                    "url": "#",
                    "desc": "干净快捷的影视下载站",
                    "icon": ""
                },
                {
                    "name": "555电影",
                    "url": "#",
                    "desc": "在线播放最新热门电影",
                    "icon": ""
                },
                {
                    "name": "电影先生",
                    "url": "#",
                    "desc": "在线播放全网影片",
                    "icon": ""
                },
                {
                    "name": "可可影视",
                    "url": "#",
                    "desc": "每日收集全网最新的电影",
                    "icon": ""
                },
                {
                    "name": "爱看影院",
                    "url": "#",
                    "desc": "互联网最新电影和电视剧在线观看",
                    "icon": ""
                }
            ]
        },
        {
            "id": "video-download",
            "title": "影视资源 · 下载",
            "showMore": false,
            "sites": [
                {
                    "name": "磁力熊",
                    "url": "#",
                    "desc": "高分电影1080P下载",
                    "icon": ""
                },
                {
                    "name": "音范丝",
                    "url": "#",
                    "desc": "精选4K蓝光原盘下载",
                    "icon": ""
                },
                {
                    "name": "MP4电影",
                    "url": "#",
                    "desc": "最新热门电影下载",
                    "icon": ""
                }
            ]
        },
        {
            "id": "anime",
            "title": "影视资源 · 动漫",
            "showMore": false,
            "sites": [
                {
                    "name": "樱花动漫",
                    "url": "#",
                    "desc": "专注最新最热门的免费动漫",
                    "icon": ""
                },
                {
                    "name": "速搜动漫",
                    "url": "#",
                    "desc": "漫画和轻小说在线观看",
                    "icon": ""
                },
                {
                    "name": "动漫岛",
                    "url": "#",
                    "desc": "最新最快的日本动漫在线观看",
                    "icon": ""
                },
                {
                    "name": "卡通站",
                    "url": "#",
                    "desc": "国语配音动漫网站",
                    "icon": ""
                }
            ]
        },
        {
            "id": "us-tv",
            "title": "影视资源 · 美剧",
            "showMore": false,
            "sites": [
                {
                    "name": "人人影视",
                    "url": "#",
                    "desc": "人人影视下载分享站",
                    "icon": ""
                },
                {
                    "name": "AG美剧",
                    "url": "#",
                    "desc": "热门美剧在线免费观看",
                    "icon": ""
                },
                {
                    "name": "NO视频",
                    "url": "#",
                    "desc": "及时的海外热门剧集在线观看",
                    "icon": ""
                },
                {
                    "name": "爱美剧",
                    "url": "#",
                    "desc": "各类精彩美剧保持每日更新",
                    "icon": ""
                },
                {
                    "name": "美剧天堂",
                    "url": "#",
                    "desc": "美剧爱好者的在线美剧天堂",
                    "icon": ""
                }
            ]
        },
        {
            "id": "community",
            "title": "社区资讯 · 资讯",
            "showMore": false,
            "sites": [
                {
                    "name": "IT之家",
                    "url": "https://www.ithome.com",
                    "desc": "IT科技门户网站",
                    "icon": "ithome.com"
                },
                {
                    "name": "微博热榜",
                    "url": "https://s.weibo.com",
                    "desc": "随时随地发现新鲜事",
                    "icon": "weibo.com"
                },
                {
                    "name": "今日头条",
                    "url": "https://www.toutiao.com",
                    "desc": "通用信息平台",
                    "icon": "toutiao.com"
                },
                {
                    "name": "36氪",
                    "url": "https://36kr.com",
                    "desc": "创业资讯、科技新闻",
                    "icon": "36kr.com"
                },
                {
                    "name": "少数派",
                    "url": "https://sspai.com",
                    "desc": "用数字产品提升工作效率",
                    "icon": "sspai.com"
                },
                {
                    "name": "中关村",
                    "url": "https://www.zol.com.cn",
                    "desc": "中国领先的IT信息与商务门户",
                    "icon": "zol.com.cn"
                },
                {
                    "name": "知微事见",
                    "url": "#",
                    "desc": "最全的互联网社会热点聚合平台",
                    "icon": ""
                },
                {
                    "name": "知微舆论场",
                    "url": "#",
                    "desc": "平台榜单、热点聚焦",
                    "icon": ""
                }
            ]
        },
        {
            "id": "community-social",
            "title": "社区资讯 · 社区",
            "showMore": false,
            "sites": [
                {
                    "name": "百度贴吧",
                    "url": "https://tieba.baidu.com",
                    "desc": "以兴趣主题聚合志同道合者的互动平台",
                    "icon": "tieba.baidu.com"
                },
                {
                    "name": "知乎",
                    "url": "https://www.zhihu.com",
                    "desc": "有问题，就会有答案",
                    "icon": "zhihu.com"
                },
                {
                    "name": "CSDN",
                    "url": "https://www.csdn.net",
                    "desc": "中文开发者技术社区",
                    "icon": "csdn.net"
                },
                {
                    "name": "掘金",
                    "url": "https://juejin.cn",
                    "desc": "一个帮助开发者成长的社区",
                    "icon": "juejin.cn"
                },
                {
                    "name": "SegmentFault",
                    "url": "https://segmentfault.com",
                    "desc": "思否社区技术问答",
                    "icon": "segmentfault.com"
                }
            ]
        },
        {
            "id": "submit",
            "title": "网站提交",
            "showMore": false,
            "isSubmitForm": true
        },
        {
            "id": "friend-links",
            "title": "友情链接",
            "showMore": false,
            "isFriendLinks": true,
            "links": [
                {
                    "name": "良家导航",
                    "url": "/"
                },
                {
                    "name": "吾爱破解",
                    "url": "https://www.52pojie.cn"
                },
                {
                    "name": "阿酷导航",
                    "url": "#"
                },
                {
                    "name": "迷鹿导航",
                    "url": "#"
                },
                {
                    "name": "快导航",
                    "url": "#"
                },
                {
                    "name": "不求人导航",
                    "url": "#"
                },
                {
                    "name": "更多链接",
                    "url": "#"
                }
            ]
        },
        {
            "id": "dao",
            "title": "测试一",
            "showMore": false,
            "sites": []
        }
    ],
    "footer": {
        "logo": "fwsm.cn",
        "name": "良家导航",
        "email": "fwsmcn@qq.com",
        "slogan": "良家导航 - 用心精选每一个链接"
    },
    "quickLinks": [
        {
            "name": "百度",
            "url": "https://www.baidu.com"
        },
        {
            "name": "谷歌",
            "url": "https://www.google.com"
        },
        {
            "name": "软件",
            "url": "#tools"
        },
        {
            "name": "淘宝",
            "url": "https://www.taobao.com"
        },
        {
            "name": "影视",
            "url": "#video"
        }
    ],
    "banner": {
        "icon": "📢",
        "text": "良家导航 - 不求最全，但求好用"
    },
    "headerNav": [
        {
            "name": "首页",
            "url": "/"
        },
        {
            "name": "日志",
            "url": "/log.html"
        },
        {
            "name": "关于",
            "url": "/about.html"
        }
    ]
};

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NAV_DATA;
}