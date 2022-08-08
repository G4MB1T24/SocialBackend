require('dotenv').config()
const express = require("express");
const connectToMongo = require("./db");
const Auth = require("./Routes/Auth");
const PostCrud = require("./Routes/PostCrud");
var cors = require("cors");
const app = express();
const port = 5000;
connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/auth", Auth);
app.use("/api/posts", PostCrud);
app.listen(port, () => {
  console.log(`listening to http://localhost:${port} `);
});
