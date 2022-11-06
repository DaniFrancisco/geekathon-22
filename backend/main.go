package main

import (
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", hello)
	e.GET("/sound", sound)

	e.Logger.Fatal(e.Start(":1323"))
}

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

func sound(c echo.Context) error {
	f, err := os.Open("audio_tour.wav")
	if err != nil {
		return err
	}

	return c.Stream(http.StatusOK, "audio/wav", f)
}
