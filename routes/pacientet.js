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
                              Tooth.find({nrAmzes:data.nrAmzes},null,{sort: '-createdAt'},function(error , toothData){

                                let formatDate;
                  							//sending the data of that snippet in the todo/update
                  							let name = data.name;
                                let surname = data.surname;
                                let formatedDate =  moment(data.date).format("DD/MM/YYYY");
                                let startTime = data.startTime;
                                let endTime = data.endTime;
                                let numri_amzes = data.nrAmzes;
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
                                   nrAmzes:numri_amzes,
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
                                       protezaMbarimi:todo.protezaMbarimi,
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
      });
      router.route("/update/pacientet/:id")
      .post(function (request, response,next) {
	       let name = request.body.name;
         let surname = request.body.surname;
         let date = request.body.date;
         let nrAmzes = request.body.nrAmzes;
         let startTime = request.body.startTime;
         let endTime = request.body.endTime;
         let phoneNumber = request.body.phoneNumber;
         let address = request.body.address;
         let description = request.body.description
         let stringFormat = moment(date).format("YYYY-MM-DD");
         let eventExist = false;
         console.log(stringFormat);
         Pacientet.find({date:stringFormat,_id:{$ne:request.params.id}},function(error, data){
           data.forEach(function(i){
             if(Date.parse(stringFormat+" "+i.startTime) == Date.parse(stringFormat+" "+startTime) && Date.parse(stringFormat+" "+i.endTime) == Date.parse(stringFormat+" "+endTime) ){
               eventExist = true;
             }
             else if(Date.parse(stringFormat+" "+startTime) >  Date.parse(stringFormat+" "+i.startTime) &&  Date.parse(stringFormat+" "+startTime) < Date.parse(stringFormat+" "+i.endTime)){
               eventExist = true;
             }
             else if(Date.parse(stringFormat+" "+endTime) >  Date.parse(stringFormat+" "+i.startTime) &&  Date.parse(stringFormat+" "+endTime) <= Date.parse(stringFormat+" "+i.endTime)){
               eventExist = true;
             }
             else if(Date.parse(stringFormat+" "+startTime) == Date.parse(stringFormat+" "+i.startTime) && Date.parse(stringFormat+" "+endTime) > Date.parse(stringFormat+" "+i.endTime)){
               eventExist = true;
             }
           })
           if(!eventExist){
             Pacientet.findOneAndUpdate({_id: request.params.id},
                { name: name,
                  surname:surname,
                  date:stringFormat,
                  startTime:startTime,
                  nrAmzes:nrAmzes,
                  endTime:endTime,
                  phoneNumber:phoneNumber,
                  address:address,
                  description:description
                 }, {returnNewDocument: true}, function (error,user) {
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
                       message: 'Rezervimi u ndryshua me sukses!'
                     }
                     response.redirect('/pacientet/'+request.params.id)
                 }
               });
           }
           else{
             request.session.flash = {
               type: 'error',
               message: 'Ndryshimi ishte i pa suksesshëm  , ju lutemi provojeni një orar tjetër sepse është i zënë!'
             }
             response.redirect('/pacientet/'+request.params.id)
           }
         })


          //finding the snippet with that id and update it


	});
  router.route("/delete/pacientet/:id")
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
            Pacientet.findOne({_id: request.params.id},function(error,data){
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
          Pacientet.findOneAndRemove({_id: request.params.id}, function(error,data) {
            if(error) {
            	let errors = {
  				      status:"404",
  				      message:"Wrong url! Go back! "
  		      	}
  			     return response.render("todo/errors/404",errors);
            }
  		    	request.session.flash = {
  			    	type: "success",
  				    message: "Rezervimi u fshi!"
  		    	};

            return response.redirect("/home");//riderect to home
          });
      });





  router.route("/tooth/data/:id")
  .post(function (request, response,next) {
     let id = request.params.id;
     let tooth = request.body.tooth;
     let information = request.body.information;
     let type = request.body.type;
     let nrAmzes = request.body.nrAmzes;
     let region ;
     if(type==="Mbushje"){
       region = request.body.region;
     }

     //creats the user by saving the data in database
     let toothData = new Tooth({
       id:id,
       tooth : tooth,
       nrAmzes:nrAmzes,
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
         message: "Të dhënat u ruajtën me sukses"
         };
         return response.redirect('/pacientet/'+id);
       }
     });
   })

   router.route("/tooth/data/proteza/:id")
   .post(function (request, response,next) {
      let id = request.params.id;
      let nrAmzes = request.body.nrAmzes;
      let tooth = request.body.protezaSiper+"-"+request.body.protezaSiper1;
      let protezaMbarimi = request.body.protezaPosht+"-"+request.body.protezaPosht1;
      let information = request.body.information;
      let type = "Proteza";

      //creats the user by saving the data in database
      let toothData = new Tooth({
        id:id,
        nrAmzes:nrAmzes,
        tooth : tooth,
        protezaMbarimi:protezaMbarimi,
        type:type,
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
          message: "Të dhënat u ruajtën me sukses"
          };
          return response.redirect('/pacientet/'+id);
        }
      });
    })

    router.route("/tooth/data/pastrimi/:id")
    .post(function (request, response,next) {
       let id = request.params.id;
       let nrAmzes = request.body.nrAmzes;
       let information = request.body.information;
       let tooth="pastrim"
       let type = "Pastrimi i dhembeve";

       //creats the user by saving the data in database
       let toothData = new Tooth({
         id:id,
         nrAmzes:nrAmzes,
         tooth:tooth,
         type:type,
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
           message: "Të dhënat u ruajtën me sukses"
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
				    message: "Të dhënat e dhëmbit u fshinë !"
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
  				    message: "Të dhënat e dhëmbit u ndryshuan me sukses!"
  		    	};

            return response.redirect("/pacientet/"+data.id);
          });
      });

      router.route("/pacientet/tooth/update/proteza/:id")
      .post(function(request, response,next) {
        let information = request.body.information;
        let tooth = request.body.protezaSiper11+"-"+request.body.protezaSiper12;
        let protezaMbarimi = request.body.protezaPosht11+"-"+request.body.protezaPosht12;
        Tooth.findOneAndUpdate({_id: request.params.id},{
          information:information,
          tooth:tooth,
          protezaMbarimi:protezaMbarimi
        },{returnNewDocument:true}, function(error,data) {
                if(error) {
                  let errors = {
                    status:"404",
                    message:"Wrong url! Go back! "
                  }
                 return response.render("todo/errors/404",errors);
                }
                request.session.flash = {
                  type: "success",
                  message: "Protezat u ndryshuan me sukses !"
                };

                return response.redirect("/pacientet/"+data.id);//riderect to home
              });


          });

          router.route("/pacient/nrAmzes/:id")
          .post(function(request,response,next){
            let nrAmzes = request.body.nrAmza;
            Pacientet.findOneAndUpdate({_id:request.params.id},{nrAmzes:nrAmzes},{returnNewDocument:true},function(error,data){
              if(error) {
                let errors = {
                  status:"404",
                  message:"Wrong url! Go back! "
                }
               return response.render("todo/errors/404",errors);
              }
              request.session.flash = {
                type: "success",
                message: "Numri i amzes u ruajt me sukses !"
              };

              return response.redirect("/pacientet/"+data.id);
            })
          })

        module.exports = router;
