// Mengekspor sebuah fungsi yang menerima mongoose sebagai argumen
module.exports = (mongoose) => {
  // Membuat skema baru dengan definisi field yang akan digunakan dalam koleksi 'products'
  const schema = mongoose.Schema({
    code: String, // Kode produk, tipe data String
    name: String, // Nama produk, tipe data String
    price: Number, // Harga produk, tipe data Number
    description: String, // Deskripsi produk, tipe data String
    imageUrl: String, // URL gambar produk, tipe data String
    averageRating: Number, // Rata-rata rating produk, tipe data Number
  });

  // Menambahkan metode instance 'toJSON' untuk mengubah representasi JSON dari objek produk
  schema.method("toJSON", function () {
    // Mengekstrak versi (__v) dan id (_id) dari objek yang dihasilkan oleh 'toObject'
    const { __v, _id, ...object } = this.toObject();
    // Mengubah _id menjadi id untuk konsistensi dalam JSON yang dikirimkan ke klien
    object.id = _id;
    // Mengembalikan objek yang telah dimodifikasi
    return object;
  });

  // Membuat model 'Product' yang akan mewakili koleksi 'products' dalam MongoDB berdasarkan skema yang didefinisikan
  const Product = mongoose.model("products", schema);

  // Mengembalikan model 'Product' agar bisa digunakan di tempat lain dalam aplikasi
  return Product;
};
