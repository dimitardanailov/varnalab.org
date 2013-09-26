var CategoryModel = require("models/client/Category");
var helpers = require("views/helpers");

module.exports = Backbone.View.extend({
	template: require("./index.jade"),
	categoryItemTemplate: require("./category-item.jade"),
	categoryFormTemplate: require("./category-form.jade"),

	events: {
		"submit .form": "submit"
	},

	initialize: function() {
		this.collection.on("add", this.appendCategory, this);
	},

	submit: function(e) {
		e.preventDefault();

		var model = new CategoryModel();
		model.on("error", helpers.handleError)
		model.on("invalid", helpers.handleError)
		model.on("sync", function () {
			this.collection.add(model);
			this.$(".form").html(this.categoryFormTemplate());
		}, this);

		var data = helpers.extractFormData(this.$('form'));
		model.save(data, {wait: true});

		return false;
	},

	appendCategory: function(categoryModel) {
		this.$(".categoriesList").append(this.categoryItemTemplate({
			category: this.collection
		}));
	},

	render: function() {
		this.$el.html(this.template( {
			collection: this.collection
		}))

		return this;
	}
});