# **Dokumentasi Proyek Titik-PKN**

Dibuat oleh
1. Muhamad Agung Maulana
2. Ilham Syaputra
3. M. Gatan Anugrah

## **1. Deskripsi Proyek**

**Titik-PKN** adalah aplikasi berbasis algoritma genetika yang dirancang untuk menempatkan mahasiswa KKN atau magang ke berbagai lokasi sesuai dengan jurusan mereka dan kapasitas masing-masing lokasi. Aplikasi ini bertujuan untuk memaksimalkan kecocokan antara jurusan mahasiswa dengan lokasi yang tersedia, serta menghindari pelanggaran kapasitas pada setiap lokasi.

## **2. Tujuan Proyek**

* Mengoptimalkan penempatan mahasiswa ke lokasi KKN atau magang berdasarkan kecocokan jurusan dan kapasitas lokasi.
* Menggunakan algoritma genetika untuk mencari solusi terbaik dalam penempatan mahasiswa.
* Memberikan hasil penempatan yang adil dan efisien, memperhitungkan kapasitas lokasi dan jurusan yang diterima.

## **3. Teknologi yang Digunakan**

* **TypeScript**: Bahasa pemrograman utama untuk aplikasi ini.
* **Next.js**: Framework untuk membangun aplikasi web.
* **React**: Library untuk membangun antarmuka pengguna.
* **Algoritma Genetika**: Digunakan untuk melakukan optimasi penempatan mahasiswa ke lokasi.

## **4. Fitur Utama**

1. **Penempatan Mahasiswa**:

    * Menempatkan mahasiswa ke lokasi KKN atau magang berdasarkan jurusan mereka.
    * Menghindari pelanggaran kapasitas pada lokasi.
    * Menghitung nilai fitness untuk setiap penempatan menggunakan algoritma genetika.

2. **Algoritma Genetika**:

    * **Inisialisasi Populasi**: Membuat populasi awal berupa penempatan acak mahasiswa ke lokasi.
    * **Fitness Evaluation**: Menilai kualitas penempatan berdasarkan kesesuaian jurusan dan kapasitas lokasi.
    * **Seleksi**: Memilih individu terbaik (penempatan terbaik) untuk melanjutkan ke generasi berikutnya.
    * **Crossover**: Menggabungkan dua penempatan untuk menciptakan penempatan baru.
    * **Mutasi**: Memperkenalkan variasi dalam penempatan untuk menjaga keragaman solusi.

3. **Hasil Penempatan**:

    * Menampilkan solusi terbaik setelah beberapa generasi dengan penempatan mahasiswa yang optimal.

## **5. Alur Proses Algoritma Genetika**

### **5.1. Inisialisasi Populasi**

Populasi pertama dihasilkan dengan membuat kromosom acak. Setiap kromosom berisi ID lokasi acak untuk setiap mahasiswa. Penempatan ini tidak mempertimbangkan kapasitas dan kecocokan jurusan pada awalnya.

### **5.2. Evaluasi Fitness**

Setiap kromosom (penempatan mahasiswa) dievaluasi berdasarkan dua kriteria:

1. **Kesesuaian Jurusan**: Cek apakah jurusan mahasiswa cocok dengan lokasi yang menerima jurusan tersebut.
2. **Kapasitas**: Pastikan bahwa jumlah mahasiswa yang ditempatkan di lokasi tidak melebihi kapasitas lokasi tersebut. Jika kapasitas dilanggar, penalti diberikan pada nilai fitness.

### **5.3. Seleksi (Elitisme)**

Seleksi elitisme memilih individu terbaik dari populasi yang ada. Kromosom dengan nilai fitness tertinggi dipertahankan untuk menjadi orang tua pada generasi berikutnya.

### **5.4. Crossover**

Crossover dilakukan dengan cara menggabungkan dua kromosom (individu) untuk menghasilkan anak baru. Setiap gen dalam kromosom dipilih secara acak dari orang tua, yang akan membentuk penempatan mahasiswa yang baru.

