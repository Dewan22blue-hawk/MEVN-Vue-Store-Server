module.exports = (app) => {
  // Mengekspor fungsi yang menerima objek `app` (instance dari Express.js) sebagai argumen.

  const products = require("../controllers/productController");
  // Mengimpor controller `productController`, yang berisi logika untuk menangani permintaan terkait produk.

  const router = require("express").Router();
  // Membuat instance router baru dari Express.js untuk menangani routing (penentuan rute).

  router.get("/", products.findAll);
  // Menentukan rute GET pada URL root (`/`). Saat ada permintaan GET ke URL ini, fungsi `findAll` dari `productController` akan dijalankan untuk mengambil semua produk.

  router.get("/:id", products.findOne);
  // Menentukan rute GET pada URL root (`/`). Saat ada permintaan GET ke URL ini, fungsi `findOne` dari `productController` akan dijalankan untuk mengambil produk berdasarkan id yang dikirimkan dari url parameter atau req.params.
  // /:id: Bagian :id adalah parameter dinamis dalam URL. Ketika klien mengakses URL dengan format /api/products/suatu_id, nilai suatu_id akan diteruskan ke fungsi findOne sebagai req.params.id.
  app.use("/api/products", router);
  // Menggunakan router yang telah didefinisikan sebelumnya untuk semua permintaan yang dimulai dengan `/api/products`. Dengan kata lain, permintaan ke `/api/products` akan diteruskan ke router ini.
};
