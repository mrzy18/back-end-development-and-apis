import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import weatherRouter from './weather.js'

const app = express()
const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile("public/index.html")
})

app.get("/docs", (req, res) => {
    res.redirect("/api/info")
})

app.get("/api/info", (req, res) => {
    res.json({
    name: "Weather Service API",
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
  });
})
app.get("/api/status", (req, res) => {
    res.status(200).json({
        status: 200
    })
})
app.get("/api/greet/:name", (req, res) => {
    const name = req.params.name
    res.status(200).json({
        greeting: `Hello ${name}`
    })
})

app.route("/api/data")
    .get((req, res) => {
        res.json({
            data: "data"
        })
    })
    .post((req, res) => {
        res.status(201).json({
                data:"data"
        })
    })

app.use("/api/weather", weatherRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})