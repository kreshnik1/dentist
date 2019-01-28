"use strict";

let mongoose = require("mongoose");
let bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
mongoose.Promise=global.Promise;

// Defining the Schema
let UserSchema = mongoose.Schema({
	name:{type:String,required:true},
	surname:{type:String,required:true},
	username:{type:String,required:true,unique:true},
	email:{type:String,required:true,minlength:9,unique:true},
	password:{type:String,required:true , minlength: 6},
	createdAt: { type: Date, required: true, default: Date.now },
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
   var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();	
  		})
	});
});

UserSchema.statics.authenticate = function (username, password, callback) {
  Users.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

let Users = mongoose.model("Users", UserSchema);

module.exports = Users;
