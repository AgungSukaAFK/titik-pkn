export type Mahasiswa = {
  nama: string
  jurusan: string
}

export type Lokasi = {
  id: number
  nama: string
  kapasitas: number
  jurusanDiterima: string[]
}

export type Chromosome = number[]