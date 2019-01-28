"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Snippets = require("../models/Snippets");
let Comments = require("../models/Comments");
let SubComments = require("../models/Subcomments");
let username ;
let moment = require('moment'); 

/*
 GET route after login
 Checks if the user is authorized by using session cookie
 Takes all the snippets from the database and send them in the todo/home habdlebar to post them
 The snippets that the user has created I am adding also two options for the user ( update and delete) by adding a boolean and first
 initilizing it with false , and then checking if the username of the user is it same with the username of the snippets.
*/
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
				  Snippets.find({},null,{sort: '-createdAt'}, function(error, data) {
				   	  let date;
					// mapping up the object for the view
					let context = {
                      user_id : user._id,
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
                          data:date
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
					response.render("todo/home", context);
				});	
			}
		  }
		});
});

router.route("/contact")
.post(function(request,response,next){
     request.session.flash = {
         type: "success",
         message: "Thanks for your message "
     };
  return response.redirect("/home")  
})

/*
Get for logout
logouts the user by deleteing the session cookie and then sends into the root url (/)
*/
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
/*
//create a snippet
//checking if the user is authorized
//adds the todo/create view(handlebar)
*/
router.route("/create")
	.get(function(request,response,next){
		Users.findById(request.session.userId)//checking if the user is authorized
		.exec(function(error,user){
			if(error){//checking for errors
				return next(error);
			}else{
				if (user === null) {
					let errors = {
						status:"403",
						message:"Forbidden! Go back! "
					}
					return response.render("todo/errors/404",errors);
				} else {
					username = user.username;
					return response.render("todo/create",{userid : user._id, username:user.username});//gets the todo/create handlebar
				}
			}
		})
	})
//creates a snippet and saves into database and then returns to home
	.post(function(request,response,next){
		//getting the data that the user wrote
		let title = request.body.title;
		let textarea = request.body.textarea;
		//let tags = request.body.hidden-tags;
		//console.log(request.body.tm-tag);
		let all = request.body;

		let index = Object.keys(all).length;
		let key = Object.keys(all)[4];
		let values = all[key]
		let tags = values.split(',');
        console.log(tags);
	//console.log(request.body.hidden-tags)
		//creating an object of the Snippets Schema
        if(textarea.length < 30 ){
            request.session.flash = {
					type: "error",
            		message: "Body must be at least 30 characters"
           };
            return response.redirect('/create');	  
        }
        else if(tags.length === 0 ){
             request.session.flash = {
					type: "error",
            		message: "Please enter at least one tag "
           };
            return response.redirect('/create');	  
        }
        else{

            let SnippetData = new Snippets({
                username:username,
                title:title,
                content:textarea,
                tags:tags
            });

        //creating the snippet with datas that we need in database
            Snippets.create(SnippetData, function (error, user) {
                if (error) {
                    let string = error.message;	  
                    request.session.flash = {
                        type: "error",
                        message: "Body can not be empty , please write your question"
                    };
                    return response.redirect('/create');	  
                  } else {

                       request.session.flash = {
                        type: "success",
                        message: "Your question was successfully created."
                        };

                     return response.redirect('/home');
                  }
                });
            }
	});


 //deletes a snippet 
router.route("/home/delete/:id")
    .get(function(request, response,next) {
		Users.findById(request.session.userId)//checking if the user is athorized
			.exec(function (error, user) {
		  		if (error) {
					return next(error);		
		  		} else {
			  		if (user === null ) {
						let errors = {
							status:"403",
							message:"Forbidden! Go back! "
						}
			  		return response.render("todo/errors/404",errors);
					}else {
						Snippets.findOne({_id: request.params.id},function(error,data){
							if(error){//checking if there is something wrong
								let errors = {
										status:"404",
										message:"Not found! Go back! "
									}
								return response.render("todo/errors/404",errors);
							}
							else if(data.username != user.username){
								let errors = {
										status:"403",
										message:"Forbidden! Go back! "
									}
								return response.render("todo/errors/404",errors);
							}
							//return response.render("todo/delete", {id: request.params.id});
			  			});
					}			  
		  		}
	 	})
    })
    .post(function(request, response,next) {
	//find the snippet with that id and then delete it from the database
        Snippets.findOneAndRemove({_id: request.params.id}, function(error) {
          if(error) {
          	let errors = {
				status:"404",
				message:"Wrong url! Go back! "
			}
			return response.render("todo/errors/404",errors);			
          }
			
			request.session.flash = {
				type: "success",
				message: "The post was deleted!"				 
			};	
          
          return response.redirect("/home");//riderect to home
        });

    });
