/* =====================================================================
   AXON MOBILE — catalog data (single source of truth)
   Edit this file to add/remove categories & products.
   Loaded as a <script> so it works over http (Netlify) AND when the
   pages are opened directly from disk (file://) — no server needed.
   ===================================================================== */
window.CATALOG = {
  "categories": [
    {
      "slug": "smartphones",
      "name": "Smartphones",
      "image": "assets/images/category/electric/cate-1.jpg"
    },
    {
      "slug": "smartwatches",
      "name": "Smart Watches",
      "image": "assets/images/category/electric/cate-2.jpg"
    },
    {
      "slug": "earphones",
      "name": "Earphones",
      "image": "assets/images/category/electric/cate-3.jpg"
    },
    {
      "slug": "headphones",
      "name": "Headphones",
      "image": "assets/images/category/electric/cate-4.jpg"
    },
    {
      "slug": "speakers",
      "name": "Speakers",
      "image": "assets/images/category/electric/cate-5.jpg"
    },
    {
      "slug": "accessories",
      "name": "Accessories",
      "image": "assets/images/category/electric/cate-6.jpg"
    },
    {
      "slug": "cables",
      "name": "Cables & Chargers",
      "image": "assets/images/category/electric/cate-7.jpg"
    },
    {
      "slug": "microphones",
      "name": "Microphones",
      "image": "assets/images/category/electric/cate-8.jpg"
    }
  ],
  "products": [
    {
      "key": "iphone17",
      "id": 1,
      "name": "Apple iPhone 17 Pro Max – Titanium Design, A19 Pro Chip",
      "price": 1000,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-1.jpg",
      "category": "smartphones",
      "brand": "Apple",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "badge": {
        "type": "new",
        "text": "NEW"
      },
      "colors": [
        {
          "name": "Brown",
          "swatchClass": "bg-muted-brown"
        },
        {
          "name": "Dark Blue",
          "swatchClass": "bg-dark-blue-gray"
        },
        {
          "name": "Gray",
          "swatchClass": "bg-soft-gray"
        }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "watch10",
      "id": 2,
      "name": "Apple Watch Series 10 – GPS + Cellular",
      "price": 2000,
      "oldPrice": 2500,
      "image": "assets/images/product/electronics/product-2.jpg",
      "category": "smartwatches",
      "brand": "Apple",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "badge": {
        "type": "sale",
        "text": "-20%"
      },
      "colors": [
        {
          "name": "Gray",
          "swatchClass": "bg-soft-gray"
        },
        {
          "name": "Beige",
          "swatchClass": "bg-cream"
        }
      ],
      "link": "product-detail.html"
    },
    {
      "key": "mc100",
      "id": 3,
      "name": "MC100 Wireless Charge Pad",
      "price": 29.99,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-3.jpg",
      "category": "accessories",
      "brand": "Anker",
      "availability": "In Stock",
      "rating": 4,
      "featured": false,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "jvcHeadphones",
      "id": 4,
      "name": "JVC Wireless Headphones with Bluetooth 5.2, Microphone",
      "price": 79.99,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-4.jpg",
      "category": "headphones",
      "brand": "JVC",
      "availability": "In Stock",
      "rating": 4,
      "featured": true,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "mw09Earphones",
      "id": 5,
      "name": "MW09 Active Noise-Cancelling True Wireless Earphones",
      "price": 299,
      "oldPrice": 349,
      "image": "assets/images/product/electronics/product-5.jpg",
      "category": "earphones",
      "brand": "Master & Dynamic",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "badge": {
        "type": "sale",
        "text": "-14%"
      },
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "mg20Headphones",
      "id": 6,
      "name": "Master & Dynamic MG20 Wireless Over-Ear Headphones",
      "price": 349,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-6.jpg",
      "category": "headphones",
      "brand": "Master & Dynamic",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "badge": {
        "type": "new",
        "text": "NEW"
      },
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "usbCBraidedCable",
      "id": 7,
      "name": "USB-C to USB-C Braided Charging Cable",
      "price": 39.99,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-7.jpg",
      "category": "cables",
      "brand": "Anker",
      "availability": "In Stock",
      "rating": 4,
      "featured": false,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "samsungWatch7",
      "id": 8,
      "name": "Samsung Galaxy Watch 7 LE 40mm With Nano Sim",
      "price": 299,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-8.jpg",
      "category": "smartwatches",
      "brand": "Samsung",
      "availability": "In Stock",
      "rating": 4,
      "featured": true,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "rodeNTUSBMini",
      "id": 9,
      "name": "Rode NT-USB Mini Studio Microphone",
      "price": 299,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-9.jpg",
      "category": "microphones",
      "brand": "Rode",
      "availability": "In Stock",
      "rating": 5,
      "featured": true,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    },
    {
      "key": "deePoonM2VR",
      "id": 10,
      "name": "DeePoon M2 Virtual Reality Headset – Super AMOLED Display",
      "price": 299,
      "oldPrice": null,
      "image": "assets/images/product/electronics/product-10.jpg",
      "category": "accessories",
      "brand": "DeePoon",
      "availability": "Out of stock",
      "rating": 4,
      "featured": true,
      "badge": null,
      "colors": [],
      "link": "product-detail.html"
    }
  ]
};
