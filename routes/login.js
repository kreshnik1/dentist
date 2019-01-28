"use strict"

let router = require("express").Router();
let Users = require("../models/Users");

/*
 this will trigger on the login url (/login)
 gets the data that user wrote
 checking if the username and password are correct 
 adds a session cookie
 redirects to /home
*/
router.route("/login")
	.get(function(request,response){
		 response.render("todo/login");
	})
	.post(function(request,response,next){
		var username = request.body.logusername.toLowerCase();
		var password = request.body.logpassword;
		var session = request.session;
        console.log(username);
		if(username && password){
		Users.authenticate(username, password, function (error, user) {
			if (error || !user) {
				if(!user){
					request.session.flash = {
						type: "error",
						message: "Incorrect username , please try again!"
					};
				}
				if(!error){
					request.session.flash = {
						type: "error",
						message: "Incorrect password , please try again!"
					};
				}
				/*var err = new Error('Wrong email or password.');
				err.status = 401;
				*/
				return response.redirect("/login")
			  } else {
				   request.session.flash = {
					type: "success",
					message: "Welcome "+username
			 	  	};
				request.session.userId = user._id;
				return response.redirect('/home');
		  		}
			});
  		} 
})
		 



module.exports = router;
