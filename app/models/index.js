// Mengimpor konfigurasi database dari file dbconfig.js
const dbconfig = require("../../config/dbconfig");

// Mengimpor Mongoose, yang digunakan untuk berinteraksi dengan MongoDB
const mongoose = require("mongoose");

// Mengatur Promise global untuk menggunakan Promise bawaan dari Node.js
mongoose.Promise = global.Promise;

// Membuat objek db kosong yang akan digunakan untuk menyimpan koneksi dan model
const db = {};

// Menyimpan referensi mongoose di dalam objek db untuk mempermudah akses di tempat lain
db.mongoose = mongoose;

// Mengatur URL koneksi ke MongoDB dari konfigurasi yang diimpor
db.url = dbconfig.url;

// Mengimpor dan menginisialisasi model 'products' dari file productModel.js
// Model ini dihubungkan dengan skema Mongoose yang dikirim sebagai argumen
db.products = require("./productModel")(mongoose);

// Mengimpor dan menginisialisasi model 'orders' dari file orderModel.js
db.orders = require("./orderModel")(mongoose);

// Mengekspor objek db agar bisa digunakan di bagian lain dari aplikasi
module.exports = db;
