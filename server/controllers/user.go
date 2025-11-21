package controllers

import (
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	log.Fatalf("All users", w)
}
