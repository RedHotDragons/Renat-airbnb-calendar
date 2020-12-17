DROP TABLE if exists reservation;
DROP TABLE if exists listing;
DROP type if exists rooms;
CREATE TYPE rooms AS ENUM ('entire place', 'private room', 'shared room');

CREATE TABLE listing (
listingId     integer PRIMARY KEY,
address       varchar(50),
room        rooms
);

CREATE TABLE reservation (
    reservationId        integer PRIMARY KEY,
    dayStart       integer NOT NULL,
    dayEnd        integer NOT NULL,
    year   integer,
    month        integer,
    adults         integer,
    children        integer,
    infants         integer,
    listingId       integer,
    FOREIGN KEY (listingId) REFERENCES listing (listingId)
);
CREATE INDEX idx_listing_id
ON reservation(listingId);

COPY listing
FROM '/Users/renatnorderhaug/Desktop/SDC/airbnb-calendar/listings.csv'
DELIMITER ','
CSV HEADER;


/*
ALTER TABLE reservation
    ADD CONSTRAINT fk_reservations_listing
    FOREIGN KEY (listingId)
    REFERENCES listing(listingId)...
    */
    /* ALTER TABLE <target table> LOGGED */