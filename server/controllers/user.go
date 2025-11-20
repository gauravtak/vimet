package controllers

import (
	"log"
	"net/http"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	log.Fatalf("All users", w)
}
