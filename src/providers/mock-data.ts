// Data Mock Terstruktur PRIMA K3 - Klinik Pratama ANRI

export interface IPasien {
  id: number;
  nama?: string;
  nama_lengkap?: string;
  nip: string;
  unit_kerja?: string;
  departemen?: string;
  jabatan?: string;
  posisi?: string;
  jenis_kelamin: "Laki-laki" | "Perempuan" | string;
  tanggal_lahir: string;
  golongan_darah: string;
  riwayat_alergi: string;
  status_karyawan?: "Tetap" | "Kontrak" | "PPPK" | string;
  status_kerja?: "Aktif" | "Cuti" | "Off" | string;
  telepon?: string;
  nomor_telepon?: string;
}

export interface IRiwayatMedis {
  id: number;
  pasien_id: number;
  nama_pasien: string;
  no_rm: string;
  nip?: string;
  departemen?: string;
  tanggal_periksa?: string;
  dokter?: string;
  keluhan?: string;
  tindakan?: string;
  resep_obat?: string;
  tanggal_kunjungan?: string;
  keluhan_utama?: string;
  diagnosa: string;
  tekanan_darah: string;
  suhu_tubuh: number | string;
  terapi_obat?: string;
  dokter_pemeriksa?: string;
  status: "Selesai" | "Rujukan RS" | "Istirahat Dokter" | string;
}

export interface ISuratSakit {
  id: number;
  nomor_surat?: string;
  pasien_id: number;
  nama_pasien: string;
  nip?: string;
  departemen: string;
  faskes_penerbit?: string;
  nama_dokter?: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jumlah_hari: number;
  diagnosa?: string;
  diagnosa_singkat?: string;
  dokter_penerbit?: string;
  dokumen_url?: string;
  file_url?: string;
  catatan?: string;
  uploaded_at?: string;
  status_verifikasi: "Disetujui" | "Menunggu Review" | "Ditolak" | string;
}

export interface IPemeriksaanK3 {
  id: number;
  pasien_id: number;
  nama_pasien: string;
  departemen: string;
  tanggal_pemeriksaan: string;
  jenis_pemeriksaan: string;
  status_kebugaran?: string;
  catatan_dokter?: string;
  kode_mcu?: string;
  hasil_kebugaran?: string;
  catatan_rekomendasi?: string;
  dokter_penguji?: string;
}

// 1. Data Obat Farmasi
export interface IObat {
  id: number;
  nama: string;
  kategori: "Flu" | "Demam" | "Nyeri" | "Antibiotik" | "Vitamin" | "Lambung";
  komposisi: string;
  jenis_obat: "Tablet" | "Kapsul" | "Sirup" | "Salep";
  dosis_umum: string;
  indikasi: string;
  efek_samping: string;
  peringatan: string;
  penyimpanan: string;
  status: "Tersedia" | "Habis";
  foto: string;
  thumbnail: string[];
}

