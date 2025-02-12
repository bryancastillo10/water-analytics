## 🚦 API Documentation

## 🔑 Authentication Routes ( _/api/auth_ )

### <mark class="post badge">Register a New User</mark>

### **POST** /api/auth/signup

**📝 Request Body:**

```json
    {
    "username":"NewUser",
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
        "status":"fail",
        "message":"error reason"
    }
```
---

### <mark class="post badge">Authenticate User (User Login) </mark> 

### **POST** /api/auth/signin

**📝 Request Body:**

```json
    {
    "email": "newuser@email.com",
    "password": "somepassword456",
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

🍪 __A cookie containing a JWT token (jwt) is stored in the browser upon authentication.__

**🚫 Response Body (Error):**

```json
    {
        "status":"fail",
        "message":"error reason"
    }
```
---

###  <mark class="post badge">End User Session (User Logout)</mark> 

### **POST** /api/auth/signout

**✅ Response Body (Success):**

```json
{
    "message": "You have been logged out successfully"
}
```
__Upon a successful response, the authentication cookie (jwt) is automatically cleared from the browser.__


**🚫 Response Body (Error):**

```json
    {
        "status":"fail",
        "message":"error reason"
    }
```


## 😎 User Routes ( _/api/user_ )

###  <mark class="put badge">Update User Data</mark> 

### **PUT** /api/auth/user/update/{userId}

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
###  <mark class="put badge">Update User Profile Picture</mark> 

### **PUT** /api/auth/user/profile-pic/{userId}

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
###  <mark class="get badge">Get All Users</mark> 

### **POST** /api/user?id={userId}
⚠️ Admin Role Users Only 

**🚫 Response Body (Error):**


```json
    {
        "status": "fail",
        "message": "The user is not auhorized. Admin privileges only"
    }
```

---
###  <mark class="delete badge">Delete User</mark> 

### **DELETE** /api/user/delete/{userId}?username={username}

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



<!-- Badge Styles -->
<style>
   .badge{
     font-weight:700;
     padding: 4px 8px;
     border-radius: 8px; 
    }

   .post {
    background-color: #F0E442;
    color: #111000;
    }

    .get{
    background-color: #21DCA9;
    color: #111000;
    }

    .put{
    background-color: #9BA2D8;
    color: #111000;
    }

    .delete{
    background-color: #CE0E2B;
    color: #F4F3F2;
    }
</style>

