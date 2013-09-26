module.exports = require("./MongoModel").extend({ 
  url: function() {
    if (this.isNew()) {
      return "/api/categories/create"
    } else {
      return "/api/categories/" + this.module.id
    }
  },
  validate: function(attrs) {
    var error = {};
    if (!attrs.name) error.name = "missing";
    if (!_.isEmpty(error)) {
      return error;
    }
  }
})