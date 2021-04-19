create table "user"(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    name TEXT,
    surname TEXT,
    age INTEGER
);

create table "type"
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

create table "med_type"
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    price INTEGER,
    description TEXT,
    type_id INTEGER
);

create table "doctor"(
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    name TEXT,
    surname TEXT,
    type_id INTEGER REFERENCES "type"(id) ON DELETE CASCADE
);

create table "doctor_rec"(
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES "doctor"(id) ON DELETE CASCADE,
    med_type_id INTEGER REFERENCES "med_type"(id) ON DELETE CASCADE,
    time TIMESTAMP,
    busy boolean
);

create table "user_record"
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    doctor_rec_id INTEGER REFERENCES "doctor_rec"(id) ON DELETE CASCADE
);

