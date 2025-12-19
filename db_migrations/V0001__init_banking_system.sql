CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_child BOOLEAN DEFAULT FALSE,
    parent_id INTEGER
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    card_number VARCHAR(16) UNIQUE NOT NULL,
    card_type VARCHAR(50) DEFAULT 'standard',
    balance DECIMAL(12, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    from_card_id INTEGER,
    to_card_id INTEGER,
    to_phone VARCHAR(20),
    to_bank VARCHAR(100),
    amount DECIMAL(12, 2) NOT NULL,
    description TEXT,
    transaction_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tariffs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    tariff_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_cards ON transactions(from_card_id, to_card_id);
CREATE INDEX IF NOT EXISTS idx_tariffs_user_id ON tariffs(user_id);