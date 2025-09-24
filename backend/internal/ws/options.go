package ws

import (
	"time"
)

type Event struct {
	Type string      `json:"type"`
	Data interface{} `json:"data,omitempty"`
}

// Options — настройка WS-эндпоинта.
type Options struct {
	Path           string
	OriginPatterns []string
	SendBuffer     int
	WriteTimeout   time.Duration
}

func WithDefaultOptions() *Options {
	return &Options{
		Path:           "/ws",
		OriginPatterns: nil,
		SendBuffer:     32,
		WriteTimeout:   3 * time.Second,
	}
}
