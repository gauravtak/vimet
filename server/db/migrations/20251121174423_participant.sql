-- +goose Up
-- +goose StatementBegin
CREATE TABLE participant (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES room(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES user(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    participant_role VARCHAR(20) DEFAULT 'member'
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS participant;
-- +goose StatementEnd
