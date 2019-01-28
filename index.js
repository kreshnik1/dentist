"use strict"
let Snippets = require("../models/Snippets");
let Users = require("../models/Users");

// Use the express.Router class to create modular, mountable route handlers.
let router = require("express").Router();

// this will trigger on the root url (/)
router.route("/")
       .get(function (request, response, next) {
	 
				  Snippets.find({},null,{sort: '-createdAt'}, function(error, data) {

					// mapping up the object for the view
					let context = {
					  todos: data.map(function(todo) {
						return {
						  username: todo.username,
						  title:todo.title,
						  content:todo.content,	
						  createdAt: todo.createdAt,
						  tags:todo.tags	
						};
					  })
					};
					  
					response.render("home/index", context);
				});	
			});

// Exported
module.exports = router;