export const mockObat: IObat[] = [
  {
    id: 1,
    nama: "Paracetamol 500mg",
    kategori: "Demam",
    komposisi: "Paracetamol 500 mg per tablet",
    jenis_obat: "Tablet",
    dosis_umum: "Dewasa: 1 tablet, 3-4 kali sehari sesudah makan",
    indikasi: "Meredakan demam, sakit kepala, sakit gigi, dan nyeri ringan hingga sedang",
    efek_samping: "Reaksi alergi ringan, jarang terjadi gangguan fungsi hati pada dosis wajar",
    peringatan: "Hati-hati penggunaan pada penderita gangguan fungsi hati dan ginjal kronis",
    penyimpanan: "Simpan pada suhu ruangan di bawah 30°C, terlindung dari cahaya matahari langsung",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550572017-ed240b5d92e5?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    nama: "Amoxicillin 500mg",
    kategori: "Antibiotik",
    komposisi: "Amoxicillin Trihydrate 500 mg",
    jenis_obat: "Kapsul",
    dosis_umum: "Dewasa: 1 kapsul setiap 8 jam dengan anjuran dokter",
    indikasi: "Infeksi saluran pernapasan, telinga, hidung, tenggorokan, dan kulit",
    efek_samping: "Mual, muntah, diare ringan, ruam kulit pada individu sensitif",
    peringatan: "Wajib dihabiskan sesuai resep dokter untuk mencegah resistensi antibiotik",
    penyimpanan: "Simpan di tempat kering dan sejuk (15-25°C), jauhkan dari jangkauan anak-anak",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    nama: "Ibuprofen 400mg",
    kategori: "Nyeri",
    komposisi: "Ibuprofen 400 mg",
    jenis_obat: "Tablet",
    dosis_umum: "Dewasa: 1 tablet 3 kali sehari setelah makan",
    indikasi: "Meredakan nyeri otot, sakit gigi, dismenore, dan peradangan sendi",
    efek_samping: "Nyeri ulu hati, mual, dispepsia, pusing ringan",
    peringatan: "Hindari bagi penderita tukak lambung aktif dan riwayat pendarahan cerna",
    penyimpanan: "Simpan pada wadah tertutup rapat pada suhu kamar (20-25°C)",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 4,
    nama: "CTM (Chlorpheniramine) 4mg",
    kategori: "Flu",
    komposisi: "Chlorpheniramine Maleate 4 mg",
    jenis_obat: "Tablet",
    dosis_umum: "Dewasa: 1 tablet 3 kali sehari",
    indikasi: "Gejala rinitis alergi, bersin-bersin, hidung tersumbat, gatal-gatal",
    efek_samping: "Mengantuk, mulut kering, penglihatan kabur sesaat",
    peringatan: "Jangan mengemudi atau mengoperasikan mesin berat setelah meminum obat ini",
    penyimpanan: "Simpan pada suhu ruangan terlindung dari kelembapan tinggi",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1550572017-ed240b5d92e5?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1550572017-ed240b5d92e5?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 5,
    nama: "Antasida Doen",
    kategori: "Lambung",
    komposisi: "Aluminium Hidroksida 200mg, Magnesium Hidroksida 200mg",
    jenis_obat: "Tablet",
    dosis_umum: "Kunyah 1-2 tablet 1 jam sebelum makan atau 2 jam setelah makan",
    indikasi: "Mengurangi gejala kelebihan asam lambung, gastritis, tukak lambung",
    efek_samping: "Konstipasi ringan, diare pada pemakaian berlebih",
    peringatan: "Tidak dianjurkan digunakan terus menerus lebih dari 2 minggu tanpa arahan dokter",
    penyimpanan: "Simpan di tempat kering dan sejuk suhu 25°C",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 6,
    nama: "Vitamin C 500mg Plus Zinc",
    kategori: "Vitamin",
    komposisi: "Asam Askorbat 500 mg, Seng Glukonat 10 mg",
    jenis_obat: "Tablet",
    dosis_umum: "1 tablet effervescent atau hisap per hari setelah makan",
    indikasi: "Menjaga daya tahan tubuh dan imunitas kerja pegawai ANRI",
    efek_samping: "Gangguan lambung ringan pada penderita maag akut",
    peringatan: "Konsumsi banyak air putih saat mengonsumsi suplemen vitamin",
    penyimpanan: "Tutup rapat botol, simpan di tempat kering suhu sejuk",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1616671285442-b0cb2881a293?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1616671285442-b0cb2881a293?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 7,
    nama: "Dextromethorphan HBr 15mg",
    kategori: "Flu",
    komposisi: "Dextromethorphan Hydrobromide 15 mg",
    jenis_obat: "Sirup",
    dosis_umum: "1 sendok takar (5ml) 3 kali sehari",
    indikasi: "Meredakan batuk kering tanpa dahak akibat iritasi saluran napas",
    efek_samping: "Kantuk, pusing, gangguan pencernaan",
    peringatan: "Tidak dianjurkan untuk batuk berdahak asma produktif",
    penyimpanan: "Simpan botol tertutup rapat terlindung cahaya",
    status: "Habis",
    foto: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 8,
    nama: "Asam Mefenamat 500mg",
    kategori: "Nyeri",
    komposisi: "Mefenamic Acid 500 mg",
    jenis_obat: "Kapsul",
    dosis_umum: "1 kapsul 3 kali sehari sesudah makan",
    indikasi: "Meredakan sakit kepala berat, sakit gigi, dan nyeri trauma pasca cedera",
    efek_samping: "Mual, dispepsia, pusing",
    peringatan: "Maksimal pemakaian 7 hari berturut-turut",
    penyimpanan: "Simpan pada tempat kering suhu kamar",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=200&auto=format&fit=crop&q=80"
    ]
  }
];

// 2. Data Peralatan Medis
export interface IAlatMedis {
  id: number;
  nama: string;
  kategori: "Diagnostik" | "Gawat Darurat" | "Sterilisasi" | "Laboratorium";
  penjelasan: string;
  fungsi_utama: string;
  cara_penggunaan: string;
  peringatan: string;
  penyimpanan: string;
  status: "Tersedia" | "Dalam Kalibrasi";
  foto: string;
  thumbnail: string[];
}

