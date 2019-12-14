var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

// Creates a JSON Client
var client = restify.createJSONClient({
  url: 'http://localhost:4000/'
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  //Call route /users
  client.get('/users', function(err, request, response, obj){
    assert.ifError(err);

    //console.log(JSON.stringify(obj, null, 2));
    //res.end(JSON.stringify(obj, null, 2));
    res.json(obj);

  });

});

/* GET only user*/
router.get('/:id', function(req, res, next) {
  //res.send('respond with a resource');

  //Call route /users
  client.get(`/users/${req.params.id}`, function(err, request, response, obj){
    assert.ifError(err);

    //console.log(JSON.stringify(obj, null, 2));
    //res.end(JSON.stringify(obj, null, 2));
    res.json(obj);
  });

});

/* PUT for update to only user*/
router.put('/:id', function(req, res, next) {

  //Call route /users
  client.put(`/users/${req.params.id}`, req.body , function(err, request, response, obj){
    assert.ifError(err);

    //console.log(JSON.stringify(obj, null, 2));
    //res.end(JSON.stringify(obj, null, 2));
    res.json(obj);
  });

});

/* DELETE for delete a user*/
router.delete('/:id', function(req, res, next) {

  //Call route /users
  client.del(`/users/${req.params.id}`, function(err, request, response, obj){
    assert.ifError(err);

    //console.log(JSON.stringify(obj, null, 2));
    //res.end(JSON.stringify(obj, null, 2));
    res.json(obj);
  });

});

/* POST */
router.post('/:id', function(req, res, next) {

  //Call route /users
  client.post(`/users/`, req.body, function(err, request, response, obj){
    assert.ifError(err);

    //console.log(JSON.stringify(obj, null, 2));
    //res.end(JSON.stringify(obj, null, 2));
    res.json(obj);
  });

});

module.exports = router;
