# Web Scale

Proyek ini adalah aplikasi **Web Scale** yang dibangun menggunakan **React + Vite** untuk frontend dan **Supabase** sebagai Backend-as-a-Service (BaaS).

## 🚀 Tech Stack

- **React + Vite** → Framework frontend modern, ringan, dan cepat.  
- **Supabase** → Backend-as-a-Service yang menyediakan authentication, database (PostgreSQL), storage, dan API secara langsung.  
- **TailwindCSS** (opsional, jika dipakai) → Styling cepat dan konsisten.  

## 📌 Fitur Utama

- 🗄️ **Database Realtime** menggunakan PostgreSQL bawaan Supabase.  
- 📤 **API CRUD** sederhana terhubung langsung ke Supabase.  
- ⚡ **Frontend cepat** dengan React + Vite.  

## 🛠️ Cara Menjalankan

1. Clone repository ini  
   ```bash
   git clone https://github.com/username/web-scale.git
   cd web-scale

2. Install dependencies
   ```bash
   npm install

3. Buat file .env dan isi dengan credentials Supabase
   ```bash
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Jalankan development server
   ```bash
    npm run dev

5. Buka di browser
   ```bash
    http://localhost:5173
    