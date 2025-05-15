'use client'

import { useState } from 'react'
import { geneticAlgorithm } from '@/lib/genetika/genetic_algorithm'
import { Chromosome, Lokasi, Mahasiswa } from "@/lib/genetika/types"

export default function PenempatanPage() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([])
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([])
  const [hasil, setHasil] = useState<{ nama: string; lokasi: string }[] | null>(null)
  const [error, setError] = useState('')

  // Form states
  const [namaMhs, setNamaMhs] = useState('')
  const [jurusanMhs, setJurusanMhs] = useState('')
  const [namaLokasi, setNamaLokasi] = useState('')
  const [jurusanDiterima, setJurusanDiterima] = useState('')
  const [kapasitas, setKapasitas] = useState('')

  const tambahMahasiswa = () => {
    if (!namaMhs || !jurusanMhs) return
    setMahasiswaList(prev => [...prev, { nama: namaMhs, jurusan: jurusanMhs }])
    setNamaMhs('')
    setJurusanMhs('')
  }

  const tambahLokasi = () => {
    if (!namaLokasi || !jurusanDiterima || !kapasitas) return
    const jurusanArray = jurusanDiterima.split(',').map(j => j.trim())
    const newId = lokasiList.length > 0 ? Math.max(...lokasiList.map(l => l.id)) + 1 : 1
    setLokasiList(prev => [...prev, {
      id: newId,
      nama: namaLokasi,
      jurusanDiterima: jurusanArray,
      kapasitas: parseInt(kapasitas)
    }])
    setNamaLokasi('')
    setJurusanDiterima('')
    setKapasitas('')
  }

  const autoIsiDummy = () => {
    const dummyMahasiswa: Mahasiswa[] = [
      { nama: 'Budi Santoso', jurusan: 'Informatika' },
      { nama: 'Siti Aminah', jurusan: 'Sistem Informasi' },
      { nama: 'Rudi Hartono', jurusan: 'Teknik Elektro' },
      { nama: 'Ayu Lestari', jurusan: 'Manajemen' },
      { nama: 'Dewi Sartika', jurusan: 'Informatika' },
      { nama: 'Andi Wijaya', jurusan: 'Akuntansi' },
      { nama: 'Rina Agustin', jurusan: 'Teknik Industri' },
      { nama: 'Bayu Pratama', jurusan: 'Teknik Sipil' },
      { nama: 'Nina Putri', jurusan: 'Informatika' },
      { nama: 'Fajar Nugroho', jurusan: 'Manajemen' },
    ]

    const dummyLokasi: Lokasi[] = [
      {
        id: 1,
        nama: 'PT Teknologi Nusantara',
        jurusanDiterima: ['Informatika', 'Sistem Informasi'],
        kapasitas: 3
      },
      {
        id: 2,
        nama: 'Bank Nasional',
        jurusanDiterima: ['Manajemen', 'Akuntansi'],
        kapasitas: 2
      },
      {
        id: 3,
        nama: 'CV Konstruksi Jaya',
        jurusanDiterima: ['Teknik Sipil'],
        kapasitas: 2
      },
      {
        id: 4,
        nama: 'Pabrik Elektronik',
        jurusanDiterima: ['Teknik Elektro', 'Teknik Industri'],
        kapasitas: 2
      },
      {
        id: 5,
        nama: 'Startup Kreatif',
        jurusanDiterima: ['Informatika'],
        kapasitas: 1
      },
    ]

    setMahasiswaList(dummyMahasiswa)
    setLokasiList(dummyLokasi)
    setHasil(null)
    setError('')
  }

  const handleProses = () => {
    setError('')
    try {
      const solusi: Chromosome = geneticAlgorithm(mahasiswaList, lokasiList)
      const hasilPenempatan = mahasiswaList.map((mhs, idx) => {
        const lokasiTerpilih = lokasiList.find(l => l.id === solusi[idx])
        return {
          nama: mhs.nama,
          lokasi: lokasiTerpilih ? lokasiTerpilih.nama : 'Tidak ditemukan',
        }
      })
      setHasil(hasilPenempatan)
    } catch {
      setError('Terjadi kesalahan saat memproses penempatan.')
      setHasil(null)
    }
  }

  return (
      <main className="min-h-screen p-6 bg-gray-50 text-gray-800">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-center">TITIK PKN</h1>
          <p className="text-center">{"Penempatan lokasi penelitian atau magang untuk PKN mahasiswa menggunakan algoritma genetika.".toUpperCase()}</p>
          {/* Tombol Auto Isi Dummy */}
          <div className="text-center">
            <button
                onClick={autoIsiDummy}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full mb-4"
            >
              Auto Isi Dummy Data
            </button>
          </div>

          {/* Form Mahasiswa */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Tambah Mahasiswa</h2>
            <div className="flex flex-col md:flex-row gap-2 mb-3">
              <input type="text" value={namaMhs} onChange={e => setNamaMhs(e.target.value)} placeholder="Nama"
                     className="border p-2 rounded w-full" />
              <input type="text" value={jurusanMhs} onChange={e => setJurusanMhs(e.target.value)} placeholder="Jurusan"
                     className="border p-2 rounded w-full" />
              <button onClick={tambahMahasiswa}
                      className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Tambah</button>
            </div>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
              <tr><th className="border p-2">Nama</th><th className="border p-2">Jurusan</th></tr>
              </thead>
              <tbody>
              {mahasiswaList.map((m, i) => (
                  <tr key={i}><td className="border p-2">{m.nama}</td><td className="border p-2">{m.jurusan}</td></tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Form Lokasi */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Tambah Lokasi</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
              <input type="text" value={namaLokasi} onChange={e => setNamaLokasi(e.target.value)} placeholder="Nama Lokasi"
                     className="border p-2 rounded" />
              <input type="text" value={jurusanDiterima} onChange={e => setJurusanDiterima(e.target.value)}
                     placeholder="Jurusan Diterima (pisah koma)" className="border p-2 rounded" />
              <input type="number" value={kapasitas} onChange={e => setKapasitas(e.target.value)} placeholder="Kapasitas"
                     className="border p-2 rounded" />
              <button onClick={tambahLokasi} className="bg-green-600 text-white px-4 rounded hover:bg-green-700">Tambah</button>
            </div>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Jurusan Diterima</th>
                <th className="border p-2">Kapasitas</th>
              </tr>
              </thead>
              <tbody>
              {lokasiList.map((l, i) => (
                  <tr key={i}>
                    <td className="border p-2">{l.id}</td>
                    <td className="border p-2">{l.nama}</td>
                    <td className="border p-2">{l.jurusanDiterima.join(', ')}</td>
                    <td className="border p-2">{l.kapasitas}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Tombol proses dan hasil */}
          <div className="text-center">
            <button onClick={handleProses} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full">
              Jalankan Penempatan
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          {hasil && (
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Hasil Penempatan</h2>
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                  <tr><th className="border p-2">Mahasiswa</th><th className="border p-2">Lokasi</th></tr>
                  </thead>
                  <tbody>
                  {hasil.map((h, i) => (
                      <tr key={i}><td className="border p-2">{h.nama}</td><td className="border p-2">{h.lokasi}</td></tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      </main>
  )
}
