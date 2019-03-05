"use strict"
let router = require("express").Router();
let Users = require("../models/Users");
let Pacientet = require("../models/Pacientet");


router.route("/home")
	.get(function (request, response, next) {
	  Users.findById(request.session.userId)
		.exec(function (error, user) {
		  if (error) {
			return next(error);
		  } else {
			if (user === null) {
				let errors = {
					status:"403",
					message:"Forbidden! Go back! "
				}
			  return response.render("todo/errors/404",errors);
				} else {// start today
					let todaysDate = new Date();
										// Set hours
					todaysDate.setUTCHours(0,0,0,0)
					console.log(todaysDate);
				Pacientet.find({date:todaysDate},function(error,data){

					let context = {
	          user_id : user._id,
	          companyName : user.companyName,
						todaysDate:todaysDate,
						todos:data.map(function(todo){
							return{
								id:todo._id,
								name:todo.name,
								surname:todo.surname,
								startTime:todo.startTime,
								endTime:todo.endTime,
								description:todo.description,
							}
						})
	        }
					 response.render("todo/home",context)
				})
			}
		  }
		});
});

router.route("/reservation/data")
.get(function(request,response,next){
	Users.findById(request.session.userId)
	.exec(function (error, user) {
		if (error) {
		return next(error);
		} else {
		if (user === null) {
			let errors = {
				status:"403",
				message:"Forbidden! Go back! "
			}
			return response.render("todo/errors/404",errors);
		} else {
			Pacientet.find({},null,function(error,data){

				response.send(data);
			})
		}
		}
	});
})

router.route("/logout")
	.get(function (req, res, next) {
		  if (req.session) {
			// delete session object
			req.session.destroy(function (err) {
			  if (err) {
				return next(err);
			  } else {
				return res.redirect('/');
			  }
			});
		  }
});

module.exports = router;
