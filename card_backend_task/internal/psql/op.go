package psql

import (
	"card_backend_task/internal/format"
	"card_backend_task/internal/views"
	"database/sql"
	"fmt"
	"log"
)

type SqlRepo interface {
	Query(query string, args ...any) (*sql.Rows, error)
	Exec(query string, args ...any) (sql.Result, error)
	QueryRow(query string, args ...any) *sql.Row
}

type Driver struct {
	Driver SqlRepo
}

type API interface {
	GetAllCards() ([]views.Card, error)
	CreateCard(b *views.Card) error
	UpdateCard(b *views.Card, id string) error
	DeleteCard(id string) error
	GetAllCardsLimit(from, to int) ([]views.Card, error)
}

func (d Driver) GetAllCards() ([]views.Card, error) {
	const op = "PostgresDb.GetAllCards"

	var list []views.Card
	rows, err := d.Driver.Query(`SELECT id, title, price, imageurl, isselected, isfavorite, quantity  FROM Cards`)
	if err != nil {
		return nil, format.Error(op, err)
	}
	defer rows.Close()

	for rows.Next() {
		var b views.Card
		if err := rows.Scan(&b.Id, &b.Title, &b.Price, &b.ImageUrl, &b.IsSelected, &b.IsFavorite, &b.Quantity); err != nil {
			log.Println(format.Error(op, err))
			continue
		}
		list = append(list, b)
	}

	return list, nil
}

func (d Driver) GetAllCardsLimit(from, to int) ([]views.Card, error) {
	const op = "PostgresDb.GetAllCards"

	var list []views.Card

	// считаем количество
	limit := to - from
	if limit <= 0 {
		return nil, fmt.Errorf("%s: invalid range, 'to' must be greater than 'from'", op)
	}

	rows, err := d.Driver.Query(`
		SELECT id, title, price, imageurl, isselected, isfavorite, quantity
		FROM Cards
		OFFSET $1 LIMIT $2
	`, from, limit)
	if err != nil {
		return nil, format.Error(op, err)
	}
	defer rows.Close()

	for rows.Next() {
		var b views.Card
		if err := rows.Scan(&b.Id, &b.Title, &b.Price, &b.ImageUrl, &b.IsSelected, &b.IsFavorite, &b.Quantity); err != nil {
			log.Println(format.Error(op, err))
			continue
		}
		list = append(list, b)
	}

	return list, nil
}

func (d Driver) CreateCard(b *views.Card) error {
	const op = "PostgresDb.CreateCard"

	query := `INSERT INTO Cards (id, title, price, imageurl, isselected, isfavorite, quantity) VALUES ($1, $2, $3,$4,$5,$6,$7)`
	_, err := d.Driver.Exec(query,
		b.Id,
		b.Title,
		b.Price,
		b.ImageUrl,
		b.IsSelected,
		b.IsFavorite,
		b.Quantity)
	if err != nil {
		return format.Error(op, err)
	}

	return nil
}

func (d Driver) UpdateCard(b *views.Card, id string) error {
	const op = "PostgresDb.UpdateCard"

	query := `UPDATE Cards SET title = $2,
                 price = $3, 
                 imageurl = $4,
                 isselected = $5,
                 isfavorite= $6,
                 quantity = $7
             WHERE id = $1`
	result, err := d.Driver.Exec(query, id,
		b.Title,
		b.Price,
		b.ImageUrl,
		b.IsSelected,
		b.IsFavorite,
		b.Quantity,
	)
	if err != nil {
		return format.Error(op, err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return format.Error(op, err)
	}
	if rowsAffected == 0 {
		return format.Error(op, fmt.Errorf("Card with id %s not found", id))
	}

	return nil
}

func (d Driver) DeleteCard(id string) error {
	const op = "PostgresDb.DeleteCard"

	query := `DELETE FROM Cards WHERE id = $1`
	_, err := d.Driver.Exec(query, id)
	if err != nil {
		return format.Error(op, err)
	}
	return nil
}
