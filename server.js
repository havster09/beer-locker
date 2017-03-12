(function() {
	'use strict';

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');
	var passport = require('passport');
	var authController = require('./controllers/auth');
	var Beer = require('./model/beer.js');
	mongoose.connect('mongodb://localhost:27017/beerlocker');
	var app = express();
	var port = process.env.PORT || 3000;

	var router = express.Router();
	var beerController = require('./controllers/beer.js');
	var userController = require('./controllers/user.js');


	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(passport.initialize());



	router.get('/', function(req, res) {
		res.json({
			message: 'u funny cunt'
		});
	});

	router.route('/beers')
		.get(authController.isAuthenticated, beerController.getBeers)
		.post(authController.isAuthenticated, beerController.postBeers);


	router.route('/beers/:beer_id')
		.get(authController.isAuthenticated, beerController.getBeer)
		.put(authController.isAuthenticated, beerController.putBeer)
		.delete(authController.isAuthenticated, beerController.deleteBeer);

	router.route('/users')
		.get(authController.isAuthenticated, userController.getUsers)
		.post(authController.isAuthenticated, userController.postUsers);

	router.route('/users')
		.get(authController.isAuthenticated, userController.getUsers)
		.post(userController.postUsers);

	app.use('/api', router);
	app.listen(port);
	console.log('listening on ' + port);

})();
