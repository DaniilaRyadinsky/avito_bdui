package echo

import (
	"bdui/config"
	"bdui/internal/mongo"
	"bdui/internal/utils/format"
	"bdui/internal/ws"
	"errors"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"net/http"
)

type Server struct {
	e       *echo.Echo
	cfg     *config.Config
	API     mongo.API
	coll    mongo.Collections
	statApi mongo.StatAPI
	wsm     *ws.Manager
}

func NewServer(cfg *config.Config, API mongo.API, coll mongo.Collections, statApi mongo.StatAPI, wsm *ws.Manager) *Server {
	e := echo.New()
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.Use(middleware.Logger(), middleware.Recover(), middleware.CORS())

	s := &Server{
		e:       e,
		cfg:     cfg,
		API:     API,
		wsm:     wsm,
		coll:    coll,
		statApi: statApi,
	}

	wsm.MountEcho(e)

	e.POST("/api/client/reload", s.Reload)

	scr := e.Group("/api/screen/")
	{
		scr.POST("create", s.CreateScreen)
		scr.DELETE("delete", s.DeleteScreen)
		scr.PUT("rewrite", s.RewriteScreen)
		scr.PATCH("update", s.UpdateScreen)

		scr.GET("all", s.GetAllScreens)
		scr.GET("get", s.GetScreen)
	}

	clr := e.Group("/api/color/")
	{
		clr.POST("create", s.CreateColor)
		clr.DELETE("delete", s.DeleteColor)
		clr.PUT("rewrite", s.RewriteColor)
		clr.PATCH("update", s.UpdateColor)

		clr.GET("all", s.GetAllColors)
		clr.GET("get", s.GetColor)
	}

	elm := e.Group("/api/element/")
	{
		elm.POST("create", s.CreateElement)
		elm.DELETE("delete", s.DeleteElement)
		elm.PUT("rewrite", s.RewriteElement)
		elm.PATCH("update", s.UpdateElement)

		elm.GET("all", s.GetAllElements)
		elm.GET("get", s.GetElement)
	}

	st := e.Group("/api/stats/")
	{
		st.GET("all", s.GetAllStats)
		st.POST("click/element", s.SetClickElement)
		st.POST("click/screen", s.SetClickScreen)
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
