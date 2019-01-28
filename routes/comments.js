"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Comments = require("../models/Comments");
let Snippets = require("../models/Snippets");
let SubComments = require("../models/Subcomments");


router.route('/create/comment')
.post(function(request,response,next){
    let username = request.body.username;
    let questionId = request.body.questionId;
    let content = request.body.textarea;

    let CommentData = new Comments({
      username:username,
         content:content,
            questionId:questionId
    });
	Comments.create(CommentData, function (error, user) {
        if (error) {
            let string = error.message;
            console.log(string);
            request.session.flash = {
				type: "error",
                message: "Try again"
            };
            return response.redirect('/home');
        } else {
            request.session.flash = {
                type: "success",
                message: "Your comment was successfully created."
	 	  	};
            return response.redirect('/home/questions/'+questionId);
        }
    });
});
//deletes a comment
router.route("/home/comment/delete/:id")
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
						Comments.findOne({_id: request.params.id},function(error,data){
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
        Comments.findOneAndRemove({_id: request.params.id}, function(error,data) {
          if(error) {
          	let errors = {
				status:"404",
				message:"Wrong url! Go back! "
			}
			return response.render("todo/errors/404",errors);
          }

			request.session.flash = {
				type: "success",
				message: "The comment was deleted!"
			};

          return response.redirect("/home/questions/"+data.questionId);//riderect to home
        });

    });

    router.route('/home/comment/update/:id')
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
					 Comments.findOne({_id: request.params.id},function(error,commentData){
						if(error){//checking if there is something wrong
							let errors = {
								status:"404",
								message:"Not found! Go back! "
							}
							return response.render("todo/errors/404",errors);
						}
						else if(commentData.username != user.username){
								let errors = {
										status:"403",
										message:"Forbidden! Go back! "
									}
								return response.render("todo/errors/404",errors);
						}
						else {
                            Snippets.findOne({_id: commentData.questionId},function(error,questionData){
                                let userid = user._id;
                                let comment_id = commentData._id;
                                let comment_content = commentData.content;
                                let question_title = questionData.title;
                                let question_content = questionData.content;
                                let question_username = questionData.username;
                                return response.render('todo/commentupdate',
                                {
                                    comment_id:comment_id,
                                    comment_content:comment_content,
                                    userid:userid,
                                    question_title : question_title,
                                    question_content:question_content,
                                    question_username:question_username
                                })
                            })
                        }
					 })
				}
			  }
		})
    })
	//updating a comment
    .post(function (request, response,next) {
		//get the data that user wrote to update his/her snippet
		let content = request.body.textarea;
		let date = new Date();
		if(content.length === 0){
            request.session.flash = {
			  type: 'success',
			  message: 'The comment can"t be empty!'
			}

			response.redirect('/home/questions/'+data.questionId);
        }
		//finding the snippet with that id and update it
		Comments.findOneAndUpdate({_id: request.params.id}, {content: content,updatedAt:date}, {returnNewDocument: true}, function (error,data) {
			if (error) {
			  return next(error);
			}
			request.session.flash = {
			  type: 'success',
			  message: 'The comment was updated!'
			}

			response.redirect('/home/questions/'+data.questionId);
		  });
	});


 router.route('/home/create/subcomment')
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
				}
			  }
		})
    })
	//creating a subcomment
    .post(function (request, response,next) {
		let commentId = request.body.commentId;
        let content = request.body.subtextarea;
        let username = request.body.comment_Username;
        let comment_questionId = request.body.comment_questionId;
        if(content.length == 0 ){
            request.session.flash = {
			  type: 'success',
			  message: "The comment can't be empty , please try again "
			}

			response.redirect('/home/questions/'+comment_questionId);
        }
        else{
            let SubCommentData = new SubComments({
                commentId:commentId,
                username:username,
                content:content,
                questionId:comment_questionId
            });

            SubComments.create(SubCommentData, function (error, user) {
            if (error) {
                let string = error.message;
                request.session.flash = {
                    type: "error",
                    message: "Try again"
                };

                return response.redirect('/home');
            } else {
                request.session.flash = {
                    type: "success",
                    message: "Your comment was successfully created."
                };
                return response.redirect('/home/questions/'+comment_questionId);
            }
        });
        }
	});

//deletes a snippet
router.route("/home/subcomment/delete/:id")
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
						SubComments.findOne({_id: request.params.id},function(error,data){
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
	//find the subcomment with that id and then delete it from the database
        SubComments.findOneAndRemove({_id: request.params.id}, function(error,data) {
          if(error) {
          	let errors = {
				status:"404",
				message:"Wrong url! Go back! "
			}
			return response.render("todo/errors/404",errors);
          }

			request.session.flash = {
				type: "success",
				message: "The comment was deleted!"
			};

            return response.redirect("/home/questions/"+data.questionId);//riderect to home
        });
    });

 router.route('/home/subcomment/update/:id')
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
						SubComments.findOne({_id: request.params.id},function(error,data){
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
	//updating a comment
    .post(function (request, response,next) {
		//get the data that user wrote to update his/her snippet
		let content = request.body.subtextarea;
		let date = new Date();

		//finding the snippet with that id and update it
		SubComments.findOneAndUpdate({_id: request.params.id}, {content: content,createdAt:date}, {returnNewDocument: true}, function (error,data) {
			if (error) {
			  return next(error);
			}
			request.session.flash = {
			  type: 'success',
			  message: 'The comment was updated!'
			}

			response.redirect('/home/questions/'+data.questionId);
		  });
	});

 router.route('/home/correct/answer/:id')
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
						Comments.findOne({_id: request.params.id},function(error,data){
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
                            cosnole.log(data);
							//return response.render("todo/delete", {id: request.params.id});
			  			});
					}
		  		}
	 	})
    })
    //updating a comment
    .post(function (request, response,next) {

		//finding the snippet with that id and update it
		Comments.findOneAndUpdate({_id: request.params.id}, {correct: true}, {returnNewDocument: true}, function (error,data) {
			if (error) {
			  return next(error);
			}
			request.session.flash = {
			  type: 'success',
			  message: 'The comment was updated!'
			}

			response.redirect('/home/questions/'+data.questionId);
		  });
	});
router.route('/home/uncheck/correct/answer/:id')
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
						Comments.findOne({_id: request.params.id},function(error,data){
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
                            cosnole.log(data);
							//return response.render("todo/delete", {id: request.params.id});
			  			});
					}
		  		}
	 	})
    })
    //updating a comment
    .post(function (request, response,next) {

		//finding the snippet with that id and update it
		Comments.findOneAndUpdate({_id: request.params.id}, {correct: false}, {returnNewDocument: true}, function (error,data) {
			if (error) {
			  return next(error);
			}
			request.session.flash = {
			  type: 'success',
			  message: 'The comment was unchecked!'
			}

			response.redirect('/home/questions/'+data.questionId);
		  });
	});


module.exports = router;
