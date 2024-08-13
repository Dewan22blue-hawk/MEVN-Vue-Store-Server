const express = require("express");
// Mengimpor modul `express` untuk digunakan dalam membuat server web.

const mongoose = require("mongoose");
// Mengimpor modul `mongoose` yang digunakan untuk menghubungkan dan berinteraksi dengan database MongoDB.

const app = express();
// Membuat instance dari aplikasi Express yang akan digunakan untuk mengatur server.

const path = require("path");
// Mengimpor modul `path` yang dimiliki oleh node.js dan digunakan untuk mengatur jalur file

const port = process.env.PORT || 8000;
// Mengatur port server, dengan menggunakan variabel lingkungan `PORT` jika tersedia, atau default ke `8000` jika tidak ada.

app.use(express.json());
// Middleware Express yang digunakan untuk mem-parsing data JSON dalam body request.

app.use(express.urlencoded({ extended: true }));
// Middleware Express yang digunakan untuk mem-parsing data URL-encoded dalam body request. Opsi `extended: true` memungkinkan parsing data yang lebih kompleks.

app.use("/img", express.static(path.join(__dirname, "./public/img")));
// Menggunakan middleware `express.static` untuk melayani file statis.
// Path "/img" menjadi endpoint yang dapat diakses publik, dan mengarah ke folder "./public/img".
// Dengan kata lain, ketika klien mengakses "/img/someimage.jpg", server akan mengirimkan file yang sesuai dari direktori "./public/img".

app.use(function (req, res, next) {
  // Middleware ini akan dijalankan untuk setiap permintaan yang masuk ke aplikasi.

  res.header("Access-Control-Allow-Origin", "*");
  // Menambahkan header `Access-Control-Allow-Origin` dengan nilai `*`. Ini memungkinkan permintaan dari semua domain (origin) untuk mengakses sumber daya dari server. Ini adalah pengaturan umum untuk mengizinkan akses CORS dari semua asal.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Menambahkan header `Access-Control-Allow-Headers` untuk menentukan header yang diizinkan dalam permintaan CORS. Dalam hal ini, server mengizinkan header `Origin`, `X-Requested-With`, `Content-Type`, dan `Accept` dalam permintaan yang dikirim ke server.

  next();
  // Memanggil middleware berikutnya dalam tumpukan middleware Express. Setelah header ditetapkan, kontrol diteruskan ke middleware atau route handler berikutnya.
});

// Mengimpor objek 'db' dari file './app/models'
// Objek ini berisi konfigurasi mongoose dan model database yang telah Anda buat sebelumnya.
const db = require("./app/models");

// Memulai koneksi ke MongoDB menggunakan mongoose
db.mongoose
  .connect(db.url, {
    // Menggunakan opsi 'useNewUrlParser' untuk memastikan parser URL yang baru digunakan.
    useNewUrlParser: true,
    // Menggunakan opsi 'useUnifiedTopology' untuk memastikan driver MongoDB menggunakan engine monitoring yang baru.
    useUnifiedTopology: true,
    // 'useFindAndModify' tidak didukung lagi dalam versi terbaru mongoose, jadi bisa dihapus atau dikomentari.
    // useFindAndModify: false,
  })
  .then((result) => {
    // Jika koneksi berhasil, cetak pesan "Database Connected!" ke konsol.
    console.log("Database Connected!");
  })
  .catch((err) => {
    // Jika terjadi kesalahan dalam koneksi, cetak pesan "Database Connection Failed!" beserta error ke konsol.
    console.log("Database Connection Failed!", err);
    // Keluar dari proses aplikasi dengan status kegagalan.
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Vuestore Server MEVN",
  });
});
// Mendefinisikan route HTTP GET untuk path root ("/"). Ketika route ini diakses, server akan mengirimkan respons JSON dengan pesan "Welcome to Vuestore Server MEVN".

// Baris ini mengimpor file product.routes.js yang terletak di folder app/routes. File tersebut kemungkinan besar berisi definisi rute untuk produk dalam aplikasi Anda.
// Setelah modul product.routes diimpor, modul tersebut langsung dieksekusi dengan parameter app. app adalah instance dari aplikasi Express yang digunakan untuk mendefinisikan rute-rute dalam aplikasi. Dengan kata lain, modul product.routes mengharapkan menerima app sebagai parameter untuk menambahkan rute-rute ke aplikasi Express tersebut.
require("./app/routes/productRoute")(app);
require("./app/routes/orderRoute")(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Mengatur server untuk mendengarkan pada port yang telah ditentukan dan mencetak pesan di console ketika server berhasil dijalankan.
