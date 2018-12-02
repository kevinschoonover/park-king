DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS ticket_device;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS lot_location;
DROP TABLE IF EXISTS lot_spaces;
DROP TABLE IF EXISTS lot;
DROP TABLE IF EXISTS vehicle;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS allowed_in;
DROP TABLE IF EXISTS space_type;
DROP TABLE IF EXISTS vehicle_type;

CREATE TABLE vehicle_type (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE space_type (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE allowed_in (
    vtype_id INTEGER,
    stype_id INTEGER,
    PRIMARY KEY (vtype_id, stype_id),
    FOREIGN KEY (vtype_id) REFERENCES vehicle_type,
    FOREIGN KEY (stype_id) REFERENCES space_type
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL
);

CREATE TABLE vehicle (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    state CHAR(2) NOT NULL,
    license VARCHAR(12) NOT NULL,
    make VARCHAR(80) NOT NULL,
    model VARCHAR(80) NOT NULL,
    year INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user,
    FOREIGN KEY (type_id) REFERENCES vehicle_type,
    UNIQUE (state, license)
);

CREATE TABLE lot (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE lot_spaces (
    lot_id INTEGER,
    stype_id INTEGER,
    capacity INTEGER NOT NULL,
    PRIMARY KEY (lot_id, stype_id),
    FOREIGN KEY (lot_id) REFERENCES lot,
    FOREIGN KEY (stype_id) REFERENCES space_type
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
    FOREIGN KEY (lot_id) REFERENCES lot
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

INSERT INTO space_type (id, name) VALUES
    (1, 'Motorcycle'),
    (2, 'Car');

INSERT INTO vehicle_type (id, name) VALUES
    (1, 'Motorcycle'),
    (2, 'Car');

INSERT INTO allowed_in (vtype_id, stype_id) VALUES
    (1, 1),
    (1, 2),
    (2, 2);

INSERT INTO lot (id, name) VALUES
    (1, 'H'),
    (2, 'S');

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

INSERT INTO lot_spaces (lot_id, stype_id, capacity) VALUES
    (1, 1, 30),
    (1, 2, 200);
