const express = require("express")
const helmet = require("helmet")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

mongoose.set("strictQuery", false);
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@studyblog.f0zhkzq.mongodb.net/blog?retryWrites=true&w=majority`

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on("error", function(error) {
  if (process.env.NODE_ENV === "development") {
    console.log(error)
  }
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})

app.use(helmet())

app.use(require("./routes/index.js"))

app.use("/assets", express.static(path.join(__dirname, "..", "..", "assets")))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})