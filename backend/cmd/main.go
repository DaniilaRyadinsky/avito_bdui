package main

import (
	"bdui/config"
	_ "bdui/docs"
	"bdui/internal/echo"
	"bdui/internal/mongo"
	"bdui/internal/ws"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// @title bdUI REST API
// @version --dev--

// @host 31.56.205.210:8080
// @BasePath /
// @schemes http
func main() {
	cfg := config.MustSetup()

	m := mongo.MustConnect(cfg)

	wsm := ws.NewManager(ws.WithDefaultOptions())

	e := echo.NewServer(cfg, m, m, m, wsm)
	go e.MustRun()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
	sign := <-stop

	if err := e.Stop(); err != nil {
		log.Println(err)
	}

	wsm.Close()

	log.Println("stop signal", sign)
}
