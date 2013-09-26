var _ = require('underscore');

module.exports = function(config) {
  var Category = require(config.models + '/Category');

  return {
    
    "GET": function(req, res) {
      Category.find({}, function(err, categories) {
        if (err) return res.error(err);
        res.result(categories);
      }) // END Category.find
    }, // END Get list categories
    
    "POST /create": function(req, res) {
      req.body.creator = req.session.userId;
      Category.create(req.body, function(err, category) {
        if (err) return res.error(err);
        res.result(category);
      })// End Category.create
    }, //END Post create path

    "PUT /:id": function(req, res) {
      var category = Category.findById(req.params.id, function(err, category) {
        if (err) return res.error(err);
        _.extend(category, req.body);
        category.save(function(err, category) {
          if (err) return res.error(err);
          res.result(category);
        }); //Save Category to Database
      }); // END find Category by id
    }, // END Update Category Path

    "DELETE /:id": function(req, res){
      console.log(req.params.id);
      Category.findByIdAndRemove(req.params.id, req.body, function(err, category) {
        if (err) return res.error(err);
        if(!category) return res.error("sorry dude");
        res.result(category); 
      }); // End find by id and remove
    } // END Delete Category Path

  }// End return
}