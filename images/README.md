# 图片替换说明

目前官网所有图片都是**占位色块**（写着 "IMG"）。把真实图片文件放进这个 `images/` 文件夹后，按下面替换即可。

## 需要的图片

| 位置 | 建议尺寸 | 说明 |
|---|---|---|
| Hero 首图 | 1600×1000（横向、暗一点更好） | 店内 / 发型作品大图，文字压在上面 |
| About 配图 | 1200×900 | 店内环境或团队照 |
| Shop 商品图 ×3 | 800×800（正方形） | 产品 / 礼品卡 |

## 怎么替换

**Hero**：在 `styles.css` 里找到 `.hero__media[data-img]`，把渐变换成：
```css
.hero__media[data-img]{
  background:#2c2622 url("images/hero.jpg") center/cover no-repeat;
}
```

**About**：找到 `.about__media`，改成：
```css
.about__media{ background:#e3d5c3 url("images/about.jpg") center/cover no-repeat; }
```
并删掉 `.about__media::after`（那是 "IMG" 占位字）。

**Shop 商品**：在 `index.html` 里把每个 `<div class="shop-card__img" data-img="product"></div>`
换成 `<img class="shop-card__img" src="images/product-1.jpg" alt="商品名">`。

> 图片版权需为本店所有。SumUp 预订页里的服务作品图若要使用，请确认是本店拍摄/有权使用。
