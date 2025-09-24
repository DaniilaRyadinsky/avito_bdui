package echo

import (
	"bdui/internal/ws"
	"log"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

// CreateScreen godoc
// @Summary Create screen
// @Description Creates a new screen document; server generates UUID and returns it as `id`.
// @Tags screens
// @Accept json
// @Produce json
// @Param screen body SWGScreen true "Screen payload"
// @Success 201 {object} SWGCreatedID
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/screen/create [post]
func (s *Server) CreateScreen(ctx echo.Context) error {
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	id, err := s.API.Create(ctx.Request().Context(), payload, s.coll.ScreenColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusCreated, echo.Map{"id": id})
}

// DeleteScreen godoc
// @Summary Delete screen by ID
// @Description Deletes a screen document by its UUID (`id`).
// @Tags screens
// @Produce json
// @Param id query string true "Screen ID (UUID)"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/screen/delete [delete]
func (s *Server) DeleteScreen(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}

	if err := s.API.Delete(ctx.Request().Context(), id, s.coll.ScreenColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}

// RewriteScreen godoc
// @Summary Update (rewrite) screen by ID
// @Description Updates fields of a screen document by UUID using `$set` semantics.
// @Tags screens
// @Accept json
// @Produce json
// @Param id query string true "Screen ID (UUID)"
// @Param screen body SWGScreen true "Fields to set"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/screen/rewrite [put]
func (s *Server) RewriteScreen(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}

	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}

	if err := s.API.Rewrite(ctx.Request().Context(), id, payload, s.coll.ScreenColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.NoContent(http.StatusNoContent)
}

// UpdateScreen godoc
// @Summary Partially update screen by ID
// @Description Partially updates fields of a screen document by UUID using `$set`; `_id` is preserved.
// @Tags screens
// @Accept json
// @Produce json
// @Param id query string true "Screen ID (UUID)"
// @Param screen body SWGScreen true "Fields to set"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/screen/update [patch]
func (s *Server) UpdateScreen(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if err := s.API.Update(ctx.Request().Context(), id, payload, s.coll.ScreenColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// GetAllScreens godoc
// @Summary List screens
// @Description Returns all screen documents.
// @Tags screens
// @Produce json
// @Success 200 {array} SWGScreen
// @Failure 500 {object} SWGError
// @Router /api/screen/all [get]
func (s *Server) GetAllScreens(ctx echo.Context) error {
	log.Println("getall")

	screens, err := s.API.GetAll(ctx.Request().Context(), s.coll.ScreenColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	if len(screens) == 0 {

		return ctx.JSON(http.StatusOK, echo.Map{})
	}

	return ctx.JSON(http.StatusOK, screens)
}

// GetScreen godoc
// @Summary Get screen by ID
// @Description Returns a single screen document by UUID.
// @Tags screens
// @Produce json
// @Param id query string true "Screen ID (UUID)"
// @Success 200 {object} SWGScreen
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/screen/get [get]
func (s *Server) GetScreen(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}

	screen, err := s.API.Get(ctx.Request().Context(), id, s.coll.ScreenColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, screen)
}

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