export const mockAlatMedis: IAlatMedis[] = [
  {
    id: 1,
    nama: "Elektrokardiograf (EKG 12-Lead)",
    kategori: "Diagnostik",
    penjelasan: "Perangkat medis diagnostik berstandar rumah sakit untuk merekam aktivitas kelistrikan otot jantung pasien secara non-invasif.",
    fungsi_utama: "Mendeteksi aritmia, iskemia, infark miokard akut, dan kelainan ritme konduksi jantung pegawai.",
    cara_penggunaan: "Pasang elektroda pada keempat ekstremitas dan keenam titik prekordial dada dengan gel konduktif, lalu rekam ritme 12-lead.",
    peringatan: "PERINGATAN: Pastikan pasien melepaskan benda berbahan logam dan ponsel agar tidak menimbulkan artefak elektromagnetik.",
    penyimpanan: "Simpan di Ruang Tindakan pada suhu 20-25°C dengan kabel probe tertata rapi tanpa lekukan patah.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    nama: "Automated External Defibrillator (AED)",
    kategori: "Gawat Darurat",
    penjelasan: "Alat portabel penyelamat darurat yang mampu menganalisis ritme jantung secara otomatis dan memberikan kejut listrik jika terjadi henti jantung.",
    fungsi_utama: "Resusitasi darurat henti jantung mendadak (sudden cardiac arrest) di lingkungan kantor ANRI.",
    cara_penggunaan: "Buka tutup unit, ikuti instruksi suara otomatis mesin, tempelkan pad elektroda pada dada kanan atas dan kiri bawah pasien.",
    peringatan: "BAHAYA KEJUT LISTRIK: Jangan menyentuh tubuh pasien saat tombol SHOCK ditekan atau proses analisis ritme sedang berlangsung.",
    penyimpanan: "Diletakkan pada lemari darurat First Aid lobi klinik, siap pakai 24 jam dengan indikator baterai aktif warna hijau.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    nama: "Tensimeter Digital Otomatis Omron",
    kategori: "Diagnostik",
    penjelasan: "Alat pengukur tekanan darah osilometrik digital dengan manset cerdas berakurasi tinggi untuk skrining hipertensi.",
    fungsi_utama: "Pemeriksaan tanda vital tekanan darah sistolik, diastolik, serta denyut nadi pasien.",
    cara_penggunaan: "Pasang manset setinggi jantung pada lengan kiri atas pasien yang rileks, tekan tombol START dan tunggu hingga angka stabil.",
    peringatan: "PERINGATAN: Pasien dilarang berbicara atau bergerak selama proses inflasi manset.",
    penyimpanan: "Simpan di meja perawat dalam kantong pelindung, ganti baterai atau kalibrasi berkala setiap 6 bulan.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 4,
    nama: "Autoclave Sterilisator Medis Uap",
    kategori: "Sterilisasi",
    penjelasan: "Mesin sterilisasi instrumen medis berbahan uap panas bertekanan tinggi 121°C untuk memastikan alat bedah minor bebas mikroorganisme patogen.",
    fungsi_utama: "Mensterilkan pinset, gunting bedah, klem hemostatik, dan peralatan ganti perban.",
    cara_penggunaan: "Masukkan instrumen bersih ke dalam ruang chamber, isi air aquadest sesuai batas level, pilih siklus sterilisasi 20 menit.",
    peringatan: "BAHAYA UAP PANAS: Dilarang keras membuka pintu ruang chamber sebelum tekanan internal turun ke level 0 bar.",
    penyimpanan: "Diletakkan pada meja beton steril di ruang tindakan dengan sirkulasi udara baik.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1583912267670-6575ad4736e8?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1583912267670-6575ad4736e8?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 5,
    nama: "Pulse Oximeter Fingertip Digital",
    kategori: "Diagnostik",
    penjelasan: "Alat pantau saturasi oksigen darah (SpO2) dan frekuensi nadi tanpa tusukan jarum pada ujung jari.",
    fungsi_utama: "Mendeteksi hipoksia dan memonitor kondisi respiratorik darurat pasien asma atau kelelahan kerja.",
    cara_penggunaan: "Jepitkan sensor pada jari telunjuk pasien yang bersih tanpa cat kuku, baca hasil SpO2 dan PR bpm.",
    peringatan: "PERHATIAN: Hindari penggunaan pada jari yang dingin atau basah karena dapat memicu galat pembacaan sensor inframerah.",
    penyimpanan: "Simpan dalam kotak P3K dokter dan nurse station klinik.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 6,
    nama: "Nebulizer Kompresor Omron",
    kategori: "Gawat Darurat",
    penjelasan: "Alat pengubah obat cair menjadi aerosol halus untuk dihirup langsung ke saluran paru-paru pasien.",
    fungsi_utama: "Penanganan sesak napas akut, bronkospasme, serangan asma bronkial di tempat kerja.",
    cara_penggunaan: "Isi masker/cup dengan obat bronkodilator cair, hubungkan selang ke mesin, hidupkan sakelar dan minta pasien menghirup napas dalam.",
    peringatan: "PERINGATAN: Bersihkan dan desinfeksi masker nebulizer segera setelah pemakaian untuk mencegah kontaminasi silang.",
    penyimpanan: "Ruang tindakan klinik Pratama ANRI dalam wadah tertutup steril.",
    status: "Tersedia",
    foto: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80",
    thumbnail: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80"
    ]
  }
];

