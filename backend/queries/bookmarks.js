const db = require("../db/dbConfig.js");

// this is the method to get all the information ..
const getAllBookmarks = async () => {
	try {
		const getAllBookmarks = await db.any("SELECT * FROM bookmarks");
		return getAllBookmarks;
	} catch (err) {
		return err;
	}
};

// you need a parameter beccause thats what we need to retrieve
// this is for the individual id .

const getBookmark = async (id) => {
	try {
		const oneBookmarks = await db.one(
			"SELECT * FROM bookmarks WHERE id=$1",
			id
		);
		return oneBookmarks;
	} catch (err) {
		return err;
	}
};

// creating a new book marks
const createBookmark = async (bookmark) => {
	try {
		const newBookmark = await db.one(
			"INSERT INTO bookmarks (name , url , category , is_favorite) VALUES ($1 , $2 , $3 , $4) RETURNING *",
			[bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
		);
		return newBookmark;
	} catch (err) {
		return err;
	}
};

const deleteBookmark = async (id) => {
	try {
		const deletedBookmark = await db.one(
			"DELETE FROM bookmarks WHERE id = $1 RETURNING *",
			id
		);
		return deletedBookmark;
	} catch (err) {
		return err;
	}
};

const updateBookmark = async (id, bookmark) => {
	try {
		const updatedBookmark = await db.one(
			"UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
			[bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
		);
		return updatedBookmark;
	} catch (err) {
		return err;
	}
};

module.exports = {
	getAllBookmarks,
	getBookmark,
	createBookmark,
	deleteBookmark,
	updateBookmark,
};
