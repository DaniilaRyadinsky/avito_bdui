package main

import (
	_ "bdui/cmd/docs"
	"bdui/config"
	"bdui/internal/echo"
	"bdui/internal/mongo"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// @title bdUI REST API
// @version --dev--

// @contact.name Alex "bustard" Provor
// @contact.url https://breezy.su
// @contact.email admin@breezy.su

// @host 31.56.205.210:8080
// @BasePath /
// @schemes http
func main() {
	cfg := config.MustSetup()

	m := mongo.MustConnect(cfg)

	e := echo.NewServer(cfg, m)
	go e.MustRun()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
	sign := <-stop

	if err := e.Stop(); err != nil {
		log.Println(err)
	}

	log.Println("stop signal", sign)
}
