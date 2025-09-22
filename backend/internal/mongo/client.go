package mongo

import (
	"bdui/config"
	"bdui/internal/utils/format"
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"log"
	"time"
)

type Client struct {
	m   *mongo.Client
	cfg *config.Config
}

func MustConnect(cfg *config.Config) *Client {
	ctx, done := context.WithTimeout(context.Background(), time.Second)
	defer done()

	if c, err := newConnect(cfg, ctx); err != nil {
		panic(err)
	} else {
		return c
	}
}

func newConnect(
	cfg *config.Config,
	ctx context.Context,
) (*Client, error) {
	const op = "app.newConnect"

	c, err := mongo.Connect(options.Client().ApplyURI(cfg.Uri))
	if err != nil {
		return nil, format.Error(op, fmt.Errorf("error in connection to app: %w", err))
	}

	if err = c.Ping(ctx, nil); err != nil {
		return nil, format.Error(op, fmt.Errorf("PING: connection not established: %w", err))
	}

	log.Println("Connection to MongoDB is established successfully")

	return &Client{
		m:   c,
		cfg: cfg,
	}, nil
}

func (c *Client) Disconnect(ctx context.Context) (err error) {
	if err = c.m.Disconnect(ctx); err != nil {
		return fmt.Errorf("error when terminating connection to app: %w", err)
	}
	if err = c.m.Ping(ctx, nil); err == nil {
		return errors.New("PING: terminating connection to MongoDB is failed")
	}
	log.Println("Connection to MongoDB is terminated successfully")

	return nil
}
