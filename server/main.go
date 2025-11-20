package main

import (
	"fmt"
	"net/http"
	"server/db"
)

func main() {
	mux := http.NewServeMux()
	db.Connect()
	defer db.Close()
	port := ":4000"
	mux.HandleFunc("/", Home)
	mux.HandleFunc("/about", About)
	fmt.Printf("Server is running on localhost:%s\n", port)
	err := http.ListenAndServe(port, mux)
	if err != nil {
		panic(err)
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello home")
}

func About(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello about")
}

