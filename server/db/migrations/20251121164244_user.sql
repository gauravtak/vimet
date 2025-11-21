-- +goose Up
-- +goose StatementBegin

-- +goose StatementEnd
CREATE TABLE user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image TEXT,
    user_status TEXT,  
    created_at TIMESTAMPS WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMPS WITH TIME ZONE DEFAULT NOW(),
);
-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS user;
-- +goose StatementEnd
