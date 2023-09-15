const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")

connectDb();
const app = express()

const port = process.env.PORT || 5001

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)




app.listen(5000, () => {
	console.log(`The server is running on port ${port}`)
})