router.route("/home/questions/:id")
    .get(function(request,response,next){
        Users.findById(request.session.userId)
        .exec(function(error,user){
            if(error){
                return next(error);
            } else {
                if(user === null){
                    let errors = {
						status:"403",
						message:"Forbidden! Go back! "
					}
					return response.render("todo/errors/404",errors);
                }else {
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
                                let comment_date;
                                let subcomment_date;
                                Comments.find({questionId:request.params.id},null,{sort: '-createdAt'},function(error,commentData){
                                    if(error){//checking if there is something wrong
                                        let errors = {
                                            status:"404",
                                            message:"Not found! Go back! "
                                        }
                                        return response.render("todo/errors/404",errors);
                                    } 
                                    else{
                                        SubComments.find({questionId:request.params.id},function(error,SubCommentData){
                                            if(error){//checking if there is something wrong

                                                let errors = {
                                                    status:"404",
                                                    message:"Not found! Go back! "
                                                }
                                                return response.render("todo/errors/404",errors); 
                                            }
                                            else {
                                                
                                               // console.log(SubCommentData);
                                                 
                                                // mapping up the object for the view
                                                allData = {
                                                    id:data._id,
                                                    username:data.username,
                                                    user_id:user._id,
                                                    user_name:user.username,
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
                                                            check:false,
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
                                                 allData.todos.forEach(function(element){
                                                    if(user.username === element.comment_username){
                                                        element.check=true;
                                                    }
                                                 })
                                                 return response.render('todo/questions', allData);    
                                            }
                                        })
                                    }
                                })
                            }
                         })
                    }
                  }
            })
        })
router.route('/home/update/:id')
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
						//checking if a snippets exist with that id
					 Snippets.findOne({_id: request.params.id},function(error,data){
						if(error){//checking if there is something wrong
							let errors = {
								status:"404",
								message:"Not found! Go back! "
							}
							return response.render("todo/errors/404",errors);
						}
						else if(data.username != user.username){
								let errors = {
										status:"403",
										message:"Forbidden! Go back! "
									}
								return response.render("todo/errors/404",errors);
						}
						else { 
							//sending the data of that snippet in the todo/update
							let date = new Date();
							let title = data.title;
							let textarea = data.content;
                            let tags = data.tags;
                            console.log(user.username);
							return response.render('todo/update', {id: request.params.id,title:title,textarea:textarea,userid:user._id,tags:tags,username:user.username})
						}
					 })
				}
			  }
		})
    })
	//updating a snippet
    .post(function (request, response,next) {
		//get the data that user wrote to update his/her snippet
        let all = request.body;
		let index = Object.keys(all).length;
        console.log(index);
		let key = Object.keys(all)[4];
		let values = all[key]
        console.log(values);
		let tags = values.split(',');
		let content = request.body.textarea;
		let title = request.body.title;
		let date = new Date();
		if(content.length < 30 ){
            request.session.flash = {
			  type: 'error',
			  message: 'The question body must be longer than 30 characters!'
			}
            response.redirect('/home/update/'+request.params.id)
        }
        else{
            //finding the snippet with that id and update it
            Snippets.findOneAndUpdate({_id: request.params.id}, {title: title, content: content,tags:tags,updatedAt:date}, {returnNewDocument: true}, function (error,user) {
                if (error) {
                  request.session.flash = {
                    type: 'error',
                    message: 'The question body must be longer than 15 characters!'
                  }
                 response.redirect('/home/update/'+request.params.id)
                }
                else{
                    request.session.flash = {
                      type: 'success',
                      message: 'The question was updated!'
                    }
                    response.redirect('/home')
                }
              });
        }
	});
module.exports = router;
