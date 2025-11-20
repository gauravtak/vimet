package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var Pool *pgxpool.Pool

func Connect() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	dbUrl := os.Getenv("DB_URL")

	var err error
	Pool, err = pgxpool.New(context.Background(), dbUrl)
	if err = Pool.Ping(context.Background()); err != nil {
		log.Fatalf("Unable to ping database: %v", err)
	}

	if err = Pool.Ping(context.Background()); err != nil {
		log.Fatalf("unable to ping database: %v", err)
	}

	fmt.Println("Connected to Database")

	runInitSQL()
}

func Close() {
	if Pool != nil {
		Pool.Close()
		fmt.Println("DB connection closed")
	}
}

func runInitSQL() {
	sqlBytes, err := os.ReadFile("db/init.sql")
	if err != nil {
		log.Fatal("Error reading sql file", err)
	}

	statements := strings.Split(string(sqlBytes), ";")
	for _, stmt := range statements {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}

		_, err := Pool.Exec(context.Background(), stmt)
		if err != nil {
			log.Fatalf("init.sql executed successfully", err, stmt)
		}
	}

	fmt.Print("init.sql executed successfully")
}
