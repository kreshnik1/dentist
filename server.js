"use strict";

let express      = require("express");
let bodyParser   = require("body-parser");
let exphbs       = require("express-handlebars");
let path         = require("path");
let session      = require("express-session");
let app  = express();
let port = process.env.PORT || 3000;
let https = require("https");
let fs = require("file-system");
const feather = require('feather-icons')
let tags_input = require("tags-input");
//var validator  = require('express-validator');
var helmet  = require('helmet');
var xssFilter = require('x-xss-protection')
var csrf = require('csurf')
var csp = require('helmet-csp')
var helpers = require('handlebars-helpers')();
require('dotenv').config()

// Configuration ----------------------------------------------------

// Kick off the database
require("./libs/dbHelper").initilize();

// View engine.
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Add support for handling application/json
app.use(bodyParser.json({limit: '10mb', extended: true}))

// Add support for handling HTML form data
app.use(bodyParser.urlencoded({ limit: '10mb',extended: true }));

app.use(session({
    key: "sessionid",  // Don't use default session cookie name.
    secret: "#$@!%%^#/2314asd3#@2sz#dsadbhkd", // should be kept secret
    saveUninitialized: false, // save/or not save a created but not modified session
    resave: false, // resave even if a request is not changing the session
    cookie: {
        secure: false, // should be true to check that we´re using HTTPS - Im not in this case
        maxAge: 1000 * 60 * 60 * 24,// will live for 1 day
		httpOnly: true//this attribute is used to help prevent attacks such as cross-site scripting since it does not allow the cookie to be accessed via JavaScript.
    }
}));


app.use(helmet());
app.use(helmet.xssFilter());
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'","'unsafe-inline'", 'https://fonts.googleapis.com/icon','https://fonts.googleapis.com/css','https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css','https://cloud.tinymce.com/stable/skins/lightgray/skin.min.css','https://cloud.tinymce.com/stable/skins/lightgray/content.min.css','https://cdnjs.cloudflare.com/ajax/libs/tagmanager/3.0.2/tagmanager.min.css','https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css'],
	fontSrc:["'self'",'https://fonts.gstatic.com','https://fonts.gstatic.com/s/materialicons','https://fonts.gstatic.com/s/roboto/v18/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2','https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css','https://cloud.tinymce.com/stable/skins/lightgray/fonts/tinymce.ttf','https://cloud.tinymce.com/stable/skins/lightgray/fonts/tinymce.woff','https://cloud.tinymce.com/stable/skins/lightgray/fonts/tinymce-small.woff','https://cloud.tinymce.com/stable/skins/lightgray/fonts/tinymce-small.ttf']  ,
	scriptSrc : ["'self'",'https://code.jquery.com/jquery-3.3.1.slim.min.js','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js','https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js','https://code.jquery.com/jquery-3.3.1.slim.min.js https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js','https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js','https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js','https://unpkg.com/feather-icons/dist/feather.min.js','https://unpkg.com/feather-icons/dist/feather.min.js','https://unpkg.com/feather-icons','https://cloud.tinymce.com/stable/tinymce.min.js','https://cloud.tinymce.com/stable/themes/modern/theme.min.js','https://cloud.tinymce.com/stable/plugins/textcolor/plugin.min.js','https://cloud.tinymce.com/stable/plugins/advlist/plugin.min.js','https://cloud.tinymce.com/stable/plugins/autolink/plugin.min.js','https://cloud.tinymce.com/stable/plugins/link/plugin.min.js','https://cloud.tinymce.com/stable/plugins/image/plugin.min.js','https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js','https://cdnjs.cloudflare.com/ajax/libs/tagmanager/3.0.2/tagmanager.min.js','https://cloud.tinymce.com/stable/plugins/colorpicker/plugin.min.js'],// throw an error instead of loading script from any other source
	baseUri : ["'self'"], //restricts the URLs that can appear in a page’s <base> element
	imgSrc	: ["'self'",'https://unpkg.com/feather-icons'],
	formAction :  ["'self'"]
  }
}))

app.use(csrf());
app.use( function( req, res, next ) {
  res.locals.csrftoken = req.csrfToken() ;
  next() ;
} ) ;
// Adding support for flash messages through the middleware pattern
app.use(function(request, response, next) {
  // The flash should live for one roundtrip so if it is set in the session
  // add it to the context (this request through locals)
  if(request.session.flash) {
    response.locals.flash = request.session.flash;
    // then delete it from the session
    delete request.session.flash;
  }
  next();
});

// Adding support for stupid render message (every request)
app.use(function(request, response, next) {
  // Always use a namespace for this
  if(!response.locals.partials) {
    response.locals.partials = {};
  }
  // This could be
  response.locals.partials.sponsor = {name: "Acme AB"};
  next();
});


// The framework should look in the folder "public" for static resources
app.use(express.static(path.join(__dirname, "public")));

// Load routes as "mini-apps"
app.use("/",require("./routes/login.js"));
app.use("/",require("./routes/register.js"));
app.use("/",require("./routes/home.js"));
app.use("/",require("./routes/profile.js"));
app.use("/",require("./routes/reservation.js"));
app.use("/",require("./routes/search.js"));
app.use("/",require("./routes/pacientet.js"));


// Error handling
app.use(function(request, response, next) {

	let error = {
		status:"404",
		message:"oops! page not found"
	 }

	response.status(404).render("todo/errors/404",error);
});

// four parameters for errors
app.use(function(err, req, res, next) {
  // log the error
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
/*
//Start
// Launch application
app.listen(port, function () {
  console.log("Express app listening on port %s!", port);
});*/

https.createServer({
	key: fs.readFileSync("./config/sslcerts/key.pem"),
	cert: fs.readFileSync("./config/sslcerts/cert.pem")
},app).listen(port, function() {
	console.log("Express started on https://localhost:"+process.env.PORT);
	console.log("Press Ctrl-C to terminate...");
});
