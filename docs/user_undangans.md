# User_undangans API

### Create Undangan baru API

POST /api/undangans

Headers : 
- Authorization : token

Request Body :

```json
{
  "username": "nama_pengguna",
  "undangan_name": "nama pengantin",
  "undangan_date": "2024-02-24",  // Format ISO 8601
  "lokasi": "Lokasi Undangan"
}
```

Response Body :

```json
{
  "undangan_id": 1,
  "username": "nama_pengguna",
  "undangan_name": "Nama Pengantin",
  "undangan_date": "01-03-2024",
  "lokasi": "Lokasi Undangan"
}
```

Response Body Error:

```json
{
  "error": "InvalidInput",
  "message": "Data Undangan tidak valid. Pastikan semua field diisi dengan benar."
}
```

### Get Undangan dengan pengguna tertentu API

GET /api/undangans/:username

Headers : 
- Authorization : token

Request Body Succes:

```json
{
    "undangan_id": 1,
    "username": "nama_pengguna",
    "undangan_name": "Nama Pengantin 1",
    "undangan_date": "01-03-2024",
    "lokasi": "Lokasi Undangan 1"
  }
```

Request Body Error:
```json 
{
  "error": "UserNotFound",
  "message": "Pengguna dengan nama pengguna 'nama_pengguna' tidak ditemukan."
}

```

### Get detail Undangan API

GET /api/undangans/:undangan_id

Headers : 
- Authorization : token

Response Body Succes :

```json
{
  "undangan_id": 1,
  "username": "nama_pengguna",
  "undangan_name": "Nama Pengantin Baru",
  "undangan_date": "01-03-2024",
  "lokasi": "Lokasi Undangan"
}

```

Response Body Error :
```json
{
  "error": "UndanganNotFound",
  "message": "Undangan dengan ID tersebut tidak ditemukan."
}

```

### Update Undangan tertentu API

PUT /api/undangans/:undangan_id

Headers : 
- Authorization : token

Request Body :

```json
{
  "undangan_name": "Nama Pengantin yang Diperbarui",
  "undangan_date": "01-24-2024",
  "lokasi": "Lokasi Undangan yang Diperbarui"
}

```

Response Body Succes :

```json
{
  "undangan_id": 1,
  "username": "nama_pengguna",
  "undangan_name": "Nama Pengantin yang Diperbarui",
  "undangan_date": "01-26-2024",
  "lokasi": "Lokasi Undangan yang Diperbarui"
}

```

Response Body Error :

```json
{
  "error": "UndanganNotFound",
  "message": "Undangan dengan ID Tersebut tidak ditemukan."
}

```
### Delete Undangan Tertentu API

DELETE /api/undangans/:undangan_id

Headers : 
- Authorization : token

Response Body Succes :

```json
{
  "message": "Undangan dengan ID Tersebut berhasil dihapus."
}



Response Body Error :
```json
{
  "error": "UndanganNotFound",
  "message": "Undangan dengan ID Tersebut tidak ditemukan."
}
