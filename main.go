package main

import (
	"embed"
	"github.com/gin-gonic/gin"
	"net/http"
	"os/exec"
)

//go:embed *
var f embed.FS

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()

	router.StaticFS("/", http.FS(f))

	go func() {
		Open("http://localhost")
	}()
	router.Run(":80")
}

func Open(uri string) error {
	cmd := exec.Command("explorer", uri)
	return cmd.Start()
}
