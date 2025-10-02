package views

type (
	SWGSuccessResponse struct {
		Answer string `json:"answer" example:"operation successful"`
	}

	SWGErrorResponse struct {
		Error string `json:"error" example:"something went wrong"`
	}

	SWGCardListResponse struct {
		Brands []Card `json:"cards"`
	}

	ProductColorPhotosId struct {
		ProductId string `json:"product_id"`
		ColorId   string `json:"color_id"`
	}
)
