CREATE TABLE IF NOT EXISTS vehicle_type (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS space_type (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS allowed_in (
    vtype_id INTEGER,
    stype_id INTEGER,
    PRIMARY KEY (vtype_id, stype_id),
    FOREIGN KEY (vtype_id) REFERENCES vehicle_type,
    FOREIGN KEY (stype_id) REFERENCES space_type
);

CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicle (
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

CREATE TABLE IF NOT EXISTS lot (
    id INTEGER PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lot_spaces (
    lot_id INTEGER,
    stype_id INTEGER,
    capacity INTEGER NOT NULL,
    PRIMARY KEY (lot_id, stype_id),
    FOREIGN KEY (lot_id) REFERENCES lot,
    FOREIGN KEY (stype_id) REFERENCES space_type
);

CREATE TABLE IF NOT EXISTS lot_location (
    lot_id INTEGER,
    idx INTEGER,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    PRIMARY KEY (lot_id, idx),
    FOREIGN KEY (lot_id) REFERENCES lot
);

CREATE TABLE IF NOT EXISTS reservation (
    vehicle_id INTEGER NOT NULL,
    lot_id INTEGER NOT NULL,
    start_time INTEGER NOT NULL,
    end_time INTEGER NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle,
    FOREIGN KEY (lot_id) REFERENCES lot
);

CREATE TABLE IF NOT EXISTS ticket_device (
    id INTEGER PRIMARY KEY,
    auth_token VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS ticket (
    device_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    lot_id INTEGER NOT NULL,
    time INTEGER NOT NULL,
    FOREIGN KEY (device_id) REFERENCES ticket_device,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle,
    FOREIGN KEY (lot_id) REFERENCES lot
);
