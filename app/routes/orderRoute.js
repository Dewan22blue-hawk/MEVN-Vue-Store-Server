module.exports = (app) => {
  // Mengekspor sebuah fungsi yang menerima objek `app` (instance dari Express.js) sebagai argumen. Fungsi ini digunakan untuk mengatur rute-rute terkait pesanan.

  const orders = require("../controllers/orderController");
  // Mengimpor controller `orderController`, yang berisi logika untuk menangani permintaan terkait pesanan.

  const router = require("express").Router();
  // Membuat instance router baru dari Express.js yang digunakan untuk mendefinisikan rute-rute spesifik untuk pesanan.

  router.get("/user/:id", orders.findOrder);
  // Mendefinisikan rute GET pada path `/user/:id`. Saat ada permintaan GET ke URL ini, fungsi `findOrder` dari `orderController` akan dijalankan untuk mengambil pesanan berdasarkan ID pengguna yang diberikan.
  router.post("/user/:id/add", orders.addToCart);
  // Menentukan rute HTTP POST pada URL `/user/:id/add`.
  // Ketika ada permintaan POST ke URL ini, fungsi `addToCart` dari `orderController` akan dijalankan.
  // `:id` adalah parameter dinamis dalam URL yang dapat menangkap nilai ID pengguna.
  // Fungsi `addToCart` digunakan untuk menambahkan item ke dalam keranjang belanja pengguna yang ID-nya diberikan melalui URL.
  router.delete("/user/:id/product/:product", orders.removeFromCart);
  // Menentukan rute HTTP DELETE dengan path `/user/:id/product/:product`.
  // Saat ada permintaan DELETE ke URL ini, fungsi `removeFromCart` dari `orderController` akan dijalankan.
  // `:id` adalah parameter dinamis yang mewakili ID pengguna, dan `:product` adalah parameter dinamis yang mewakili kode produk.
  // Fungsi `removeFromCart` akan menghapus produk yang ditentukan dari keranjang belanja pengguna berdasarkan ID dan kode produk yang diberikan.

  app.use("/api/orders", router);
  // Menggunakan router yang telah didefinisikan sebelumnya untuk semua permintaan yang dimulai dengan `/api/orders`. Dengan kata lain, permintaan ke `/api/orders` akan diteruskan ke router ini.
};
