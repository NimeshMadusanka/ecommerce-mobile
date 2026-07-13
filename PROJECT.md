# Amerce — Multipurpose eCommerce HTML Template

## Overview

**Amerce** is a static, front-end-only multipurpose eCommerce storefront template. It is built as a collection of standalone HTML pages styled with SCSS (compiled to CSS) and made interactive with jQuery and a set of third-party JavaScript plugins. There is **no backend, build framework, or package manager** wired up — pages are opened/served directly as static files, and the only "build" step is compiling SCSS to CSS.

> Note: `.env.example` references Next.js / Prisma / NextAuth variables. These are placeholders for a *future* backend integration and are **not** used by the current static template.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Plain HTML (one file per page) |
| Styling | SCSS → CSS via the `sass` CLI; Bootstrap as a base |
| Interactivity | jQuery + custom scripts |
| Plugins | Swiper, Isotope, Magnific Popup, PhotoSwipe, Drift/zoom, noUiSlider, WOW.js, Odometer, model-viewer (3D), Fancybox, Bootstrap Select, image-compare-viewer, countdown/countto |

## Project Structure

```
.
├── *.html                 # ~100 standalone page templates (see below)
├── README.md              # Holds the sass --watch build command
├── .env.example           # Placeholder vars for a future backend (Next.js)
└── assets/
    ├── scss/              # Source styles (edit here)
    │   ├── app.scss       # Entry point (imports everything)
    │   ├── abstracts/     # _variable, _mixin, _index
    │   ├── core/          # _classes (utilities)
    │   └── component/     # header, footer, layout, blog, shop, elements/*
    ├── css/               # Compiled + vendor CSS (styles.css is the build output)
    ├── js/                # main.js, carousel.js, product.js, shop.js, zoom.js
    │   └── plugin/        # bundled third-party libraries
    ├── images/            # product, category, blog, slider, logo, payment, etc.
    ├── fonts/
    └── icon/
```

## Page Categories

The HTML files cover a full storefront's worth of layouts:

- **Home variants** (`home-*.html`): fashion, electronics, furniture, jewelry, cosmetic, organic, pet-care, sport, decor, baby, headphone, and many more niche demos.
- **Shop / collection** (`shop-*.html`, `collection.html`): sidebar/drawer/dropdown filters, full-width, infinite scroll, load-more, hover styles.
- **Product detail** (`product-*.html`): zoom variants (inner/external/lightbox/3D), swatches (color/image/dropdown/rounded), countdown, deals, pre-order, out-of-stock, group/bundle, buy-X-get-Y, video.
- **Cart & checkout**: `view-cart.html`, `checkout.html`, `wishlist.html`, `compare.html`, `track-order.html`, `invoice.html`.
- **Account**: `account-page.html`, `account-orders.html`, `account-addresses.html`, `account-setting.html`, `login.html`, `register.html`, `forget-password.html`.
- **Content / info**: `about.html`, `blog.html`, `blog-single.html`, `contact.html`, `faq.html`, `our-store.html`, `privacy-policy.html`, `term-and-condition.html`, `shipping.html`, `return-and-refund.html`, `404.html`, `popup.html`.

## JavaScript (`assets/js/main.js`)

`main.js` is the core interaction file. Documented features include: image/variant pickers, quantity buttons, go-to-top, mobile sidebar/menu, sticky header & bottom bar, auto popups, wishlist/compare add & remove, filter sidebar, estimate shipping, coupon copy, parallax, color swatches, custom dropdowns, show-password toggle, dashboard image change, odometer counters, Isotope filtering, and reveal animations. Page-specific logic lives in `carousel.js`, `product.js`, `shop.js`, and `zoom.js`.

## Working on the Project

### Build styles
Edit SCSS under `assets/scss/`, then compile to CSS. The watch command (from `README.md`):

```bash
sass assets/scss/app.scss assets/css/styles.css --watch
```

> ⚠️ The README points the output at `styles.css` while `app.scss` is the actual entry point — verify the entry/output paths match your setup before relying on the watcher.

### Preview pages
Open any `.html` file in a browser, or serve the directory with a simple static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

## Git

- Current branch: `feat/latest_fixes`
- Main branch: `main` (remote `origin/main`, plus an `origin/DEV` branch)

## Notes / Caveats

- `home-electronics.html` is currently **empty** (0 bytes).
- `product-detail.html` and `invoice.html` are small/stub files compared to the other full-size templates.
- This is a design template: there is no real cart persistence, payment processing, or data layer — all dynamic behavior is client-side UI simulation.
