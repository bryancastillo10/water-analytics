### **Create Site**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/site/create

**📝 Request Body:**

This endpoint accepts a _**multipart/form-data**_ payload with the following fields:

- **Key** `siteData`  
  **Content-Type** `text/plain`  
  **Example Value**

  ```json
  {
    "siteName": "Monitoring Site A",
    "location": "Manila, Philippines",
    "description": "A centralized wastewater treatment plant of the city",
    "sourceType": "DOMESTIC"
  }
  ```

- **Key** `sitePhoto`  
  **Content-Type** `image/jpeg` or `image/png`  
  **Example Value** `sitePhoto.png`

**✅ Response Body (Success):**

```json
{
  "message": "New site has been added",
  "site": {
    "siteName": "Monitoring Site A",
    "location": "Manila, Philippines",
    "description": "A centralized wastewater treatment plant of the city",
    "imageUrl": "uploadedPhotoAtCloudinary.png",
    "sourceType": "DOMESTIC",
    "userId": "123456789"
  }
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```

---

### **Get Sites By User**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/site/get

**✅ Response Body (Success):**

```json
[
  {
    "id": "1001",
    "siteName": "Monitoring Site A",
    "location": "Manila, Philippines",
    "imageUrl": "uploadedPhotoAtCloudinary.png",
    "sourceType": "DOMESTIC",
    "userId": "123456789"
  },
  {
    "id": "1002",
    "siteName": "Monitoring Site B",
    "location": "Liverpool, United Kingdom",
    "imageUrl": "anotherUploadedPhotoAtCloudinary.png",
    "sourceType": "AGRICULTURAL",
    "userId": "123456789"
  }
]
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```

---

### **Update Site Information**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/site/update/{siteId}

**📝 Request Body:**

This endpoint accepts a _**multipart/form-data**_ payload with the following fields:

- **Key** `siteData`  
  **Content-Type** `text/plain`  
  **Example Value**

```json
{
  "siteName": "updateMonitoring Site A",
  "location": "Clark, Pampanga, Philippines",
  "description": "A centralized wastewater treatment plant of the city",
  "imageUrl": "uploadedPhotoAtCloudinary.png",
  "sourceType": "DOMESTIC",
  "userId": "123456789"
}
```

- **Key** `sitePhoto`  
  **Content-Type** `image/jpeg` or `image/png`  
  **Example Value** `sitePhoto.png`

  **Content-Type** `text/plain`

  **Example Value**

**✅ Response Body (Success):**

```json
{
  "message": "Site has been updated successfully",
  "site": {
    "siteName": "updateMonitoring Site A",
    "location": "CLark,Pampanga, Philippines",
    "description": "A centralized wastewater treatment plant of the city",
    "imageUrl": "uploadedPhotoAtCloudinary.png",
    "sourceType": "DOMESTIC",
    "userId": "123456789"
  }
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```

---

### **Delete User**

### ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/site/delete/{siteId}

**✅ Response Body (Success):**

```json
{
  "message": "Site has been deleted successfully"
}
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```

---
