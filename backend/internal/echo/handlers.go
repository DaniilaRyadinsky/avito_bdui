package echo

import (
	"log"
	"net/http"

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

	id, err := s.scrAPI.CreateScreen(ctx.Request().Context(), payload)
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

	if err := s.scrAPI.DeleteScreen(ctx.Request().Context(), id); err != nil {
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

	if err := s.scrAPI.RewriteScreen(ctx.Request().Context(), id, payload); err != nil {
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

	screens, err := s.scrAPI.GetAllScreens(ctx.Request().Context())
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

	screen, err := s.scrAPI.GetScreen(ctx.Request().Context(), id)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, screen)
}
