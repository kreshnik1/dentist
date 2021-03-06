"use strict";

let mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);

let ToothSchema = mongoose.Schema({
	id:{type:String,required:true},
  tooth:{type:String,required:true},
	nrAmzes:{type:String,required:true},
	protezaMbarimi:{type:String},
	type:{type:String},
	region:{type:String},
	createdAt: { type: Date, required: true, default: Date.now },
	information: { type:String }
});

let Tooth = mongoose.model("Tooth", ToothSchema);

module.exports = Tooth;
