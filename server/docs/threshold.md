### **Get Thresholds By User**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/threshold/get

**✅ Response Body (Success):**

```json
    [
    {
        "id": "1001",
        "parameter":"pH",
        "value":null,
        "unit":"",
        "minValue":6.5,
        "maxValue":7.5,
        "userId": "123456789"
    },
    {
        "id":"1002",
        "parameter":"dissolvedOxygen",
        "value": 1.5,
        "unit":"mg/L",
        "userId":"12345789"
    },
    {
        "id":"1003",
        "parameter":"suspendedSolids",
        "value": 200,
        "unit":"mg/L",
        "userId":"12345789"
    },
        // other parameters...
]

```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "message": "error reason"
    }
```

--- 

### **Update Thresholds**

### ![Static Badge](https://img.shields.io/badge/PUT-%23785EF0?style=flat-square&logoColor=%23111000) /api/threshold/update


**📝 Request Body:**
```json
    [
    {
        "id": "1001",
        "parameter":"pH",
        "value":null,
        "unit":"",
        "minValue":6.0,
        "maxValue":7.0,
        "userId": "123456789"
    },
    {
        "id":"1002",
        "parameter":"dissolvedOxygen",
        "value": 0.5,
        "unit":"mg/L",
        "userId":"12345789"
    },
    {
        "id":"1003",
        "parameter":"suspendedSolids",
        "value": 200,
        "unit":"mg/L",
        "userId":"12345789"
    },

        // other parameters...
    ]
```

**✅ Response Body (Success):**

```json
    {
        "message":"Threshold value has been updated",
        "updated":[ 
        {
            "id":"1001",
            "paramter":"pH",
            "minValue":6,
            "maxValue":7,
            "userId":"123456789"
        },
        {
            "id":"1002",
            "paramter":"dissolvedOxygen",
            "minValue":0.5,
            "userId":"123456789"
        },
        {
            "id":"1003",
            "parameter":"suspendedSolids",
            "value": 200,
            "unit":"mg/L",
            "userId":"12345789"
        },
            // other parameters...
        ]
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