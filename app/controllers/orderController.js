const db = require("../models");
// Mengimpor objek `db` dari file `models` untuk mendapatkan akses ke model-model Mongoose yang telah didefinisikan.

const Order = db.orders;
// Mendapatkan referensi ke model `Order` dari objek `db`, yang digunakan untuk berinteraksi dengan koleksi `orders` di MongoDB.

exports.findOrder = (req, res) => {
  // Mendefinisikan fungsi `findOrder` yang akan diekspor untuk menangani permintaan HTTP. Fungsi ini menerima objek `req` (request) dan `res` (response) dari Express.js.

  const id = Number(req.params.id);
  // Mengambil parameter `id` dari URL permintaan, dan mengonversinya menjadi tipe data `Number`.

  Order.aggregate([
    // Menggunakan metode `aggregate` pada model `Order` untuk melakukan operasi agregasi pada koleksi `orders`.

    {
      $match: { user_id: id },
      // Operator `$match` digunakan untuk memfilter dokumen yang memiliki `user_id` yang cocok dengan nilai `id` yang diberikan.
    },
    {
      $lookup: {
        // Operator `$lookup` digunakan untuk melakukan operasi join dengan koleksi lain.

        from: "products",
        // Menunjukkan koleksi `products` sebagai koleksi yang akan digabungkan.

        localField: "cart_items",
        // Menunjukkan field `cart_items` dari koleksi `orders` yang akan dicocokkan dengan field `foreignField` di koleksi `products`.

        foreignField: "code",
        // Menunjukkan field `code` di koleksi `products` yang akan dicocokkan dengan field `localField` di koleksi `orders`.

        as: "products",
        // Menentukan nama field baru `products` yang akan ditambahkan ke hasil agregasi. Field ini akan berisi array dokumen dari koleksi `products` yang cocok.
      },
    },
  ])
    .then((result) => {
      // Jika agregasi berhasil, `result` akan berisi hasilnya.

      res.send(result);
      // Mengirimkan hasil agregasi sebagai respons ke klien.
    })
    .catch((err) => {
      // Jika terjadi kesalahan selama proses agregasi, `err` akan berisi rincian kesalahan.

      res.status(409).send({ message: err.message || "Error retrieving order" });
      // Mengirimkan status HTTP 409 (Conflict) dan pesan kesalahan ke klien jika terjadi masalah dalam mengambil data order.
    });
};