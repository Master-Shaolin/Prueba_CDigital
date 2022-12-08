require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/db")
const app = express()
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.json())
app.use(express.static("backend/storage"))
app.use(bodyParser.urlencoded({extended: false}))

const port = process.env.PORT || 5000

/**
 * Routes
 */
app.use("/api",require("./routes"))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

dbConnect()