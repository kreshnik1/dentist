"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Pacientet = require("../models/Pacientet");
let moment = require('moment');


router.route("/pacientet/:id")
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
                         Pacientet.findOne({_id: request.params.id},function(error,data){
                            if(error){//checking if there is something wrong

                                let errors = {
                                    status:"404",
                                    message:"Not found! Go back! "
                                }
                                return response.render("todo/errors/404",errors);
                            }
                            else{
                              Pacientet.findOne({_id: request.params.id},function(error,data){
                    						if(error){//checking if there is something wrong
                    							let errors = {
                    								status:"404",
                    								message:"Not found! Go back! "
                    							}
                    							return response.render("todo/errors/404",errors);
                    						}
                    						else {
                    							//sending the data of that snippet in the todo/update
                    							let name = data.name;
                                  let surname = data.surname;
                                  let formatedDate =  moment(data.date).format("DD/MM/YYYY");
                                  let time = data.time;
                                  let phoneNumber = data.phoneNumber;
                                  let address = data.address;
                    							let companyName = user.companyName;
                                  let date =  moment(data.date).format("YYYY/DD/MM");
                                  console.log("------" + data.date)
                                  let dateFormat = date.split('/');
                                  let year = dateFormat[0];
                                  let month = dateFormat[1];
                                  let day = dateFormat[2];
                    							return response.render('todo/pacientet',
                                    { id: request.params.id,
                                      userid:user._id,
                                      name:name,
                                      surname:surname,
                                      formatedDate:formatedDate,
                                      time:time,
                                      phoneNumber:phoneNumber,
                                      address:address,
                                      companyName:companyName,
                                      year:year,
                                      month:month,
                                      day:day
                                    })
                    						}
                    					 })

                            }

                         })
                    }
                  }
            })
        })
        module.exports = router;
