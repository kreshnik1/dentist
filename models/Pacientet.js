"use strict";

let mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);

let PacientetSchema = mongoose.Schema({
	name:{type:String,required:true},
  surname:{type:String,required:true},
	nrAmzes:{type:String},
	date:{type: Date, required: true},
  startTime:{type:String , required:true},
	endTime:{type:String,required:true},
  phoneNumber:{type:String},
  address:{type:String},
	description:{type:String},
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt:DateOnly
});

let Pacientet = mongoose.model("Pacientet", PacientetSchema);

module.exports = Pacientet;
