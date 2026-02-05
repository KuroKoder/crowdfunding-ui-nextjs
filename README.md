Instalasi & Persiapan
Clone Repositori

Bash
git clone https://github.com/username/crowdfund-nextjs.git
cd crowdfund-nextjs
Instal Dependensi

Bash
npm install
pnpm install
Konfigurasi Environment Variable Buat file .env.local di root direktori dan masukkan URL API Laravel Anda:

Code snippet
NEXT_PUBLIC_API_URL=http://localhost:8000

Menjalankan Aplikasi
Mode Pengembangan (Development)
Jalankan perintah berikut untuk memulai server lokal dengan fitur hot-reload:

Bash
npm run dev
Buka http://localhost:3000 di browser Anda.

Bash
npm run start

 Fitur Utama yang Tersedia
✅ List Campaign: Menampilkan daftar donasi aktif dengan progress bar.

✅ Create Campaign: Form pembuatan kampanye baru.

✅ Update Campaign: Edit informasi kampanye & ganti status (OPEN/CLOSED).

✅ Donasi: Integrasi form donasi dengan validasi target.

✅ Error Handling: Pemetaan pesan error dari API ke bahasa Indonesia yang ramah pengguna.


Troubleshooting
CORS Error: Jika gagal melakukan fetch, pastikan Laravel Backend sudah mengizinkan origin http://localhost:3000 di file config/cors.php.

API Not Found: Pastikan NEXT_PUBLIC_API_URL sudah benar dan menyertakan /api/v1 jika memang API Anda diproteksi oleh prefix tersebut
