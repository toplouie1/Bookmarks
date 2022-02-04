const express = require("express");
const bookmarks = express.Router();
const {
	getAllBookmarks,
	getBookmark,
	createBookmark,
	deleteBookmark,
	updateBookmark,
} = require("../queries/bookmarks.js");

const { checkName } = require("../validations/checkBookmarks.js");

// for all the bookMarks ..
bookmarks.get("/", async (req, res) => {
	try {
		const allBookmarks = await getAllBookmarks();
		if (allBookmarks[0]) {
			res.status(200).json(allBookmarks);
		} else {
			res.status(500).json({
				error: "server error",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

//  getting the individul Id ..

bookmarks.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const bookmark = await getBookmark(id);
		if (bookmark.id) {
			res.status(200).json(bookmark);
		} else {
			res.status(500).json({ error: "Bookmark Not Found " });
		}
	} catch (err) {
		console.log(err);
	}
});

// create a bookMark ;

bookmarks.post("/", async (req, res) => {
	const { body } = req;
	try {
		const createdBookmark = await createBookmark(body);
		if (createdBookmark.id) {
			res.status(200).json(createdBookmark);
		} else {
			res.status(500).json({ error: "Bookmark creating error " });
		}
	} catch (err) {
		console.log(err);
	}
});

bookmarks.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedBookmark = await deleteBookmark(id);
	if (deletedBookmark.id) {
		res.status(200).json(deletedBookmark);
	} else {
		res.status(404).json({ error: "Bookmark not found" });
	}
});
bookmarks.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const updatedBookmark = await updateBookmark(id, body);
	if (updatedBookmark.id) {
		res.status(200).json(updatedBookmark);
	} else {
		res.status(404).json({ error: "Bookmark no found" });
	}
});

module.exports = bookmarks;
