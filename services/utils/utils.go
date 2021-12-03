package utils

import (
	"log"
	"net"
	"net/http"
	"os"
)

var serveHTTP = func(httpS *http.Server, port string) {
	addr := ":" + port

	httpL, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("failed to listen on %s", addr)
		return
	}
	log.Println("started on", addr)

	if err := httpS.Serve(httpL); err != nil && err != http.ErrServerClosed {
		log.Fatal("error while serving http request")
	}
	log.Println("terminated")
}

func RunServer(serviceName string, registerHTTP func(mux *http.ServeMux)) {
	port, set := os.LookupEnv("SERVICE_HTTP_PORT")
	if !set {
		port = "8080"
		log.Print("SERVICE_HTTP_PORT port not set, setting to ", port)
	}

	mux := http.NewServeMux()
	registerHTTP(mux)

	httpS := &http.Server{
		Handler: mux,
	}
	serveHTTP(httpS, port)	
}
