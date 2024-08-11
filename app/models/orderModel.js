module.exports = (mongoose) => {
  // Mengekspor sebuah fungsi yang menerima objek `mongoose` sebagai argumen. Fungsi ini akan digunakan untuk mendefinisikan dan mengembalikan model Mongoose.

  const schema = mongoose.Schema({
    // Membuat skema baru menggunakan `mongoose.Schema`. Skema ini mendefinisikan struktur dokumen untuk koleksi `orders`.

    user_id: Number,
    // Mendefinisikan field `user_id` yang merupakan tipe data `Number`.

    cart_items: [String],
    // Mendefinisikan field `cart_items` sebagai array yang berisi elemen bertipe `String`.
  });

  schema.method("toJSON", function () {
    // Menambahkan metode `toJSON` pada skema. Metode ini digunakan untuk memodifikasi cara dokumen dikonversi menjadi JSON.

    const { __v, _id, ...object } = this.toObject();
    // Mengonversi dokumen Mongoose menjadi objek JavaScript biasa, dan menyebarkan properti-properti yang tidak ingin disertakan dalam hasil JSON.

    object.id = _id;
    // Menambahkan properti `id` ke objek hasil JSON yang diisi dengan nilai `_id` dari dokumen Mongoose.

    return object;
    // Mengembalikan objek hasil JSON yang telah dimodifikasi.
  });

  const Order = mongoose.model("orders", schema);
  // Membuat model Mongoose bernama `orders` dengan menggunakan skema yang telah didefinisikan.

  return Order;
  // Mengembalikan model `Order` untuk digunakan di tempat lain dalam aplikasi.
};
