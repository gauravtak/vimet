package models

import "time"

type Participant struct {
	Id              int64     `db:"id" json:"id"`
	RoomId          int64     `db:"room_id" json:"room_id"`
	UserId          int64     `db:"user_id" json:"user_id"`
	JoinedAt        time.Time `db:"joined_at" json:"joined_at"`
	LeftAt          time.Time `db:"left_at" json:"left_at"`
	ParticipantRole string    `db:"participant_role" json:"participant_role"`
}
