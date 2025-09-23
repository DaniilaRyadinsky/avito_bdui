package ws

import (
	"github.com/coder/websocket"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"
)

type client struct {
	id   string
	conn *websocket.Conn
	send chan []byte
}

type Manager struct {
	opts *Options

	mu      sync.RWMutex
	clients map[string]*client

	idProvider func(r *http.Request) string

	closed    bool
	closeCh   chan struct{}
	closeOnce sync.Once
}

func NewManager(opts *Options) *Manager {
	return &Manager{
		opts:    opts,
		clients: make(map[string]*client),
		idProvider: func(r *http.Request) string {
			q := r.URL.Query().Get("id")
			if q != "" {
				return q
			}

			return strconv.FormatInt(time.Now().UTC().Unix(), 10)
		},
		closeCh: make(chan struct{}),
	}
}

func (m *Manager) ClientCount() int {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.clients)
}

func (m *Manager) addClient(cl *client) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if old, ok := m.clients[cl.id]; ok {
		go m.disconnect(old, websocket.StatusPolicyViolation, "duplicate id replaced")
	}
	m.clients[cl.id] = cl
	log.Printf("ws: client connected id=%s, total=%d", cl.id, len(m.clients))
}

func (m *Manager) removeClient(id string) {
	m.mu.Lock()
	cl, ok := m.clients[id]
	if ok {
		delete(m.clients, id)
	}
	m.mu.Unlock()
	if ok {
		close(cl.send)
		_ = cl.conn.Close(websocket.StatusNormalClosure, "bye")
		log.Printf("ws: client disconnected id=%s, total=%d", id, m.ClientCount())
	}
}

func (m *Manager) dropSlowClient(cl *client) {
	log.Printf("ws: drop slow client id=%s", cl.id)
	m.removeClient(cl.id)
}

func (m *Manager) disconnect(cl *client, code websocket.StatusCode, reason string) {
	_ = cl.conn.Close(code, reason)
	m.removeClient(cl.id)
}
