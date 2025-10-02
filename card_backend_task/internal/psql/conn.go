package psql

import (
	"card_backend_task/config"
	"card_backend_task/internal/format"
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
	"log"
)

type PostgresDb struct {
	Driver *sql.DB
}

func MustConnect(cfg *config.Config) *PostgresDb {
	db, err := NewConnect(cfg)
	if err != nil {
		log.Panic(err)
	}
	return db
}

// NewConnect is constructor of PostgresDb. Construct with connection
func NewConnect(cfg *config.Config) (*PostgresDb, error) {
	const op = "psql.NewConnect"

	db, err := sql.Open("postgres", cfg.ConnStr)
	if err != nil {
		return nil, format.Error(op, err)
	}
	err = db.Ping()
	if err != nil {
		return nil, format.Error(op, err)
	}

	log.Print("Connection to postgresSQL is established")
	return &PostgresDb{Driver: db}, nil
}

// Disconnect is terminated connection
func (d *PostgresDb) Disconnect() error {
	const op = "psql.PostgresDb.Disconnect"
	err := d.Driver.Close()
	if err != nil {
		return format.Error(op, err)
	}
	err = d.Driver.Ping()
	if err == nil {
		return format.Error(op, errors.New("failed to disconnect"))
	}

	log.Print("Connection to postgresSQL terminated")
	return nil
}