// 3. Data SDM Tenaga Kesehatan
export interface INakes {
  id: number;
  nama: string;
  profesi: "Dokter Umum" | "Dokter Spesialis Okupasi" | "Perawat" | "Apoteker" | "Psikolog Klinis";
  jabatan: string;
  sip: string;
  str: string;
  pendidikan: string;
  layanan: "Poli Umum" | "Farmasi" | "Konseling Psikolog" | "Pemeriksaan Penunjang" | "Manajemen K3";
  foto: string;
  jadwal: {
    hari: string;
    jam: string;
  }[];
}

export const mockNakes: INakes[] = [
  {
    id: 1,
    nama: "dr. Hendra Pratama, Sp.Ok",
    profesi: "Dokter Spesialis Okupasi",
    jabatan: "Dokter Penanggung Jawab Klinik & K3",
    sip: "SIP. 445/002/K3-OKUPASI/2023",
    str: "STR. 31.1.1.100.1.20.088491",
    pendidikan: "Spesialis Kedokteran Kerja - Universitas Indonesia",
    layanan: "Poli Umum",
    foto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80",
    jadwal: [
      { hari: "Senin", jam: "08.00 - 15.30 WIB" },
      { hari: "Rabu", jam: "08.00 - 15.30 WIB" },
      { hari: "Jumat", jam: "08.00 - 15.00 WIB" }
    ]
  },
  {
    id: 2,
    nama: "dr. Siti Rahmawati",
    profesi: "Dokter Umum",
    jabatan: "Dokter Pemeriksa Faskes Primer",
    sip: "SIP. 445/019/DU-DKI/2022",
    str: "STR. 31.2.1.100.2.19.043211",
    pendidikan: "Profesi Dokter - FK Universitas Padjadjaran",
    layanan: "Poli Umum",
    foto: "https://images.unsplash.com/photo-1594824813571-638f0263441f?w=600&auto=format&fit=crop&q=80",
    jadwal: [
      { hari: "Selasa", jam: "08.00 - 15.30 WIB" },
      { hari: "Kamis", jam: "08.00 - 15.30 WIB" },
      { hari: "Jumat", jam: "08.00 - 11.30 WIB" }
    ]
  },
  {
    id: 3,
    nama: "Anisa Larasati, M.Psi., Psikolog",
    profesi: "Psikolog Klinis",
    jabatan: "Konselor Kesehatan Jiwa Kerja",
    sip: "SIPPK. 503/014/PSIKOLOGI/2023",
    str: "STR. 32.8.2.301.1.21.092182",
    pendidikan: "Magister Profesi Psikologi Klinis Dewasa - UGM",
    layanan: "Konseling Psikolog",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    jadwal: [
      { hari: "Senin", jam: "08.30 - 14.30 WIB" },
      { hari: "Rabu", jam: "08.30 - 14.30 WIB" },
      { hari: "Kamis", jam: "13.00 - 16.00 WIB" }
    ]
  },
  {
    id: 4,
    nama: "apt. Budi Santoso, S.Farm",
    profesi: "Apoteker",
    jabatan: "Penanggung Jawab Instalasi Farmasi",
    sip: "SIPA. 446/088/APT-JAKSEL/2021",
    str: "STRA. 19910412/STRA-ITB/2016/2391",
    pendidikan: "Profesi Apoteker - Institut Teknologi Bandung",
    layanan: "Farmasi",
    foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=80",
    jadwal: [
      { hari: "Senin - Kamis", jam: "07.30 - 16.00 WIB" },
      { hari: "Jumat", jam: "07.30 - 16.30 WIB" }
    ]
  },
  {
    id: 5,
    nama: "Ns. Diah Permata, S.Kep",
    profesi: "Perawat",
    jabatan: "Koordinator Pelayanan Keperawatan",
    sip: "SIPP. 440/112/PERAWAT/2022",
    str: "STR. 31.0.1.200.2.18.066491",
    pendidikan: "Ners Keperawatan - Universitas Indonesia",
    layanan: "Pemeriksaan Penunjang",
    foto: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80",
    jadwal: [
      { hari: "Senin - Jumat", jam: "07.30 - 16.00 WIB" }
    ]
  }
];

