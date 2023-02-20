const { response } = require("express");
const express = require("express");
const { request } = require("http");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

const posts = require("./routes/posts");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

app.use(express.json());

connectDB();

app.get("/", (request, response) => response.render("index"));
app.get("/about", (request, response) => response.render("about"));

app.use("/posts", posts);

const port = 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
