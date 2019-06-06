"use strict";

let mongoose     = require("mongoose");
module.exports = {
    initilize : function() {
      // reed db Configuration
      let dbConfig = require("../config/database.js");
      // Connect to the database.
      let db = mongoose.connection;

      // mayby should remove out from this file - EventEmitters?
      db.on("error", console.error.bind(console, "connection error:"));

      db.once("open", function() {
        console.log("Succesfully connected to mongoDB");
      });

      // If the Node process ends, close the Mongoose connection.
      process.on("SIGINT", function() {
            db.close(function() {
               console.log("Mongoose connection disconnected through app termination.");
              process.exit(0);
          });
      });
      mongoose.connect(dbConfig.connectionString,{useMongoClient: true});

    }
};
