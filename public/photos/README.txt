================================================================================
PANDUAN MENAMBAHKAN FOTO ASLI ISTRI ANDA
================================================================================

1. Anda dapat meletakkan foto-foto asli istri Anda (format JPG/PNG/WEBP) di dalam folder ini (`public/photos/`).
2. Sebagai contoh, jika Anda menaruh file `foto-1.jpg` dan `foto-2.jpg` di folder ini:
3. Buka file `src/data/content.ts`, lalu ubah nilai `photoUrl` pada `timelineSection` atau `gallerySection` menjadi:
   photoUrl: "/photos/foto-1.jpg"
   photoUrl: "/photos/foto-2.jpg"

Tips:
- Gunakan foto dengan kualitas jelas namun ukuran file yang tidak terlalu besar (< 500 KB per foto) agar halaman tetap cepat dibuka di HP low-end.
================================================================================
