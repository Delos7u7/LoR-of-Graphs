package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/html/v2"
)

func main() {
	// usando el motor de template html
	engine := html.New("./views", ".html")

	// creamos una nueva app fiber con el motor de vistas pasado como configuracion
	app := fiber.New(fiber.Config{
		Views: engine,
	})
	app.Use(cors.New())

	// sirviendo archivos estaticos css e imgs
	app.Static("/css", "./views/css")
	app.Static("/imgs", "./views/imgs")
	app.Static("/js", "./views/js")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"hello": "world",
		})
	})

	app.Get("/history", func(c *fiber.Ctx) error {
		return c.Render("history", fiber.Map{
			"hello": "world",
		})
	})

	app.Listen(":3000")

}
