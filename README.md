## Server API

### Get information from database regarding a specific Listing, so we can update the calendar to show it is booked for all events from that listing, we pass the listing id to a middleware function that will query the event ID's in the events array of the Listing, and return all the event's information

  * GET `/listings/:listingId`

  **Path Parameters:**
  * `listingId` the primary key of the listing we are retrieving from database

**Success Status Code:** `200`

**Returns:** JSON

```json
    [
    {
      "year": "Number",
      "month": "Number",
      "dayStart": "Date",
      "dayEnd": "Date",
      "address": "String",
    }
    ]
```

### Add a reservation with a listing from the front end to the database by passing the month, year, days and address. It will store this information to the reservation table an add this reservation to the reservations array in the listing.

  * POST `/api/calendar/reservations/:listingId/:year/:month/:dayStart/:dayEnd/`

**Path Parameters:**
  * `month` month to query for
  * `year` year to query for
  * `dayStart` day to query for
  * `dayEnd` day end to query for
  * `listingId` listingId to query for


**Success Status Code:** `201`

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

### Update event info if a user changes their event information
  * PATCH `/api/calendar/reservations/update/:year/:month/:dayStart/:dayEnd/:listingId`

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

