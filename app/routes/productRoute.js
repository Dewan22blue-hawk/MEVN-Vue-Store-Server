module.exports = (app) => {
  // Mengekspor fungsi yang menerima objek `app` (instance dari Express.js) sebagai argumen.

  const products = require("../controllers/productController");
  // Mengimpor controller `productController`, yang berisi logika untuk menangani permintaan terkait produk.

  const router = require("express").Router();
  // Membuat instance router baru dari Express.js untuk menangani routing (penentuan rute).

  router.get("/", products.findAll);
  // Menentukan rute GET pada URL root (`/`). Saat ada permintaan GET ke URL ini, fungsi `findAll` dari `productController` akan dijalankan untuk mengambil semua produk.

  app.use("/api/products", router);
  // Menggunakan router yang telah didefinisikan sebelumnya untuk semua permintaan yang dimulai dengan `/api/products`. Dengan kata lain, permintaan ke `/api/products` akan diteruskan ke router ini.
};
