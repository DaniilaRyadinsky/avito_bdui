package echo

import (
	"bdui/config"
	"bdui/internal/mongo"
	"bdui/internal/utils/format"
	"errors"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"net/http"
)

type Server struct {
	e      *echo.Echo
	cfg    *config.Config
	scrAPI mongo.ScreenAPI
}

func NewServer(cfg *config.Config, scrAPI mongo.ScreenAPI) *Server {
	e := echo.New()
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.Use(middleware.Logger(), middleware.Recover(), middleware.CORS())

	s := &Server{
		e:      e,
		cfg:    cfg,
		scrAPI: scrAPI,
	}

	scr := e.Group("/api/screen/")
	{
		scr.POST("create", s.CreateScreen)
		scr.DELETE("delete", s.DeleteScreen)
		scr.PUT("rewrite", s.RewriteScreen)

		scr.GET("all", s.GetAllScreens)
		scr.GET("get", s.GetScreen)
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
