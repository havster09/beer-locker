'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		required:true
	}
});

UserSchema.virtual('id').get(function(){
	return this._id.toHexString();
});

UserSchema.set('toJSON', {
	virtuals: true
});

UserSchema.pre('save',function(callback) {
	var user = this;
	if(!user.isModified('password')) {
		return callback();
	}
	bcrypt.genSalt(5, function(err, salt) {
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) {
				return callback();
			}
			else {
				user.password = hash;
				callback();
			}
		});
	});
});

UserSchema.methods.verifyPassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if(err) {
			return callback(err);
		}
		else {
			callback(null, isMatch);
		}
	})
};

module.exports = mongoose.model('User', UserSchema);
