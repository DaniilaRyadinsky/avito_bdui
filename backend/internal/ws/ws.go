package ws

import (
	"github.com/coder/websocket"
	"github.com/labstack/echo/v4"
)

// echoHandler godoc
// @Summary subscribe client to updates "ws://<ip>:8080/ws?id=<id>"
// @Description web socket connection! "ws://<ip>:8080/ws?id=<id>"
// @Tags websocket
// @Produce json
// @Param id query string true "Screen ID (UUID)"
// @Success 200 {string} string "No Content"
// @Router /ws [get]
func (m *Manager) echoHandler(c echo.Context) error {
	conn, err := websocket.Accept(c.Response(), c.Request(), &websocket.AcceptOptions{
		InsecureSkipVerify: true,
		OriginPatterns:     m.opts.OriginPatterns,
	})
	if err != nil {
		return err
	}
	defer func() {
		_ = conn.Close(websocket.StatusNormalClosure, "bye")
	}()

	id := m.idProvider(c.Request())
	cl := &client{
		id:   id,
		conn: conn,
		send: make(chan []byte, m.opts.SendBuffer),
	}

	m.addClient(cl)
	defer m.removeClient(cl.id)

	go m.writer(cl)

	for {
		_, _, err := conn.Read(c.Request().Context())
		if err != nil {
			return nil
		}
	}
}

func (m *Manager) MountEcho(e *echo.Echo) {
	e.GET(m.opts.Path, m.echoHandler)
}

func (m *Manager) Close() {
	m.closeOnce.Do(func() {
		close(m.closeCh)

		m.mu.RLock()
		var ids []string
		for id := range m.clients {
			ids = append(ids, id)
		}
		m.mu.RUnlock()
		for _, id := range ids {
			m.removeClient(id)
		}
	})
}
