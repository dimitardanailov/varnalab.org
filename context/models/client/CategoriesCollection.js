module.exports = require("./MongoCollection").extend({
	url: "/api/categories",
	model: require("./Category")
})