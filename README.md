# 🛍️ Kasir Simamora PRO - Smart POS & Virtual Payment Gateway

Website Kasir / Point of Sale (POS) modern dan interaktif dengan sistem pembayaran virtual lengkap (**QRIS Dinamis**, **E-Money / Dompet Digital**, **Transfer Bank / Virtual Account**, dan **Tunai**), efek suara kasir & pengumuman suara (*Text-to-Speech*), struk belanja termal realistis, sistem kelola menu lengkap (CRUD), serta dashboard laporan penjualan analitik (Chart.js + Export CSV).

---

## 🚀 Cara Menjalankan

Aplikasi ini bersifat **Zero-Dependency & Standalone**. Anda dapat langsung membukanya tanpa perlu instalasi Node.js atau server khusus:

1. Buka folder `d:\PROJECT IT DEL\WEBSITE KASIR\` di File Explorer.
2. Klik ganda (**Double Click**) pada file **`index.html`** untuk membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Firefox, Safari, dll).
3. Selesai! Aplikasi kasir langsung siap digunakan dengan performa cepat dan responsif.

---

## 💳 Fitur Sistem Pembayaran Virtual

1. **QRIS Dinamis Otomatis**:
   - Menghasilkan QR Code dinamis otomatis sesuai total tagihan pesanan.
   - Dilengkapi countdown timer 5 menit dan animasi laser scanner.
   - Tombol simulasi bayar instan untuk **GoPay**, **ShopeePay**, **BCA Mobile**, dan **DANA**.
2. **E-Money / Dompet Digital**:
   - Mendukung **GoPay**, **OVO**, **DANA**, **ShopeePay**, dan **LinkAja**.
   - Input nomor handphone pelanggan dan simulasi pengiriman push notification & konfirmasi PIN.
3. **Transfer Bank & Virtual Account (VA)**:
   - Mendukung **BCA VA**, **Mandiri Livin'**, **BRI BRIMO**, **BNI Mobile**, **Permata**, dan **CIMB Niaga**.
   - Menghasilkan nomor VA unik otomatis dengan tombol **Salin Nomor VA** 1-klik.
   - Tombol simulasi verifikasi transfer instan.
4. **Tunai / Cash**:
   - Pilihan nominal cepat (Uang Pas, 20rb, 50rb, 100rb, 200rb, 500rb) dan kalkulator kembalian otomatis dengan indikator uang kurang / pas.

---

## ✨ Fitur Unggulan Terbaru (v2.5)

- 🍔 **Kelola Menu & Katalog Lengkap (CRUD)**:
  - **Tambah Menu Baru**: Input nama, kategori, harga, stok, badge, dan gambar.
  - **Edit & Update Stok Cepat**: Ubah harga/nama serta tombol instan `+10`, `+25`, `+50` stok.
  - **Hapus Menu**: Dropdown seleksi dengan live preview detail dan konfirmasi aman.
- 🔊 **Efek Suara Kasir & Voice Announcement (TTS)**:
  - Bunyi *Beep* pemindai barcode saat menambah menu dan efek uang berhasil (*Success Chime*).
  - Pengumuman suara otomatis dalam bahasa Indonesia menggunakan Web Speech API (*Text-to-Speech*).
  - Tombol toggle on/off suara dan voice tersimpan di `localStorage`.
- 🧾 **Struk Belanja Termal Realistis & Cetak**:
  - Desain kertas termal bergerigi (*sawtooth edge*), lengkap dengan nomor pesanan, kasir, rincian pesanan, barcode, dan footer.
  - Mendukung cetak langsung (**Cetak Struk / Print**) yang dioptimalkan untuk printer termal 58mm/80mm via `@media print`.
  - Tombol **Kirim ke WhatsApp** dengan format pesan invoice otomatis.
- 📊 **Laporan & Analitik Penjualan (F9)**:
  - Rekap total omzet, jumlah transaksi, rata-rata order (AOV), dan total diskon.
  - Filter rentang waktu: **Hari Ini** & **Semua Waktu**.
  - Daftar **3 Menu Terlaris (Top Sellers)** dengan medali emas/perak/perunggu.
  - Grafik lingkaran (*Doughnut Chart*) metode pembayaran dan grafik batang (*Bar Chart*) tren omzet.
  - Tombol **Export CSV / Excel** untuk pembukuan akurat.
  - Cetak ulang struk (*reprint*) langsung dari tabel riwayat.
- ⏸️ **Hold Bill / Simpan Transaksi Tertunda (F4)**:
  - Menyimpan transaksi pelanggan yang belum selesai dan memuatnya kembali kapan saja.
- 🏷️ **Sistem Diskon & Kode Promo**:
  - Dukungan kode promo: `HEMAT10` (Diskon 10%), `DISKON20` (Diskon 20%), `KASIRHEMAT` (Potongan Rp 15.000).
  - Opsi toggle pajak PPN 11%.
- 👤 **Kasir Switcher & Live Clock (WIB)**:
  - Pilihan kasir aktif (Admin Kasir, Kasir 1 - Stephen, Kasir 2 - Shift Siang).
- 🌙 **Dark Mode & Light Mode**:
  - Tampilan elegan dengan tema gelap dan terang tersimpan otomatis.

---

## ⌨️ Shortcut Keyboard Kasir Cepat

| Tombol | Fungsi |
|---|---|
| **F2** | Fokus ke kotak pencarian menu |
| **F4** | Simpan transaksi saat ini (*Hold Bill*) |
| **F8** | Buka dialog pembayaran (*Pay/Checkout*) |
| **F9** | Buka dashboard laporan & riwayat penjualan |
| **Enter** | Mulai transaksi baru (saat struk terbuka) |
| **Esc** | Menutup modal yang sedang terbuka |

---

*Dikembangkan dengan ❤️ untuk Kasir Simamora.*
