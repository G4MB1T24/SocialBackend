const express = require("express")
const connectToMongo = require("./db")
const Auth = require("./Routes/Auth")
var cors = require("cors");
const app = express()
const port = 5000
connectToMongo()
app.use(cors());
app.use(express.json());
app.use("/api/auth" ,Auth )
app.listen(port, () => { console.log("listening") })