// 4. Data Perizinan Fasilitas & Tenaga Kesehatan
export interface IPerizinanFaskes {
  id: string;
  jenis: "SIO Klinik" | "SIO Farmasi" | "SIP Nakes";
  judul: string;
  nomor_izin: string;
  masa_berlaku: string;
  status: "Aktif" | "Perpanjangan" | "Kedaluwarsa";
  jenis_fasilitas: string;
  lokasi: string;
  penanggung_jawab: string;
  dokumen_url: string;
}

export const mockPerizinan: IPerizinanFaskes[] = [
  {
    id: "sio-klinik",
    jenis: "SIO Klinik",
    judul: "Perizinan Operasional Klinik Pratama ANRI",
    nomor_izin: "445/002/KLINIK-PRATAMA/DPMPTSP/2024",
    masa_berlaku: "18 Januari 2024 s/d 18 Januari 2029",
    status: "Aktif",
    jenis_fasilitas: "Klinik Pratama Rawat Jalan Pemerintah",
    lokasi: "Gedung C Lantai Dasar, Arsip Nasional Republik Indonesia, Jl. Ampera Raya No. 7 Jakarta Selatan",
    penanggung_jawab: "dr. Hendra Pratama, Sp.Ok",
    dokumen_url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1000&auto=format&fit=crop&q=80"
  },
  {
    id: "sio-farmasi",
    jenis: "SIO Farmasi",
    judul: "Perizinan Operasional Instalasi Farmasi Klinik",
    nomor_izin: "442/019/FARMASI-KLINIK/DINKES/2024",
    masa_berlaku: "05 Februari 2024 s/d 05 Februari 2029",
    status: "Aktif",
    jenis_fasilitas: "Ruang Farmasi & Pelayanan Obat Terpadu",
    lokasi: "Klinik Pratama ANRI, Jl. Ampera Raya No. 7 Jakarta Selatan",
    penanggung_jawab: "apt. Budi Santoso, S.Farm (SIPA. 446/088/APT-JAKSEL/2021)",
    dokumen_url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80"
  }
];

// 5. Data Artikel Edukasi Kesehatan
export interface IArtikel {
  id: number;
  judul: string;
  kategori: "K3 Perkantoran" | "Ergonomi" | "Kesehatan Mental" | "Gizi Kerja" | "Pencegahan Penyakit";
  ringkasan: string;
  isi: string;
  penulis: string;
  tanggal: string;
  foto: string;
  dibaca: number;
}

