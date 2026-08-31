# Hair Haven — 官网内容数据（重排版）

> 来源：SumUp 预订页 https://www.sumupbookings.com/haven-hair （2026-08-31 截图整理，含 Show more 展开）
> 这是给官网用的内容数据文件，不是代码。价格/时长以 SumUp 后台为准。

## 基本信息

- **店名**：Hair Haven
- **地址**：2, Laybourne House, Admirals Way, London, E14 5DA, United Kingdom
- **电话**：待补充
- **邮箱**：待补充
- **预订链接（slug）**：`haven-hair` → https://www.sumupbookings.com/haven-hair
- **营业时间**：每天 11:00–20:00，全周无休
- **版权行**：© 2026 Hair Haven

## 文案

- **标语**：Where Luxury Meets Your Hair
- **副标题**：Expert cuts, colour, barbering and nails — book your Hair Haven appointment online.
- **顶部横幅**：Book Online · Shop Premium Hair Care · Gift Cards Available
- **Services 引导语**：Choose your service, then select an available time. For major colour changes, please book or request a consultation first.
- **About**：Hair Haven is a London salon for expert haircuts, colour, barbering and nail services. We combine skilled technique, personal consultation and a relaxed luxury experience so every appointment feels tailored to you.

---

## 关于「头发长度 S/M/L」的处理方式（重要）

SumUp 里，很多染发/挑染服务是按长度拆成多条（S / M / L / ExL）。官网上**每个服务只显示一张卡片**，长度用「价格表 + from 起价」呈现，客人点「预订」后在 SumUp 流程里选具体长度。

- **尺码含义**：S = 短发 / M = 中长 / L = 长发 / ExL = 超长
- **官网卡片**示例：`Full Head Colour — from £65`，卡片内小字：`S £65 · M £80 · L £95 · ExL £110`

---

## 官网服务分类（重排后 6 大类）

### 1. Haircuts 剪发
| 服务 | 时长* | 价格 |
|---|---|---|
| Ladies — Fringe（刘海） | — | £10.00 |
| Men's — Dry Cut（干剪） | — | £28.00 |
| Kids — Boy Haircut (under 12) | — | £20.00 |

### 2. Colour 染发 / 挑染 / 漂发（长度合并）
| 服务（合并卡片） | 起价 | 各长度价格 |
|---|---|---|
| **Full Head Colour** | from £65 | S £65 · M £80 · L £95 · ExL £110 |
| **Full Head Highlights** | from £100 | S £100 · M £125 · L £150 |
| **Full Head Bleach** | from £90 | S £90 · M £105 · L £120 |
| **Balayage** | from £170 | M £170 · L £210 |

### 3. Colour Packages 染发套餐（含洗/剪/吹）
> W/B = Wash & Blow-dry（洗+吹）；W/C/B = Wash / Cut / Blow-dry（洗+剪+吹）——**请你确认全称**
| 服务（合并卡片） | 起价 | 各长度价格 |
|---|---|---|
| **Full Head Colour + W/B** | from £95 | S £95 · M £115 · L £135 |
| **Full Head Colour + W/C/B** | from £105 | S £105 · M £125 · L £145 |
| **Add-on — Full Tint Colour** | from £40 | S £40 · M £50 · L £60 |
| **Add-on — Root Colour** | £30 | 单一价 |

### 4. Men's 男士
| 服务 | 价格 |
|---|---|
| F/Tint + Wash & Cut（染+洗剪） | £70.00 |
| F/Tint Only（仅染，起） | from £40.00 |
| Dry Cut（干剪） | £28.00 |

### 5. Treatments 护理（原 Barber 分类）
| 服务 | 价格 |
|---|---|
| Scalp and Hair Treatment Set（头皮+头发护理套） | £50.00 |
| Scalp Treatment（头皮护理） | £30.00 |

### 6. Nails 美甲（完整 16 项，按子类整理）

**Acrylic & Full Sets 甲片 / 全套**
| 服务 | 时长 | 价格 |
|---|---|---|
| Full set of acrylic & gel polish（起） | 60min | £50.00 |
| Acrylic nail & Biab (extension) – Full set biab & gel polish | 60min | £55.00 |
| Acrylic nail & Biab (extension) – Full set ombre（起） | 60min | £50.00 |
| Acrylic Infill of acrylic & gel polish | 50min | £45.00 |
| Full set two big toes（脚拇趾） | 10min | £10.00 |
| Acrylic nail & Biab (extension) – Infill two big toes | 10min | £8.00 |

**Gel Polish / Manicure 甲油胶 / 手部护理**
| 服务 | 时长 | 价格 |
|---|---|---|
| Gel polish – Full manicure gel polish with biab | 35min | £45.00 |
| Gel polish – Express gel polish with biab | 30min | £40.00 |
| Gel polish – Full manicure with gel polish | 30min | £30.00 |
| Gel polish – Express gel polish (file & polish) | 20min | £25.00 |

**Add-ons 加项**
| 服务 | 时长 | 价格 |
|---|---|---|
| Add-on – Soak off for acrylic | 10min | £15.00 |
| Add-on – Soak off gel completely | 10min | £12.00 |
| Cat / chrome（猫眼 / 镜面） | — | £10.00 |
| Add-on – French tip & nail art（起） | — | £10.00 |
| Add-on – Nail repair（依类型，起） | — | £5.00 |
| Extra Luxury – Milk/Rose | — | ⚠️ 价格未知（截图被截断） |

---

## ⚠️ 待你确认/清理的问题

1. **一个美甲价格没抓到**：`Extra Luxury – Milk/Rose` 的价格在截图里被截断，麻烦补一下。
2. **时长几乎全是「45min」默认值**：官网建议用真实时长（美甲标题里已有真实时长 10/20/30/60min，我已按标题里的填）。发型类 SumUp 没写真实时长，需你补或维持不显示。
3. **W/B、W/C/B 全称**：请确认（我暂译为 洗吹 / 洗剪吹）。
4. **Ladies 剪发只有 Fringe 一项**：SumUp 里女士剪发似乎只有「刘海 £10」，没有普通女士剪发条目——是漏了还是本就没有？官网若要「女士洗剪吹」得补。
5. **缺电话和邮箱**。
6. **服务作品图授权**：预订页每项都有实拍图，能否用于官网？
