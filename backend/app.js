// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookmarkController = require("./controllers/bookmarkController.js");
const reviewsController = require("./controllers/reviewsController.js");
// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Bookmarks ROUTES
app.use("/bookmarks", bookmarkController);
// Reviews ROUTES
app.use("/reviews", reviewsController);

//ROUTES
app.get("/", (req, res) => {
	res.send("welcome to the bookMark data base ");
});

// 404 PAGE
app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

module.exports = app;
