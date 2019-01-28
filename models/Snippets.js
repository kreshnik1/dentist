"use strict";

let mongoose = require("mongoose");
var DateOnly = require('mongoose-dateonly')(mongoose);

let SnippetSchema = mongoose.Schema({
	username:{type:String,required:true},
	title:{type:String,required:true},
	content:{type:String,required:true},
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt:DateOnly,
	tags:[{type:String,required:false}]
});

let Snippet = mongoose.model("Snippet", SnippetSchema);

module.exports = Snippet;