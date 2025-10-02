package config

// Test create config structure with local.yaml without flags
func Test() *Config {
	return &Config{
		ConnStr: "postgres://postgres:passwd@localhost:5432/carddb?sslmode=disable",
		Port:    8008,
		Mode:    "DEV",
	}
}
