package echo

type SWGError struct {
	Error string `json:"error" example:"description of error"`
}

type SWGCreatedID struct {
	ID string `json:"id" example:"550e8400-e29b-41d4-a716-446655440000"`
}

type SWGScreen map[string]interface{}
