package echo

import (
	"bdui/internal/utils/format"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
)

// CreateElement godoc
// @Summary Create element
// @Description Creates a new element document; server generates UUID and returns it as `id`.
// @Tags elements
// @Accept json
// @Produce json
// @Param element body SWGElement true "Element payload"
// @Success 201 {object} SWGCreatedID
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/element/create [post]
func (s *Server) CreateElement(ctx echo.Context) error {
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	id, err := s.API.Create(ctx.Request().Context(), payload, s.coll.ElementColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.JSON(http.StatusCreated, echo.Map{"id": id})
}

// DeleteElement godoc
// @Summary Delete element by ID
// @Description Deletes an element document by its UUID (`id`). STAT: delete all info about this element
// @Tags elements
// @Produce json
// @Param id query string true "Element ID (UUID)"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/element/delete [delete]
func (s *Server) DeleteElement(ctx echo.Context) error {
	const op = "handlers.DeleteElement"

	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	if err := s.API.Delete(ctx.Request().Context(), id, s.coll.ElementColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	if err := s.statApi.DeleteClickElement(ctx.Request().Context(), id); err != nil {
		log.Println(format.Error(op, err))
	}

	return ctx.NoContent(http.StatusNoContent)
}

// RewriteElement godoc
// @Summary Update (rewrite) element by ID
// @Description Rewrites (replaces) an element document by UUID. `_id` is preserved on server.
// @Tags elements
// @Accept json
// @Produce json
// @Param id query string true "Element ID (UUID)"
// @Param element body SWGElement true "Fields to write (document is replaced except for _id)"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/element/rewrite [put]
func (s *Server) RewriteElement(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if err := s.API.Rewrite(ctx.Request().Context(), id, payload, s.coll.ElementColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// UpdateElement godoc
// @Summary Partially update element by ID
// @Description Partially updates fields of an element document by UUID using `$set`; `_id` is preserved.
// @Tags elements
// @Accept json
// @Produce json
// @Param id query string true "Element ID (UUID)"
// @Param element body SWGElement true "Fields to set"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/element/update [patch]
func (s *Server) UpdateElement(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	var payload map[string]interface{}
	if err := ctx.Bind(&payload); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if err := s.API.Update(ctx.Request().Context(), id, payload, s.coll.ElementColl()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}

// GetAllElements godoc
// @Summary List elements
// @Description Returns all element documents.
// @Tags elements
// @Produce json
// @Success 200 {array} SWGElement
// @Failure 500 {object} SWGError
// @Router /api/element/all [get]
func (s *Server) GetAllElements(ctx echo.Context) error {
	items, err := s.API.GetAll(ctx.Request().Context(), s.coll.ElementColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	if len(items) == 0 {
		return ctx.JSON(http.StatusOK, echo.Map{})
	}
	return ctx.JSON(http.StatusOK, items)
}

// GetElement godoc
// @Summary Get element by ID
// @Description Returns a single element document by UUID.
// @Tags elements
// @Produce json
// @Param id query string true "Element ID (UUID)"
// @Success 200 {object} SWGElement
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/element/get [get]
func (s *Server) GetElement(ctx echo.Context) error {
	id := ctx.QueryParam("id")
	if id == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing id"})
	}
	obj, err := s.API.Get(ctx.Request().Context(), id, s.coll.ElementColl())
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.JSON(http.StatusOK, obj)
}

// SetClickElement godoc
// @Summary Set element click count
// @Description Sets click count for element ID. Intended for client-side aggregated writes.
// @Tags stats
// @Accept json
// @Produce json
// @Param payload body SWGSetClickElementReq true "Element click payload"
// @Success 204 {string} string "No Content"
// @Failure 400 {object} SWGError
// @Failure 500 {object} SWGError
// @Router /api/stats/click/element [post]
func (s *Server) SetClickElement(ctx echo.Context) error {
	var req SWGSetClickElementReq
	if err := ctx.Bind(&req); err != nil {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
	}
	if req.ElementID == "" {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "missing elementId"})
	}
	if req.Count < 0 {
		return ctx.JSON(http.StatusBadRequest, echo.Map{"error": "count must be >= 0"})
	}
	if err := s.statApi.SetClickElement(ctx.Request().Context(), req.ElementID, req.Count); err != nil {
		return ctx.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	return ctx.NoContent(http.StatusNoContent)
}
