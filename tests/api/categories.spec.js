describe("transactions", function(){
	var helpers = require("../helpers");
	var request = require("request");

	var user = helpers.getValidMember();
	var category = helpers.getValidCategory();
	var createdCategory;

	/*** Run Node ***/
	it("boots", function(next){
    	helpers.boot(next);
  	})

  it("creates new category", function(next){
    request.post({
      uri: helpers.apiendpoint + "/categories/create",
      json: category
    }, function(err, res, body){
    	// For more info : http://pivotal.github.io/jasmine/
    	expect(err).toBeNull();
      expect(body).toBeDefined();
      expect(body.result).toBeDefined();
      expect(body.result._id).toBeDefined();
      createdCategory = body.result;
      next();
    })
  });

  
  it("lists all categories", function(next) {
    request.get({
      uri: helpers.apiendpoint + '/categories',
      json: {}
    }, function(err, res, body) {
      expect(body).toBeDefined();
      expect(body.result).toBeDefined();
      expect(body.result).toBeArray();
      expect(body.result.length).toBe(1);
      next();
    })
  });  	

  it("update category", function(next) {
    request.put({
      uri: helpers.apiendpoint + "/categories/" + createdCategory._id,
      json: {
        name: "Articles"
      }
    }, function(err, res, body) {
      expect(body).toBeDefined();
      expect(body.result).toBeDefined();
      expect(body.result.name).toBe("Articles");
      next();
    })
  });

  it("deletes category", function(next){
    request.del({
      uri: helpers.apiendpoint + "/categories/" + createdCategory._id,
      json: {}
    }, function(err, res, body){
      expect(body).toBeDefined();
      expect(body.result).toBeDefined();
      expect(body.result._id).toBe(createdCategory._id);
      expect(body.result.name).toBe("Articles");
      next();
    })
  });

  /*** Kill Node ***/
  it('kill', function (next){ 
    helpers.kill(next);
  });
})