### **5.5. Mutasi**

Setelah crossover, mutasi dilakukan dengan mengganti beberapa gen secara acak. Ini bertujuan untuk memperkenalkan variasi dalam populasi dan menghindari solusi lokal yang suboptimal.

### **5.6. Generasi Baru**

Setelah seleksi, crossover, dan mutasi, populasi baru terbentuk dan digunakan untuk generasi berikutnya. Proses ini diulang selama beberapa generasi.

### **5.7. Seleksi Terbaik**

Setelah semua generasi selesai, solusi terbaik (kromosom dengan fitness tertinggi) dipilih sebagai hasil akhir penempatan mahasiswa.

### **5.8. Output**

Penempatan terbaik mahasiswa ke lokasi KKN/magang ditampilkan dalam format yang memudahkan pengelola untuk melihat lokasi yang telah ditempati oleh masing-masing mahasiswa.

## **6. Struktur Data**

* **Mahasiswa**:

    * `id`: ID unik mahasiswa
    * `nama`: Nama mahasiswa
    * `jurusan`: Jurusan mahasiswa (misal: Informatika, Akuntansi)

* **Lokasi**:

    * `id`: ID unik lokasi
    * `nama`: Nama lokasi
    * `kapasitas`: Jumlah kapasitas lokasi
    * `jurusanDiterima`: Daftar jurusan yang diterima oleh lokasi tersebut

* **Chromosome**:

    * Sebuah array yang mewakili penempatan mahasiswa ke lokasi. Setiap elemen dalam array adalah ID lokasi yang dipilih untuk mahasiswa.

## **7. Pseudo Code Proses Algoritma Genetika**

```ts
// Inisialisasi populasi
generatePopulasiAwal(mahasiswa, lokasi, jumlahPopulasi)

// Evaluasi fitness setiap kromosom dalam populasi
hitungFitness(chromosom, mahasiswa, lokasiList)

// Seleksi elitisme untuk memilih individu terbaik
seleksi(populasi, mahasiswa, lokasiList, jumlahIndividu)

// Crossover untuk menghasilkan anak baru
crossover(parent1, parent2)

// Mutasi untuk memperkenalkan variasi
mutasi(chromosom, lokasiList, tingkatMutasi)

// Proses ini diulang selama beberapa generasi
for (let generasi = 0; generasi < jumlahGenerasi; generasi++) {
  const elite = seleksi(populasi, mahasiswa, lokasiList, 20)
  const anakBaru = []
  while (anakBaru.length < populasiSize) {
    const [p1, p2] = [randomPick(elite), randomPick(elite)]
    anakBaru.push(mutasi(crossover(p1, p2), lokasi))
  }
  populasi = anakBaru
}

// Seleksi solusi terbaik di akhir
const solusiTerbaik = seleksi(populasi, mahasiswa, lokasi, 1)[0]
```

## **8. Hasil Akhir**

Setelah menjalankan algoritma genetika, sistem akan memberikan penempatan terbaik untuk setiap mahasiswa berdasarkan jurusan mereka dan kapasitas lokasi yang ada. Berikut adalah contoh output yang mungkin dihasilkan:

```
Solusi terbaik:
Mahasiswa 1 (Informatika) → PT A
Mahasiswa 2 (Akuntansi) → PT B
Mahasiswa 3 (Informatika) → PT C
...
```

## **9. Penerapan dan Penggunaan**

Aplikasi ini dapat digunakan oleh universitas, institusi pendidikan, atau perusahaan yang memiliki program KKN/magang dan perlu melakukan penempatan mahasiswa ke lokasi yang tersedia. Algoritma genetika memungkinkan penempatan yang efisien dan adil, memaksimalkan kecocokan antara mahasiswa dan lokasi.

## **10. Referensi**
// jurnal
* [Algoritma Genetika](https://en.wikipedia.org/wiki/Genetic_algorithm)
* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://reactjs.org/docs/getting-started.html)