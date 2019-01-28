"use strict";

let mongoose = require("mongoose");

let SubCommentsSchema = mongoose.Schema({
	username:{type:String,required:true},
	questionId:{type:String,required:true},
    commentId:{type:String,required:true},
    content:{type:String,required:true},
	createdAt: { type: Date, required: true, default: Date.now }
});

let SubComments = mongoose.model("SubComments", SubCommentsSchema);

module.exports = SubComments;