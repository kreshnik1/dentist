"use strict"
let Snippets = require("../models/Snippets");
let Users = require("../models/Users");
let Comments = require("../models/Comments");
let SubComments = require("../models/Subcomments");
let moment = require('moment'); 

// Use the express.Router class to create modular, mountable route handlers.
let router = require("express").Router();
// this will trigger on the root url (/)
router.route("/")
       .get(function (request, response, next) {
	 
				  Snippets.find({},null,{sort: '-createdAt'}, function(error, data) {
                      let date;
					// mapping up the object for the view
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
					  
					response.render("home/index", context);
				});	
			});

router.route("/questions/:id")
    .get(function(request,response,next){
       
        let allData={};
        //checking if a snippets exist with that id
        Snippets.findOne({_id: request.params.id},function(error,data){
            if(error){//checking if there is something wrong
                let errors = {
                    status:"404",
                    message:"Not found! Go back! "
                }
                return response.render("todo/errors/404",errors);
            }
            else { 
                let date = moment(data.createdAt).from(moment(Date.now()));
                Comments.find({questionId:request.params.id},null,{sort: '-createdAt'},function(error,commentData){
                    if(error){//checking if there is something wrong
                        let errors = {
                            status:"404",
                            message:"Not found! Go back! "
                        }
                        return response.render("todo/errors/404",errors);
                    } 
                    else{
                        let comment_date;
                        let subcomment_date;
                        SubComments.find({questionId:request.params.id},function(error,SubCommentData){
                            if(error){//checking if there is something wrong
                                let errors = {
                                    status:"404",
                                    message:"Not found! Go back! "
                                }
                                return response.render("todo/errors/404",errors); 
                            }
                            else {                                                                                 
                                allData = {
                                    _id:data._id,
                                    username:data.username,
                                    title:data.title,
                                    content:data.content,
                                    tags:data.tags,
                                    createdAt:data.createdAt,
                                    data:date,
                                    todos: commentData.map(function(todo) {
                                        comment_date = moment(todo.createdAt).from(moment(Date.now()));
                                        return {
                                            comment_id: todo._id,
                                            comment_username: todo.username,
                                            comment_content:todo.content,
                                            comment_questionId:todo.questionId,
                                            comment_createdAt: todo.createdAt,
                                            comment_correct:todo.correct,
                                            comment_date:comment_date,
                                            subComment:SubCommentData.map(function(to){
                                                subcomment_date = moment(to.createdAt).from(moment(Date.now()));
                                                return{
                                                    subcomment_id:to._id,
                                                    subcomment_commentId : to.commentId,
                                                    subcomment_username:to.username,
                                                    subcomment_questionId:to.questionId,
                                                    subcomment_content:to.content,
                                                    subcomment_createdAt:to.createdAt,
                                                    subcomment_date:subcomment_date
                                                }
                                            })
                                        };
                                    }),  
                                }
                                //checking if the username of the snippets it is same with the username of the user
                                //if it is than we are adding also update and delete option
                                return response.render('home/question', allData);    
                            }
                        })
                    }
                })
            }
        })    
})


// Exported
module.exports = router;