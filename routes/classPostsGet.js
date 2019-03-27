//Get from the database and display on HTML

var express = require('express');
var router = express.Router();

// require dbms.js to access database
var dbms = require('./dbms.js');

router.post('/', function(req, res, next) {
	
	console.log("SELECT * FROM posts WHERE id = '"+req.body.id+"' AND coursenum =' "+req.body.coursenum+" ' ");
	
	//Select classes from the corresponding department that is sent in
	//dbms.dbquery("SELECT * FROM posts WHERE id = '"+req.body.id+"' AND coursenum =' "+req.body.coursenum+" ' ", function(err, results) {
	dbms.dbquery("SELECT * FROM posts WHERE id = '"+req.body.id+"' ", function(err, results) {

        if(!err) {
		    //console.log(results);

			//Create empty arrays for the department and number
			var postTitle = [];
			var postBody = [];
			
			for (i = 0; i < results.length; i++) {
				if (results[i].id == "CS") {
					postTitle[i] = results[i].title;
					postBody[i] = results[i].body;
				}

			}
		}
		
		res.send(results);
	});
});

module.exports = router;