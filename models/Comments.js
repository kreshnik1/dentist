"use strict";

let mongoose = require("mongoose");

let CommentsSchema = mongoose.Schema({
	username:{type:String,required:true},
	questionId:{type:String,required:true},
	content:{type:String,required:true},
    correct:{type: Boolean,default: false},
	createdAt: { type: Date, required: true, default: Date.now }
});

let Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;