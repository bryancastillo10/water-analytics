### **Update User Data**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/user/update/{userId}


**📝 Request Body:**

```json
    {
        "username":"UpdatedName",
        "email":"updatedEmail@email.com"
    }
```
or

```json
    {
        "role":"PUBLIC"
    }
```


**✅ Response Body (Success):**

```json
    {
        "message": "Your profile has been updated successfully",
        "user": {
            "id":"123456789",
            "username":"UpdatedName",
            "email":"updatedEmail@email.com",
            "password": "$hashedpassword",
            "profilePic": "defaultprofilepicfromcloudinary.png",
            "role": "PUBLIC"
        }
    }
```

**🚫 Response Body (Error):**


```json
    {
        "status": "error",
        "message": "Something went wrong, Internal Server Error"
    }
```

---
### **Update User Profile Picture**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/user/profile-pic/{userId}


**📝 Request Body:**

| Key | Value | Content-Type |
| -- | -- | -- |
| profilePic | picture.png | images/jpeg or images/png |

**✅ Response Body (Success):**

```json
{
    "message": "Profile picture has been updated",
    "profilePic": "newcloudinaryuploadedimage.png"
}
```

**🚫 Response Body (Error):**


```json
    {
        "status": "error",
        "message": "Something went wrong, Internal Server Error"
    }
```

--- 
### **Get All Users**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/user?id={userId}  ⚠️ Admin Role Users Only

**📝 Request Query:**

The _*userId*_ query parameter is required. This is used to validate user role.

**🚫 Response Body (Error):**


```json
    {
        "status": "fail",
        "message": "The user is not auhorized. Admin privileges only"
    }
```

---
### **Delete User**

###  ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/user/delete/{userId}?username={username}

**📝 Request Query:**

The _*username*_ query parameter is required

**✅ Response Body (Success) :**

```json
    {
      "message": "You have deleted your account successfully"
    }
```

**🚫 Response Body (Error):**

```json
    {
        "status": "error",
        "message": "error reason"
    }
```
---