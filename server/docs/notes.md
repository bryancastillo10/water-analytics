### **Create Note**

### ![Static Badge](https://img.shields.io/badge/POST-%23F0E442?style=flat&logoColor=%23111000) /api/notes/create

**📝 Request Body:**

```json
{
  "id": "12001",
  "title": "Some Note Title",
  "content": "This a new note to remind me of something",
  "colors": {
    "id": "color-yellow",
    "colorHeader": "#FDD89B",
    "colorBody": "#FDF0D3",
    "colorText": "#222222"
  },
  "position": {
    "x": 750,
    "y": 500
  }
}
```

**✅ Response Body (Success):**

```json
{
  "message": "Notes has been created successfully",
  "notes": {
    "id": "12001",
    "title": "Some Note Title",
    "content": "This a new note to remind me of something",
    "colors": {
      "id": "color-yellow",
      "colorHeader": "#FDD89B",
      "colorBody": "#FDF0D3",
      "colorText": "#222222"
    },
    "position": {
      "x": 750,
      "y": 500
    },
    "userId": "123456789"
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

### **Get All User Notes**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/notes/get

**✅ Response Body (Success):**

```json
[
  {
    "id": "12001",
    "title": "Some Note Title",
    "content": "This a new note to remind me of something",
    "colors": {
      "id": "color-yellow",
      "colorHeader": "#FDD89B",
      "colorBody": "#FDF0D3",
      "colorText": "#222222"
    },
    "position": {
      "x": 750,
      "y": 500
    },
    "userId": "123456789"
  },
  {
    "id": "12002",
    "title": "Another Note Title",
    "content": "This a second note to remind me of something",
    "colors": {
      "id": "color-indigo",
      "colorHeader": "#6666FF",
      "colorBody": "#9999FF",
      "colorText": "#111000"
    },
    "position": {
      "x": 80,
      "y": 100
    },
    "userId": "123456789"
  }
  // other notes...
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

### **Update Note**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/notes/update/{notesId}

---

**📝 Request Body:**

````json
{
        "id":"12001",
        "title":"Some Note Title",
        "content":"Updated note to remind me of something",
        "colors": {
                   "id": "color-green",
                   "colorHeader": "#B2D39C",
                   "colorBody": "#C4E0B0",
                   "colorText": "#111000"
                },
        "position": {
                    "x": 750,
                    "y": 500
                },
        "userId":"123456789"
        }
``

**✅ Response Body (Success):**

```json
    {
        "message": "Notes has been updated",
        "notes":{
            "id":"12001",
            "title":"Some Note Title",
            "content":"Updated note to remind me of something",
            "colors": {
                "id": "color-green",
                "colorHeader": "#B2D39C",
                "colorBody": "#C4E0B0",
                "colorText": "#111000"
                },
            "position": {
                    "x": 750,
                    "y": 500
                },
            "userId":"123456789"
        }
    }
````

**🚫 Response Body (Error):**

```json
{
  "status": "fail",
  "error": "error reason"
}
```

---

### **Delete Note**

### ![Static Badge](https://img.shields.io/badge/DELETE-%23CE0E2B?style=flat&logoColor=%23111000) /api/notes/delete/{notesId}

**✅ Response Body (Success):**

```json
{
  "message": "Notes has been deleted"
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
