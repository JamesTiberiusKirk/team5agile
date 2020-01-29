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
- GET /zip2coords?zip=testzip
    - Request:
        - URL parameter for a zip
    - Resolve:
        - JSON list

```
[
    {
        "zip_Code": "03875",
        "zip_Lat": 43.895078,
        "zip_Long": -71.189275
    }
]
```

# Database

## Procedures
You run procedures by using the CALL function in SQL. For example CALL sortRefineOptions(**necessary parameters**).
### Available Procedures (Queries)
- getAllOptions()
    Returns the whole dataset
- getRefineOptions(procedure id, procedure name/description, provider name, provider state)
    Returns an unsorted set of data from a query matching any of the parameters entered
- sortRefineOptions(procedure id, procedure name/description, provider name, provider state, column to sort by, sort ASC or DESC)
    Returns a set of data from a query matching any of the parameters entered, and sorted on the specified column either ascending or descending (ASC or DESC)
- checkUser(usernameToSearch, passwordToCheck)
    Returns True if user exists and entered correct password
    Returns False if user does not exist, or they do exist but entered wrong password

### Available Procedures (Add/Update/Remove Records)
- insertProcedure(procedure id, procedure definition)
    Adds new record to Procedure table with specified ID and definition
- insertProvider(provider id, provider name, provider street address, provider state, provider ZIP Code, provider referral region)
    Adds new record to Provider table with specified details
- insertCosts(procedure id, provider id, avg covered charges, total payments, avg medicare payments)
    Adds new record to Costs table with specified details.
    ** Procedure and Provider ID's must already exist in their respective tables, or procedure will fail **
- addNewUser(username, password)
    Adds new record to Users table with specified username and password
