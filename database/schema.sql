DROP TABLE reservation if exists;
CREATE TYPE rooms AS ENUM ("entire place", "private room", "shared room");

CREATE TABLE listing (
listingId     integer PRIMARY KEY,
address       varchar(50),
room        rooms
);

CREATE TABLE reservation (
    reservationId        integer PRIMARY KEY,
    dayStart       integer NOT NULL,
    dayEnd        integer NOT NULL,
    year   Number,
    month        Number,
    Adults         Number,
    Children        Number,
    infants         Number,
    listingId       Number,
    FOREIGN KEY (listingId) REFERENCES listing (listingId)
);
