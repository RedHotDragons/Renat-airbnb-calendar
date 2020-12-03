## Server API

### Get calendar information relating to first month
  * GET `/api/calendar/reservations/firstmonth`

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "year": "Number",
      "month": "number",
      "day": "number",
    }
```
### Add restaurant
  * POST `/api/calendar/reservations/:month/:year`

**Path Parameters:**
  * `month` month to query for
  * `year` year to query for

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "year": "Number",
      "month": "number",
    }
```

### Update restaurant info
  * PATCH `/api/calendar/reservations/update`

**Success Status Code:** `201`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "year": "number",
      "day": "number",
    }
```

### Delete restaurant
  * DELETE `/api/calendar/reservations/delete`

**Success Status Code:** `200`

