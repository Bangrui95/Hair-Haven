# Hair Haven — 待修改清单

> 网站已部署到 GitHub Pages：https://bangrui95.github.io/Hair-Haven/
> 仓库：Bangrui95/Hair-Haven ｜ 本地：/Users/whisky/Documents/GitHub/Hair Haven
> 改完记得 commit + push，GitHub Pages 会自动重新部署（约 1–2 分钟）。
> 本地预览：在项目目录起服务器 `python3 -m http.server 5555`，开 http://127.0.0.1:5555/index.html（改完 Cmd+Shift+R 硬刷新；样式/脚本带 ?v= 版本号，改完记得升版本号）。

## 1. 首页增加一个「开屏优惠链接」
- 在 hero 首屏加一个入口（横幅/小标签/按钮），点了直达 Offers 优惠券板块（或直接打开某张券的领取弹层）。
- 位置和样式待定：可以是 hero 顶部一条细横幅，或按钮下方一行「🎁 领取新客优惠 →」。
- 相关：Offers 板块 id=`offers`；券弹层已做好（点 `[data-coupon]` 触发）。

## 2. 修改优惠链接样式 + 设置自动邮件（把领券真正跑通）
- **样式**：优化券弹层/票根卡视觉（现在是占位优惠：15% / £10 / FREE）。
- **自动邮件（核心）**：把券弹层里的邮箱表单接到真实服务——
  - `script.js` 里搜 `TODO 接入真实服务`（couponForm 的 submit 处）。
  - 方案：Tally / Formspree 收邮箱 → Make/Zapier 生成**唯一码** → 发券邮件（含唯一二维码）→ 写入 Airtable **台账**。
  - 网站上的 QR 是占位；**真实唯一二维码在邮件里**。
  - 加一个**默认不勾选**的「接收营销邮件」同意复选框（UK GDPR/PECR：领券≠可发广告；发广告需 opt-in，每封带退订，存同意记录）。
  - 到店核销：店员手机扫码（Orca Scan 之类对名单校验）→ 在 SumUp POS 手动打折。可自动标「新客/老客」（近似，非铁证，最终靠 SumUp 顾客记录/店员核对）。

## 3. Shop 板块增加真实图像
- 现在 Shop 是 3 张 `IMG` 占位块（护发品 / 礼品卡）。
- 放真实商品图，正方形（建议 800×800）。参考 `images/README.md`。
- 决定卖什么后，把「购买」接到 SumUp 付款链接 / 在线商店（无需后端）。

## 4. About 板块加入图像 + 好评
- About 现在是占位配图（渐变块）+ 介绍文字，缺电话/邮箱。
- 加真实店内/团队照片（About 配图建议 1200×900）。
- 加**顾客好评/评价**（几条 testimonial，可配星级）；也可考虑接 Google 评价截图/文字。

---

## 其他待办 / 备忘（之前提到过）
- **补内容**：电话、邮箱；美甲 `Extra Luxury – Milk/Rose` 价格；确认 S/M/L/ExL 与 W/B、W/C/B 全称；女士剪发是否只有 Fringe。
- **真 logo**：金色 H 花体 logo（HAIR·HAVEN·101），有文件就替换顶部文字「Hair Haven」。
- **清理仓库**：根目录 `82DE2466-…png`（2.2MB，已复制成 images/hero.png）可删；`.DS_Store` 建议 gitignore；`test-booking.html` 早期 A/B 测试可删。
- **Google 商家资料**：注册/验证 Google Business Profile，网站链接填官网、预约链接填 `sumupbookings.com/haven-hair`。
- 数据整理在 `content/salon-data.md`。
