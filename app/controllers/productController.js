const db = require("../models");
// Mengimpor objek `db` dari file `../models`, yang berisi definisi model-model database.

const Product = db.products;
// Mendapatkan model `Product` dari objek `db`, yang digunakan untuk mengakses koleksi produk dalam database.

exports.findAll = (req, res) => {
  // Mengekspor fungsi `findAll` yang akan digunakan untuk menangani permintaan HTTP (request) untuk mendapatkan semua produk.

  Product.find()
    // Menggunakan metode `find` dari model `Product` untuk mengambil semua data produk dari database.

    .then((result) => {
      // Jika data berhasil diambil, maka fungsi `then` akan dijalankan.

      res.send(result);
      // Mengirimkan data produk yang ditemukan kembali ke klien sebagai respons.
    })

    .catch((err) => {
      // Jika terjadi kesalahan saat mengambil data, fungsi `catch` akan menangani kesalahan tersebut.

      res.status(409).send({ message: err.message });
      // Mengirimkan respons dengan status kode `409` (Conflict) dan pesan error ke klien.
    });
};
