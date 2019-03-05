"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Pacientet = require("../models/Pacientet");
let Tooth = require("../models/Tooth")
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

                                  Tooth.find({id:request.params.id},null,{sort: '-createdAt'},function(error , toothData){

                                    let formatDate;
                      							//sending the data of that snippet in the todo/update
                      							let name = data.name;
                                    let surname = data.surname;
                                    let formatedDate =  moment(data.date).format("DD/MM/YYYY");
                                    let startTime = data.startTime;
                                    let endTime = data.endTime;
                                    let age = data.age;
                                    let description = data.description;
                                    let phoneNumber = data.phoneNumber;
                                    let address = data.address;
                      							let companyName = user.companyName;
                                    let date =  moment(data.date).format("YYYY/DD/MM");
                                    let dateFormat = date.split('/');
                                    let year = dateFormat[0];
                                    let month = dateFormat[1];
                                    let day = dateFormat[2];
                                    allData = {
                                      id: request.params.id,
                                       userid:user._id,
                                       name:name,
                                       surname:surname,
                                       description:description,
                                       formatedDate:formatedDate,
                                       startTime:startTime,
                                       endTime:endTime,
                                       age:age,
                                       phoneNumber:phoneNumber,
                                       address:address,
                                       companyName:companyName,
                                       year:year,
                                       month:month,
                                       day:day,
                                       todos:toothData.map(function(todo){
                                         formatDate = moment(todo.createdAt).format("DD/MM/YYYY");
                                         return {
                                           _id:todo._id,
                                           tooth:todo.tooth,
                                           type:todo.type,
                                           region:todo.region,
                                           information:todo.information,
                                           createdAt:todo.createdAt,
                                           formatDate:formatDate
                                         }
                                       })
                                    }
                      							return response.render('todo/pacientet',allData)
                                    })
                    						}


                            })


                    }
                  }
            })
      })
      .post(function (request, response,next) {
	       let name = request.body.name;
         let surname = request.body.surname;
         let date = request.body.date;
         let startTime = request.body.startTime;
         let endTime = request.body.endTime;
         let phoneNumber = request.body.phoneNumber;
         let address = request.body.address;

            //finding the snippet with that id and update it
            Pacientet.findOneAndUpdate({_id: request.params.id},
               { name: name,
                 surname:surname,
                 date:date,
                 startTime:startTime,
                 endTime:endTime,
                 phoneNumber:phoneNumber,
                 address:address }, {returnNewDocument: true}, function (error,user) {
                if (error) {
                  request.session.flash = {
                    type: 'error',
                    message: error.message
                  }
                 response.redirect('/home/update/'+request.params.id)
                }
                else{
                    request.session.flash = {
                      type: 'success',
                      message: 'The reservation was updated!'
                    }
                    response.redirect('/pacientet/'+request.params.id)
                }
              });

	});
  router.route("/tooth/data/:id")
  .post(function (request, response,next) {
     let id = request.params.id;
     let tooth = request.body.tooth;
     let information = request.body.information;
     let type = request.body.type;
     let region ;
     if(type==="Mbushje"){
       region = request.body.region;
     }

     //creats the user by saving the data in database
     let toothData = new Tooth({
       id:id,
       tooth : tooth,
       type:type,
       region:region,
       information:information
     });

     Tooth.create(toothData, function (error, user) {
       if (error) {
         let string = error.message;
         request.session.flash = {
           type: "error",
           message: string
          };


         return response.redirect('/pacientet/'+id);
       }
        else {
         request.session.flash = {
         type: "success",
         message: "Your data was saved successfully"
         };
         return response.redirect('/pacientet/'+id);
       }
     });
   })
   //deletes a tooth information
router.route("/pacientet/tooth/delete/:id")
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
          Tooth.findOne({_id: request.params.id},function(error,data){
            if(error){//checking if there is something wrong
              let errors = {
                  status:"404",
                  message:"Not found! Go back! "
                }
              return response.render("todo/errors/404",errors);
            }
            });
        }
        }
    })
  })
    .post(function(request, response,next) {
        Tooth.findOneAndRemove({_id: request.params.id}, function(error,data) {
          if(error) {
          	let errors = {
				      status:"404",
				      message:"Wrong url! Go back! "
		      	}
			     return response.render("todo/errors/404",errors);
          }
		    	request.session.flash = {
			    	type: "success",
				    message: "The tooth information was deleted!"
		    	};

          return response.redirect("/pacientet/"+data.id);//riderect to home
        });
    });

    router.route("/pacientet/tooth/update/:id")
    .post(function(request, response,next) {
      let information = request.body.information;

      Tooth.findOneAndUpdate({_id: request.params.id},{information:information},{returnNewDocument:true}, function(error,data) {
              if(error) {
              	let errors = {
    				      status:"404",
    				      message:"Wrong url! Go back! "
    		      	}
    			     return response.render("todo/errors/404",errors);
              }
    		    	request.session.flash = {
    			    	type: "success",
    				    message: "The tooth information was updated successfully!"
    		    	};

              return response.redirect("/pacientet/"+data.id);//riderect to home
            });
        });

        module.exports = router;
