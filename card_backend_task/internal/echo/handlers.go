package echo

import (
	"card_backend_task/internal/format"
	"card_backend_task/internal/views"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"strconv"
)

// GetAllCards godoc
// @Summary Получить все карточки
// @Description Возвращает список всех карточек
// @Tags cards
// @Produce json
// @Success 200 {object} views.SWGCardListResponse
// @Failure 500 {object} views.SWGErrorResponse
// @Failure 502 {object} views.SWGErrorResponse
// @Router /api/card/all [get]
func (s *Server) GetAllCards(c echo.Context) error {
	const op = "handlers.GetAllCards"

	list, err := s.API.GetAllCards()
	if err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "failed to get Cards"})
	}

	if len(list) == 0 {
		list = []views.Card{}
	}

	return c.JSON(http.StatusOK, list)
}

// GetAllCardsLimit godoc
// @Summary Получить все карточки
// @Description Возвращает список карточек с пагинацией
// @Tags cards
// @Produce json
// @Param from query int false "Начальная позиция (offset)"
// @Param to query int false "Конечная позиция"
// @Success 200 {object} views.SWGCardListResponse
// @Failure 400 {object} views.SWGErrorResponse
// @Failure 500 {object} views.SWGErrorResponse
// @Failure 502 {object} views.SWGErrorResponse
// @Router /api/card/all/limit [get]
func (s *Server) GetAllCardsLimit(c echo.Context) error {
	const op = "handlers.GetAllCardsLimit"

	// парсим query параметры
	fromStr := c.QueryParam("from")
	toStr := c.QueryParam("to")

	// значения по умолчанию (например, первые 10 записей)
	from, to := 0, 10

	if fromStr != "" {
		if v, err := strconv.Atoi(fromStr); err == nil && v >= 0 {
			from = v
		}
	}
	if toStr != "" {
		if v, err := strconv.Atoi(toStr); err == nil && v > from {
			to = v
		}
	}

	list, err := s.API.GetAllCardsLimit(from, to)
	if err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "failed to get Cards"})
	}

	if len(list) == 0 {
		list = []views.Card{}
	}

	return c.JSON(http.StatusOK, list)
}

// CreateCard godoc
// @Summary Создать новый card
// @Description Добавляет новый card
// @Tags cards
// @Accept json
// @Produce json
// @Param brand body views.Card true "Данные нового card"
// @Success 200 {object} views.SWGSuccessResponse
// @Failure 400 {object} views.SWGErrorResponse
// @Failure 500 {object} views.SWGErrorResponse
// @Failure 502 {object} views.SWGErrorResponse
// @Router /api/card/create [post]
func (s *Server) CreateCard(c echo.Context) error {
	const op = "handlers.CreateCard"

	var card views.Card
	if err := c.Bind(&card); err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid JSON"})
	}
	card.Id = uuid.NewString()

	err := s.API.CreateCard(&card)
	if err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "failed to create card"})
	}

	return c.JSON(http.StatusOK, map[string]string{"answer": "card created"})
}

// UpdateCard godoc
// @Summary Обновить card
// @Description Обновляет информацию о card по ID
// @Tags cards
// @Accept json
// @Produce json
// @Param id query string true "ID card"
// @Param brand body views.Card true "Данные card"
// @Success 200 {object} views.SWGSuccessResponse
// @Failure 400 {object} views.SWGErrorResponse
// @Failure 500 {object} views.SWGErrorResponse
// @Failure 502 {object} views.SWGErrorResponse
// @Router /api/card/update [put]
func (s *Server) UpdateCard(c echo.Context) error {
	const op = "handlers.UpdateCard"

	id := c.QueryParam("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "missing id"})
	}

	var Card views.Card
	if err := c.Bind(&Card); err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid JSON"})
	}

	err := s.API.UpdateCard(&Card, id)
	if err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "failed to update Card"})
	}

	return c.JSON(http.StatusOK, map[string]string{"answer": "Card updated"})
}

// DeleteCard godoc
// @Summary Удалить card
// @Description Удаляет card по ID
// @Tags cards
// @Produce json
// @Param id query string true "ID card"
// @Success 200 {object} views.SWGSuccessResponse
// @Failure 400 {object} views.SWGErrorResponse
// @Failure 500 {object} views.SWGErrorResponse
// @Failure 502 {object} views.SWGErrorResponse
// @Router /api/card/delete [delete]
func (s *Server) DeleteCard(c echo.Context) error {
	const op = "handlers.DeleteCard"

	id := c.QueryParam("id")
	if id == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "missing id"})
	}

	err := s.API.DeleteCard(id)
	if err != nil {
		log.Println(format.Error(op, err))
		return c.JSON(http.StatusBadGateway, map[string]string{"error": "failed to delete Card"})
	}

	return c.JSON(http.StatusOK, map[string]string{"answer": "Card deleted"})
}
