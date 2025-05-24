### **Create Measurement By Site**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/water-quality-data/site/{siteId}

**📝 Request Body:**

```json
{
  "date": "2023-11-21T10:00:00Z",
  "pH": 7.5,
  "temperature": 24.5,
  "dissolvedOxygen": 8.2,
  "suspendedSolids": 10,
  "ammonia": 0.7,
  "nitrates": 3.2,
  "phosphates": 1.0
}
```

**✅ Response Body (Success):**

```json
{
  "message": "Water quality data has been added",
  "data": {
    "id": "10011",
    "siteId": "1001",
    "date": "2023-11-21T10:00:00Z",
    "pH": 7.5,
    "temperature": 24.5,
    "dissolvedOxygen": 8.2,
    "suspendedSolids": 10,
    "ammonia": 0.7,
    "nitrates": 3.2,
    "phosphates": 1.0
  }
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "error": "error reason"
}
```

---

### **Get All Measurements**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/water-quality-data/

**✅ Response Body (Success):**

```json
[
  {
    "id": "10011",
    "date": "2024-03-19T14:45:00.000Z",
    "pH": 7,
    "suspendedSolids": 24,
    "totalCOD": 42,
    "fecalColiform": 190,
    "temperature": 19,
    "dissolvedOxygen": 8.8,
    "ammonia": 0.9,
    "nitrates": 4.7,
    "phosphates": 0.22,
    "siteId": "1001"
  },
  {
    "id": "10012",
    "date": "2024-03-19T14:45:00.000Z",
    "pH": 7.2,
    "suspendedSolids": 24,
    "totalCOD": 42,
    "fecalColiform": 190,
    "temperature": 19.3,
    "dissolvedOxygen": 8.8,
    "ammonia": 0.9,
    "nitrates": 4.7,
    "phosphates": 0.22,
    "siteId": "1003"
  }
  // other measurements..
]
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "error": "error reason"
}
```

---

### **Update Measurement**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/water-quality-data/update/measurement/{measurementId}

---

**📝 Request Body:**

```json
{
  "date": "2023-11-21T10:00:00Z",
  "pH": 7.9,
  "temperature": 24.2,
  "dissolvedOxygen": 8.0,
  "suspendedSolids": 10,
  "ammonia": 0.7,
  "nitrates": 3.2,
  "phosphates": 1.0
}
```

**✅ Response Body (Success):**

```json
{
  "message": "A measurement has been updated",
  "measurement": {
    "id": "10011",
    "siteId": "1001",
    "date": "2023-11-21T10:00:00Z",
    "pH": 7.9,
    "temperature": 24.2,
    "dissolvedOxygen": 8,
    "suspendedSolids": 10,
    "ammonia": 0.7,
    "nitrates": 3.2,
    "phosphates": 1.0
  }
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "error": "error reason"
}
```

---

### **Delete Measurement**

### ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/water-quality-data/delete/measurement/{measurementId}

**✅ Response Body (Success):**

```json
{
  "message": "Measurement has been deleted successfully"
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "error": "error reason"
}
```

---
