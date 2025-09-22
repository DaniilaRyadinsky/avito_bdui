package mongo

import (
	"bdui/config"
	"bdui/internal/utils/format"
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type ScreenAPI interface {
	CreateScreen(ctx context.Context, screen interface{}) (string, error)
	DeleteScreen(ctx context.Context, id string) error
	RewriteScreen(ctx context.Context, id string, screen interface{}) error
	GetAllScreens(ctx context.Context) ([]interface{}, error)
	GetScreen(ctx context.Context, id string) (interface{}, error)
}

func (c *Client) screensColl() *mongo.Collection {
	return c.m.Database(config.Db).Collection(config.ScreenColl)
}

func (c *Client) CreateScreen(ctx context.Context, screen interface{}) (string, error) {
	const op = "mongo.CreateScreen"

	id := uuid.NewString()

	raw, err := bson.Marshal(screen)
	if err != nil {
		return "", format.Error(op, fmt.Errorf("marshal screen: %w", err))
	}

	var asMap bson.M
	if err = bson.Unmarshal(raw, &asMap); err != nil {
		return "", format.Error(op, fmt.Errorf("unmarshal as map: %w", err))
	}
	asMap["_id"] = id

	if _, err := c.screensColl().InsertOne(ctx, asMap); err != nil {
		return "", format.Error(op, err)
	}
	return id, nil
}

func (c *Client) DeleteScreen(ctx context.Context, id string) error {
	const op = "mongo.DeleteScreen"

	res, err := c.screensColl().DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return format.Error(op, err)
	}
	if res.DeletedCount == 0 {
		return format.Error(op, fmt.Errorf("screen with _id=%s not found", id))
	}
	return nil
}

func (c *Client) RewriteScreen(ctx context.Context, id string, screen interface{}) error {
	const op = "mongo.RewriteScreenByID"

	raw, err := bson.Marshal(screen)
	if err != nil {
		return format.Error(op, fmt.Errorf("marshal screen: %w", err))
	}
	var setDoc bson.M
	if err = bson.Unmarshal(raw, &setDoc); err != nil {
		return format.Error(op, fmt.Errorf("unmarshal screen as map: %w", err))
	}
	delete(setDoc, "_id")

	res := c.screensColl().FindOneAndReplace(
		ctx,
		bson.M{"_id": id},
		setDoc,
	)
	if err != nil {
		return format.Error(op, err)
	}
	if res == nil {
		return format.Error(op, errors.New("nil update result"))
	}
	//if res.MatchedCount == 0 {
	//	return format.Error(op, fmt.Errorf("screen with _id=%s not found", id))
	//}
	return nil
}

func (c *Client) GetAllScreens(ctx context.Context) ([]interface{}, error) {
	const op = "mongo.GetAllScreens"

	cur, err := c.screensColl().Find(ctx, bson.M{})
	if err != nil {
		return nil, format.Error(op, err)
	}
	defer func() { _ = cur.Close(ctx) }()

	var scs []interface{}
	for cur.Next(ctx) {
		var s interface{}
		if err = cur.Decode(&s); err != nil {
			return scs, format.Error(op, err)
		}
		scs = append(scs, s)
	}
	if err = cur.Err(); err != nil {
		return scs, format.Error(op, err)
	}
	return scs, nil
}

func (c *Client) GetScreen(ctx context.Context, id string) (interface{}, error) {
	const op = "mongo.GetAllScreens"

	res := c.screensColl().FindOne(ctx, bson.M{"_id": id})
	if res.Err() != nil {
		return nil, format.Error(op, res.Err())
	}

	var resUnm interface{}
	err := res.Decode(&resUnm)
	if err != nil {
		return nil, format.Error(op, err)
	}
	return resUnm, nil
}
