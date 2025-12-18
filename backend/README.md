# 📎 Ghostscript PDF Compression Cheatsheet

Catatan ringkas untuk memahami parameter Ghostscript saat melakukan kompresi PDF.

---

## 🧱 1) Control Proses Eksekusi

| Parameter | Fungsi |
|-----------|--------|
| `-q` | Quiet mode, output minimal di console |
| `-dNOPAUSE` | Tidak berhenti tiap halaman |
| `-dBATCH` | Selesai → langsung exit |
| `-dSAFER` | Mode aman, membatasi akses OS |

---

## 📄 2) Output PDF/A (Opsional)

Digunakan saat PDF ditujukan untuk **arsip resmi**, e.g. e-office, perpus, legal, invoice, dsb.

| Parameter | Fungsi |
|-----------|--------|
| `-dPDFA=2` | Standar PDF/A-2 |
| `-dPDFACompatibilityPolicy=1` | Bila tidak sesuai PDF/A → error |
| `-dSimulateOverprint=true` | Simulasi tinta berlapis (print industry) |

> ❗ **Jika hanya perlu kompres biasa, kamu boleh menghapus bagian ini.**

---

## 🛠️ 3) Output Device & Versi PDF

| Parameter | Fungsi |
|-----------|--------|
| `-sDEVICE=pdfwrite` | Mesin penulis PDF (wajib ada) |
| `-dCompatibilityLevel=1.3` | Output PDF versi 1.3 (lebih kecil & kompatibel) |

> 🔁 Bisa diganti `1.4` atau `1.7` untuk kualitas lebih tinggi.

---

## 🎚️ 4) Preset Kualitas (PDFSETTINGS)

| Setting | Kualitas | Ukuran File | Cocok Untuk |
|---------|----------|-------------|-------------|
| `/screen` | rendah | sangat kecil | web preview |
| `/ebook` | menengah | kecil | email |
| `/printer` | tinggi | besar | print |
| `/prepress` | sangat tinggi | sangat besar | percetakan |
| `/default` | standar | standar | umum |

Contoh:
---

## 🖋️ 5) Pengaturan Font

| Parameter | Fungsi |
|-----------|--------|
| `-dEmbedAllFonts=true` | Embed semua font |
| `-dSubsetFonts=true` | Hanya embed karakter yang digunakan (lebih kecil) |

---

## 📐 6) Auto Rotasi Halaman

| Parameter | Fungsi |
|-----------|--------|
| `-dAutoRotatePages=/None` | Tidak auto rotate halaman |

---

## 🖼️ 7) Kompres Gambar (Downsampling)

Ghostscript mengompres gambar berdasarkan jenis:

| Parameter | Fungsi |
|-----------|--------|
| `-dColorImageDownsampleType=/Bicubic` | Kompres gambar warna |
| `-dGrayImageDownsampleType=/Bicubic` | Kompres grayscale |
| `-dMonoImageDownsampleType=/Bicubic` | Kompres hitam-putih/OCR |

Resolusi output (semakin rendah → semakin kecil):

| Parameter | Fungsi |
|-----------|--------|
| `-dColorImageResolution=150` | Resolusi gambar warna |
| `-dGrayImageResolution=150` | Resolusi grayscale |
| `-dMonoImageResolution=150` | Resolusi hitam-putih |

> 🎯 72–150 DPI cocok untuk web; 300 DPI untuk cetak.

---

## 🚀 Contoh Command Lengkap

### ✨ Versi PDF/A Kompres Menengah

```sh
-q -dNOPAUSE -dBATCH -dSAFER -dPDFA=2 -dPDFACompatibilityPolicy=1 -dSimulateOverprint=true \
-sDEVICE=pdfwrite -dCompatibilityLevel=1.3 -dPDFSETTINGS=/ebook \
-dEmbedAllFonts=true -dSubsetFonts=true -dAutoRotatePages=/None \
-dColorImageDownsampleType=/Bicubic -dColorImageResolution=150 \
-dGrayImageDownsampleType=/Bicubic -dGrayImageResolution=150 \
-dMonoImageDownsampleType=/Bicubic -dMonoImageResolution=150 \
-sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
-dNOPAUSE -dQUIET -dBATCH

```
---
Reference Discuss: https://gist.github.com/vibegui/6390547