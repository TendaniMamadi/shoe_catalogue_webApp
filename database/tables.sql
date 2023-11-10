CREATE TABLE shoes (
    shoe_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    color VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    in_stock INT NOT NULL,
    image_url TEXT
);
