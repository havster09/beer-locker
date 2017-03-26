'use strict';

var User = require('../model/user');

exports.postUsers = function(req, res) {
	var user = new User({
		username:req.body.username,
		password:req.body.password
	});
	user.save(function(err) {
		if(err) {
			res.send(err);
		}	
		else {
			res.json({message:'new cunt in ere'});
		}
	});
};

exports.getUsers = function(req, res) {
	User.find(function(err,users) {
		if(err) {
			res.send(err);
		}
		else {
			res.header("X-Total-Count", users.length);
			res.json(users);
		}
	});
};
