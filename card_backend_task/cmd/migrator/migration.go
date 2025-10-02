package main

import (
	"card_backend_task/config"
	"card_backend_task/internal/format"
	"database/sql"
	"errors"
	"flag"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"log"
)

func main() {
	typeMigration := flag.String("type", "up", "type of migration action")
	flag.Parse()

	switch *typeMigration {
	case "up":
		if err := upMigrate(); err != nil {
			log.Fatal(err)
		}
	case "down":
		if err := downMigrate(); err != nil {
			log.Fatal(err)
		}
	default:
		log.Fatal("type not recognized")
	}
}

func upMigrate() error {
	const op = "migrator-main.upMigrate"

	cfg := config.MustSetup()

	db, err := sql.Open("postgres", cfg.ConnStr)
	if err != nil {
		return format.Error(op, err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatal(format.Error(op, err))
		}
	}(db)

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return format.Error(op, err)
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"postgres", driver)
	if err != nil {
		return format.Error(op, err)
	}
	defer func(m *migrate.Migrate) {
		err, _ := m.Close()
		if err != nil {
			log.Fatal(format.Error(op, err))
		}
	}(m)

	err = m.Up()
	if err != nil {
		log.Fatal(format.Error(op, err))
	}

	log.Println("Migrations applied successfully!")
	return nil
}

func downMigrate() error {
	const op = "migrator-main.downMigrate"

	cfg := config.MustSetup()

	db, err := sql.Open("postgres", cfg.ConnStr)
	if err != nil {
		return format.Error(op, err)
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Fatal(format.Error(op, err))
		}
	}(db)

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return format.Error(op, err)
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"postgres", driver)
	if err != nil {
		return format.Error(op, err)
	}
	defer func(m *migrate.Migrate) {
		err, _ := m.Close()
		if err != nil {
			log.Fatal(format.Error(op, err))
		}
	}(m)

	if err := m.Steps(-1); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return format.Error(op, err)
	}
	if errors.Is(err, migrate.ErrNoChange) {
		log.Println("No migrations to rollback")
	}

	log.Println("Migration rolled back successfully!")
	return nil
}
