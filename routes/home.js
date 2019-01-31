"use strict"
let router = require("express").Router();
let Users = require("../models/Users");

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
			} else {
        let context = {
          user_id : user._id,
          companyName : user.companyName
        }
				 response.render("todo/home",context)
			}
		  }
		});
});

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