export const mockArtikel: IArtikel[] = [
  {
    id: 1,
    judul: "Pentingnya Postur Ergonomis Saat Bekerja di Depan Komputer",
    kategori: "Ergonomi",
    ringkasan: "Duduk terlalu lama dengan posisi membungkuk meningkatkan risiko nyeri punggung bawah (LBP) dan ketegangan leher pada pegawai arsip.",
    isi: "Bekerja di lingkungan kantor modern seringkali mengharuskan kita duduk berjam-jam di depan layar monitor komputer. Posisi duduk yang salah dapat menimbulkan keluhan Low Back Pain (LBP), Carpal Tunnel Syndrome (CTS), dan ketegangan otot leher kronis.\n\nBeberapa panduan ergonomis yang dianjurkan oleh Tim K3 Klinik Pratama ANRI:\n1. Pastikan monitor sejajar dengan pandangan mata pada jarak 50-70 cm.\n2. Duduk tegak dengan punggung menempel sepenuhnya pada sandaran kursi lumbar support.\n3. Tekuk lutut membentuk sudut 90 derajat dengan telapak kaki rata menyentuh lantai.\n4. Lakukan peregangan mikro (micro-stretching) setiap 45-60 menit bekerja selama 2-3 menit.",
    penulis: "dr. Hendra Pratama, Sp.Ok",
    tanggal: "10 Oktober 2026",
    foto: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format&fit=crop&q=80",
    dibaca: 342
  },
  {
    id: 2,
    judul: "Manajemen Stres & Burnout di Tempat Kerja untuk Produktivitas Optimal",
    kategori: "Kesehatan Mental",
    ringkasan: "Kenali gejala kelelahan emosional dan fisik di tempat kerja serta langkah praktis untuk mengatasinya secara efektif.",
    isi: "Tekanan tenggat waktu dan beban tugas yang menumpuk kerap memicu stres kerja yang jika dibiarkan dapat berujung pada kondisi burnout. Burnout bukan sekadar rasa malas, melainkan sindrom psikologis akibat stres kerja kronis yang tidak terkelola dengan baik.\n\nTips menjaga kesehatan mental dari Psikolog Klinik Pratama ANRI:\n- Terapkan teknik pernapasan 4-7-8 saat menghadapi kecemasan kerja mendadak.\n- Tetapkan batasan tegas antara jam kerja dan waktu istirahat pribadi.\n- Jangan ragu untuk memanfaatkan layanan konseling psikologis gratis di Klinik Pratama ANRI.",
    penulis: "Anisa Larasati, M.Psi., Psikolog",
    tanggal: "04 Oktober 2026",
    foto: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    dibaca: 489
  },
  {
    id: 3,
    judul: "Pola Konsumsi Air Putih dan Nutrisi Seimbang untuk Pegawai Kantor",
    kategori: "Gizi Kerja",
    ringkasan: "Cukupi kebutuhan 2 liter air per hari dan kurangi minuman berpemanis buatan saat bertugas di ruang ber-AC.",
    isi: "Bekerja di ruangan ber-AC seringkali membuat seseorang tidak merasa haus, padahal tubuh tetap kehilangan cairan melalui pernapasan dan kulit. Dehidrasi ringan dapat menurunkan konsentrasi kerja hingga 20% dan menyebabkan sakit kepala di sore hari.\n\nPedoman gizi harian pegawai ANRI:\n- Sediakan tumbler minimal 1 liter di meja kerja dan isi ulang minimal 2 kali sehari.\n- Kurangi konsumsi kopi manis berlebih; batasi maksimal 1-2 cangkir sebelum siang hari.\n- Perbanyak kudapan buah segar kaya serat seperti pisang, apel, dan pepaya.",
    penulis: "dr. Siti Rahmawati",
    tanggal: "28 September 2026",
    foto: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    dibaca: 275
  },
  {
    id: 4,
    judul: "Panduan Penanganan Awal Cedera dan Tersengat Listrik di Lingkungan Kantor",
    kategori: "K3 Perkantoran",
    ringkasan: "Langkah-langkah tanggap darurat First Aid saat rekan kerja mengalami insiden kecelakaan di tempat kerja.",
    isi: "Keselamatan dan Kesehatan Kerja (K3) adalah tanggung jawab bersama. Apabila terjadi insiden tersengat arus listrik atau terpeleset:\n1. Matikan sumber daya listrik utama (MCB) sebelum mendekati korban.\n2. Jangan sentuh korban langsung jika masih terhubung arus listrik; gunakan bahan isolator seperti kayu kering.\n3. Periksa kesadaran dan napas korban, lalu segera hubungi EMERGENCY Hotline Klinik Pratama ANRI.",
    penulis: "Tim K3 ANRI",
    tanggal: "15 September 2026",
    foto: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    dibaca: 512
  }
];

// 6. Data Flyer dan Poster
export interface IFlyer {
  id: number;
  judul: string;
  keterangan: string;
  kategori: string;
  tanggal: string;
  gambar: string;
}

export const mockFlyer: IFlyer[] = [
  {
    id: 1,
    judul: "Poster Gerakan Pekerja Sehat ANRI (GPS-ANRI)",
    keterangan: "Panduan senam peregangan 5 menit di tempat kerja untuk mencegah kekakuan sendi dan kelelahan mata.",
    kategori: "Kebugaran Fisik",
    tanggal: "01 Oktober 2026",
    gambar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    judul: "Flyer Etika Batuk & Pencegahan ISPA di Perkantoran",
    keterangan: "Terapkan langkah 4T: Tutup hidung dengan lengan dalam, Tanggalkan masker kotor, Tisu dibuang tempat tertutup, dan Tangan dicuci bersih.",
    kategori: "Pencegahan Infeksi",
    tanggal: "25 September 2026",
    gambar: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    judul: "Flyer Alur Emergency Respon Medis & K3",
    keterangan: "Nomor kontak darurat internal dan peta lokasi AED di seluruh lantai gedung perkantoran ANRI.",
    kategori: "Tanggap Darurat",
    tanggal: "18 September 2026",
    gambar: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    judul: "Poster Edukasi Bebas Asap Rokok di Lingkungan Faskes",
    keterangan: "Dilarang merokok dan vape di area Klinik Pratama ANRI sesuai regulasi kawasan tanpa rokok pemerintah.",
    kategori: "Kesehatan Lingkungan",
    tanggal: "10 September 2026",
    gambar: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80"
  }
];

