package mongo

import (
	"bdui/internal/utils/format"
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type API interface {
	Create(ctx context.Context, obj interface{}, col *mongo.Collection) (string, error)
	Delete(ctx context.Context, id string, col *mongo.Collection) error
	Rewrite(ctx context.Context, id string, obj interface{}, col *mongo.Collection) error
	GetAll(ctx context.Context, col *mongo.Collection) ([]interface{}, error)
	Get(ctx context.Context, id string, col *mongo.Collection) (interface{}, error)
	Update(ctx context.Context, id string, obj interface{}, col *mongo.Collection) error
}

func (c *Client) Create(ctx context.Context, obj interface{}, col *mongo.Collection) (string, error) {
	const op = "mongo.CreateScreen"

	id := uuid.NewString()

	raw, err := bson.Marshal(obj)
	if err != nil {
		return "", format.Error(op, fmt.Errorf("marshal screen: %w", err))
	}

	var asMap bson.M
	if err = bson.Unmarshal(raw, &asMap); err != nil {
		return "", format.Error(op, fmt.Errorf("unmarshal as map: %w", err))
	}
	asMap["_id"] = id

	if _, err := col.InsertOne(ctx, asMap); err != nil {
		return "", format.Error(op, err)
	}
	return id, nil
}

func (c *Client) Delete(ctx context.Context, id string, col *mongo.Collection) error {
	const op = "mongo.DeleteScreen"

	res, err := col.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return format.Error(op, err)
	}
	if res.DeletedCount == 0 {
		return format.Error(op, fmt.Errorf("screen with _id=%s not found", id))
	}
	return nil
}

func (c *Client) Rewrite(ctx context.Context, id string, obj interface{}, col *mongo.Collection) error {
	const op = "mongo.RewriteScreenByID"

	raw, err := bson.Marshal(obj)
	if err != nil {
		return format.Error(op, fmt.Errorf("marshal screen: %w", err))
	}
	var setDoc bson.M
	if err = bson.Unmarshal(raw, &setDoc); err != nil {
		return format.Error(op, fmt.Errorf("unmarshal screen as map: %w", err))
	}
	delete(setDoc, "_id")

	res := col.FindOneAndReplace(
		ctx,
		bson.M{"_id": id},
		setDoc,
	)
	if res == nil {
		return format.Error(op, errors.New("nil update result"))
	}
	if res.Err() != nil {
		return format.Error(op, err)
	}
	return nil
}

func (c *Client) Update(ctx context.Context, id string, obj interface{}, col *mongo.Collection) error {
	const op = "mongo.Update"

	raw, err := bson.Marshal(obj)
	if err != nil {
		return format.Error(op, fmt.Errorf("marshal update: %w", err))
	}
	var setDoc bson.M
	if err = bson.Unmarshal(raw, &setDoc); err != nil {
		return format.Error(op, fmt.Errorf("unmarshal update as map: %w", err))
	}
	delete(setDoc, "_id")

	res, err := col.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": setDoc})
	if err != nil {
		return format.Error(op, err)
	}
	if res == nil {
		return format.Error(op, errors.New("nil update result"))
	}
	if res.MatchedCount == 0 {
		return format.Error(op, fmt.Errorf("document with _id=%s not found", id))
	}
	return nil
}

func (c *Client) GetAll(ctx context.Context, col *mongo.Collection) ([]interface{}, error) {
	const op = "mongo.GetAllScreens"

	cur, err := col.Find(ctx, bson.M{})
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

func (c *Client) Get(ctx context.Context, id string, col *mongo.Collection) (interface{}, error) {
	const op = "mongo.GetAllScreens"

	res := col.FindOne(ctx, bson.M{"_id": id})
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
