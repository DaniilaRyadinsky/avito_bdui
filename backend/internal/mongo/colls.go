package mongo

import (
	"bdui/config"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type Collections interface {
	ScreenColl() *mongo.Collection
	ColorColl() *mongo.Collection
	ElementColl() *mongo.Collection
	ScreenReceivingColl() *mongo.Collection
	ClickElementColl() *mongo.Collection
	ClickScreenColl() *mongo.Collection
}

func (c *Client) ScreenColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.ScreenColl)
}

func (c *Client) ColorColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.ColorColl)
}

func (c *Client) ElementColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.ElementColl)
}

func (c *Client) ScreenReceivingColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.StatScreenReceivingColl)
}
func (c *Client) ClickElementColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.StatClickElementColl)
}
func (c *Client) ClickScreenColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.StatClickScreenColl)
}
