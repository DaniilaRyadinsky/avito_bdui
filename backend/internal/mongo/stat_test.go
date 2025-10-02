package mongo

import (
	"bdui/config"
	"context"
	"github.com/stretchr/testify/assert"
	"log"
	"testing"
)

func TestStat(t *testing.T) {
	ctx := context.Background()
	c, err := newConnect(config.Test(), ctx)
	assert.NoError(t, err)

	t.Cleanup(func() {
		assert.NoError(t, c.Disconnect(ctx))
	})

	print := func() {
		s, err := c.GetAllStats(ctx)
		assert.NoError(t, err)
		log.Println(s)
	}

	test := map[string]string{
		"title": "test",
		"name":  "test",
		"type":  "screen",
	}

	col := c.ScreenColl()
	id, err := c.Create(ctx, test, col)
	assert.NoError(t, err)

	assert.NoError(t, c.SetClickScreen(ctx, id, 100))
	print()
	//for i := 0; i < 5; i++ {
	//	assert.NoError(t, c.IncrementScreenReceiving(ctx, id))
	//	print()
	//}

	//assert.NoError(t, c.DeleteScreenReceiving(ctx, id))
	//print()
	//assert.NoError(t, c.SetClickElement(ctx, "element-id-test", 100))
	//print()
	//assert.NoError(t, c.SetClickElement(ctx, "element-id-test", 1))
	//print()
	//assert.NoError(t, c.SetClickElement(ctx, "element-id-test2", 100))
	//print()
	//assert.NoError(t, c.SetClickElement(ctx, "element-id-test2", 1))
	//print()
	//assert.NoError(t, c.DeleteClickElement(ctx, "element-id-test"))
	//print()

	//assert.NoError(t, c.SetClickScreen(ctx, id, 1))
	//print()
	//assert.NoError(t, c.SetClickScreen(ctx, "screen-id-test2", 100))
	//print()
	//assert.NoError(t, c.SetClickScreen(ctx, "screen-id-test2", 1))
	//print()
	//assert.NoError(t, c.DeleteClickScreen(ctx, id))
	//print()

	assert.NoError(t, c.Delete(ctx, id, col))
	print()
}
