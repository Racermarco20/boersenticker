CREATE TABLE IF NOT EXISTS users
(
    id
    INT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    username
    VARCHAR
(
    100
) NOT NULL UNIQUE,
    password_hash VARCHAR
(
    255
) NOT NULL
    );

CREATE TABLE IF NOT EXISTS stocks
(
    id
    INT
    AUTO_INCREMENT
    PRIMARY
    KEY,
    symbol
    VARCHAR
(
    10
) NOT NULL,
    name VARCHAR
(
    100
) NOT NULL,
    market_value DECIMAL
(
    10,
    2
) NOT NULL
    );

INSERT INTO stocks (name, symbol, market_value)
VALUES ('Tesla', 'TSLA', 269.34),
       ('Amazon', 'AMZN', 180.20),
       ('Apple', 'AAPL', 169.75),
       ('Microsoft', 'MSFT', 408.45),
       ('Alphabet Class A', 'GOOGL', 149.35),
       ('NVIDIA', 'NVDA', 122.50),
       ('Meta Platforms', 'META', 559.32),
       ('Berkshire Hathaway', 'BRK.B', 419.88),
       ('JPMorgan Chase', 'JPM', 228.45),
       ('Visa', 'V', 317.60),
       ('Johnson & Johnson', 'JNJ', 135.23),
       ('Walmart', 'WMT', 81.89),
       ('Procter & Gamble', 'PG', 140.12),
       ('The Walt Disney Company', 'DIS', 101.45),
       ('Mastercard', 'MA', 508.88),
       ('Pfizer', 'PFE', 21.30),
       ('Cisco Systems', 'CSCO', 55.12),
       ('Exxon Mobil', 'XOM', 109.99),
       ('Netflix', 'NFLX', 1046.24),
       ('Intel', 'INTC', 17.87),
       ('PepsiCo', 'PEP', 114.45),
       ('Coca-Cola', 'KO', 62.12),
       ('AbbVie', 'ABBV', 165.74);
