// Login Functions
// Logs user into their personal account with all their info

/*---------------------------------------------------------------------------------- */
/* CONFIMATION SUBMISSION CLASS
/* CS 341 | Nuxoll */
/*----------------------------------------------------------------------------------*/

//Function that is actually tested using jest and codecov
function validateSubmission(email, pass) {
	if(email === "" || pass === "") {
		console.log('failed, null');
		return false;
	}
	
	//Does email have up.edu extension?
/* 	else if(email.includes("@up.edu")) {
		console.log(textCourseAb.length);
		console.log('failed, wrong length');
		return false;
	} */
	else { //Passes everything
		console.log('PASS');
		return true;
	}
}

//Function that does all the hard work in conjuction with the html
function submitClick() {
	// Make the  input consistent 
	var email = $("#loginEmail").val();
	var pass = $("#loginPassword").val();
		
	// If statement to determine if vegan was detected, or to proceed.
	if (!validateSubmission(email, pass)) {
		alert("Login information is invalid, try again.");	
	}
	else {
		$.post("/postLogin", {email: email, pass: pass},
		function(result){
			if(result){
				$("#loginRow").replaceWith("<h3> <br> Login Successful! <br> </h3>" );
			}
			else{
				alert("Incorrect email or password");
			}
		});
	}
}


//Export to test
//NOTE: THIS WILL THROW AN ERROR ON THE CONSOLE -- "Module is not defined" 
//This is okay and should be ignored.
module.exports = {
	validateSubmission:validateSubmission
}
