CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    hash_password text
);