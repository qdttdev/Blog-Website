//jshint esversion:6
/*****************************************************************
 **  Require Modules 
 *****************************************************************/
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

// LOCAL MODULES
const cLogDate = require(__dirname + "/logDate.js");

// Create new express app
const app = express();

// Expres to use EJS as its view engine
app.set('view engine', 'ejs');

// Use bodyParser
app.use(bodyParser.urlencoded({
	extended: true
}));

// Use static file
app.use(express.static("public"));

/*****************************************************************
 **  Processing
 *****************************************************************/
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let postAR = []; // save new posts

// ROOT ROUTE
app.get("/", function (req, res) {

	// bTitle = postAR.title;
	// bContent = postAR.content;

	res.render("home", {
		content: homeStartingContent,
		posts: postAR
	});

});

// ROOT ROUTE - Children
app.get("/posts/:postName", function (req, res) {
	// res.send(req.params);
	const reqTitle = _.lowerCase(req.params.postName);

	postAR.forEach(function (post) {
		const storedTitle = _.lowerCase(post.title);

		if (storedTitle === reqTitle) {
			res.render("post", {
				title: post.title,
				content: post.content
			});
		}
	});
});

// ABOUT ROUTE
app.get("/about", function (req, res) {
	res.render("about", {
		content: aboutContent
	});
});

// CONTACT ROUTE
app.get("/contact", function (req, res) {
	res.render("contact", {
		content: contactContent
	});
});

// COMPOSE ROUTE
app.get("/compose", function (req, res) {
	res.render("compose");
});

// HANDLE POST REQ FROM COMPOSE ROUTE
app.post("/compose", function (req, res) {
	// JS object
	const post = {
		title: req.body.newTitle,
		content: req.body.newCompose
	};

	postAR.push(post); // add new post to postAR
	res.redirect("/"); // send user back to root route

});

/*****************************************************************
 **  Set app to listen on port 3000, and display TimeZone & Time
 *****************************************************************/
app.listen(3000, function () {
	console.log("**** SERVER IS RUNNING ON PORT 3000.");
});

cLogDate.logDate();