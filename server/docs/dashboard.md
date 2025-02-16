### **Date Filters**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/filter/date/{siteId}

**✅ Response Body (Success):**

```json 
    [
    "2024-01-15T10:30:00.000Z",
    "2024-02-15T11:45:00.000Z",
    "2024-03-15T09:15:00.000Z",
    "2024-01-16T14:45:00.000Z",
    "2024-02-16T15:30:00.000Z",
    "2024-03-16T13:20:00.000Z",
        //other dates based on measurement schema 
    ]
```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```

---

### **Parameter Filters**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/filter/parameter/${siteId}

**✅ Response Body (Success):**
```json 
    [
        "pH",
        "Total Suspended Solids",
        "Total COD",
        "Fecal Coliform",
        "Temperature",
        "Dissolved Oxygen",
        "Ammonia as N",
        "Nitrates as N",
        "Phosphates as P"
    ]
```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```

---

### **Time Series (Line Chart)**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/line/site/{siteId}?parameter={parameter}

**📝Request Query**

The _*parameter*_ query parameter is required. Default is "pH". Other values include

 - temperature
 - dissolvedOxygen
 - totalCOD
 - suspendedSolids
 - fecalColiform
 - ammonia
 - nitrates
 - phosphates

**✅ Response Body (Success):**

```json 
    [
        {
            "date": "2024-01-15T10:30:00.000Z",
            "value": 7.2
        },
        {
            "date": "2024-01-16T14:45:00.000Z",
            "value": 7.5
        },
        {
            "date": "2024-01-17T09:15:00.000Z",
            "value": 6.8
        },
        // other date and values
    ] 
```


**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```
---

### **KPI Card Status**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/card/site/{siteId}

**✅ Response Body (Success):**

```json 
    [
        {
            "parameter": "pH Level",
            "averageValue": 7.16,
            "thresholdValue": "6.5 - 7.5",
            "unit": "",
            "status": "Neutral"
        },
        {
            "parameter": "Avg Suspended Solids",
            "averageValue": 27,
            "thresholdValue": 200,
            "unit": "mg/L",
            "status": "Pass"
        },
        // other calculations for each parameter...
    ]
```
**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```
---

### **Site Percentage (Pie Chart)**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/pie

**✅ Response Body (Success):**

```json 
    {
        "totalSites": 3,
        "percentages": [
            {
                "sourceType": "DOMESTIC",
                "percentage": "33.33"
            },
            {
                "sourceType": "INDUSTRIAL",
                "percentage": "33.33"
            },
            {
                "sourceType": "AGRICULTURAL",
                "percentage": "33.33"
            }
        ]
    }
```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```

---

### **Parameter Profile Statistics (Bar & Gauge Chart)**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/bar&gauge/site/${siteId}?paramGroup={paramGroup}

**📝Request Query**

The _*paramGroup*_ query parameter is required. Default is "nutrients". Other values include "basic", & "organic".


**✅ Response Body (Success):**

```json
    [
        {
            "parameter": "ammonia",
            "avgValue": 1.1,
            "thresholdValue": 0.5,
            "status": "Above Threshold"
        },
        {
            "parameter": "nitrates",
            "avgValue": 5.226666666666667,
            "thresholdValue": 0.5,
            "status": "Above Threshold"
        },
        {
            "parameter": "phosphates",
            "avgValue": 0.282,
            "thresholdValue": 1,
            "status": "Pass"
        }
    ]
```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```

---

### **Site Profile Statistics (Radar Chart)**

### ![Static Badge](https://img.shields.io/badge/GET-%23009E73?style=flat&logoColor=%23111000) /api/dashboard/radar/site/${siteId}?statType={statType}

**📝Request Query**

The _*statType*_ query parameter is required. Default is "average". Other values include "minimum", & "maximum".


**✅ Response Body (Success):**

```json 
    {
        "siteName": "Marikina River",
        "result": {
            "average": {
                "pH": 7.16,
                "temperature": 18.56666666666667,
                "dissolvedOxygen": 8.286666666666667,
                "totalCOD": 47.06666666666667,
                "suspendedSolids": 27,
                "fecalColiform": 296,
                "ammonia": 1.1,
                "nitrates": 5.226666666666667,
                "phosphates": 0.282
            }
        }
    }    
```

**🚫 Response Body (Error):**

```json 
    {
        "status":"fail",
        "error":"error reason"
    }
```
---