// 7. Data Statistik K3
export const mockStatistikK3 = {
  kpi: {
    kecelakaan_bulan_ini: 0,
    jumlah_pegawai: 1240,
    laporan_hazard: 4,
    skor_kepatuhan: 98.4
  },
  kunjungan_bulanan: [
    { bulan: "Mei", jumlah: 82 },
    { bulan: "Jun", jumlah: 94 },
    { bulan: "Jul", jumlah: 110 },
    { bulan: "Ags", jumlah: 105 },
    { bulan: "Sep", jumlah: 128 },
    { bulan: "Okt", jumlah: 135 }
  ],
  tren_penyakit: [
    { penyakit: "ISPA / Flu", kasus: 64, persentase: 42 },
    { penyakit: "Radang Faringitis", kasus: 32, persentase: 21 },
    { penyakit: "Dispepsia / Maag", kasus: 28, persentase: 18 },
    { penyakit: "Diare Akut", kasus: 18, persentase: 12 },
    { penyakit: "DBD / Tifoid", kasus: 10, persentase: 7 }
  ],
  jenis_kecelakaan: [
    { jenis: "Terjatuh / Terpeleset", nilai: 50, warna: "#0F766E" },
    { jenis: "Tertimpa Benda", nilai: 25, warna: "#3B82F6" },
    { jenis: "Tersengat Listrik Ringan", nilai: 15, warna: "#F59E0B" },
    { jenis: "Terhirup Debu / Gas", nilai: 10, warna: "#EF4444" }
  ],
  kecelakaan_bulanan: [
    { bulan: "Mei", kasus: 1 },
    { bulan: "Jun", kasus: 0 },
    { bulan: "Jul", kasus: 1 },
    { bulan: "Ags", kasus: 0 },
    { bulan: "Sep", kasus: 0 },
    { bulan: "Okt", kasus: 0 }
  ],
  kunjungan_psikolog: [
    { bulan: "Mei", sesi: 12 },
    { bulan: "Jun", sesi: 16 },
    { bulan: "Jul", sesi: 14 },
    { bulan: "Ags", sesi: 19 },
    { bulan: "Sep", sesi: 22 },
    { bulan: "Okt", sesi: 25 }
  ],
  progress: {
    kesehatan_kerja: 81,
    pegawai_terdata_mcu: 67,
    mcu_pria: 67,
    mcu_wanita: 67
  }
};

// 8. Data Ruangan Klinik Pratama ANRI
export interface IRuangan {
  id: number;
  nama: string;
  nomor: string;
  fungsi: string;
  fasilitas: string[];
  kapasitas: string;
}

export const mockRuangan: IRuangan[] = [
  {
    id: 1,
    nama: "Ruangan 1: Ruang Tunggu & Registrasi Pasien",
    nomor: "R.101",
    fungsi: "Area penerimaan pasien, validasi kartu identitas dan BPJS, serta pencatatan antrean berobat secara tertib.",
    fasilitas: ["Mesin Antrean Tiket Digital", "Kursi Tunggu Ergonomis 25 Kursi", "TV Informasi Kesehatan", "Dispenser Air Sehat"],
    kapasitas: "30 Orang"
  },
  {
    id: 2,
    nama: "Ruangan 2: Ruang Konsultasi Dokter Umum",
    nomor: "R.102",
    fungsi: "Tempat anamnesis, pemeriksaan fisik menyeluruh, penegakan diagnosis, dan penerbitan resep medis oleh dokter.",
    fasilitas: ["Meja Konsultasi Dokter", "Tempat Tidur Periksa Standar Medis", "Tensimeter Digital", "Stetoskop Littmann", "Wastafel Sensor"],
    kapasitas: "4 Orang"
  },
  {
    id: 3,
    nama: "Ruangan 3: Ruang Tindakan & Gawat Darurat (UGD)",
    nomor: "R.103",
    fungsi: "Penanganan kegawatdaruratan medis awal, resusitasi jantung paru, perawatan luka trauma, serta tindakan bedah minor dasar.",
    fasilitas: ["Brankar Pasien Hidrolik", "Tabung Oksigen Sentral", "AED Defibrillator", "Nebulizer Kompresor", "Set Bedah Minor"],
    kapasitas: "3 Bed Pasien"
  },
  {
    id: 4,
    nama: "Ruangan 4: Ruang Farmasi & Apotek",
    nomor: "R.104",
    fungsi: "Pengelolaan penyimpanan obat berstandar BPOM, peracikan resep obat, dan edukasi konseling penyerahan obat (KIE) kepada pasien.",
    fasilitas: ["Lemari Obat Berstandar Farmasi", "Kulkas Obat Khusus Vaksin (2-8°C)", "Timbangan Presisi Digital", "Blender Puyer Medis"],
    kapasitas: "3 Apoteker / Asisten"
  },
  {
    id: 5,
    nama: "Ruangan 5: Ruang Konseling Psikolog",
    nomor: "R.105",
    fungsi: "Ruang kedap suara yang nyaman untuk konsultasi psikologis, asesmen kesehatan mental kerja, dan konseling privat pegawai.",
    fasilitas: ["Sofa Konseling Nyaman", "Peredam Suara Akustik", "Aromaterapi Diffuser", "Peralatan Tes Psikometri"],
    kapasitas: "3 Orang"
  },
  {
    id: 6,
    nama: "Ruangan 6: Ruang Pemeriksaan Khusus & Laboratorium",
    nomor: "R.106",
    fungsi: "Pemeriksaan Elektrokardiogram (EKG 12-lead), tes darah perifer rutin, glukosa darah, asam urat, serta kolesterol.",
    fasilitas: ["Mesin EKG 12-Lead Otomatis", "Spektrofotometer Point-of-Care", "Sentrifus Darah", "Tempat Tidur Pasien"],
    kapasitas: "2 Orang"
  }
];

