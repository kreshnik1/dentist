"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Pacientet = require("../models/Pacientet");
let moment = require('moment');

router.route("/create/reservation")
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
          let date = moment(new Date()).format('YYYY-MM-DD')
				//	return response.render("todo/reservation",{userid : user._id,companyName:user.companyName,Date:date});//gets the todo/create handlebar
				}
			}
		})
	})

//creates a reservation and saves into database and then returns to home
	.post(function(request,response,next){
		//getting the data that the user wrote
		let name = request.body.name;
		let surname = request.body.surname;
		let date = request.body.date
    let startTime = request.body.startTime;
		let endTime = request.body.endTime;
    let phoneNumber = request.body.phoneNumber;
    let address = request.body.address;
	  let description = request.body.description;
    let PacientetData = new Pacientet({
      name:name,
      surname:surname,
      date:date,
			startTime:startTime,
			endTime:endTime,
      phoneNumber:phoneNumber,
      address:address,
			description:description
    });

    //creating the snippet with datas that we need in database
    Pacientet.create(PacientetData, function (error, user) {
      if (error) {
        let string = error.message;
        request.session.flash = {
          type: "error",
          message: string
        };
        return response.redirect('/create/reservation');
      } else {
         request.session.flash = {
            type: "success",
            message: "Your reservation was successfully created."
          };
          return response.redirect('/home');
        }
      });
	   });

  module.exports = router;
