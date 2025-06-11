CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    market_value DECIMAL(10,2) NOT NULL
);

INSERT INTO stocks (name, market_value) VALUES
('Tesla', 912.34),
('Amazon', 135.20),
('Apple', 189.75);
