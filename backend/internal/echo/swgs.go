package echo

type SWGError struct {
	Error string `json:"error" example:"description of error"`
}

type SWGCreatedID struct {
	ID string `json:"id" example:"550e8400-e29b-41d4-a716-446655440000"`
}

type SWGScreen map[string]interface{}
type SWGColor map[string]interface{}
type SWGElement map[string]interface{}

type SWGStats struct {
	ScreenReceiving map[string]int `json:"screenReceiving" `
	ClickElements   map[string]int `json:"clickElements"   `
	ClickScreens    map[string]int `json:"clickScreens"    `
}

// SWGSetClickElementReq — запрос на установку значения кликов по элементу.
type SWGSetClickElementReq struct {
	ElementID string `json:"elementId" example:"4d0f18d6-dc4a-4f5d-8b5b-6e9a8a8d9b01"`
	Count     int    `json:"count"     example:"3"`
}

// SWGSetClickScreenReq — запрос на установку значения кликов по экрану.
type SWGSetClickScreenReq struct {
	ScreenID string `json:"screenId" example:"3b2c6f55-1e9e-44e7-8a7e-7f3c5d8a1b23"`
	Count    int    `json:"count"    example:"12"`
}
