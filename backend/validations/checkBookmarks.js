const checkName = (req, res, next) => {
	if (req.body.name) {
		console.log("name is ok");
		next();
	} else {
		res.status(400).json({ error: "Name is required" });
	}
	if (typeof res.body.is_favorite === "boolean") {
		next();
	} else {
		res.status(400).json({ error: "is_favorite is not a boolean " });
	}
};
module.exports = { checkName };
