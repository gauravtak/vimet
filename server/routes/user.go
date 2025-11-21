package routes

import (
	"net/http"
	"server/controllers"
)

func RegisterUserRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/users", controllers.GetUsers)
}
