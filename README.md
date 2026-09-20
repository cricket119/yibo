# 易波 · 学术与实务

网站：https://cricket119.github.io/yibo/

简约个人网站，适配手机和桌面，使用本地字体、静态 HTML 与轻量交互。无需服务器或数据库。`main` 分支更新后，GitHub Actions 自动构建和部署到 Pages。

## 内容维护

- `content/site.json`：修改简介、网站地址、更新时间和公开联系方式。email、phone、wechat、officialAccountUrl 留空时不展示虚构信息。当前联系区仅提供已核实的学校主页，等待本人提供联系方式。
- `content/articles.json`：文章目录。每篇包含唯一英文 slug、标题、日期、领域、摘要、作者、Markdown 文件名。公开转载摘要应同时提供 source 和 sourceName。本站目前仅收录三则公开报道摘要，未伪造署名文章。
- `content/articles/`：存放 Markdown 正文，支持小标题、段落、列表、粗体、链接。避免原始 HTML，不要上传涉密材料。
- `assets/yi-bo.jpg`：用户提供的人像照片，经网页尺寸压缩。

新增原创文章示例：

```json
{
  "slug": "international-economic-law-notes",
  "title": "实际文章标题",
  "date": "2026-09-20",
  "category": "国际经济法",
  "kind": "专业文章",
  "summary": "准确概括正文的简要摘要。",
  "author": "易波",
  "content": "international-economic-law-notes.md"
}
```

将正文存为对应 Markdown 文件，再把记录加入 articles.json。提交后自动生成文章独立网页、首页列表、领域筛选、站点地图、RSS 和每篇文章的分享二维码。删除或改名文章应安排旧链接重定向。

微信公众号内容：目前未配置公众号 API 或抓取同步。取得文章正文及授权后，可以把正文转换为 Markdown 导入；也可录入原文链接与摘要，保留原作者、日期和来源。请勿将公众号转载或报道误标为易波原创。未来提供明确的公众号/RSS/API 来源后再接入自动同步。

## 本地预览

```sh
npm ci
npm run build
npm run check
```

项目站点路径是 `/yibo/`，本地需把 `dist` 挂载到 `/yibo/`，或在预览构建前临时设置 site.json 的 url 为本地域名根路径。生产地址不要写成本地地址。

## SEO / GEO

页面正文在 HTML 中直接可读。已配置 Person、ProfilePage、Article、BreadcrumbList、CollectionPage，独立标题、摘要、规范 URL、sitemap.xml、RSS、llms.txt、robots.txt、OG 标题及摘要。结构化数据与可见事实保持一致。未经核实的联系方式不进入结构化数据。本人提供履历与历史学校资料分开标明。

llms.txt 是补充的机器可读说明，不保证 AI 平台采纳。任何 SEO/GEO 技术都不能保证被收录、排名或推荐。部署后可在搜索平台提交 sitemap。

GitHub 项目网站的 robots.txt 位于 `/yibo/robots.txt`；搜索引擎实际遵循域名根目录 `/robots.txt`。不能在这个仓库控制整个 cricket119.github.io 域名的 robots 规则；已在页面提供 robots meta。绑定独立域名后可使 robots.txt 位于根目录，并重新构建所有 URL。

## 微信分享

目前提供直接链接、当前页二维码下载、系统分享（浏览器支持时）与微信右上角菜单提示。二维码与页面地址在构建时一同更新。

定制微信标题、描述、缩略图卡片需要具备相应接口权限的公众号、JS 接口安全域名和后端签名服务，静态 GitHub Pages 不能安全保存 AppSecret 或完成签名。仅配置 Open Graph 不保证微信呈现自定义卡片。接入时必须把密钥留在服务端；本项目不包含公众号凭据。

更适合长期传播的方式：独立域名 + 微信内稳定访问测试 + 公众号文章“阅读原文”入口 + 个人二维码。GitHub Pages 在不同地区和网络的访问表现需要实测。

微信官方 JS-SDK 文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

## 资料依据

- 用户提供的最新履历（2026-09-20）：当前任职、57—62届会议、12项课题及所获荣誉等。
- 东南大学教师介绍：https://law.seu.edu.cn/2011/0119/c21118a242568/page.htm
- 第57届人权理事会发言：https://news.seu.edu.cn/2024/0919/c5541a503352/page.htm
- 湖南师范大学讲座：https://fxy.hunnu.edu.cn/info/1091/8453.htm
- 最高人民法院研究室工作：https://law.seu.edu.cn/2021/0104/c9375a358665/page.htm

## 部署

仓库 Settings → Pages → Source 选择 GitHub Actions。主分支每次更新即部署。绑定新域名前先修改 content/site.json 的 url，再构建、发布，并在 Pages 中设置域名与 DNS。目录中的 CNAME 仅应在用户确定域名后添加。

## 阿里云迁移与 SEO（2026-09-20）

已补充更明确的个人主页标题、简洁摘要、逐篇作者与发表/更新日期元数据。构建时清理旧输出，避免删稿后旧页面残留。

可用 `SITE_URL` 环境变量为已确认的 HTTPS 正式域名构建；不设置时保留当前 GitHub Pages 地址。该配置统一生成网页链接、canonical、结构化数据、RSS、站点地图与分享二维码。部署前用同一个 `SITE_URL` 运行 `npm run check`。不要在正式部署中使用演示域名。

迁移顺序：核实服务器与域名 → 在独立网站目录部署 → 配置证书与域名解析 → 验证首页、文章、404、robots 与 sitemap → 最后处理旧站到新站的对应页跳转和规范地址。不得先将旧站跳到尚未上线的新域名。对静态 GitHub Pages 不宣称实现了服务端 301；需要根据实际托管方式选择受支持的迁移方式。

Google / 百度站长平台的所有权验证与站点地图提交，需要确定正式域名及相应平台登录后完成。更换服务器本身不会自动改善搜索排名。
