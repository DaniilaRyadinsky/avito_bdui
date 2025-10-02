package mongo

//
//import (
//	"bdui/config"
//	"context"
//	"github.com/stretchr/testify/assert"
//	"log"
//	"testing"
//)
//
//func TestScreens(t *testing.T) {
//	ctx := context.Background()
//	c, err := newConnect(config.Test(), ctx)
//	assert.NoError(t, err)
//
//	t.Cleanup(func() {
//		assert.NoError(t, c.Disconnect(ctx))
//	})
//
//	test := map[string]string{
//		"title":   "test",
//		"content": "test",
//		"type":    "screen",
//	}
//
//	col := c.ScreenColl()
//
//	print := func() {
//		ss, err := c.GetAll(ctx, col)
//		assert.NoError(t, err)
//		log.Println(ss)
//	}
//	print()
//
//	id, err := c.Create(ctx, test, col)
//	assert.NoError(t, err)
//	print()
//
//	s, err := c.Get(ctx, id, col)
//	assert.NoError(t, err)
//	log.Println(s)
//
//	test2 := map[string]string{
//		"title":   "test2",
//		"content": "test2",
//		"type":    "screen2",
//	}
//
//	assert.NoError(t, c.Rewrite(ctx, id, test2, col))
//	print()
//
//	assert.NoError(t, c.Delete(ctx, id, col))
//	print()
//}
//
//func TestColours(t *testing.T) {
//	ctx := context.Background()
//	c, err := newConnect(config.Test(), ctx)
//	assert.NoError(t, err)
//
//	t.Cleanup(func() {
//		assert.NoError(t, c.Disconnect(ctx))
//	})
//
//	test := map[string]string{
//		"title":   "test",
//		"content": "test",
//		"type":    "color",
//	}
//
//	col := c.ColorColl()
//
//	print := func() {
//		ss, err := c.GetAll(ctx, col)
//		assert.NoError(t, err)
//		log.Println(ss)
//	}
//	print()
//
//	id, err := c.Create(ctx, test, col)
//	assert.NoError(t, err)
//	print()
//
//	s, err := c.Get(ctx, id, col)
//	assert.NoError(t, err)
//	log.Println(s)
//
//	test2 := map[string]string{
//		"title":   "test2",
//		"content": "test2",
//		"type":    "color2",
//	}
//
//	assert.NoError(t, c.Rewrite(ctx, id, test2, col))
//	print()
//
//	assert.NoError(t, c.Delete(ctx, id, col))
//	print()
//}
//
//func TestElements(t *testing.T) {
//	ctx := context.Background()
//	c, err := newConnect(config.Test(), ctx)
//	assert.NoError(t, err)
//
//	t.Cleanup(func() {
//		assert.NoError(t, c.Disconnect(ctx))
//	})
//
//	test := map[string]string{
//		"title":   "test",
//		"content": "test",
//		"type":    "element",
//	}
//
//	col := c.ElementColl()
//
//	print := func() {
//		ss, err := c.GetAll(ctx, col)
//		assert.NoError(t, err)
//		log.Println(ss)
//	}
//	print()
//
//	id, err := c.Create(ctx, test, col)
//	assert.NoError(t, err)
//	print()
//
//	s, err := c.Get(ctx, id, col)
//	assert.NoError(t, err)
//	log.Println(s)
//
//	test2 := map[string]string{
//		"title":   "test2",
//		"content": "test2",
//		"type":    "element2",
//	}
//
//	assert.NoError(t, c.Rewrite(ctx, id, test2, col))
//	print()
//
//	assert.NoError(t, c.Delete(ctx, id, col))
//	print()
//}
