package views

type Card struct {
	Id         string  `json:"id"`
	Title      string  `json:"title"`
	Price      float32 `json:"price"`
	ImageUrl   string  `json:"imageUrl"`
	IsSelected bool    `json:"isSelected"`
	IsFavorite bool    `json:"isFavorite"`
	Quantity   string  `json:"quantity"`
}
