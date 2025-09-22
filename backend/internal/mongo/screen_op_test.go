package mongo

import (
	"bdui/config"
	"context"
	"github.com/stretchr/testify/assert"
	"log"
	"testing"
)

func TestCRUD(t *testing.T) {
	ctx := context.Background()
	c, err := newConnect(config.Test(), ctx)
	assert.NoError(t, err)

	t.Cleanup(func() {
		assert.NoError(t, c.Disconnect(ctx))
	})

	test := map[string]string{
		"title":   "test",
		"content": "test",
	}

	print := func() {
		ss, err := c.GetAllScreens(ctx)
		assert.NoError(t, err)
		log.Println(ss)
	}
	print()

	id, err := c.CreateScreen(ctx, test)
	assert.NoError(t, err)
	print()

	s, err := c.GetScreen(ctx, id)
	assert.NoError(t, err)
	log.Println(s)

	test2 := map[string]string{
		"title":   "test2",
		"content": "test2",
	}

	assert.NoError(t, c.RewriteScreen(ctx, id, test2))
	print()

	assert.NoError(t, c.DeleteScreen(ctx, id))
	print()
}
