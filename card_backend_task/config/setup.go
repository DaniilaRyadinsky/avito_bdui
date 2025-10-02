package config

import (
	"card_backend_task/internal/format"
	"flag"
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	ConnStr string `mapstructure:"conn_str"`
	Port    int    `mapstructure:"port"`
	Mode    string `mapstructure:"mode"`
}

// MustSetup return config and panic if error
func MustSetup() *Config {
	cfg, err := setup()
	if err != nil {
		log.Panic(err)
	}
	return cfg
}

// setup create config structure
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
