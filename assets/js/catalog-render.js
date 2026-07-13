/* =====================================================================
   AXON MOBILE — catalog renderer
   Single source of truth: assets/data/catalog.js (window.CATALOG)
   Renders categories + products (index & shop) and owns the cart logic
   for those pages. Add/remove a category or product in catalog.js and
   it appears/disappears everywhere here — no HTML editing required.
   ===================================================================== */
(function () {
  "use strict";

  var DATA_URL = "assets/data/catalog.json";

  // Signal shop.js (loaded before us) NOT to auto-init on ready — we own the
  // init order and call window.initShopPlugins() after products are rendered.
  if (document.getElementById("gridLayout")) window.__catalogWillInitShop = true;

  var DEFAULT_DESC =
    "Premium build with the latest wireless tech, long battery life and a " +
    "refined finish — engineered for everyday performance.";

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function money(n) {
    var v = Number(n) || 0;
    return "Rs." + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function slugify(s) {
    return String(s).toLowerCase().trim().replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function starsHTML(rating) {
    var r = Math.max(0, Math.min(5, Math.round(Number(rating) || 5)));
    var out = "";
    for (var i = 0; i < r; i++) out += '<i class="icon icon-Star"></i>';
    return out;
  }
  function badgeHTML(p) {
    if (!p.badge || !p.badge.text) return "";
    return '<ul class="product-badge_list"><li class="product-badge_item text-caption-01 ' +
      esc(p.badge.type || "new") + '">' + esc(p.badge.text) + "</li></ul>";
  }
  function priceHTML(p) {
    var html = '<span class="price-new text-primary fw-semibold" data-product="' +
      esc(p.key) + '">' + money(p.price) + "</span>";
    if (p.oldPrice) html += '<span class="price-old text-caption-01">' + money(p.oldPrice) + "</span>";
    return html;
  }
  function colorsHTML(p) {
    if (!p.colors || !p.colors.length) return "";
    var items = p.colors.map(function (c, i) {
      // include an <img> (same as product image) because shop.js swatch-hover
      // reads the swatch's <img src> to update the product thumbnail
      return '<li class="product-color-item color-swatch hover-tooltip tooltip-bot ' +
        (i === 0 ? "active" : "") + '">' +
        '<span class="tooltip color-filter">' + esc(c.name) + "</span>" +
        '<span class="swatch-value ' + esc(c.swatchClass || "") + '"></span>' +
        '<img src="' + esc(c.image || p.image) + '" data-src="' + esc(c.image || p.image) + '" alt="Image">' +
        "</li>";
    }).join("");
    return '<ul class="product-color_list">' + items + "</ul>";
  }
  function dataAttrs(p) {
    return ' data-category="' + esc(p.category) + '"' +
      ' data-brand="' + esc(p.brand) + '"' +
      ' data-availability="' + esc(p.availability) + '"' +
      ' data-price="' + (Number(p.price) || 0) + '"';
  }
  function gridActions(p) {
    return '<ul class="product-action_list">' +
      '<li class="wishlist"><a href="#;" class="hover-tooltip tooltip-left box-icon add-wishlist-btn" data-product="' + esc(p.key) + '"><span class="icon icon-heart"></span><span class="tooltip">Add to Wishlist</span></a></li>' +
      "</ul>";
  }
  function addToCartBtn(p) {
    return '<a href="#shoppingCart" data-bs-toggle="offcanvas" class="tf-btn btn-white small w-100 add-to-cart-btn" data-product="' +
      esc(p.key) + '">Add to Cart</a>';
  }
  function detailLink(p) {
    // honor a custom link if it points somewhere other than the detail page
    if (p.link && p.link !== "product-detail.html") return esc(p.link);
    return "product-detail.html?key=" + encodeURIComponent(p.key);
  }

  /* ---------- card builders ---------- */
  function cardHome(p) {
    var link = detailLink(p);
    return '<div class="swiper-slide">' +
      '<div class="card-product"' + dataAttrs(p) + ">" +
        '<div class="card-product_wrapper square">' +
          '<a href="' + link + '" class="product-img">' +
            '<img class="img-product" loading="lazy" width="330" height="330" src="' + esc(p.image) + '" alt="Product">' +
            '<img class="img-hover" loading="lazy" width="330" height="330" src="' + esc(p.hoverImage || p.image) + '" alt="Product">' +
          "</a>" +
          badgeHTML(p) + gridActions(p) +
          '<div class="product-action_bot">' + addToCartBtn(p) + "</div>" +
        "</div>" +
        '<div class="card-product_info">' +
          '<a href="' + link + '" class="name-product lh-24 fw-medium link-underline-text">' + esc(p.name) + "</a>" +
          '<div class="star-wrap d-flex align-items-center">' + starsHTML(p.rating) + "</div>" +
          '<div class="price-wrap">' + priceHTML(p) + "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function cardGrid(p) {
    var link = detailLink(p);
    return '<div class="card-product grid"' + dataAttrs(p) + ">" +
      '<div class="card-product_wrapper">' +
        '<a href="' + link + '" class="product-img">' +
          '<img class="img-product" loading="lazy" width="330" height="440" src="' + esc(p.image) + '" alt="Product">' +
          '<img class="img-hover" loading="lazy" width="330" height="440" src="' + esc(p.hoverImage || p.image) + '" alt="Product">' +
        "</a>" +
        gridActions(p) + badgeHTML(p) +
        '<div class="product-action_bot">' + addToCartBtn(p) + "</div>" +
        '<div class="product-marquee_sale"><div class="marquee-wrapper"></div></div>' +
      "</div>" +
      '<div class="card-product_info">' +
        '<a href="' + link + '" class="name-product lh-24 fw-medium link-underline-text">' + esc(p.name) + "</a>" +
        '<div class="star-wrap d-flex align-items-center">' + starsHTML(p.rating) + "</div>" +
        '<div class="price-wrap">' + priceHTML(p) + "</div>" +
        colorsHTML(p) +
      "</div>" +
    "</div>";
  }

  function cardList(p) {
    var link = detailLink(p);
    return '<div class="card-product product-style_list"' + dataAttrs(p) + ">" +
      '<div class="card-product_wrapper">' +
        '<a href="' + link + '" class="product-img">' +
          '<img class="img-product" loading="lazy" width="330" height="440" src="' + esc(p.image) + '" alt="Product">' +
          '<img class="img-hover" loading="lazy" width="330" height="440" src="' + esc(p.hoverImage || p.image) + '" alt="Product">' +
        "</a>" +
        badgeHTML(p) +
        '<div class="product-marquee_sale"><div class="marquee-wrapper"></div></div>' +
      "</div>" +
      '<div class="card-product_info">' +
        '<a href="' + link + '" class="name-product lh-24 fw-medium link-underline-text">' + esc(p.name) + "</a>" +
        '<div class="star-wrap d-flex align-items-center">' + starsHTML(p.rating) + "</div>" +
        '<div class="price-wrap">' + priceHTML(p) + "</div>" +
        '<p class="description text-caption-01 mb-10">' + esc(p.description || DEFAULT_DESC) + "</p>" +
        colorsHTML(p) +
        '<ul class="product-size_list mb-10"></ul>' +
        '<ul class="product-action_list">' +
          '<li><a href="#shoppingCart" data-bs-toggle="offcanvas" class="hover-tooltip box-icon add-to-cart-btn" data-product="' + esc(p.key) + '"><span class="icon icon-Handbag"></span><span class="tooltip">Add to Cart</span></a></li>' +
          '<li class="wishlist"><a href="#;" class="hover-tooltip box-icon add-wishlist-btn" data-product="' + esc(p.key) + '"><span class="icon icon-heart"></span><span class="tooltip">Add to Wishlist</span></a></li>' +
        "</ul>" +
      "</div>" +
    "</div>";
  }

  function categoryCard(cat, count) {
    return '<div class="swiper-slide">' +
      '<a href="shop-default.html?category=' + encodeURIComponent(cat.slug) + '" class="category-v02 style-3 hover-img">' +
        '<div class="cate-image img-style">' +
          '<img loading="lazy" width="100" height="100" src="' + esc(cat.image) + '" alt="' + esc(cat.name) + '">' +
        "</div>" +
        '<div class="cate-content text-center">' +
          '<h6 class="cate_name link">' + esc(cat.name) + "</h6>" +
          '<p class="cate_quantity cl-text-2">' + count + " item" + (count === 1 ? "" : "s") + "</p>" +
        "</div>" +
      "</a>" +
    "</div>";
  }

  /* ---------- counts ---------- */
  function categoryCount(slug) {
    return (window.CATALOG.products || []).filter(function (p) { return p.category === slug; }).length;
  }

  /* ---------- renderers ---------- */
  function renderCategories() {
    var wrap = document.getElementById("categoryWrapper");
    if (!wrap) return;
    wrap.innerHTML = (window.CATALOG.categories || [])
      .map(function (c) { return categoryCard(c, categoryCount(c.slug)); }).join("");
  }

  // Header product tab — a single "All Products" link to the shop page.
  function renderHeaderTabs() {
    var box = document.getElementById("headerCategoryTabs");
    if (!box) return;
    box.innerHTML = '<li><a href="shop-default.html" class="link">All Products</a></li>';
  }

  function renderIndexProducts() {
    var wrap = document.getElementById("bestSellerWrapper");
    if (!wrap) return;
    var list = (window.CATALOG.products || []).filter(function (p) { return p.featured; });
    if (!list.length) list = window.CATALOG.products || [];
    wrap.innerHTML = list.map(cardHome).join("");
  }

  function renderShopProducts() {
    var grid = document.getElementById("gridLayout");
    var list = document.getElementById("listLayout");
    var products = window.CATALOG.products || [];
    // Text search from the header (?q=) — render only name matches.
    var q = (new URLSearchParams(window.location.search).get("q") || "").trim().toLowerCase();
    if (q) {
      products = products.filter(function (p) {
        return (p.name || "").toLowerCase().indexOf(q) !== -1;
      });
    }
    if (grid) grid.innerHTML = products.map(cardGrid).join("");
    if (list) list.innerHTML = products.map(cardList).join("");
  }

  function renderCategoryFacet() {
    var box = document.querySelector("#category .group-category");
    if (!box) return;
    box.innerHTML = (window.CATALOG.categories || []).map(function (c) {
      var n = categoryCount(c.slug);
      return '<li class="list-item">' +
        '<input type="checkbox" name="category" class="tf-check style-2" id="' + esc(c.slug) + '">' +
        '<label for="' + esc(c.slug) + '" class="label">' +
          '<span class="cate-text">' + esc(c.name) + "</span>" +
          '<span class="count">(' + n + ")</span>" +
        "</label>" +
      "</li>";
    }).join("");
  }

  function renderBrandFacet() {
    var box = document.querySelector("#brand .collapse-body");
    if (!box) return;
    var brands = {};
    (window.CATALOG.products || []).forEach(function (p) {
      if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1;
    });
    box.innerHTML = Object.keys(brands).map(function (name) {
      var id = "brand-" + slugify(name);
      return '<li class="list-item">' +
        '<input type="radio" name="brand" class="tf-check style-2" id="' + id + '">' +
        '<label for="' + id + '" class="label">' +
          '<span class="brand-text">' + esc(name) + "</span>" +
          '<span class="count">(' + brands[name] + ")</span>" +
        "</label>" +
      "</li>";
    }).join("");
  }

  function setPriceRange() {
    var slider = document.getElementById("price-value-range");
    if (!slider) return;
    var prices = (window.CATALOG.products || []).map(function (p) { return Number(p.price) || 0; });
    if (!prices.length) return;
    var rawMax = Math.ceil(Math.max.apply(null, prices));
    if (!isFinite(rawMax) || rawMax <= 0) rawMax = 100;
    // round the max up to a clean value for its magnitude (e.g. 2000, 500000)
    var mag = Math.pow(10, Math.max(1, String(rawMax).length - 2));
    var max = Math.ceil(rawMax / mag) * mag;
    // adaptive step (~200 steps) so the slider stays smooth even for large prices
    var step = Math.max(1, Math.round(max / 200));
    slider.dataset.min = 0;
    slider.dataset.max = max;
    slider.dataset.step = step;
  }

  // Real In/Out-of-stock counts from the catalog (replaces the template's fake numbers)
  function updateAvailabilityCounts() {
    var products = window.CATALOG.products || [];
    var inStock = products.filter(function (p) { return p.availability === "In Stock"; }).length;
    var outStock = products.length - inStock;
    var inEl = document.querySelector('label[for="inStock"] .count');
    var outEl = document.querySelector('label[for="outStock"] .count');
    if (inEl) inEl.textContent = "(" + inStock + ")";
    if (outEl) outEl.textContent = "(" + outStock + ")";
  }

  function applyCategoryFromURL() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("category");
    if (!slug) return;
    var box = document.getElementById(slug);
    if (box && box.name === "category") {
      box.checked = true;
      // trigger the change handler shop.js bound in initShopPlugins()
      if (window.jQuery) window.jQuery(box).trigger("change");
      else box.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  // Reflect the active search / category in the shop page heading.
  function updateShopHeading() {
    var params = new URLSearchParams(window.location.search);
    var q = (params.get("q") || "").trim();
    var slug = params.get("category");
    var title = null, sub = null;
    if (q) {
      title = 'Search results for "' + q + '"';
      sub = "Products matching your search.";
    } else if (slug) {
      var cat = (window.CATALOG.categories || []).filter(function (c) { return c.slug === slug; })[0];
      if (cat) { title = cat.name; sub = "Browse all " + cat.name + "."; }
    }
    if (!title) return;
    var h3 = document.querySelector(".section-page-title h3");
    if (h3) h3.textContent = title;
    var crumb = document.querySelector(".section-page-title .breadcrumbs p, .section-page-title .breadcrumbs P");
    if (crumb) crumb.textContent = title;
    var desc = document.querySelector(".section-page-title .main-page-title > p");
    if (desc) desc.textContent = sub;
  }

  /* ---------- product detail page ---------- */
  function setText(id, t) { var el = document.getElementById(id); if (el) el.textContent = t; }

  function renderProductDetail() {
    var wrap = document.getElementById("detail-wrap");
    var notFound = document.getElementById("detail-notfound");
    var key = new URLSearchParams(window.location.search).get("key");
    var p = (key && window.products) ? window.products[key] : null;

    if (!p) {
      if (wrap) wrap.style.display = "none";
      if (notFound) notFound.style.display = "block";
      return;
    }
    if (notFound) notFound.style.display = "none";
    if (wrap) wrap.style.display = "";

    document.title = p.name + " — AXON MOBILE";
    var img = document.getElementById("detail-image");
    if (img) { img.src = p.image; img.alt = p.name; }
    setText("detail-name", p.name);
    setText("detail-crumb", p.name);
    var priceEl = document.getElementById("detail-price");
    if (priceEl) priceEl.textContent = money(p.price);
    var oldEl = document.getElementById("detail-old-price");
    if (oldEl) oldEl.textContent = p.oldPrice ? money(p.oldPrice) : "";
    setText("detail-desc", p.description || DEFAULT_DESC);
    var stars = document.getElementById("detail-stars");
    if (stars) stars.innerHTML = starsHTML(p.rating);
    setText("detail-availability", p.availability || "");

    var qtyInput = document.getElementById("detail-qty");
    function getQty() {
      var v = parseInt(qtyInput && qtyInput.value, 10);
      return (isNaN(v) || v < 1) ? 1 : v;
    }
    var minus = document.getElementById("detail-qty-minus");
    var plus = document.getElementById("detail-qty-plus");
    if (minus) minus.addEventListener("click", function () { if (qtyInput) qtyInput.value = Math.max(1, getQty() - 1); });
    if (plus) plus.addEventListener("click", function () { if (qtyInput) qtyInput.value = getQty() + 1; });

    var addBtn = document.getElementById("detail-add-cart");
    // NOTE: not using the .add-to-cart-btn class here on purpose — that handler
    // calls preventDefault() and would block the offcanvas (drawer) from opening.
    if (addBtn) addBtn.addEventListener("click", function () { addToCart(key, getQty()); });
    var buyBtn = document.getElementById("detail-buy-now");
    if (buyBtn) buyBtn.addEventListener("click", function () { addToCart(key, getQty()); window.location = "checkout.html"; });
  }

  function reinitSwipers() {
    ["categoryWrapper", "bestSellerWrapper"].forEach(function (id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      var sw = wrap.closest(".tf-swiper");
      if (sw && sw.swiper) { try { sw.swiper.update(); } catch (e) {} }
    });
  }

  /* =====================================================================
     CART (delegated) — replaces the per-page inline cart scripts on
     index.html and shop-default.html. Works with dynamically injected
     cards because handlers are delegated on document.
     ===================================================================== */
  function getCart() {
    try { return JSON.parse(localStorage.getItem("cartItems")) || []; }
    catch (e) { return []; }
  }
  function saveCart(cart) { localStorage.setItem("cartItems", JSON.stringify(cart)); }

  function renderCart() {
    var cart = getCart();
    var container = document.getElementById("cart-items-container");
    var totalValue = document.querySelector(".tf-totals-total-value");
    var subtotal = 0, totalItems = 0;

    if (container) {
      if (!cart.length) {
        container.innerHTML =
          '<div class="box-text_empty type-shop_cart"><h4>Your cart is empty</h4></div>';
      } else {
        container.innerHTML = cart.map(function (p, index) {
          var itemPrice = Number(p.price) || 0;
          subtotal += itemPrice * p.quantity;
          totalItems += p.quantity;
          return '<div class="tf-mini-cart-item">' +
            '<div class="tf-mini-cart-image"><img src="' + esc(p.image) + '" width="80" alt="' + esc(p.name) + '"></div>' +
            '<div class="tf-mini-cart-info">' +
              '<a href="#" class="name fw-medium link text-line-clamp-1">' + esc(p.name) + "</a>" +
              '<div class="fw-medium d-flex align-items-center gap-2"><span>' + p.quantity + "</span><span>x</span>" +
              '<span class="price text-primary">' + money(itemPrice) + "</span></div>" +
            "</div>" +
            '<div class="tf-mini-cart-price"><div class="remove-cart-item cs-pointer" data-index="' + index + '">Remove</div></div>' +
          "</div>";
        }).join("");
      }
    } else {
      // still compute totals for pages without the drawer
      cart.forEach(function (p) { subtotal += (Number(p.price) || 0) * p.quantity; totalItems += p.quantity; });
    }

    if (totalValue) totalValue.innerText = money(subtotal);
    // Update every cart badge (desktop header + mobile bottom toolbar) — but NOT
    // the facet ".count" spans on shop pages, so target the cart ones specifically.
    document.querySelectorAll(".shop-cart .count, .toolbar-count")
      .forEach(function (b) { b.innerText = totalItems; });

    // The template's main.js checkListEmpty() hides the drawer bottom
    // (Subtotal + View Cart + Check Out) when it thinks the list is empty and
    // never re-shows it. Force it visible on every render so it's always shown.
    document.querySelectorAll("#shoppingCart .tf-mini-cart-bottom, #shoppingCart .box-empty_clear")
      .forEach(function (el) { el.style.display = ""; });

    renderViewCartPage(); // keep the view-cart table in sync (no-op elsewhere)
  }

  function addToCart(key, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var src = (window.products && window.products[key]) || null;
    if (!src) { console.error("AXON: product not found:", key); return; }
    var cart = getCart();
    var existing = cart.find(function (i) { return i.id === src.id; });
    if (existing) existing.quantity += qty;
    else cart.push({ id: src.id, name: src.name, price: Number(src.price), image: src.image, quantity: qty });
    saveCart(cart);
    renderCart();
  }

  function bindCart() {
    // add to cart (delegated — covers injected cards)
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".add-to-cart-btn");
      if (btn) {
        e.preventDefault();
        addToCart(btn.dataset.product);
        return;
      }
      var rm = e.target.closest(".remove-cart-item");
      if (rm) {
        var cart = getCart();
        cart.splice(Number(rm.dataset.index), 1);
        saveCart(cart);
        renderCart();
        return;
      }
      // view-cart page controls (remove / quantity) — same cart, same method
      var vc = e.target.closest(".vc-remove, .vc-minus, .vc-plus");
      if (vc) {
        var c = getCart();
        var i = parseInt(vc.getAttribute("data-index"), 10);
        if (isNaN(i) || i < 0 || i >= c.length) return;
        if (vc.classList.contains("vc-remove")) c.splice(i, 1);
        else if (vc.classList.contains("vc-minus")) c[i].quantity = Math.max(1, (parseInt(c[i].quantity, 10) || 1) - 1);
        else c[i].quantity = (parseInt(c[i].quantity, 10) || 1) + 1;
        saveCart(c);
        renderCart();
      }
    });

    // fill any *static* price spans left on the page (sections we didn't
    // regenerate, e.g. index Product Thumbs / Gear Bundle)
    document.querySelectorAll(".price-new[data-product]").forEach(function (el) {
      var key = (el.getAttribute("data-product") || "").trim();
      if (!el.textContent.trim() && window.products[key]) {
        el.textContent = money(window.products[key].price);
      }
    });

    // Re-render whenever the cart drawer opens — guarantees the live items +
    // total are correct even if a template script (main.js updateTotalPrice)
    // clobbered them at load, and on pages whose drawer was normalized.
    var drawer = document.getElementById("shoppingCart");
    if (drawer && !drawer.__axonBound) {
      drawer.__axonBound = true;
      drawer.addEventListener("show.bs.offcanvas", renderCart);
    }

    // Re-render on every show — including back/forward navigation (bfcache),
    // where DOMContentLoaded doesn't fire but pageshow does. Keeps the cart
    // page table, order summary, drawer and badge in sync with localStorage.
    if (!window.__axonPageShowBound) {
      window.__axonPageShowBound = true;
      window.addEventListener("pageshow", function () { renderCart(); });
    }

    renderCart();
  }

  /* =====================================================================
     SHARED CART DRAWER — make the #shoppingCart offcanvas match home on
     every page. Some pages ship a static demo drawer (no cart-items-
     container) or a duplicate id; normalize to the live drawer below.
     ===================================================================== */
  var CART_DRAWER_INNER = "<!-- Recommended Products Section -->\n    <div class=\"tf-minicart-recommendations file-delete\">\n        <div class=\"title d-flex justify-content-between align-items-center\">\n            <h5>You Might Like</h5>\n            <i class=\"icon icon-X2 link remove fs-24 cs-pointer\"></i>\n        </div>\n\n        <div class=\"wrap-recommendations\">\n            <div class=\"list-cart\">\n                <!-- keep your recommendation products here if needed -->\n            </div>\n        </div>\n    </div>\n\n    <div class=\"canvas-wrapper\">\n\n        <!-- Header -->\n        <div class=\"popup-header\">\n            <div class=\"cart-threshold\">\n                <p class=\"text\">\n                    Buy\n                    <span class=\"text-primary fw-7\">$70.00</span>\n                    more to get freeship\n                </p>\n\n                <div class=\"tf-progress-bar tf-progress-ship\">\n                    <div class=\"value\" style=\"width:0%\" data-progress=\"25\"></div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Cart Items Section -->\n        <div class=\"wrap\">\n            <div class=\"tf-mini-cart-wrap wrap-empty_text\">\n\n                <div class=\"tf-mini-cart-main\">\n                    <div class=\"tf-mini-cart-sroll\">\n\n                        <!-- Dynamic Cart Items -->\n                        <div class=\"tf-mini-cart-items list-empty\" id=\"cart-items-container\">\n\n                            <!-- Empty Cart Message -->\n                            <div class=\"box-text_empty type-shop_cart\" id=\"empty-cart-message\">\n                                <div class=\"shop-empty_top\">\n                                    <span class=\"icon\">\n                                        <i class=\"icon-Handbag\"></i>\n                                    </span>\n\n                                    <h4 class=\"text-emp\">Your cart is empty</h4>\n\n                                    <p class=\"cl-text-2\">\n                                        Your cart is currently empty.\n                                        Let us assist you in finding the right product\n                                    </p>\n                                </div>\n\n                                <div class=\"shop-empty_bot\">\n                                    <a href=\"shop-default.html\" class=\"tf-btn animate-btn\">\n                                        Shopping\n                                    </a>\n\n                                    <a href=\"index.html\" class=\"tf-btn btn-stroke\">\n                                        Back to home\n                                    </a>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Bottom Section -->\n                <div class=\"tf-mini-cart-bottom box-empty_clear\">\n\n                    <!-- Total -->\n                    <div class=\"tf-mini-cart-bottom-wrap\">\n                        <div class=\"tf-mini-cart-total\">\n                            <h5 class=\"text-total d-flex align-content-center justify-content-between\">\n                                <span class=\"subtotal\">Subtotal</span>\n                                <span class=\"total-price tf-totals-total-value\">$0.00</span>\n                            </h5>\n                        </div>\n\n                        <!-- Terms -->\n                        <div class=\"checkbox-wrap\">\n                            <input class=\"tf-check style-2\" type=\"checkbox\" id=\"agree-term\">\n\n                            <label for=\"agree-term\">\n                                I agree with\n                                <a href=\"term-and-condition.html\"\n                                    class=\"text-decoration-underline\">\n                                    Terms & Conditions\n                                </a>\n                            </label>\n                        </div>\n\n                        <!-- View Cart + Checkout -->\n                        <div class=\"tf-mini-cart-view-checkout\">\n                            <a href=\"view-cart.html\" class=\"tf-btn btn-stroke\">\n                                View Cart\n                            </a>\n\n                            <a href=\"checkout.html\" class=\"tf-btn animate-btn\">\n                                Check Out\n                            </a>\n                        </div>\n\n                        <a href=\"shop-default.html\"\n                            class=\"d-flex justify-content-center fw-semibold text-center link\">\n                            Or Continue Shopping\n                        </a>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>";

  function normalizeCartDrawer() {
    var drawers = document.querySelectorAll('#shoppingCart');
    if (!drawers.length) return;
    // remove any duplicate #shoppingCart (keep the first)
    for (var i = drawers.length - 1; i >= 1; i--) {
      if (drawers[i].parentNode) drawers[i].parentNode.removeChild(drawers[i]);
    }
    var drawer = document.querySelector('#shoppingCart');
    if (drawer && !drawer.querySelector('#cart-items-container')) {
      drawer.innerHTML = CART_DRAWER_INNER;
    }
  }

  /* =====================================================================
     WISHLIST — localStorage "wishlist" = array of product keys.
     Per user = per browser (no auth backend). Mirrors the cart pattern.
     ===================================================================== */
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem("wishlist")) || []; }
    catch (e) { return []; }
  }
  function saveWishlist(arr) { localStorage.setItem("wishlist", JSON.stringify(arr)); }

  function toggleWishlist(key) {
    if (!key) return;
    var w = getWishlist();
    var i = w.indexOf(key);
    if (i === -1) w.push(key); else w.splice(i, 1);
    saveWishlist(w);
    refreshWishlistUI();
  }

  function ensureWishlistStyles() {
    if (document.getElementById("axon-wishlist-styles")) return;
    var s = document.createElement("style");
    s.id = "axon-wishlist-styles";
    s.textContent =
      '.nav-icon-list a.nav-icon-item[href="wishlist.html"]{position:relative;}' +
      '.wishlist-count{position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;padding:0 3px;' +
      'display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:11px;line-height:10px;' +
      'color:#fff;background:var(--primary,#101010);}' +
      '.add-wishlist-btn.active .icon{color:#e4342b !important;}';
    document.head.appendChild(s);
  }

  function refreshWishlistUI() {
    var w = getWishlist();
    // header count badge (inject if missing)
    document.querySelectorAll('a.nav-icon-item[href="wishlist.html"]').forEach(function (a) {
      var b = a.querySelector(".wishlist-count");
      if (!b) { b = document.createElement("span"); b.className = "wishlist-count"; a.appendChild(b); }
      b.textContent = w.length;
      b.style.display = w.length ? "flex" : "none";
    });
    // active state on card hearts
    document.querySelectorAll(".add-wishlist-btn[data-product]").forEach(function (btn) {
      var on = w.indexOf(btn.getAttribute("data-product")) !== -1;
      btn.classList.toggle("active", on);
      var tip = btn.querySelector(".tooltip");
      if (tip) tip.textContent = on ? "Remove Wishlist" : "Add to Wishlist";
    });
    renderWishlistPage();
  }

  function wishlistCard(p) {
    var link = detailLink(p);
    return '<div class="card-product" data-product="' + esc(p.key) + '">' +
      '<div class="card-product_wrapper">' +
        '<a href="' + link + '" class="product-img">' +
          '<img class="img-product" loading="lazy" width="330" height="440" src="' + esc(p.image) + '" alt="Product">' +
          '<img class="img-hover" loading="lazy" width="330" height="440" src="' + esc(p.hoverImage || p.image) + '" alt="Product">' +
        "</a>" +
        badgeHTML(p) +
        '<span class="product-action_remove remove box-icon hover-tooltip tooltip-left wishlist-remove" data-product="' + esc(p.key) + '">' +
          '<i class="icon icon-trash"></i><span class="tooltip">Remove</span>' +
        "</span>" +
        '<div class="product-action_bot">' + addToCartBtn(p) + "</div>" +
      "</div>" +
      '<div class="card-product_info">' +
        '<a href="' + link + '" class="name-product lh-24 fw-medium link-underline-text">' + esc(p.name) + "</a>" +
        '<div class="star-wrap d-flex align-items-center">' + starsHTML(p.rating) + "</div>" +
        '<div class="price-wrap">' + priceHTML(p) + "</div>" +
      "</div>" +
    "</div>";
  }

  // Resolve a cart item (stored by id) back to its product key, for detail links.
  function keyById(id) {
    var products = window.products || {};
    for (var k in products) { if (products[k] && products[k].id === id) return k; }
    return null;
  }

  // view-cart.html table — same cart method as the side panel + header.
  function renderViewCartPage() {
    var container = document.getElementById("view-cart-items");
    if (!container) return;
    var cart = getCart();
    var subtotal = 0;
    if (!cart.length) {
      container.innerHTML =
        '<tr><td colspan="4" class="text-center" style="padding:44px 0;">' +
        'Your cart is empty. <a href="shop-default.html" class="link fw-medium text-decoration-underline">Continue shopping</a>' +
        "</td></tr>";
    } else {
      container.innerHTML = cart.map(function (p, i) {
        var price = Number(p.price) || 0;
        var qty = Math.max(1, parseInt(p.quantity, 10) || 1);
        var lineTotal = price * qty;
        subtotal += lineTotal;
        var k = keyById(p.id);
        var link = k ? "product-detail.html?key=" + encodeURIComponent(k) : "#";
        return '<tr class="tf-cart-item">' +
          '<td class="tf-cart-item_product">' +
            '<a href="' + link + '" class="img-box"><img src="' + esc(p.image) + '" width="100" alt=""></a>' +
            '<div class="cart-info">' +
              '<a href="' + link + '" class="name">' + esc(p.name) + "</a>" +
              '<span class="vc-remove cs-pointer" data-index="' + i + '" style="display:inline-flex;align-items:center;gap:5px;color:#e4342b;margin-top:8px;font-size:13px;"><i class="icon icon-trash"></i> Remove</span>' +
            "</div>" +
          "</td>" +
          '<td class="tf-cart-item_price">' + money(price) + "</td>" +
          '<td class="tf-cart-item_quantity">' +
            '<div class="vc-qty" style="display:inline-flex;align-items:center;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">' +
              '<button type="button" class="vc-minus" data-index="' + i + '" aria-label="Decrease" style="width:36px;height:40px;border:0;background:#fff;font-size:18px;line-height:1;cursor:pointer;">-</button>' +
              '<input class="vc-qtyval" type="text" value="' + qty + '" readonly style="width:42px;height:40px;text-align:center;border:0;border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;">' +
              '<button type="button" class="vc-plus" data-index="' + i + '" aria-label="Increase" style="width:36px;height:40px;border:0;background:#fff;font-size:18px;line-height:1;cursor:pointer;">+</button>' +
            "</div>" +
          "</td>" +
          '<td class="tf-cart-item_total">' + money(lineTotal) + "</td>" +
        "</tr>";
      }).join("");
    }
    var sp = document.querySelector(".subtotal-price"); if (sp) sp.innerText = money(subtotal);
    var tp = document.querySelector(".total-price"); if (tp) tp.innerText = money(subtotal);
  }

  function renderWishlistPage() {
    var wrap = document.querySelector(".wrapper-wishlist");
    if (!wrap) return;
    var items = getWishlist().map(function (k) { return window.products[k]; }).filter(Boolean);
    if (!items.length) {
      wrap.innerHTML = '<div class="box-text_empty" style="grid-column:1/-1;text-align:center;padding:50px 0;">' +
        '<h5 class="mb-2">Your wishlist is empty</h5>' +
        '<p class="cl-text-2 mb-3">Save items you love by tapping the heart on any product.</p>' +
        '<a href="shop-default.html" class="tf-btn btn-fill" style="height:48px;padding:0 28px;border-radius:8px;display:inline-flex;align-items:center;">Continue Shopping</a></div>';
      return;
    }
    wrap.innerHTML = items.map(wishlistCard).join("");
  }

  function bindWishlist() {
    document.addEventListener("click", function (e) {
      var add = e.target.closest(".add-wishlist-btn");
      if (add) { e.preventDefault(); toggleWishlist(add.getAttribute("data-product")); return; }
      var rm = e.target.closest(".wishlist-remove");
      if (rm) { e.preventDefault(); toggleWishlist(rm.getAttribute("data-product")); }
    });
  }

  /* =====================================================================
     BOOTSTRAP: render -> initialize plugins
     Data comes from window.CATALOG (assets/data/catalog.js, loaded as a
     <script> before this file). That works over http AND file:// (no fetch).
     A fetch fallback remains for the case where only a legacy catalog.json
     is deployed and this script is loaded without catalog.js.
     ===================================================================== */
  function boot(data) {
    window.CATALOG = data;
    window.products = {};
    (data.products || []).forEach(function (p) { window.products[p.key] = p; });

    var isShop = !!document.getElementById("gridLayout");
    var isIndex = !!document.getElementById("bestSellerWrapper") ||
                  !!document.getElementById("categoryWrapper");
    var isDetail = !!document.getElementById("detail-wrap");

    if (isDetail) {
      renderProductDetail();
    }
    if (isShop) {
      renderShopProducts();
      renderCategoryFacet();
      renderBrandFacet();
      setPriceRange();
      updateAvailabilityCounts();
      if (typeof window.initShopPlugins === "function") window.initShopPlugins();
      applyCategoryFromURL();
      updateShopHeading();
    }
    if (isIndex) {
      renderCategories();
      renderIndexProducts();
      reinitSwipers();
    }

    renderHeaderTabs();
    enhanceMobileSearch();
    wireHeaderSearch();
    normalizeCartDrawer();
    bindCart();
    ensureWishlistStyles();
    bindWishlist();
    refreshWishlistUI();
  }

  // Give the mobile searches (the #search modal + the #mobileMenu form, both
  // ".form-search-nav") the same category + search as the desktop header: prepend
  // a native category <select> populated from the catalog. Picking a category
  // navigates to the category page (mirrors the desktop main-page behaviour); the
  // text box still searches by q via wireHeaderSearch().
  function enhanceMobileSearch() {
    var cats = (window.CATALOG && window.CATALOG.categories) || [];
    if (!cats.length) return;
    var options = '<option value="">All Categories</option>' +
      cats.map(function (c) {
        return '<option value="' + esc(c.slug) + '">' + esc(c.name) + "</option>";
      }).join("");

    document.querySelectorAll(".form-search-nav").forEach(function (form) {
      if (form.querySelector('[name="product_cate"]')) return; // already has one
      var sel = document.createElement("select");
      sel.name = "product_cate";
      sel.className = "mobile-cate";
      sel.innerHTML = options;
      sel.addEventListener("change", function () {
        if (sel.value) {
          window.location = "shop-default.html?category=" + encodeURIComponent(sel.value);
        }
      });
      form.insertBefore(sel, form.firstChild);
    });
  }

  // Header product search -> product page (shop-default.html?q=...&category=...)
  function wireHeaderSearch() {
    var forms = document.querySelectorAll(".form_search-product, .form-search-nav");
    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="text"], input.ipt');
        var q = input ? input.value.trim() : "";
        var sel = form.querySelector('[name="product_cate"]');
        var cat = sel ? sel.value : "";
        var params = new URLSearchParams();
        if (q) params.set("q", q);
        if (cat) params.set("category", cat);
        var qs = params.toString();
        window.location = "shop-default.html" + (qs ? "?" + qs : "");
      });
    });
  }

  function init() {
    // Preferred path: data provided synchronously by catalog.js — works on file://
    if (window.CATALOG && window.CATALOG.products) {
      boot(window.CATALOG);
      return;
    }
    // Fallback: fetch the JSON (http/Netlify only; blocked under file://)
    fetch(DATA_URL, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(boot)
      .catch(function (err) {
        console.error("AXON: catalog data not available —", err,
          "\nMake sure assets/data/catalog.js is included before catalog-render.js.");
        // Best effort: still initialize shop filters against the static markup.
        if (document.getElementById("gridLayout") && typeof window.initShopPlugins === "function") {
          window.initShopPlugins();
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
