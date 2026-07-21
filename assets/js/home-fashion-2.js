/* =====================================================================
   home-fashion-2 renderer
   Renders the category slider, the New / Best / Sale product tabs and the
   "Featured" section on home-fashion-2.html from window.CATALOG
   (assets/data/catalog.js), producing markup that matches the page's
   existing fashion card design. Cart/wishlist behaviour is owned by
   catalog-render.js (delegated on document), which this markup hooks into
   via .add-to-cart-btn / .add-wishlist-btn + data-product.

   Must run AFTER catalog.js and BEFORE carousel.js so the Swipers
   initialise on the fully-rendered slides. It runs synchronously at the
   point it is included (near the end of <body>), so all target wrappers
   above it already exist in the DOM.
   ===================================================================== */
(function () {
  "use strict";

  var CAT = window.CATALOG;
  if (!CAT || !CAT.products) return; // catalog.js not loaded — bail quietly

  /* ---------- helpers (mirror catalog-render.js) ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function money(n) {
    var v = Number(n) || 0;
    return "Rs." + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function starsHTML(rating) {
    var r = Math.max(0, Math.min(5, Math.round(Number(rating) || 5)));
    var out = "";
    for (var i = 0; i < r; i++) out += '<i class="icon icon-Star"></i>';
    return out;
  }
  function detailLink(p) {
    if (p.link && p.link !== "product-detail.html") return esc(p.link);
    return "product-detail.html?key=" + encodeURIComponent(p.key);
  }

  /* ---------- card fragments ---------- */
  function badgeHTML(p) {
    var list = (p.badges && p.badges.length) ? p.badges : (p.badge ? [p.badge] : []);
    list = list.filter(function (b) { return b && b.text; });
    if (!list.length) return "";
    return '<ul class="product-badge_list">' + list.map(function (b) {
      return '<li class="product-badge_item text-caption-01 ' + esc(b.type || "new") + '">' + esc(b.text) + "</li>";
    }).join("") + "</ul>";
  }
  function priceHTML(p) {
    var html = '<span class="price-new text-primary fw-semibold" data-product="' + esc(p.key) + '">' + money(p.price) + "</span>";
    if (p.oldPrice) html += '<span class="price-old text-caption-01 cl-text-3">' + money(p.oldPrice) + "</span>";
    return html;
  }
  function colorsHTML(p) {
    if (!p.colors || !p.colors.length) return "";
    var items = p.colors.map(function (c, i) {
      var img = c.image || p.image;
      return '<li class="product-color-item color-swatch hover-tooltip tooltip-bot' + (i === 0 ? " active" : "") + '">' +
        '<span class="tooltip color-filter">' + esc(c.name) + "</span>" +
        '<span class="swatch-value ' + esc(c.swatchClass || "") + '"></span>' +
        '<img src="' + esc(img) + '" data-src="' + esc(img) + '" alt="Image">' +
      "</li>";
    }).join("");
    return '<ul class="product-color_list">' + items + "</ul>";
  }
  function sizesHTML(p) {
    if (!p.sizes || !p.sizes.length) return "";
    var items = p.sizes.map(function (s) {
      return '<li class="size-item text-caption-01">' + esc(s) + "</li>";
    }).join("");
    return '<div class="variant-box"><ul class="product-size_list">' + items + "</ul></div>";
  }
  function marqueeHTML(p) {
    if (!p.saleMarquee) return "";
    var one = '<div class="marquee-child-item">' + esc(p.saleMarquee) + '</div><i class="icon icon-Star2"></i>';
    return '<div class="product-marquee_sale"><div class="marquee-wrapper"><div class="initial-child-container">' +
      one + one + one + one + one +
      "</div></div></div>";
  }
  function countdownHTML(p) {
    if (!p.countdown) return "";
    return '<div class="product-countdown">' +
      '<div class="js-countdown cd-has-zero" data-timer="' + (Number(p.countdown) || 0) + '" data-labels="D : ,H : ,M : ,S"></div>' +
    "</div>";
  }
  function actionListHTML(p) {
    return '<ul class="product-action_list">' +
      '<li class="wishlist"><a href="#;" class="hover-tooltip tooltip-left box-icon add-wishlist-btn" data-product="' + esc(p.key) + '"><span class="icon icon-heart"></span><span class="tooltip">Add to Wishlist</span></a></li>' +
      '<li class="compare"><a href="#compare" data-bs-toggle="offcanvas" class="hover-tooltip tooltip-left box-icon"><span class="icon icon-ArrowsLeftRight"></span><span class="tooltip">Compare</span></a></li>' +
      '<li><a href="#quickView" data-bs-toggle="offcanvas" class="hover-tooltip tooltip-left box-icon"><span class="icon icon-Eye"></span><span class="tooltip">Quick view</span></a></li>' +
    "</ul>";
  }
  function addToCartHTML(p) {
    return '<div class="product-action_bot">' +
      '<a href="#shoppingCart" data-bs-toggle="offcanvas" class="tf-btn btn-white small w-100 add-to-cart-btn" data-product="' + esc(p.key) + '">Add to Cart</a>' +
    "</div>";
  }

  /* ---------- full product card (matches home-fashion-2 design) ---------- */
  function productCard(p, delay) {
    var link = detailLink(p);
    var hasSize = (p.sizes && p.sizes.length) ? " has-size" : "";
    var delayAttr = delay ? ' data-wow-delay="' + delay + '"' : "";
    return '<div class="swiper-slide wow fadeInUp"' + delayAttr + ">" +
      '<div class="card-product' + hasSize + '">' +
        '<div class="card-product_wrapper">' +
          '<a href="' + link + '" class="product-img">' +
            '<img class="img-product" loading="lazy" width="330" height="440" src="' + esc(p.image) + '" alt="Product">' +
            '<img class="img-hover" loading="lazy" width="330" height="440" src="' + esc(p.hoverImage || p.image) + '" alt="Product">' +
          "</a>" +
          actionListHTML(p) +
          badgeHTML(p) +
          addToCartHTML(p) +
          sizesHTML(p) +
          marqueeHTML(p) +
          countdownHTML(p) +
        "</div>" +
        '<div class="card-product_info">' +
          '<a href="' + link + '" class="name-product lh-24 fw-medium link-underline-text">' + esc(p.name) + "</a>" +
          '<div class="star-wrap d-flex align-items-center">' + starsHTML(p.rating) + "</div>" +
          '<div class="price-wrap">' + priceHTML(p) + "</div>" +
          colorsHTML(p) +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function categoryCount(slug) {
    return CAT.products.filter(function (p) { return p.category === slug; }).length;
  }
  function categoryCard(cat, delay) {
    var href = "shop-default.html?category=" + encodeURIComponent(cat.slug);
    var n = categoryCount(cat.slug);
    var delayAttr = delay ? ' data-wow-delay="' + delay + '"' : "";
    return '<div class="swiper-slide wow fadeInUp"' + delayAttr + ">" +
      '<div class="category-v06 style-2 hover-img4">' +
        '<a href="' + href + '" class="cate-image img-style4">' +
          '<img loading="lazy" width="400" height="533" src="' + esc(cat.image) + '" alt="' + esc(cat.name) + '">' +
        "</a>" +
        '<a href="' + href + '" class="cate-content">' +
          '<h6 class="cate_name">' + esc(cat.name) + "</h6>" +
          '<p class="cate_quantity">' + n + " item" + (n === 1 ? "" : "s") + "</p>" +
        "</a>" +
      "</div>" +
    "</div>";
  }

  /* ---------- render into the page ---------- */
  function fill(el, html) { if (el) el.innerHTML = html; }
  function delayFor(i) { return i > 0 ? (Math.min(i, 6) * 0.1).toFixed(1) + "s" : ""; }

  function renderCategories() {
    var wrap = document.getElementById("hf2CategoryWrapper");
    if (!wrap) return;
    fill(wrap, (CAT.categories || []).map(function (c, i) { return categoryCard(c, delayFor(i)); }).join(""));
  }

  function productsForTab(tab) {
    return CAT.products.filter(function (p) { return p.tabs && p.tabs.indexOf(tab) !== -1; });
  }

  function renderTab(tabId, tabKey) {
    var pane = document.getElementById(tabId);
    if (!pane) return;
    var wrap = pane.querySelector(".swiper-wrapper");
    if (!wrap) return;
    var list = productsForTab(tabKey);
    fill(wrap, list.map(function (p, i) { return productCard(p, delayFor(i)); }).join(""));
  }

  function renderFeatured() {
    var wrap = document.getElementById("hf2FeaturedWrapper");
    if (!wrap) return;
    var list = CAT.products.filter(function (p) { return p.homeFeatured; });
    if (!list.length) list = CAT.products.slice(0, 3);
    fill(wrap, list.map(function (p, i) { return productCard(p, delayFor(i)); }).join(""));
  }

  renderCategories();
  renderTab("new", "new");
  renderTab("best", "best");
  renderTab("sale", "sale");
  renderFeatured();
})();
