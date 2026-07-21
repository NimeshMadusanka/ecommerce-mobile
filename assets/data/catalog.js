/* =====================================================================
   AXON — catalog data (single source of truth)
   Edit this file to add/remove categories & products.
   Loaded as a <script> so it works over http (Netlify) AND when the
   pages are opened directly from disk (file://) — no server needed.

   Product fields:
     key, id, name, price, oldPrice, image, hoverImage, category, brand,
     availability, rating, featured   (index best-seller grid),
     homeFeatured                     (home-fashion-2 "Featured" section),
     tabs        (home-fashion-2 tabs: "new" | "best" | "sale"),
     badges      (array: {type:"new|sale|trend", text:"..."}),
     colors      (array: {name, swatchClass, image}),
     sizes       (array of strings),
     saleMarquee (string, optional running-text ribbon),
     countdown   (number, optional seconds for the card countdown timer),
     link
   ===================================================================== */
window.CATALOG = {
  "categories": [
    { "slug": "clothing", "name": "Clothing", "image": "assets/images/category/fashion-2/cate-1.jpg" },
    { "slug": "jewelry",  "name": "Jewelry",  "image": "assets/images/category/fashion-2/cate-2.jpg" },
    { "slug": "shoes",    "name": "Shoes",    "image": "assets/images/category/fashion-2/cate-3.jpg" },
    { "slug": "bags",     "name": "Bags",     "image": "assets/images/category/fashion-2/cate-4.jpg" },
    { "slug": "wallets",  "name": "Wallets",  "image": "assets/images/category/fashion-2/cate-5.jpg" }
  ],
  "products": [
    {
      "key": "cottonTshirt",
      "id": 1,
      "name": "Cotton Short-Sleeved T-Shirt",
      "price": 69.99,
      "oldPrice": 99.99,
      "image": "assets/images/product/fashion-2/product-1.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-1_2.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "new", "text": "NEW" }],
      "saleMarquee": "HOT SALE 25% OFF",
      "sizes": ["XS", "S", "M"],
      "colors": [
        { "name": "Brown", "swatchClass": "bg-muted-brown", "image": "assets/images/product/fashion-2/product-1.jpg" },
        { "name": "Dark Blue", "swatchClass": "bg-dark-blue-gray", "image": "assets/images/product/fashion-2/product-1_4.jpg" },
        { "name": "White", "swatchClass": "bg-white", "image": "assets/images/product/fashion-2/product-1_6.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "fabricShoppingBag",
      "id": 2,
      "name": "Fabric Shopping Bag",
      "price": 29.99,
      "oldPrice": 49.99,
      "image": "assets/images/product/fashion-2/product-2.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-2_2.jpg",
      "category": "bags",
      "brand": "Vela",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "sale", "text": "-25%" }],
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "embossedWallet",
      "id": 3,
      "name": "Embossed Wallet With Logo",
      "price": 15.99,
      "oldPrice": 25.99,
      "image": "assets/images/product/fashion-2/product-3.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-3_2.jpg",
      "category": "wallets",
      "brand": "Vela",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [
        { "type": "sale", "text": "-25%" },
        { "type": "trend", "text": "TREND" }
      ],
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "pendantEarrings",
      "id": 4,
      "name": "Pendant Crystals Earrings",
      "price": 45.99,
      "oldPrice": 79.99,
      "image": "assets/images/product/fashion-2/product-4.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-4_2.jpg",
      "category": "jewelry",
      "brand": "Lumen",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "new", "text": "NEW" }],
      "countdown": 1093120,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "shoulderBagBuckle",
      "id": 5,
      "name": "Shoulder Bag With Buckle",
      "price": 9.99,
      "oldPrice": 19.99,
      "image": "assets/images/product/fashion-2/product-5.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-5_2.jpg",
      "category": "bags",
      "brand": "Vela",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "new", "text": "NEW" }],
      "colors": [
        { "name": "Pink", "swatchClass": "bg-dusty-rose", "image": "assets/images/product/fashion-2/product-5.jpg" },
        { "name": "Orange", "swatchClass": "bg-salmon-orange", "image": "assets/images/product/fashion-2/product-5_3.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "ruchedFittedDress",
      "id": 6,
      "name": "Ruched Fitted Dress",
      "price": 34.99,
      "oldPrice": 59.99,
      "image": "assets/images/product/fashion-2/product-6.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-6_2.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "sale", "text": "-25%" }],
      "sizes": ["S", "M", "L"],
      "colors": [
        { "name": "Brown", "swatchClass": "bg-muted-brown", "image": "assets/images/product/fashion-2/product-6.jpg" },
        { "name": "Gray", "swatchClass": "bg-steel-gray", "image": "assets/images/product/fashion-2/product-6_3.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "ribbedPoloSweater",
      "id": 7,
      "name": "Ribbed Polo-Neck Sweater With Buttons",
      "price": 22.99,
      "oldPrice": 39.99,
      "image": "assets/images/product/fashion-2/product-7.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-7_2.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [{ "type": "sale", "text": "-25%" }],
      "colors": [
        { "name": "Green", "swatchClass": "bg-charcoal-green", "image": "assets/images/product/fashion-2/product-7.jpg" },
        { "name": "Navy", "swatchClass": "bg-dark-blue-gray", "image": "assets/images/product/fashion-2/product-7_3.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "turtleneckKnitSweater",
      "id": 8,
      "name": "Turtleneck Knit Sweater",
      "price": 67.99,
      "oldPrice": 99.99,
      "image": "assets/images/product/fashion-2/product-8.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-8_2.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "tabs": ["new", "best", "sale"],
      "badges": [],
      "colors": [
        { "name": "Brown", "swatchClass": "bg-muted-brown", "image": "assets/images/product/fashion-2/product-8.jpg" },
        { "name": "Pink", "swatchClass": "bg-powder-pink", "image": "assets/images/product/fashion-2/product-8_3.jpg" },
        { "name": "Rose", "swatchClass": "bg-dusty-rose", "image": "assets/images/product/fashion-2/product-8_4.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "turtleneckZipSweater",
      "id": 9,
      "name": "Turtleneck Sweater With Zip",
      "price": 69.99,
      "oldPrice": 99.99,
      "image": "assets/images/product/fashion-2/product-9.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-9_2.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "homeFeatured": true,
      "tabs": [],
      "badges": [{ "type": "new", "text": "NEW" }],
      "sizes": ["S", "M", "L"],
      "colors": [
        { "name": "Gray", "swatchClass": "bg-soft-gray", "image": "assets/images/product/fashion-2/product-9.jpg" },
        { "name": "Blue", "swatchClass": "bg-dark-blue-gray", "image": "assets/images/product/fashion-2/product-9_3.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "meshShoeHeel",
      "id": 10,
      "name": "Mesh Shoe With Heel",
      "price": 29.99,
      "oldPrice": 49.99,
      "image": "assets/images/product/fashion-2/product-10.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-10_2.jpg",
      "category": "shoes",
      "brand": "Stride",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "homeFeatured": true,
      "tabs": [],
      "badges": [{ "type": "sale", "text": "-25%" }],
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "cityShoulderBagFlap",
      "id": 11,
      "name": "City Shoulder Bag With Flap",
      "price": 15.99,
      "oldPrice": 25.99,
      "image": "assets/images/product/fashion-2/product-11.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-11_2.jpg",
      "category": "bags",
      "brand": "Vela",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "homeFeatured": true,
      "tabs": [],
      "badges": [
        { "type": "sale", "text": "-25%" },
        { "type": "trend", "text": "TREND" }
      ],
      "colors": [
        { "name": "Pink", "swatchClass": "bg-dusty-rose", "image": "assets/images/product/fashion-2/product-11.jpg" },
        { "name": "Plum", "swatchClass": "bg-muted-brown", "image": "assets/images/product/fashion-2/product-11_3.jpg" },
        { "name": "Dark", "swatchClass": "bg-charcoal-green", "image": "assets/images/product/fashion-2/product-11_4.jpg" }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "asymmetricalLongTee",
      "id": 12,
      "name": "Asymmetrical Long-Sleeved T-Shirt",
      "price": 34.99,
      "oldPrice": 59.99,
      "image": "assets/images/product/fashion-2/product-12.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-12.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": false,
      "tabs": [],
      "badges": [],
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "peplumTopSeam",
      "id": 13,
      "name": "Peplum Top With Seam Detail",
      "price": 22.99,
      "oldPrice": 39.99,
      "image": "assets/images/product/fashion-2/product-13.jpg",
      "hoverImage": "assets/images/product/fashion-2/product-13.jpg",
      "category": "clothing",
      "brand": "Aurelia",
      "availability": "In Stock",
      "rating": 5,
      "featured": false,
      "tabs": [],
      "badges": [],
      "colors": [],
      "link": "product-detail.html"
    }
  ]
};
