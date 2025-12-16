# Secure Articles API (WSE Praktikum 8)

Proyek ini adalah implementasi **Advanced RESTful CRUD API** yang dibangun sebagai bagian dari modul Praktikum Web Service Engineering. API ini mengelola resource `articles` dengan fitur keamanan tingkat lanjut, autentikasi JWT, dan *observability*.

## 🚀 Fitur Utama

* **RESTful Architecture:** Mengikuti kaidah REST (Resource-based, HTTP Methods, Status Codes).
* **Layered System:** Struktur kode terpisah (Controller, Service, Repository).
* **JWT Authentication:** Sistem login aman dengan *Access Token* dan *Refresh Token*.
* **Role-Based Access Control (RBAC):** Pembedaan hak akses antara `user` dan `admin`.
* **Advanced CRUD:**
    * Pagination, Search, Filtering, dan Sorting.
    * Auto-slug generation untuk URL artikel.
* **Hardening Security:** Rate Limiting, Helmet (Security Headers), CORS.
* **Observability:** Structured Logging (Pino) dan Correlation-ID untuk tracing request.
* **Documentation:** OpenAPI 3.0 (Swagger UI).

## 🛠️ Tech Stack

* **Runtime:** Node.js (v18+)
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Auth:** JSON Web Token (JWT) + Bcrypt
* **Validation:** Joi
* **Logging:** Pino & Pino-HTTP
* **Docs:** Swagger UI Express

## 📂 Struktur Folder

```text
src/
├── config/         # Konfigurasi env & database
├── controllers/    # Menangani request & response HTTP
├── services/       # Logika bisnis utama
├── repositories/   # Interaksi langsung ke Database (Schema)
├── middlewares/    # Auth, Validation, Error Handling, Logging
├── routes/         # Definisi URL endpoint
├── utils/          # Helper functions (JWT, Logger, Response)
└── docs/           # File OpenAPI (Swagger)
