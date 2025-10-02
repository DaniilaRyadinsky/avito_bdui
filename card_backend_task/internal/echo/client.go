package echo

import (
	"card_backend_task/config"
	"card_backend_task/internal/format"
	"card_backend_task/internal/psql"
	"errors"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"net/http"
)

type Server struct {
	e   *echo.Echo
	cfg *config.Config
	API psql.API
}

func NewServer(cfg *config.Config, API psql.API) *Server {
	e := echo.New()
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.Use(middleware.Logger(), middleware.Recover(), middleware.CORS())

	s := &Server{
		e:   e,
		cfg: cfg,
		API: API,
	}

	elm := e.Group("/api/card/")
	{
		elm.POST("create", s.CreateCard)
		elm.DELETE("delete", s.DeleteCard)
		elm.PUT("update", s.UpdateCard)

		elm.GET("all", s.GetAllCards)
		elm.GET("all/limit", s.GetAllCardsLimit)
	}

	return s
}
func (s *Server) MustRun() {
	const op = "echo.Echo.Run"

	if err := s.e.Start(fmt.Sprintf(":%d", s.cfg.Port)); err != nil && !errors.Is(http.ErrServerClosed, err) {
		s.e.Logger.Fatal(format.Error(op, err))
	}
}

func (s *Server) Stop() error {
	const op = "echo.Echo.Stop"

	if err := s.e.Close(); err != nil {
		return format.Error(op, err)
	}
	return nil
}
