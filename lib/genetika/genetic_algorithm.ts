import {Chromosome, Lokasi, Mahasiswa} from "@/lib/genetika/types";

// --- Inisialisasi Populasi ---
function generatePopulasiAwal(mahasiswa: Mahasiswa[], lokasiList: Lokasi[], jumlah: number): Chromosome[] {
  const populasi: Chromosome[] = []

  for (let i = 0; i < jumlah; i++) {
    const kromosom: Chromosome = mahasiswa.map(() => {
      const lokasi = lokasiList[Math.floor(Math.random() * lokasiList.length)]
      return lokasi.id
    })
    populasi.push(kromosom)
  }

  return populasi
}

// --- Hitung Fitness ---
function hitungFitness(chrom: Chromosome, mahasiswa: Mahasiswa[], lokasiList: Lokasi[]): number {
  let skor = 0
  const kapasitasMap: Record<number, number> = {}

  for (let i = 0; i < chrom.length; i++) {
    const mhs = mahasiswa[i]
    const lokasiId = chrom[i]
    const lokasi = lokasiList.find((l) => l.id === lokasiId)
    if (!lokasi) continue

    // Jurusan cocok?
    if (lokasi.jurusanDiterima.includes(mhs.jurusan)) {
      skor += 1
    }

    // Hitung pemakaian kapasitas
    kapasitasMap[lokasi.id] = (kapasitasMap[lokasi.id] || 0) + 1
  }

  // Penalti jika kapasitas dilanggar
  for (const lokasi of lokasiList) {
    const jumlah = kapasitasMap[lokasi.id] || 0
    if (jumlah > lokasi.kapasitas) {
      skor -= (jumlah - lokasi.kapasitas) * 2
    }
  }

  return skor
}

// --- Seleksi (Elitisme) ---
function seleksi(populasi: Chromosome[], mahasiswa: Mahasiswa[], lokasiList: Lokasi[], jumlah = 10): Chromosome[] {
  return [...populasi]
      .map((chrom) => ({
        chrom,
        fitness: hitungFitness(chrom, mahasiswa, lokasiList),
      }))
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, jumlah)
      .map((x) => x.chrom)
}

// --- Crossover (Uniform) ---
function crossover(parent1: Chromosome, parent2: Chromosome): Chromosome {
  return parent1.map((gene, idx) => (Math.random() < 0.5 ? gene : parent2[idx]))
}

// --- Mutasi ---
function mutasi(chrom: Chromosome, lokasiList: Lokasi[], rate = 0.01): Chromosome {
  const hasil = [...chrom]
  for (let i = 0; i < hasil.length; i++) {
    if (Math.random() < rate) {
      hasil[i] = lokasiList[Math.floor(Math.random() * lokasiList.length)].id
    }
  }
  return hasil
}

// --- Random Pick ---
function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// --- Main Function ---
// export function geneticAlgorithm(
//     mahasiswa: Mahasiswa[],
//     lokasi: Lokasi[],
//     jumlahGenerasi = 100,
//     populasiSize = 100
// ): Chromosome {
//   let populasi = generatePopulasiAwal(mahasiswa, lokasi, populasiSize)
//
//   for (let i = 0; i < jumlahGenerasi; i++) {
//     const elite = seleksi(populasi, mahasiswa, lokasi, 20)
//
//     const anakBaru: Chromosome[] = []
//     while (anakBaru.length < populasiSize) {
//       const [p1, p2] = [randomPick(elite), randomPick(elite)]
//       const anak = mutasi(crossover(p1, p2), lokasi)
//       anakBaru.push(anak)
//     }
//
//     populasi = anakBaru
//   }
//
//   return seleksi(populasi, mahasiswa, lokasi, 1)[0]
// }

export function geneticAlgorithm(
    mahasiswa: Mahasiswa[],
    lokasi: Lokasi[],
    jumlahGenerasi = 100,
    populasiSize = 100
): Chromosome {
  let populasi = generatePopulasiAwal(mahasiswa, lokasi, populasiSize)

  let solusiTerbaik: Chromosome | null = null
  let fitnessTerbaik = -Infinity
  let generasiTerbaik = -1

  for (let gen = 0; gen < jumlahGenerasi; gen++) {
    // Hitung semua fitness
    const fitnessList = populasi.map((chrom) => ({
      chrom,
      fitness: hitungFitness(chrom, mahasiswa, lokasi),
    }))

    // Ambil elit
    const elite = fitnessList
        .sort((a, b) => b.fitness - a.fitness)
        .slice(0, 20)

    // Cek apakah solusi ini lebih baik
    if (elite[0].fitness > fitnessTerbaik) {
      solusiTerbaik = elite[0].chrom
      fitnessTerbaik = elite[0].fitness
      generasiTerbaik = gen + 1
    }

    // Logging progress generasi
    console.log(`\n🌀 Generasi ${gen + 1}`)
    elite.forEach((e, i) => {
      console.log(
          `#${i + 1} Fitness: ${e.fitness} | Kromosom: [${e.chrom.join(", ")}]`
      )
    })
    console.log(`➡️  Fitness terbaik: ${elite[0].fitness}`)

    // Buat generasi baru
    const anakBaru: Chromosome[] = []
    while (anakBaru.length < populasiSize) {
      const [p1, p2] = [randomPick(elite).chrom, randomPick(elite).chrom]
      const anak = mutasi(crossover(p1, p2), lokasi)
      anakBaru.push(anak)
    }

    populasi = anakBaru
  }

  console.log(`\n✅ Selesai. Solusi terbaik ditemukan di generasi ${generasiTerbaik} dengan fitness ${fitnessTerbaik}`)
  console.log(`[${solusiTerbaik!.join(", ")}]`)

  return solusiTerbaik!
}




// --- Untuk simulasi aja ---
// --- Dummy Data ---
const mahasiswa: Mahasiswa[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nama: `Mahasiswa ${i + 1}`,
  jurusan: i % 2 === 0 ? "Informatika" : "Akuntansi",
}))

const lokasi: Lokasi[] = [
  { id: 1, nama: "PT A", kapasitas: 5, jurusanDiterima: ["Informatika"] },
  { id: 2, nama: "PT B", kapasitas: 5, jurusanDiterima: ["Akuntansi"] },
]

// --- Jalankan ---
const ukuranPopulasi = 5;
const jumlahGenerasi = 10;
const solusi = geneticAlgorithm(mahasiswa, lokasi, jumlahGenerasi, ukuranPopulasi)

console.log("Solusi terbaik:")
solusi.forEach((lokasiId, idx) => {
  const mhs = mahasiswa[idx]
  const lokasiDitempatkan = lokasi.find((l) => l.id === lokasiId)
  console.log(`${mhs.nama} (${mhs.jurusan}) → ${lokasiDitempatkan?.nama}`)
})
