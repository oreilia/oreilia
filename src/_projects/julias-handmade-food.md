---
title: 姜姜的手作料理

ksio_asset_css:
  - local/projects/julias-handmade-food

banner:
  url: projects/julias-handmade-food/banner
  description: 1988
image: projects/julias-handmade-food/banner
---

姜姜是个热爱生活，喜欢手作料理的可爱小主妇，烘焙、糖水等甜品都不在话下！

<figure>
  <img src="{{ 'projects/julias-handmade-food/handmade' | asset_path }}" alt="姜姜的手作料理">
  <figcaption>姜姜的手作料理</figcaption>
</figure>

为了发扬自己的喜好，让更多人能品尝到自己的手艺，故将此作为事业给大家带去一片心意～

**夏日🌞来袭，现推出「[夏爽心作](#summer)」系列冰爽甜品拯救快被晒蔫儿的你。**

## 售卖方式

除了发起线上团购之外，也会不定期不定地点在线下摆摊。另外，**接受企业下午茶、生日会等的预订。**

<figure>
  <img src="{{ 'projects/julias-handmade-food/jiangjiang-ice-rice' | asset_path }}" alt="在北支江公园摆摊">
  <figcaption><a href="https://www.bilibili.com/video/BV1UM41137Hm/" target="_blank" rel="external nofollow">在北支江公园摆摊</a></figcaption>
</figure>

团购可配送范围包括：

| 行政区 | 区域 |
| --- | --- |
| 富阳区 | 城区、银湖（受降 + 高桥） |
| 余杭区 | 闲林、未来科技城 |
| 西湖区 | 留下、转塘 |
{:.table.table-bordered}

关于团购时间、摆摊地点等事宜，请扫码加姜姜微信咨询哦：

<figure>
  <img src="{{ 'projects/julias-handmade-food/wechat-qrcode' | asset_path }}" alt="姜姜的微信">
  <figcaption>姜姜的微信</figcaption>
</figure>

也欢迎消费过的各位私聊姜姜进行反馈与建议～😘

## 夏爽心作
{:#summer}

炎热的夏天正悄悄来临，想必各位快被🌞晒化🥵了吧？

这时，你也许需要姜姜精心特制的清凉，消解一夏的酷暑～

### 清凉特制

当前出售中的甜品有：

<div class="EntryList">
  <ul class="EntryList-content">
  {% for item in site.data.local.goods.summer %}
    {% assign item_banner = item.image | prepend: "projects/julias-handmade-food/" | asset_path %}
    <li class="EntryItem EntryItem--card">
      <div class="Card EntryCard">
        <a class="Card-link EntryCard-link" href="javascript:void(0);">
          <div class="EntryCard-header" style="background-image: url('{{ item_banner }}');">
            <div class="EntryCard-brief">
              <h4 class="EntryCard-name" data-toc-skip="true">{{ item.title }}</h4>
            </div>
          </div>
          <div class="EntryCard-body">
            <div class="EntryCard-description">{{ item.description }}</div>
          </div>
        </a>
      </div>
    </li>
  {% endfor %}
  </ul>
</div>

更多新品正在绞尽脑汁研发中，敬请期待～💗

### 温馨提示

姜姜十分关心每一个顾客的感受，并尽量满足合理的要求：

1. 由于椰奶中含有油脂，在低温状态下不可避免有油脂颗粒析出，属于正常现象；
2. 若有忌口的小料，请在下单时备注清楚。

### 顾客评价

以下为来自顾客的真实反馈（只展示 10 条）：

![]({{ "projects/julias-handmade-food/feedback-1" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-2" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-3" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-4" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-5" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-6" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-7" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-8" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-9" | asset_path }})

![]({{ "projects/julias-handmade-food/feedback-10" | asset_path }})
