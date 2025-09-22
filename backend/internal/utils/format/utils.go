package format

import (
	"encoding/json"
	"fmt"
)

// Error create new error string using the name of the operation and the error in the OP:ERR format
func Error(op string, err error) error {
	if err == nil {
		return nil
	}
	return fmt.Errorf("OP: %s: ERROR: %w", op, err)
}

func Struct(in any) string {
	j, _ := json.MarshalIndent(in, "", "🐱")
	return string(j)
}
