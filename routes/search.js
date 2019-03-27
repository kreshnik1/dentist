"use strict"

let router = require("express").Router();
let Users = require("../models/Users");
let Pacientet = require("../models/Pacientet");
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
                    console.log(search_query);
                    Pacientet.find({},null,{sort: '-createdAt'}, function(error, data) {
                        let Alldata = [];
                        // mapping up the object for the view
                        let context = {
                            todos: data.map(function(todo) {
                                return {
                                    name: todo.name,
                                    surname:todo.surname,
                                    date:todo.date,
                                    startTime: todo.startTime,
                                    endTime:todo.endTime,
                                    id: todo._id,
                                    phoneNumber:todo.phoneNumber,//checking for update and delete
                                    address:todo.address,
                                    createdAt:todo.createdAt
                                };
                            })
                        };
                        context.todos.forEach(function(element){
                            if(element.name.toLowerCase().includes(search_query.toLowerCase()) || element.surname.toLowerCase().includes(search_query.toLowerCase())){
                                Alldata.push(element);
                            }
                        })

                        let date,formatedDate;
                        let searchedData = {
                            search_query:search_query,
                            user_id:user._id,
                            companyName:user.companyName,
                            todos:Alldata.map(function(todo){

                                date = moment(todo.createdAt).from(moment(Date.now()));
                                formatedDate = moment(todo.date).format("DD/MM/YYYY");
                                return {
                                    id: todo.id,
                                    name: todo.name,
                                    surname:todo.surname,
                                    createdAt:formatedDate,
                                    startTime: todo.startTime,
                                    endTime:todo.endTime,
                                    phoneNumber:todo.phoneNumber,
                                    address:todo.address,
                                    data:date
                                }
                            })
                        }
                        //response.render("todo/home", context);
                       return response.render("todo/search",searchedData);
                    });
                }
			  }
		})
    })

    router.route('/home/search/date')
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
                let date;
                console.log(new Date(search_query));
                if(search_query.includes('/')){
                  let dateArray = search_query.split('/');
                  date = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0]+"T00:00:00.000Z"
                }
                Pacientet.find({date: date}, function(error, data) {
                  let date1,formatedDate,searchedData;
                  if(data){
                    searchedData = {
                      search_query:search_query,
                      user_id:user._id,
                      companyName:user.companyName,
                      todos:data.map(function(todo){
                        date1 = moment(todo.createdAt).from(moment(Date.now()));
                        formatedDate = moment(todo.date).format("DD/MM/YYYY");
                        return {
                          id: todo.id,
                          name: todo.name,
                          surname:todo.surname,
                          createdAt:formatedDate,
                          startTime: todo.startTime,
                          endTime:todo.endTime,
                          phoneNumber:todo.phoneNumber,
                          address:todo.address,
                          data:date1
                        }
                      })
                    }
                  }
                  else{
                    searchedData = {
                      search_query:search_query,
                      user_id:user._id,
                      companyName:user.companyName
                    }
                  }
                            //response.render("todo/home", context);
                 return response.render("todo/search",searchedData);
                });
              }
    			  }
    		})
      })




module.exports = router;
