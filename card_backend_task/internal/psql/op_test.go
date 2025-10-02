package psql

import (
	"card_backend_task/config"
	"card_backend_task/internal/views"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"log"
	"testing"
)

func TestCRUDProducts(t *testing.T) {
	t.Parallel()
	db, err := NewConnect(config.Test())
	assert.NoError(t, err)

	tx, err := db.Driver.Begin()
	assert.NoError(t, err)

	driver := Driver{Driver: tx}

	t.Cleanup(func() {
		assert.NoError(t, tx.Rollback())
		assert.NoError(t, db.Disconnect())
	})

	card := &views.Card{
		Id:         uuid.NewString(),
		Title:      "",
		Price:      0,
		ImageUrl:   "",
		IsSelected: false,
		IsFavorite: false,
		Quantity:   "",
	}

	assert.NoError(t, driver.CreateCard(card))

	products, err := driver.GetAllCards()
	assert.NoError(t, err)
	assert.NotEmpty(t, products)
	log.Println("products after create:", products, "\n\n", "")

	card.Title = "Updated ProductId"
	card.Price = 80
	assert.NoError(t, driver.UpdateCard(card, card.Id))

	products, err = driver.GetAllCards()
	assert.NoError(t, err)
	log.Println("products after update:", products, "\n\n", "")

	assert.NoError(t, driver.DeleteCard(card.Id))

	products, err = driver.GetAllCards()
	assert.NoError(t, err)
	log.Println("products after delete:", products, "\n\n", "")
}
