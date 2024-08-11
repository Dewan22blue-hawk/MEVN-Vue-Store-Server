module.exports = (app) => {
  // Mengekspor sebuah fungsi yang menerima objek `app` (instance dari Express.js) sebagai argumen. Fungsi ini digunakan untuk mengatur rute-rute terkait pesanan.

  const orders = require("../controllers/orderController");
  // Mengimpor controller `orderController`, yang berisi logika untuk menangani permintaan terkait pesanan.

  const router = require("express").Router();
  // Membuat instance router baru dari Express.js yang digunakan untuk mendefinisikan rute-rute spesifik untuk pesanan.

  router.get("/user/:id", orders.findOrder);
  // Mendefinisikan rute GET pada path `/user/:id`. Saat ada permintaan GET ke URL ini, fungsi `findOrder` dari `orderController` akan dijalankan untuk mengambil pesanan berdasarkan ID pengguna yang diberikan.

  app.use("/api/orders", router);
  // Menggunakan router yang telah didefinisikan sebelumnya untuk semua permintaan yang dimulai dengan `/api/orders`. Dengan kata lain, permintaan ke `/api/orders` akan diteruskan ke router ini.
};
