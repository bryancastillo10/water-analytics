### **Update User Data**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/user/update/{userId}

**📝 Request Body:**

```json
{
  "username": "UpdatedName",
  "email": "updatedEmail@email.com"
}
```

or

```json
{
  "role": "PUBLIC"
}
```

**✅ Response Body (Success):**

```json
{
  "message": "Your profile has been updated successfully",
  "user": {
    "id": "123456789",
    "username": "UpdatedName",
    "email": "updatedEmail@email.com",
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

| Key        | Value       | Content-Type              |
| ---------- | ----------- | ------------------------- |
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

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/user?id={userId} ⚠️ Admin Role Users Only

**📝 Request Query:**

The _*userId*_ query parameter is required. This is used to validate user role.

**✅ Response Body (Success):**

```json
[
  {
    "id": "123456789",
    "username": "firstUserName",
    "email": "user1@email.com",
    "password": "$hashedpassword1",
    "profilePic": "user1profilePicAtCloudinary.png",
    "role": "PUBLIC"
  },
  {
    "id": "345678912",
    "username": "secondUserName",
    "email": "user2@email.com",
    "password": "$hashedpassword2",
    "profilePic": "user2profilePicAtCloudinary.png",
    "role": "ADMIN"
  }
]
```

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "The user is not auhorized. Admin privileges only"
}
```

---

### **Delete User**

### ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/user/delete/{userId}?username={username}

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

### **Request Reset Password**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/user/request-reset-password

**📝 Request Body:**

```json
{
  "email": "some_emailaddress@email.com"
}
```

**✅ Response Body (Success) :**

```json
{
  "message": "Verification code sent to your email"
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

### **Verify Code Reset**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/user/verify-code

**📝 Request Body:**

```json
{
  "email": "some_emailaddress@email.com",
  "code": "12345"
}
```

**✅ Response Body (Success) :**

```json
{
  "isVerified": true
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

### **Update Password**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/user/reset-password

**📝 Request Body:**

```json
{
  "email": "some_emailaddress@email.com",
  "newPassword": "newPassword123",
  "confirmNewPassword": "newPassword123"
}
```

**✅ Response Body (Success) :**

```json
{
  "message": "Password has been updated successfully"
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
