# Routes

## General App
- GET /procedures/?search_query=testQuery&rad=radius&lat=latitude&long=longitude&distance_sort=true
    - Request:
        - query pattern in the url
        - optional radius, longitude and latitude for location based search
            - radius and returning distance will be in miles
        - optional distance_sort variable to enable sorting
    - Resolve:
        - JSON array  
```
With only query based search
[
    {
        "procedure_ID": "293",
        "procedure_Def": " HEART FAILURE & SHOCK W/O CC/MCC",
        "provider_Name": "SHARKEY ISSAQUENA COMMUNITY HOSPITAL",
        "provider_StreetAdd": "47 SOUTH FOURTH ST",
        "provider_City": "ROLLING FORK",
        "provider_State": "MS",
        "provider_Zip": "39159",
        "avg_Covered_Charges": 3889.92,
        "avg_Total_Payments": 4785.67,
        "avg_Medicare_Payments": 3700.67,
        "provider_referral": "MS - Jackson",
        "provider_Latitude": null,
        "provider_Longitude": null
    }
]

With all of the optional params 
[
    {
        "procedure_ID": "293",
        "procedure_Def": " HEART FAILURE & SHOCK W/O CC/MCC",
        "provider_Name": "SHARKEY ISSAQUENA COMMUNITY HOSPITAL",
        "provider_StreetAdd": "47 SOUTH FOURTH ST",
        "provider_City": "ROLLING FORK",
        "provider_State": "MS",
        "provider_Zip": "39159",
        "avg_Covered_Charges": 3889.92,
        "avg_Total_Payments": 4785.67,
        "avg_Medicare_Payments": 3700.67,
        "provider_referral": "MS - Jackson",
        "provider_Latitude": 32.826566,
        "provider_Longitude": -90.935377,
        "distance": 288.87638863119787
    }
]
```
- GET /providers/?search_query=testQquery
    - Request:
        - Query pattern in the URL
    - Resolve:
        - JSON array
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
        - JSON array

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
- sortOptionsPages(procedure id, procedure name/description, provider name, provider state, column to sort by, sort ASC or DESC, number of rows to return, starting row number)  
    Returns a set of data from a query matching any of the parameters entered, and sorted on the specified column either ascending or descending (ASC or DESC). Also send how many rows you want to return, and from where you want to start.  
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
    **Procedure and Provider ID's must already exist in their respective tables, or procedure will fail**
- addNewUser(username, password)  
    Adds new record to Users table with specified username and password
- addCoordsExistingProvider(provider id, latitude, longitude)  
    Adds/updates coordinates to existing provider record, coordinates must be in decimal format.
