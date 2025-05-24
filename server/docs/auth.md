### **Register A New User**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/auth/signup

**📝 Request Body:**

```json
{
  "username": "NewUser",
  "email": "newuser@email.com",
  "password": "somepassword456",
  "confirmPassword": "somepassword456"
}
```

**✅ Response Body (Success):**

```json
{
  "message": "Congratulations, your account has been registered",
  "user": {
    "id": "123456789",
    "username": "NewUser",
    "password": "$hashedpassword",
    "email": "newuser@email.com",
    "profilePic": "defaultprofilepicfromcloudinary.png",
    "role": "PUBLIC"
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

### **User Login**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat-square&logoColor=%23111000) /api/auth/signin

**📝 Request Body:**

```json
{
  "email": "newuser@email.com",
  "password": "somepassword456"
}
```

**✅ Response Body (Success):**

```json
{
  "message": "You have successfully signed in",
  "user": {
    "id": "123456789",
    "username": "NewUser",
    "password": "$hashedpassword",
    "email": "newuser@email.com",
    "profilePic": "defaultprofilepicfromcloudinary.png",
    "role": "PUBLIC"
  }
}
```

🍪 **A cookie containing a JWT token (jwt) is stored in the browser upon authentication.**

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```

---

### **User Logout**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat-square&logoColor=%23111000) /api/auth/signout

**✅ Response Body (Success):**

```json
{
  "message": "You have been logged out successfully"
}
```

**Upon a successful response, the authentication cookie (jwt) is automatically cleared from the
browser.**

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "message": "error reason"
}
```
