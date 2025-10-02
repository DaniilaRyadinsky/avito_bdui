package main

import (
	_ "card_backend_task/cmd/docs"
	"card_backend_task/config"
	"card_backend_task/internal/echo"
	"card_backend_task/internal/psql"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// @title Card crud for test bdui
// @version test

// @contact.name Alex "bustard" Provor
// @contact.url https://breezy.su
// @contact.email help@breezy.su

// @host localhost:8080
// @BasePath /
// @schemes http
func main() {
	cfg := config.MustSetup()

	db := psql.MustConnect(cfg)

	e := echo.NewServer(cfg, psql.Driver{Driver: db.Driver})

	go e.MustRun()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)
	sign := <-stop

	if err := e.Stop(); err != nil {
		log.Println(err)
	}

	if err := db.Disconnect(); err != nil {
		log.Println(err)
	}

	log.Println("stop signal", sign)
}
