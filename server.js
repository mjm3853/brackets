
//Require the necessary modules
var express = require('express')
	, http = require('http')
	, path = require('path');
	
//Create the app using express
var app = express();

//Define the express configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

});

//More express configuration
app.configure('development', function(){
  app.use(express.errorHandler());
});

//Define the Data Model==================================================
var mongoose = require('mongoose');

var brackets = new mongoose.Schema({
	userName: String,
	bracketName: String,
	bracketDesc: String,
	items: String,
	a1: String,
	a2: String,
	a3: String,
	a4: String,
	a5: String,
	a6: String,
	a7: String,
	a8: String,
	b1: String,
	b2: String,
	b3: String,
	b4: String,
	c1: String,
	c2: String,
	d1: String	
});

var bracketModel = mongoose.model('Bracket', brackets);

mongoose.connect('mongodb://mjm3853:Hock3y17@novus.modulusmongo.net:27017/y8gysurE');

//Define the API=======================================================

//get all Brackets in the DB
app.get('/api/getBrackets', function(req, res){
	bracketModel.find(function(err, brackets){
		if(err)
			res.send(err)
		res.json(brackets);
	});
});

//create a new Bracket in the DB
app.post('/api/saveBracket', function(req, res){
	bracketModel.create({
		userName: req.body.userName,
		bracketName: req.body.bracketName,
		bracketDesc: req.body.bracketDesc,
		items: req.body.items,
		a1: req.body.a1,
		a2: req.body.a2,
		a3: req.body.a3,
		a4: req.body.a4,
		a5: req.body.a5,
		a6: req.body.a6,
		a7: req.body.a7,
		a8: req.body.a8,
		b1: req.body.b1,
		b2: req.body.b2,
		b3: req.body.b3,
		b4: req.body.b4,
		c1: req.body.c1,
		c2: req.body.c2,
		d1: req.body.d1
	}, function(err, brackets){
		if (err)
			res.send(err);
	});
});

//Delete a Bracket with a given bracket ID
app.delete('/api/deleteBracket/:bracket_id', function(req, res){
	bracketModel.remove({
			_id : req.params.bracket_id
		}, function(err, brackets){
		if (err)
			res.send(err);
	});
});

//Start with index.html=======================================================
app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});

var server = app.listen(process.env.PORT, function () {
	console.log('Listening on port %d', server.address().port);
});
