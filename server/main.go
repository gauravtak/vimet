package main

import (
	"fmt"
	"net/http"
	"server/db"
	"server/routes"
)

func main() {
	mux := http.NewServeMux()
	routes.RegisterUserRoutes(mux)
	db.Connect()
	defer db.Close()
	port := ":4000"
	fmt.Printf("Server is running on localhost:%s\n", port)
	err := http.ListenAndServe(port, mux)
	if err != nil {
		panic(err)
	}
}
