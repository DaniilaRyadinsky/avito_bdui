package echo

import (
	"bdui/internal/ws"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"time"
)

// Reload godoc
// @Summary Broadcast all clients after reload screens
// @Description log count clients
// @Tags websocket
// @Produce json
// @Success 202 {string} string "No Content"
// @Router /api/client/reload [post]
func (s *Server) Reload(c echo.Context) error {
	count := s.wsm.Broadcast(ws.Event{
		Type: "RELOAD SCREEN",
		Data: map[string]any{"ts": time.Now().Unix()},
	})
	log.Printf("broadcast sent to %d clients", count)
	return c.NoContent(204)
}

// GetAllStats godoc
// @Summary Get aggregated statistics
// @Description Returns all statistics maps: screen receiving, element clicks, screen clicks.
// @Tags stats
// @Produce json
// @Success 200 {object} SWGStats
// @Failure 500 {object} SWGError
// @Router /api/stats/all [get]
func (s *Server) GetAllStats(ctx echo.Context) error {
	st, err := s.statApi.GetAllStats(ctx.Request().Context())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, st)
}
