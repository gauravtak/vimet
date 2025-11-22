package main

import (
	"net/http"
	"server/user"
)

func RegisterUserRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/users", user.GetUsers)
}
