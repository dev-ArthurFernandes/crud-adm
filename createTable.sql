CREATE TABLE users(
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password" VARCHAR(120) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE NOT NULL,
    "active" BOOLEAN DEFAULT TRUE NOT NULL
);