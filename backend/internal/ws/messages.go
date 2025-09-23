package ws

import (
	"context"
	"encoding/json"
	"github.com/coder/websocket"
	"log"
)

func (m *Manager) Broadcast(ev Event) int {
	msg, err := json.Marshal(ev)
	if err != nil {
		log.Printf("ws: broadcast marshal error: %v", err)
		return 0
	}

	m.mu.RLock()
	defer m.mu.RUnlock()

	n := 0
	for _, cl := range m.clients {
		select {
		case cl.send <- msg:
			n++
		default:
			go m.dropSlowClient(cl)
		}
	}
	return n
}

func (m *Manager) writer(cl *client) {
	for b := range cl.send {
		ctx, cancel := context.WithTimeout(context.Background(), m.opts.WriteTimeout)
		err := cl.conn.Write(ctx, websocket.MessageText, b)
		cancel()
		if err != nil {
			log.Printf("ws: write error id=%s: %v", cl.id, err)
			m.removeClient(cl.id)
			return
		}
	}
}
