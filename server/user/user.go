package user

import "time"

type User struct {
	Id           int64     `db:"id" json:"id"`
	Username     string    `db:"username" json:"username"`
	Email        string    `db:"email" json:"email"`
	PasswordHash string    `db:"password_hash" json:"password_hash"`
	ProfileImage string    `db:"profile_image" json:"profile_image"`
	UserStatus   string    `db:"user_status" json:"user_status"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
}

// The business logic too goes here
