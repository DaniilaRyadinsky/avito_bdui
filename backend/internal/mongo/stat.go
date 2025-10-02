package mongo

import (
	"bdui/internal/utils/format"
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type StatAPI interface {
	IncrementScreenReceiving(ctx context.Context, screenID string) error
	DeleteScreenReceiving(ctx context.Context, screenID string) error

	SetClickScreen(ctx context.Context, screenID string, count int) error
	DeleteClickScreen(ctx context.Context, elementID string) error

	SetClickElement(ctx context.Context, elementID string, count int) error
	DeleteClickElement(ctx context.Context, elementID string) error

	GetAllStats(ctx context.Context) (Stats, error)
}

// IncrementScreenReceiving — атомарное увеличение на 1 счётчика открытий экрана.
func (c *Client) IncrementScreenReceiving(ctx context.Context, screenID string) error {
	const op = "mongo.IncrementScreenReceiving"
	opts := options.UpdateOne().SetUpsert(true)
	_, err := c.ScreenReceivingColl().UpdateOne(
		ctx,
		bson.M{"_id": screenID},
		bson.M{
			"$inc":         bson.M{"count": 1},
			"$setOnInsert": bson.M{"_id": screenID},
		},
		opts,
	)
	if err != nil {
		return format.Error(op, err)
	}
	return nil
}

// DeleteScreenReceiving — удалить счётчик открытий экрана. Вернёт ошибку, если не найден.
func (c *Client) DeleteScreenReceiving(ctx context.Context, screenID string) error {
	const op = "mongo.DeleteScreenReceiving"

	res, err := c.ScreenReceivingColl().DeleteOne(ctx, bson.M{"_id": screenID})
	if err != nil {
		return format.Error(op, err)
	}
	if res.DeletedCount == 0 {
		return format.Error(op, fmt.Errorf("screen receiving with _id=%s not found", screenID))
	}
	return nil
}

// SetClickElement — установить готовое значение кликов по элементу.
func (c *Client) SetClickElement(ctx context.Context, elementID string, count int) error {
	const op = "mongo.SetClickElement"
	opts := options.UpdateOne().SetUpsert(true)
	_, err := c.ClickElementColl().UpdateOne(
		ctx,
		bson.M{"_id": elementID},
		bson.M{"$inc": bson.M{"count": count}},
		opts,
	)
	if err != nil {
		return format.Error(op, err)
	}
	return nil
}

// DeleteClickElement — удалить счётчик кликов по элементу. Вернёт ошибку, если не найден.
func (c *Client) DeleteClickElement(ctx context.Context, elementID string) error {
	const op = "mongo.DeleteClickElement"

	res, err := c.ClickElementColl().DeleteOne(ctx, bson.M{"_id": elementID})
	if err != nil {
		return format.Error(op, err)
	}
	if res.DeletedCount == 0 {
		return format.Error(op, fmt.Errorf("element click with _id=%s not found", elementID))
	}
	return nil
}

// SetClickScreen — установить готовое значение кликов по экрану.
func (c *Client) SetClickScreen(ctx context.Context, screenID string, count int) error {
	const op = "mongo.SetClickScreen"
	opts := options.UpdateOne().SetUpsert(true)
	_, err := c.ClickScreenColl().UpdateOne(
		ctx,
		bson.M{"_id": screenID},
		bson.M{"$inc": bson.M{"count": count}},
		opts,
	)
	if err != nil {
		return format.Error(op, err)
	}
	return nil
}

// DeleteClickScreen — удалить счётчик кликов по экрану. Вернёт ошибку, если не найден.
func (c *Client) DeleteClickScreen(ctx context.Context, elementID string) error {
	const op = "mongo.DeleteClickScreen"

	res, err := c.ClickScreenColl().DeleteOne(ctx, bson.M{"_id": elementID})
	if err != nil {
		return format.Error(op, err)
	}
	if res.DeletedCount == 0 {
		return format.Error(op, fmt.Errorf("element click with _id=%s not found", elementID))
	}
	return nil
}

type Stats struct {
	ScreenReceiving []CountDoc `json:"screenReceiving"`
	ClickElements   []CountDoc `json:"clickElements"`
	ClickScreens    []CountDoc `json:"clickScreens"`
}

type CountDoc struct {
	ID    string `bson:"_id" json:"id"`
	Count int    `bson:"count" json:"count"`
}

// GetAllStats — агрегированное получение всех трёх наборов статистики как массивы CountDoc.
func (c *Client) GetAllStats(ctx context.Context) (Stats, error) {
	const op = "mongo.GetAllStats"

	readColl := func(col *mongo.Collection) ([]CountDoc, error) {
		var docs []CountDoc
		cur, err := col.Find(ctx, bson.M{})
		if err != nil {
			return nil, err
		}
		defer func() { _ = cur.Close(ctx) }()

		for cur.Next(ctx) {
			var d CountDoc
			if err := cur.Decode(&d); err != nil {
				return docs, err
			}
			docs = append(docs, d)
		}
		if err := cur.Err(); err != nil {
			return docs, err
		}
		return docs, nil
	}

	var st Stats
	var err error

	if st.ScreenReceiving, err = readColl(c.ScreenReceivingColl()); err != nil {
		return st, format.Error(op, err)
	}
	if st.ClickElements, err = readColl(c.ClickElementColl()); err != nil {
		return st, format.Error(op, err)
	}
	if st.ClickScreens, err = readColl(c.ClickScreenColl()); err != nil {
		return st, format.Error(op, err)
	}

	return st, nil
}
