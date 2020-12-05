## Server API for PostgresDB implementation, will scale for MongoDB as well.

### Get information from database regarding a specific Listing, so we can update the calendar to show it is booked for all reservations from that listing, we pass the listing id to a middleware function that will query the reservation ID's with a foreign key of one listing, and return all the reservation's information

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
      "adults": "Number",
      "children": "Number",
      "infants": "Number"
    }
    ]
```

### Add a reservation with a listing from the front end to the database by passing the month, year, days, adults, children, infants, listingId. It will store this information to the reservation table and then add this reservation to the reservations array in the listing.

  * POST `/listings/:listingId/reservation`

**Path Parameters:**
  * `listingId` listingId to query for

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "year": "Number",
      "month": "Number",
      "dayStart": "Date",
      "dayEnd": "Date",
      "listingId": "Number",
      "adults": "Number",
      "children": "Number",
      "infants": "Number"
    }
```

### Update reservation info if a user changes their reservation information
  * PATCH `/reservations/update/reservation/:reservationId`

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "year": "Number",
      "month": "Number",
      "dayStart": "Date",
      "dayEnd": "Date",
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
      "listingId": "Number"
    }
```
### Update listing info
  * PATCH `/listings/update/:listingId`

**Path Parameters:**
  * `listingId` listingId to query for

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "address": "String",
      "room": "String",
      "guests": "Number",
    }
```

### Delete reservation if a user wants to delete there reservation from the database, this should delete the reservation from the listings reservation array
  * DELETE `/reservations/delete/:reservationId`

**Success Status Code:** `200`


### Delete listing if a user wants to delete there listing from the database, this should delete the listingId Foreign key from all related reservations
  * DELETE `/listings/delete/:listingId`

**Success Status Code:** `200`

