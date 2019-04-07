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
		let nrAmzes = request.body.amza;
		let date = request.body.date;
    let startTime = request.body.startTime;
		let endTime = request.body.endTime;
    let phoneNumber = request.body.phoneNumber;
    let address = request.body.address;
	  let description = request.body.description;


		let stringFormat = moment(date).format("YYYY-MM-DD");

		//let date1 = new Date(stringFormat);

    let PacientetData = new Pacientet({
      name:name,
      surname:surname,
			nrAmzes : nrAmzes,
      date:stringFormat,
			startTime:startTime,
			endTime:endTime,
      phoneNumber:phoneNumber,
      address:address,
			description:description
    });
		let eventExist = false;
		Pacientet.find({date:stringFormat},function(error, data){
			data.forEach(function(i){
				if(Date.parse(stringFormat+" "+i.startTime) == Date.parse(stringFormat+" "+startTime) && Date.parse(stringFormat+" "+i.endTime) == Date.parse(stringFormat+" "+endTime) ){
					eventExist = true;
				}
				else if(Date.parse(stringFormat+" "+startTime) >  Date.parse(stringFormat+" "+i.startTime) &&  Date.parse(stringFormat+" "+startTime) < Date.parse(stringFormat+" "+i.endTime)){
					eventExist = true;
				}
				else if(Date.parse(stringFormat+" "+endTime) >  Date.parse(stringFormat+" "+i.startTime) &&  Date.parse(stringFormat+" "+endTime)< Date.parse(stringFormat+" "+i.endTime)){
					eventExist = true;
				}
			})
			if(!eventExist){
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
			}
			else{
				request.session.flash = {
					type: 'error',
					message: 'Rezervimi ishte i pa suksesshem  , ju lutemi provojeni nje orar tjeter sepse eshte i zene!'
				}
				response.redirect('/home');
			}
		})

	   });

  module.exports = router;