// Data Default Pasien & Rekam Medis Bawaan
export const initialPasien: IPasien[] = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    nip: "198804152011011002",
    unit_kerja: "Biro Umum & Pengadaan",
    jabatan: "Analis Pengadaan Barang",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "15 April 1988",
    golongan_darah: "O",
    riwayat_alergi: "Alergi Dingin & Debu",
    status_karyawan: "Tetap",
    telepon: "081234567890"
  },
  {
    id: 2,
    nama: "Budi Santoso",
    nip: "199201102014021001",
    unit_kerja: "Direktorat Pengolahan Arsip",
    jabatan: "Arsiparis Ahli Pertama",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "10 Januari 1992",
    golongan_darah: "B",
    riwayat_alergi: "Tidak Ada",
    status_karyawan: "Tetap",
    telepon: "081298765432"
  },
  {
    id: 3,
    nama: "Citra Dewi",
    nip: "199508212019032005",
    unit_kerja: "Pusat Data dan Informasi",
    jabatan: "Pranata Komputer",
    jenis_kelamin: "Perempuan",
    tanggal_lahir: "21 Agustus 1995",
    golongan_darah: "A",
    riwayat_alergi: "Antibiotik Golongan Penisilin",
    status_karyawan: "Tetap",
    telepon: "081377889900"
  }
];

export const initialRiwayatMedis: IRiwayatMedis[] = [
  {
    id: 1,
    pasien_id: 1,
    nama_pasien: "Ahmad Fauzi",
    no_rm: "RM-2026-001",
    tanggal_kunjungan: "2026-10-09",
    keluhan_utama: "Demam 2 hari, pusing, batuk berdahak",
    diagnosa: "Infeksi Saluran Pernapasan Akut (ISPA)",
    tekanan_darah: "120/80 mmHg",
    suhu_tubuh: 38.2,
    terapi_obat: "Paracetamol 500mg 3x1, CTM 3x1, Ambroxol 3x1",
    dokter_pemeriksa: "dr. Hendra Pratama, Sp.Ok",
    status: "Selesai"
  },
  {
    id: 2,
    pasien_id: 2,
    nama_pasien: "Budi Santoso",
    no_rm: "RM-2026-002",
    tanggal_kunjungan: "2026-10-10",
    keluhan_utama: "Nyeri pinggang bawah setelah memindahkan boks arsip berat",
    diagnosa: "Low Back Pain (LBP) Akut K3",
    tekanan_darah: "125/85 mmHg",
    suhu_tubuh: 36.6,
    terapi_obat: "Ibuprofen 400mg 3x1, Vitamin B Kompleks 1x1",
    dokter_pemeriksa: "dr. Hendra Pratama, Sp.Ok",
    status: "Istirahat Dokter"
  }
];

export const initialSuratSakit: ISuratSakit[] = [
  {
    id: 1,
    pasien_id: 2,
    nama_pasien: "Budi Santoso",
    departemen: "Direktorat Pengolahan Arsip",
    tanggal_mulai: "2026-10-10",
    tanggal_selesai: "2026-10-12",
    jumlah_hari: 3,
    diagnosa_singkat: "Low Back Pain Akut K3",
    dokter_penerbit: "dr. Hendra Pratama, Sp.Ok",
    faskes_penerbit: "Klinik Pratama ANRI",
    status_verifikasi: "Disetujui"
  }
];

export const initialPemeriksaanK3: IPemeriksaanK3[] = [
  {
    id: 1,
    pasien_id: 1,
    nama_pasien: "Ahmad Fauzi",
    departemen: "Biro Umum & Pengadaan",
    tanggal_pemeriksaan: "2026-09-15",
    jenis_pemeriksaan: "MCU Berkala",
    status_kebugaran: "Fit to Work",
    catatan_dokter: "Kondisi fisik prima, disarankan menjaga asupan cairan harian."
  }
];
