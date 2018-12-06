DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS ticket_device;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS lot_location;
DROP TABLE IF EXISTS lot_spaces;
DROP TABLE IF EXISTS lot;
DROP TABLE IF EXISTS vehicle;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(80) NOT NULL UNIQUE CHECK (email != ''),
    password VARCHAR(80) NOT NULL CHECK (password != '')
);

CREATE TABLE vehicle (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    state CHAR(2) NOT NULL CHECK (length(state) = 2),
    license VARCHAR(12) NOT NULL CHECK (license != ''),
    make VARCHAR(80) NOT NULL CHECK (make != ''),
    model VARCHAR(80) NOT NULL CHECK (model != ''),
    year INTEGER NOT NULL CHECK (year > 1900),
    FOREIGN KEY (user_id) REFERENCES user,
    UNIQUE (state, license)
);

CREATE TABLE lot (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    capacity INTEGER NOT NULL
);

CREATE TABLE lot_location (
    lot_id INTEGER,
    polygon_id INTEGER,
    vertex_id INTEGER,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    PRIMARY KEY (lot_id, polygon_id, vertex_id),
    FOREIGN KEY (lot_id) REFERENCES lot
);

CREATE TABLE reservation (
    vehicle_id INTEGER NOT NULL,
    lot_id INTEGER NOT NULL,
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle,
    FOREIGN KEY (lot_id) REFERENCES lot,
    CHECK (start_time < end_time)
);

CREATE TABLE ticket_device (
    id INTEGER PRIMARY KEY,
    auth_token VARCHAR(80)
);

CREATE TABLE ticket (
    device_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    lot_id INTEGER NOT NULL,
    time INTEGER NOT NULL,
    FOREIGN KEY (device_id) REFERENCES ticket_device,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle,
    FOREIGN KEY (lot_id) REFERENCES lot
);

INSERT INTO lot (id, name, capacity) VALUES
    (1, 'H', 300),
    (2, 'S', 250);

INSERT INTO lot_location (lot_id, polygon_id, vertex_id, latitude, longitude) VALUES
    (1, 1, 1, 37.95509, -91.78012),
    (1, 1, 2, 37.95505, -91.77723),
    (1, 1, 3, 37.95466, -91.77727),
    (1, 1, 4, 37.95465, -91.78011),

    (2, 1, 1, 37.95587, -91.78055),
    (2, 1, 2, 37.95639, -91.78023),
    (2, 1, 3, 37.95751, -91.77680),
    (2, 1, 4, 37.95659, -91.77682),
    (2, 1, 5, 37.95593, -91.77848),
    (2, 1, 6, 37.95545, -91.78023);

INSERT INTO ticket_device (id, auth_token) VALUES
    (1, 'DEADBEEF');
