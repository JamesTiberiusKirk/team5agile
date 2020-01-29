# Routes

## Registration & Login
- POST /users/registration
    - Request:
        - personal details (name, emai, etc)
        - password
        - location
    - Resolve
        - 200 OK
- POST /users/login
    - Request:
        - username
        - password
    - Resolve:
        - 201 Logged In
        - 401 Wrong username/password

## General App
- GET /procedures/?search_query=testQuery&zip_code=testZip
    - Request:
        - query pattern in the url
        - optional zip_code in the url for location based search
    - Resolve:
        - JSON list 
```
[
    {
        provider_Name,
        provider_StreetAdd,
        provider_City,
        avg_Covered_Charges,
        avg_Total_Payments,
        avg_Medicare_Payemnt,
        procedure_ID,
        procedure_Def
    }
]
```
- GET /providers/?search_query=testQquery
    - Request:
        - Query pattern in the URL
    - Resolve:
        - JSON list
```
[
    {
        "provider_ID": 450419,
        "provider_Name": "TEXAS HEALTH HARRIS METHODIST HOSPITAL AZLE",
        "provider_StreetAdd": "108 DENVER TRAIL",
        "provider_City": "AZLE",
        "provider_State": "TX",
        "provider_Zip": "76020",
        "provider_referral": "TX - Fort Worth"
    }
]
```