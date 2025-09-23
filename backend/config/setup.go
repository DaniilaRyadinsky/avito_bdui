package config

import (
	"bdui/internal/utils/format"
	"flag"
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	Uri  string `mapstructure:"uri"`
	Port int    `mapstructure:"port"`
	Mode string `mapstructure:"mode"`
}

const (
	ScreenColl  = "screens"
	ColorColl   = "colours"
	ElementColl = "elements"
	Db          = "bdui"
)

func MustSetup() *Config {
	if cfg, err := setup(); err != nil {
		log.Panic(err)
		return nil
	} else {
		return cfg
	}
}

func setup() (*Config, error) {
	const op = "config.setup"
	configPath := flag.String("config", "./config/local.yaml", "path to config file")
	flag.Parse()

	viper.SetConfigFile(*configPath)
	var cfg Config
	if err := viper.ReadInConfig(); err != nil {
		return nil, format.Error(op, err)
	}
	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, format.Error(op, err)
	}

	if cfg.Mode == "DEV" {
		log.Println(format.Struct(cfg))
	}

	return &cfg, nil
}
