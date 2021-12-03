package basket

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"example.com/api"
)

type ProductItem struct { 
	ProductId string `json:"productId"`
	Quantity int	 `json:"quantity"`
}

type BasketItem struct { 
	ItemId string `json:"itemId"`
	Quantity int  `json:"quantity"`
}

type AddItemsRequest struct {
	BasketId string `json:"basketId"`
	Items [] ProductItem `json:"items"`
}

type UpdateItemRequest struct {
	BasketId string `json:"basketId"`
	ItemId string 	`json:"itemId"`
	Quantity int	`json:"quantity"`
}

type DeleteItemRequest struct {
	BasketId string `json:"basketId"`
	ItemId string 	`json:"itemId"`
}

type BasketResponseItem struct {
	ProductId string `json:"productId"`
	ItemId string `json:"itemId"`
	Quantity int8 `json:"qty"`
	ProductName string `json:"name"`
	Price string `json:"price"`
	Image string `json:"img"`
}

type BasketResponse struct {
	BasketId string		`json:"id"`
	Items [] BasketResponseItem	`json:"items"`
	OrderTotal string	`json:"total"`
}

func formatPrice(price float32) string {
	return strings.Replace(fmt.Sprintf("%.2f €",  price), ".", ",", 1)
}

func mapItems(items []api.BasketItem) []BasketResponseItem {
	var response []BasketResponseItem
    for _, itm := range items {
        response = append(response, BasketResponseItem {
			ItemId: itm.ItemId,
			ProductId: itm.ProductId,
			Quantity: itm.Quantity,
			ProductName: itm.ProductName,
			Price: formatPrice(itm.Price),
			Image: fmt.Sprintf("https://i8.amplience.net/i/Cosnova/%s", itm.ProductId),
		})
    }
	return response
}

func HandleAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
	basket := &api.Basket{}
	service := api.NewService()
	err := service.Request(api.ServiceRequest {
		Method: "GET",
		Path: "/auth",
		Outputs: basket,
	})

	if err != nil {
		http.Error(w, err.Error(), 500)
	} else {
		json.NewEncoder(w).Encode(BasketResponse{
			BasketId: basket.Id,
			Items: mapItems(basket.Items),
			OrderTotal: formatPrice(basket.OrderTotal),
		})
	}
}

func HandleAdd(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
	basket := &api.Basket{}
	service := api.NewService()
	payload := &ProductItem{}

	basketId := r.URL.Query().Get("id")
	if (basketId == "") {
		log.Println("Missing query parameter 'id'")
		http.Error(w,
			"Missing query parameter 'id'",
			http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
		log.Println(fmt.Errorf("invalid body: %w", err))
		http.Error(w,
			fmt.Sprintf("failed to decode body: %v", err),
			http.StatusBadRequest)
		return
	}

	inputs:= &AddItemsRequest {
		BasketId: basketId,
		Items: [] ProductItem { *payload },
	}

	err := service.Request(api.ServiceRequest {
		Method: "POST",
		Path: "/add",
		Inputs: inputs,
		Outputs: basket,
	})

	if err != nil {
		http.Error(w, err.Error(), 500)
	} else {
		json.NewEncoder(w).Encode(BasketResponse{
			BasketId: basket.Id,
			Items: mapItems(basket.Items),
			OrderTotal: formatPrice(basket.OrderTotal),
		})
	}
}

func HandleUpdate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
	basket := &api.Basket{}
	service := api.NewService()
	payload := &BasketItem{}

	basketId := r.URL.Query().Get("id")
	if (basketId == "") {
		log.Println("Missing query parameter 'id'")
		http.Error(w,
			"Missing query parameter 'id'",
			http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
		log.Println(fmt.Errorf("invalid body: %w", err))
		http.Error(w,
			fmt.Sprintf("failed to decode body: %v", err),
			http.StatusBadRequest)
		return
	}

	inputs:= &UpdateItemRequest {
		BasketId: basketId,
		ItemId: payload.ItemId,
		Quantity: payload.Quantity,
	}

	err := service.Request(api.ServiceRequest {
		Method: "POST",
		Path: "/update",
		Inputs: inputs,
		Outputs: basket,
	})

	if err != nil {
		http.Error(w, err.Error(), 500)
	} else {
		json.NewEncoder(w).Encode(BasketResponse{
			BasketId: basket.Id,
			Items: mapItems(basket.Items),
			OrderTotal: formatPrice(basket.OrderTotal),
		})
	}
}

func HandleDelete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
	basket := &api.Basket{}
	service := api.NewService()
	payload := &BasketItem{}

	basketId := r.URL.Query().Get("id")
	if (basketId == "") {
		log.Println("Missing query parameter 'id'")
		http.Error(w,
			"Missing query parameter 'id'",
			http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
		log.Println(fmt.Errorf("invalid body: %w", err))
		http.Error(w,
			fmt.Sprintf("failed to decode body: %v", err),
			http.StatusBadRequest)
		return
	}

	inputs:= &DeleteItemRequest {
		BasketId: basketId,
		ItemId: payload.ItemId,
	}

	err := service.Request(api.ServiceRequest {
		Method: "POST",
		Path: "/delete",
		Inputs: inputs,
		Outputs: basket,
	})

	if err != nil {
		http.Error(w, err.Error(), 500)
	} else {
		json.NewEncoder(w).Encode(BasketResponse{
			BasketId: basket.Id,
			Items: mapItems(basket.Items),
			OrderTotal: formatPrice(basket.OrderTotal),
		})
	}
}
