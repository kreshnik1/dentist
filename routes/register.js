"use strict"

let router = require("express").Router();
let Users = require("../models/Users");

/*
	handles the get of /register
	handles the post
	gets the informations that the user wrote
	checks if they are correct
	checks if the password and  repassword matches
	checks if that username already exist
	add the user into database
*/
router.route("/register")
	.get(function(request,response){
		response.render("todo/register");
	})
	.post(function(request,response,next){
		let name = request.body.name;
		let surname = request.body.surname;
		let username = request.body.username.toLowerCase();
		let email = request.body.email;
		let password = request.body.password;
		let repassword = request.body.repassword;
		console.log(username);
		//checks if the password length is less than 6
		if(password.length < 6){
			request.session.flash = {
					  type: "error",
            		  message: "Password must be more than 6 characters , please try again"
          	};
			return response.redirect("/register");
		}
		//checks if the password and reepassword matches
		if(password !== repassword){
			let err = new Error('Passwords do not match.');
    		err.status = 400;
			
    		//response.send("passwords dont match");
    		request.session.flash = {
					  type: "error",
            		  message: "Passwords do not match , please try again"
          	};
			return response.redirect("/register");
		}
	
		
		if (name && surname && username && password && repassword) {
			
			let userData = new Users({
				name:name,
				surname:surname,
				username:username,
				email:email,
				password:password
			});
			
			//creats the user by saving the data in database
			Users.create(userData, function (error, user) {
				if (error) {
					let string = error.message;
					
					if(string.includes("email")){
						request.session.flash = {
							type: "error",
            		  		message: "This email already exists , please try another email"
          		 		};
					}
					else {
						request.session.flash = {
							type: "error",
            		  		message: "This username already exists , please try another username"
          		 		};
					}
				 	
					
			  	return response.redirect('/register');	  
			  } else {
				  request.session.flash = {
					type: "success",
					message: "You are registered , please log in"
			 	  };
				return response.redirect('/login');
			  }
			});
	}});
	
module.exports = router;
