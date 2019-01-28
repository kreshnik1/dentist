"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;

router.route('/home/profile/:id')
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
				}else {
						//checking if a snippets exist with that id
					 Users.findOne({_id: request.params.id},function(error,user){
						if(error){//checking if there is something wrong
							let errors = {
								status:"404",
								message:"Not found! Go back! "
							}
							return response.render("todo/errors/404",errors);
						}
						//sending the data of that snippet in the todo/update
						let firstname = user.name;
						let surname = user.surname; 
						let username = user.username;
						let email = user.email;
						 
						let textarea = user.content; 
						return response.render('todo/profile', {id:request.params.id,firstname:firstname,surname:surname,username:username,email:email})
					 })
				}
			  }
		})
    })

.post(function (request, response,next) {
		//get the data that user wrote to update his/her snippet
		let name = request.body.name;
		let surname = request.body.surname;
		let username = request.body.username;
		let email = request.body.email;
		
		//finding the user with that id and update it
		Users.findOneAndUpdate({_id: request.params.id}, {name: name, surname: surname,username:username,email:email}, {returnNewDocument: true}, function (error,user) {
			if (error) {
			  return next(error);
			}
            
			request.session.flash = {
			  type: 'success',
			  message: 'Your profile was updated successfully'
			}
			
			response.redirect('/home/profile/'+request.params.id)
		  });
	});


router.route('/home/profile/password/:id')
    .post(function (request, response,next) {
		//get the data that user wrote to update his/her snippet
		let oldpassword = request.body.oldpassword;
		let newpassword = request.body.newpassword;
		let repassword = request.body.repassword;
        let newpasswordHashed = request.body.repassword;
		console.log(request.body);
      
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(newpassword, salt, function(err, hash) {
                if (err) console.log("error : "+error.message);

                // override the cleartext password with the hashed one
                newpassword = hash;
                console.log(newpassword)
            });
        });
   // console.log(newpassword)
        Users.findOne({_id: request.params.id}, function (error,user) {
			if (error) {
                console.log("error : "+error.message)
			  //return next(error);
			}
			request.session.flash = {
			  type: 'success',
			  message: 'Your password was changed successfully'
			}
			
             bcrypt.compare(oldpassword, user.password, function (err, result) {
                 if (result === true) {
                     if(request.body.newpassword === repassword){
                        Users.findOneAndUpdate({_id: request.params.id}, {password:newpassword}, {returnNewDocument: true}, function (error,userData) {
                            if (error) {
                                return next(error);
                            }
                            request.session.flash = {
                                type: 'success',
                                message: 'your password was changed successfully'
                            }
                            response.redirect('/home/profile/'+request.params.id)
                        });                        
                    } else {
                        request.session.flash = {
                            type: 'error',
                            message:"Your new password and re-password doesn't match"
                        }
                        response.redirect('/home/profile/'+request.params.id)
                    }
                     
                 } else {
                     request.session.flash = {
                      type: 'error',
                      message: 'Your old password was incorrect , please try again'
                     }
                    return 	response.redirect('/home/profile/'+request.params.id)
                 }
             })
		  });
	});

module.exports = router;
