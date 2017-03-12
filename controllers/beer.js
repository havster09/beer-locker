(function() {
	'use strict';

	var Beer = require('../model/beer.js');

	exports.postBeers = function(req, res) {
		var beer = new Beer();
		beer.name = req.body.name;
		beer.type = req.body.type;
		beer.quantity = req.body.quantity;
		beer.userId = req.user._id;

		beer.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					message: 'success',
					data: beer
				});
			}
		});
	};
	exports.getBeers = function(req, res) {
		Beer.find({userId: req.user._id}, function(err, beers) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					message: 'success',
					data: beers
				});
			}
		});
	};
	exports.getBeer = function(req, res) {
		Beer.find({userId: req.user._id, _id:req.params.beer_id}, function(err, beer) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					message: 'success',
					data: beer
				});
			}
		});
	};
	exports.putBeer = function(req, res) {
		Beer.find({userId:req.user._id, _id:req.params.beer_id}, function(err, beer) {
			if (err) {
				res.send(err);
			} else {
				beer.quantity = req.body.quantity;
				beer.save(function(err) {
					if (err) {
						res.send(err);
					} else {
						res.json({
							message: 'success',
							data: beer
						});
					}
				});
			}
		});
	};
	exports.deleteBeer = function(req, res) {
		Beer.findByIdAndRemove(req.params.beer_id, function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					message: 'gone son'
				});
			}
		});
	};
})();
