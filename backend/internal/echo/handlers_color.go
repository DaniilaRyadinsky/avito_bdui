package echo

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

// CreateColor godoc
// @Summary Create color
// @Description Creates a new color document; server generates UUID and returns it as `id`.
// @Tags colors
// @Accept json
// @Produce json
// @Param color body SWGColor true "Color payload"
// @Success 201 {object} SWGCreatedID
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/color/create [post]
func (s *Server) CreateColor(ctx echo.Context) error {
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	id, err := s.API.Create(ctx.Request().Context(), payload, s.coll.ColorColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.JSON(http.StatusCreated, echo.Map{"id": id})
}

// DeleteColor godoc
// @Summary Delete color by ID
// @Description Deletes a color document by its UUID (`id`).
// @Tags colors
// @Produce json
// @Param id query string true "Color ID (UUID)"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/color/delete [delete]
func (s *Server) DeleteColor(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	if err := s.API.Delete(ctx.Request().Context(), id, s.coll.ColorColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// RewriteColor godoc
// @Summary Update (rewrite) color by ID
// @Description Rewrites (replaces) a color document by UUID. `_id` is preserved on server.
// @Tags colors
// @Accept json
// @Produce json
// @Param id query string true "Color ID (UUID)"
// @Param color body SWGColor true "Fields to write (document is replaced except for _id)"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/color/rewrite [put]
func (s *Server) RewriteColor(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if err := s.API.Rewrite(ctx.Request().Context(), id, payload, s.coll.ColorColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// UpdateColor godoc
// @Summary Partially update color by ID
// @Description Partially updates fields of a color document by UUID using `$set`; `_id` is preserved.
// @Tags colors
// @Accept json
// @Produce json
// @Param id query string true "Color ID (UUID)"
// @Param color body SWGColor true "Fields to set"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/color/update [patch]
func (s *Server) UpdateColor(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if err := s.API.Update(ctx.Request().Context(), id, payload, s.coll.ColorColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// GetAllColors godoc
// @Summary List colors
// @Description Returns all color documents.
// @Tags colors
// @Produce json
// @Success 200 {array} SWGColor
// @Failure 500 {object} SWGError
// @Router /api/color/all [get]
func (s *Server) GetAllColors(ctx echo.Context) error {
	items, err := s.API.GetAll(ctx.Request().Context(), s.coll.ColorColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	if len(items) == 0 {
		return ctx.JSON(http.StatusOK, echo.Map{})
	}
	return ctx.JSON(http.StatusOK, items)
}

// GetColor godoc
// @Summary Get color by ID
// @Description Returns a single color document by UUID.
// @Tags colors
// @Produce json
// @Param id query string true "Color ID (UUID)"
// @Success 200 {object} SWGColor
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/color/get [get]
func (s *Server) GetColor(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	obj, err := s.API.Get(ctx.Request().Context(), id, s.coll.ColorColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.JSON(http.StatusOK, obj)
}
