CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(50),
    total_pages integer,
    summary text
);