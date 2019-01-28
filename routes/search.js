"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Snippets = require("../models/Snippets");
let moment = require('moment'); 

router.route('/home/search')
    .get(function (request, response,next) {
    //checking if the user is authorize
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
                    let search_query = request.query['search'];
                    console.log(request.query['search']);
                    Snippets.find({},null,{sort: '-createdAt'}, function(error, data) {
                        let Alldata = []; 
                        // mapping up the object for the view
                        let context = {          
                            todos: data.map(function(todo) {
                                return {
                                    username: todo.username,
                                    title:todo.title,
                                    content:todo.content,	
                                    createdAt: todo.createdAt,
                                    id: todo._id,
                                    check:false,//checking for update and delete
                                    updatedAt:todo.updatedAt,
                                    tags:todo.tags
                                };
                            })
                        };
                        context.todos.forEach(function(element){
                            if(element.title.toLowerCase().includes(search_query.toLowerCase())){
                                Alldata.push(element);
                            }
                            else{
                                element.tags.forEach(function(tag){
                                if(tag.toLowerCase().includes(search_query.toLowerCase())){
                                    Alldata.push(element);
                                }
                                })
                            }
                        })
                        let date;
                        let searchedData = {
                            search_query:search_query,
                            user_id:user.user_id,
                            user_username:user.username,  
                            todos:Alldata.map(function(todo){
                                date = moment(todo.createdAt).from(moment(Date.now()));
                                return {
                                    id: todo.id,
                                    username: todo.username,
                                    title:todo.title,
                                    content:todo.content,	
                                    createdAt: todo.createdAt,
                                    updatedAt:todo.updatedAt,
                                    tags:todo.tags,
                                    data:date
                                }
                            })
                        }
                        //console.log(searchedData);
                        //response.render("todo/home", context);
                        return response.render("todo/searched",searchedData);
                    });	
                }
			  }
		})
    })


router.route('/search')
    .get(function (request, response,next) {
    //checking if the user is authorize
				
    let search_query = request.query['search'];
    Snippets.find({},null,{sort: '-createdAt'}, function(error, data) {
        let Alldata = []; 
        // mapping up the object for the view
        let context = {          
            todos: data.map(function(todo) {
                return {
                    id:todo._id,
                    username: todo.username,
                    title:todo.title,
                    content:todo.content,	
                    createdAt: todo.createdAt,
                    id: todo._id,
                    check:false,//checking for update and delete
                    updatedAt:todo.updatedAt,
                    tags:todo.tags
                };
            })
        };
        context.todos.forEach(function(element){
            if(element.title.toLowerCase().includes(search_query.toLowerCase())){
                Alldata.push(element);
            }
            else{
                element.tags.forEach(function(tag){
                    if(tag.toLowerCase().includes(search_query.toLowerCase())){
                        Alldata.push(element);
                    }
                })
            }
        })
        let searchedData = {
            search_query:search_query,
            todos:Alldata.map(function(todo){
                return {
                    id: todo.id,
                    username: todo.username,
                    title:todo.title,
                    content:todo.content,	
                    createdAt: todo.createdAt,
                    updatedAt:todo.updatedAt,
                    tags:todo.tags
                }
            })
        }
        //console.log(searchedData);
        //response.render("todo/home", context);
        return response.render("todo/indexsearch",searchedData);
    });	
})


module.exports = router;
