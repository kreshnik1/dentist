"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Snippets = require("../models/Snippets");
let moment = require('moment'); 

/*
 this will trigger on the mysnippet url (/mysnippet)
 checks if the user is authorized
 gets all the snippets of the user from the database and send them into todo/mysnippet handlebar to post them
 adds update and delete 
*/
router.route("/mysnippet")
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
                Snippets.find({username: user.username}, function(error, data) {
                    let date ;
					// mapping up the object for the view
                    //console.log(data);
					let context = {
                        user_id:user._id,
                        user_username:user.username,
                        todos: data.map(function(todo) {
                            date = moment(todo.createdAt).from(moment(Date.now()));
                            return {
                              username: todo.username,
                              title:todo.title,
                              content:todo.content,	
                              createdAt: todo.createdAt,
                              id: todo._id,
                              updatedAt:todo.updatedAt,
                              tags:todo.tags,
                              data : date
                            };
					   })
					};
					response.render("todo/mysnippet", context);
				});	
			}
		  }
		});
});

module.exports = router;
