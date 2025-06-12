CREATE TABLE IF NOT EXISTS users
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS stocks
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    symbol       VARCHAR(10)    NOT NULL,
    name         VARCHAR(100)   NOT NULL,
    market_value DECIMAL(10, 2) NOT NULL
);

INSERT INTO stocks (name, symbol, market_value)
VALUES ('Tesla', 'TSLA', 912.34),
       ('Amazon', 'AMZN', 135.20),
       ('Apple', 'AAPL', 189.75);
