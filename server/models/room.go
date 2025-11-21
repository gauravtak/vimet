package models

import "time"

type Room struct {
	Id        int64     `db:"id" json:"id"`
	Uuid      string    `db:"uuid" json:"uuid"`
	CreatedBy time.Time `db:"created_by" json:"created_by"`
	Title     string    `db:"title" json:"title"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
	EndedAt   time.Time `db:"ended_at" json:"ended_at"`
	Active    bool      `db:"active" json:"active"`
}
