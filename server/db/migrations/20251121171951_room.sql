-- +goose Up
-- +goose StatementBegin
CREATE TABLE room (
    id BIGSERIAL PRIMARY KEY, 
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT TRUE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS room; 
-- +goose StatementEnd
