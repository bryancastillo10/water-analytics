### **Create Site**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/site/create

**📝 Request Body:**

This endpoint accepts a _**multipart/form-data**_ payload with the following fields:

- **Key:** `siteData`  
  **Content-Type:** `text/plain` (JSON string)  
  **Example Value:**

  ```json
  {
    "siteName": "Monitoring Site A",
    "location": "Manila, Philippines",
    "description": "A centralized wastewater treatment plant of the city",
    "sourceType": "DOMESTIC"
  }
  ```

- **Key:** `sitePhoto`  
  **Content-Type:** `image/jpeg` or `image/png`  
  **Example Value:** `sitePhoto.png`


**✅ Response Body (Success):**

```json
    {
      "message": "New site has been added",
      "site": {
            "siteName": "Monitoring Site A",
            "location": "Manila, Philippines",
            "description":"A centralized wastewater treatment plant of the city",
            "imageUrl": "uploadedPhotoAtCloudinary.png",
            "sourceType": "DOMESTIC",
            "userId": "123456789"
        }
    }
```

**🚫 Response Body (Error):**

```json
    {
        "status":"fail",
        "message": "error reason"
    }
```

--- 
### **Get Sites By User**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/site/get 

**📝 Request Body:**

**✅ Response Body (Success):**

**🚫 Response Body (Error):**

--- 

### **Update Site Information**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/site/update/{siteId}


**📝 Request Body:**

**✅ Response Body (Success):**

**🚫 Response Body (Error):**

--- 

### **Delete User**

###  ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/site/delete/{siteId}


**✅ Response Body (Success):**

**🚫 Response Body (Error):**

---