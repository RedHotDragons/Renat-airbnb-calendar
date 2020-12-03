## Server API

### Get information from database regarding a specific event, so we can update the calendar to show it is booked for a specific listing on the UI
  * GET `/api/calendar/reservations/:eventId`

  **Path Parameters:**
  * `eventId` the primary key of the event we are retrieving from database

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "year": "Number",
      "month": "Number",
      "dateStart": "Date",
      "dateEnd": "Date",
      "listingId" : "Number"
    }
```
### Get information from database regarding a specific listing, so we can display it on the page for users to choose
  * GET `/api/calendar/reservations/:listingId`

  **Path Parameters:**
  * `listingId` the primary key of the listing we are retrieving from database

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "Address": "String",
      "room": "Number",
      "guests": "Number",
    }
```


### Add a event with a listing from the front end to the database by passing the month, year, days and address
  * POST `/api/calendar/reservations/:month/:year/:dayStart/:listingId/:dayEnd/`

**Path Parameters:**
  * `month` month to query for
  * `year` year to query for
  * `dayStart` day to query for
  * `dayEnd` listing to query for
  * `listingId` day to query for


**Success Status Code:** `200`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "year": "Number",
      "month": "Number",
      "dayStart": "Date",
      "dayEnd": "Date",
      "listingId": "Number"
    }
```

### Update event info if a user changes their event information or changes their listing for a specific event
  * PATCH `/api/calendar/reservations/update/:eventId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "year": "Number",
      "month": "Number",
      "dayStart": "Date",
      "dayEnd": "Date",
      "listingId": "Number"
    }
```
### Update listing info
  * PATCH `/api/calendar/reservations/update/:listingId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "Address": "String",
      "room": "String",
      "guests": "Number",
    }
```

### Delete event if a user wants to delete there event from the database
  * DELETE `/api/calendar/reservations/delete/:eventId`

**Success Status Code:** `200`


### Delete listing if a user wants to delete there listing from the database
  * DELETE `/api/calendar/reservations/delete/:listingId`

**Success Status Code:** `200`

