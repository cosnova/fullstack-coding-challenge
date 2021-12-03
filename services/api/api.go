package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
)

type Service struct {
	Host       string
	httpClient http.Client
}

type ServiceRequest struct {
	Path         string
	Method       string
	QueryStrings map[string][]string
	Inputs       interface{}
	Outputs      interface{}
}

type ErrorItem struct {
	Message string `json:"message"`
}

type ErrorResponse struct {
	Errors []ErrorItem `json:"errors"`
}

func NewService() *Service {
	return &Service{
		Host: "https://cosnova-demo.azurewebsites.net/api",
	}
}

type BasketItem struct {
	ProductId string `json:"productId"`
	Quantity int8 `json:"quantity"`
	ItemId string `json:"itemId"`
	ProductName string `json:"productName"`
	Price float32 `json:"price"`
}

type Basket struct {
	Id string `json:"id"`
	Items []BasketItem `json:"items"`
	OrderTotal float32 `json:"orderTotal"`
    Currency string `json:"currency"`
}

func (s *Service) Request(endpoint ServiceRequest) error {

	var urlBuilder strings.Builder
	urlBuilder.WriteString(s.Host)
	urlBuilder.WriteString(endpoint.Path)

	if len(endpoint.QueryStrings) != 0 {
		urlBuilder.WriteString("?")
		urlBuilder.WriteString(url.Values(endpoint.QueryStrings).Encode())
	}

	var body io.Reader
	if endpoint.Inputs != nil {
		var buf bytes.Buffer
		if err := json.NewEncoder(&buf).Encode(endpoint.Inputs); err != nil {
			return fmt.Errorf("could not encode input parameters: %w", err)
		}
		body = &buf
	}

	method := endpoint.Method
	if method == "" {
		method = "GET"
	}

	req, err := http.NewRequest(method, urlBuilder.String(), body)
	if err != nil {
		return fmt.Errorf("could not create request: %w", err)
	}


	req.Header.Add("Content-Type", "application/json; charset=UTF-8")
	resp, err := s.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("could not call endpoint: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return fmt.Errorf("request failed")
	}

	if endpoint.Outputs != nil {
		err := json.NewDecoder(resp.Body).Decode(endpoint.Outputs)
		if err != nil {
			return fmt.Errorf("could not decode response: %w", err)
		}
	}

	return nil
}
