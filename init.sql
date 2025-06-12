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
VALUES ('Tesla', 'TSLA', 912.34),
       ('Amazon', 'AMZN', 135.20),
       ('Apple', 'AAPL', 189.75),
       ('Microsoft', 'MSFT', 431.45),
       ('Alphabet Class A', 'GOOGL', 177.35),
       ('NVIDIA', 'NVDA', 1221.50),
       ('Meta Platforms', 'META', 505.32),
       ('Berkshire Hathaway', 'BRK.B', 415.88),
       ('JPMorgan Chase', 'JPM', 199.45),
       ('Visa', 'V', 278.60),
       ('Johnson & Johnson', 'JNJ', 146.23),
       ('Walmart', 'WMT', 67.89),
       ('Procter & Gamble', 'PG', 162.12),
       ('The Walt Disney Company', 'DIS', 101.45),
       ('Mastercard', 'MA', 455.88),
       ('Pfizer', 'PFE', 29.30),
       ('Cisco Systems', 'CSCO', 48.12),
       ('Exxon Mobil', 'XOM', 114.99),
       ('Netflix', 'NFLX', 670.24),
       ('Intel', 'INTC', 30.87),
       ('PepsiCo', 'PEP', 165.45),
       ('Coca-Cola', 'KO', 61.12),
       ('AbbVie', 'ABBV', 169.74);
