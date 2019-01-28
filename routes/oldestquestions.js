"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Snippets = require("../models/Snippets");
let Comments = require("../models/Comments");
let moment = require('moment'); 

router.route("/oldest/questions") 
    .get(function (request, response, next) {
        Snippets.find({},null,{sort: 'createdAt'},function(error, data) {
            let date;
            let context = {
                todos: data.map(function(todo) {
                    date = moment(todo.createdAt).from(moment(Date.now()));
                    return {
                        id:todo._id,
                        username: todo.username,
                        title:todo.title,
                        content:todo.content,	
                        createdAt: todo.createdAt,
                        tags:todo.tags,
                        data:date
                    };
                })
            };	
            console.log(context)
            response.render("home/oldestquestion", context);
        });	
});


router.route("/home/oldest")
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
                Snippets.find({},null,{sort: 'createdAt'},function(error, data) {	
                    let date ;
					// mapping up the object for the view
                    let context = {
                        user_id:user._id,
                        user_username : user.username,
                        todos: data.map(function(todo) {
                            date = moment(todo.createdAt).from(moment(Date.now()));
                            return {
                                username: todo.username,
                                title:todo.title,
                                content:todo.content,	
                                createdAt: todo.createdAt,
                                id: todo._id,
                                check:false,//checking for update and delete
    						    updatedAt:todo.updatedAt,
    						    tags:todo.tags,
                                data : date
                            };
                        })
					}; 
                      //checking if the username of the snippets it is same with the username of the user
					  //if it is than we are adding also update and delete option
					 context.todos.forEach(function(element){
						if(user.username === element.username){
							element.check=true;
						}
					 })
					  
					
				  
					response.render("todo/oldestquestions", context);
				});	
			}
		  }
		});
});

module.exports = router;
