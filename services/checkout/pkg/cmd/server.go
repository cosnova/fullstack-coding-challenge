package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"example.com/checkout/pkg/service/basket"
	"example.com/utils"
)

type Response struct {
	Greet string `json:"greet"`
};

func HandleHello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json");
	json.NewEncoder(w).Encode(Response{Greet: "Hello, World!"});
}

func main() {
	fmt.Println("Service started");
	utils.RunServer("checkout", func(mux *http.ServeMux) {
		mux.HandleFunc("/hello", HandleHello)
		mux.HandleFunc("/basket/new", func (w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			switch r.Method {
				case 	"OPTIONS":
					w.Header().Set("Access-Control-Allow-Methods", "POST,OPTIONS")
					w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
					return
				case	"POST":
					basket.HandleAuth(w, r)
				default:
					http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			}
		})
		mux.HandleFunc("/basket", func (w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			switch r.Method {
				case 	"OPTIONS":
					w.Header().Set("Access-Control-Allow-Methods", "POST,PATCH,DELETE,OPTIONS")
					w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Authorization")
					return
				case	"POST":
					basket.HandleAdd(w,r)
				case	"PATCH":
					basket.HandleUpdate(w,r)
				case	"DELETE":
					basket.HandleDelete(w,r)
				default:
					http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			}
		})
	})
}
