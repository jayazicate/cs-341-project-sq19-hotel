//Post to display classes

$(document).ready(function () {
	
	//Main page showing
	$("#specificCourses").hide();
	
	//What happens when the button is clicked
	$(".topic").click(function() {
		var checkedClassSubject = $(this).attr('id'); // or var clickedBtnID = this.id
		//alert(checkedClassSubject);

		//If statement that makes the user select a class so it is not undefined
		if (checkedClassSubject == null) {
			alert("Please Select a Class Subject");
			return;
		}
		//If something is selected, call the function
		else {
			classesGet(checkedClassSubject);
			
			//Else statement occurs, hide things and show things for class courses
			$("#mainPage").hide();
			$("#specificCourses").show();
			
			//Class Courses shown for now
			$("#post-features").hide();
			$("#comment-features").hide();
			$("#post-placeholder-title").hide();
			$("#user-placeholder").hide();
			$("#post-placeholder-body").hide();
			$("#class-placeholder-title").hide();


			$("#class-features").show();
			$("#chooseCourse").show();  
			$("#createClass").hide();
      
			var token = document.cookie;
			$.post("/checkToken", {token: token}, function(results) {
				if(results[0] && results[1].clearance >= 2){
					$("#createClass").show();
				}
			});
			//$("#class-features").show();
			//$("#chooseCourse").show();
		}
	});

	function classesGet(checkedClassSubject) {
		//Declare variable later for both post requests
		$.post("/classesGet/", {department: checkedClassSubject}, function(data) {

			//This is what will be replaced in the html
			var divTotal = document.getElementById("class-placeholder");

			//Run for loop to go through and create elements for each class
			for(i = 0 ; i < data.length; i++)
			{
				//Create ID for the element
				var id = "my" + i.toString() + "Div";
				//alert(data[i].number);
				
				var list = document.createElement("div");
				list.setAttribute("class", "subjectDiv");
				//list.setAttribute("onclick", classButtonClicked((data[i].department).toString() + " " + (data[i].number).toString()));

				divTotal.appendChild(list);

				//var listinstance = document.createElement("input");
				
				//Set attributes

				list.setAttribute("name","classes");
				list.setAttribute("id",id);
				list.setAttribute("data-id",(data[i].department).toString() + " " + (data[i].number).toString()); //only the number for post request later
			
				//Put in the courses from database
				//&nbsp is a space
				var label = document.createElement("label");
				label.setAttribute("for",id);
				label.innerHTML = ("&nbsp" + data[i].department + " " + data[i].number + " - " + data[i].name).toString();
				list.appendChild(label);
				
				var linebreak = document.createElement("br");
				list.appendChild(linebreak);
				list.setAttribute("onclick", "classClicked($(this).data('id'))");

				divTotal.appendChild(list);

			}
		});
	}
	
	

	//Depending on the number of times you click the options is how many times it prints the results???
		
		
	});

function deleteComment(id) {
	$.post("/deleteComment", {id: id},
	function(results){
	});
}
function classClicked(checkedClassNum) {
	//Must select a course so it is not null
	console.log(checkedClassNum);
	if (checkedClassNum == null) {
		alert("Please Select a Course");
		return;
	}
	else {
		var getDep = checkedClassNum.substring(0,checkedClassNum.indexOf(" "));
		var getNum = checkedClassNum.substring(checkedClassNum.indexOf(" "),checkedClassNum.length);
		//Call function that shows the corresponding posts
		classPost(checkedClassNum);
		
		//REPLACE ALL Class information with Post information
		$("#class-placeholder-title").html(checkedClassNum.toString());
		
		
		$("#class-placeholder-title").show();
		$("#class-placeholder").hide();
		$("#class-features").hide();
		$("#chooseCourse").hide();
		$("#comment-features").hide();

		$("#post-features").show();
	}
}	
function classPost(checkedClassNum) {
	//Put another post request here
	$.post("/classPostsGet/", {parent: checkedClassNum}, function(data) {

		//This is what will be replaced in the html
		var div = document.getElementById("post-placeholder");
		
		//Run for loop to go through and create elements for each class
		for(i = 0 ; i < data.length; i++)
		{
			//console.log("data posts", data.length);
			//Create ID for the element
			var id = "my" + i.toString() + "Div";
			
			var list = document.createElement("div");
			list.setAttribute("class", "postDiv");

			
			//Set attributes

			var label = document.createElement("label");
			label.setAttribute("for",id);
			label.innerHTML = ("&nbsp" + data[i].title + " - " + data[i].body).toString();
			list.setAttribute("data-id",data[i].id + "\n" + data[i].title + "\n \n" + data[i].body + "\n \n \n" + data[i].user)
			list.appendChild(label);
			
			var linebreak = document.createElement("br");
			list.appendChild(linebreak);
			list.setAttribute("onclick","selectPost($(this).data('id'))");
			div.appendChild(list);
		}
	});
} //end function

function selectPost(checkPost) {
	if (checkPost == undefined || checkPost == null) {
		alert("Please Select a Post");
		return;
	}
	else {
		$("#post-features").hide();		
		$("#post-placeholder").show();
		$("#comment-features").show();
		
		$("#post-placeholder-title").show();
		$("#user-placeholder").show();
		$("#post-placeholder-body").show();
	
 		var getPostId = checkPost.substring(0,checkPost.indexOf("\n"));
		var getPostTitle = checkPost.substring(checkPost.indexOf("\n"),checkPost.indexOf("\n \n"));
		var getPostUser = checkPost.substring(checkPost.indexOf("\n \n \n"),checkPost.length);
		var getPostBody = checkPost.substring(checkPost.indexOf("\n \n"),checkPost.indexOf("\n \n \n"));
		
		//console.log(getPostTitle);
		//console.log(getPostBody);
		

		$("#post-placeholder").html((getPostId).toString());
 		$("#post-placeholder-title").html((getPostTitle + "\n").toString());
		$("#user-placeholder").html((getPostUser).toString());
		$("#post-placeholder-body").html((getPostBody).toString());

		//REPLACE ALL post information with comment information
		//Call function that shows the corresponding comments
		classComment(getPostId);
	}
}

function classComment(checkPost) {
	var token = document.cookie;
	var auth = false;
	var user = null;
	$.post("/checkToken", {token: token}, function(results) {
		if(results[0]){
			user = results[1].user;
			if(results[1].clearance >= 2){
				auth = true;
			}
		}
	});
	$.post("/classCommentGet/", {parent: checkPost}, function(data) {
		
		var div = document.getElementById("comment-placeholder");
		
		//Display the post clicked on with title and body
		
		//Run for loop to go through and create elements for each class
		for(i = 0 ; i < data.length; i++)
		{

			var list = document.createElement("div");
			list.setAttribute("class", "commentDiv");

			console.log("data posts", data[i].body);
			//alert("hey");
			//Create ID for the element
			var id = "my" + i.toString() + "Div";
			var name = document.createElement("div");
			name.setAttribute("class", "userNamePost");
			name.innerHTML = (data[i].user).toString();
			list.appendChild(name);

			var linebreak1 = document.createElement("br");
			list.appendChild(linebreak1);

			var label = document.createElement("label");
			label.setAttribute("for",id);				

			label.innerHTML = ("\n" + "&nbsp" + "&nbsp" + data[i].body).toString();
			list.appendChild(label);
			
			var linebreak2 = document.createElement("br");
			list.appendChild(linebreak2);
			
			if(auth || user == (data[i].user).toString()){
				var listinstance = document.createElement("BUTTON");
				listinstance.setAttribute("name","Delete");
				listinstance.setAttribute("value",(data[i].id).toString()); //only the number for post request later
				listinstance.innerHTML = "Delete";
				listinstance.setAttribute("class", "deleteButtonPost");
				listinstance.setAttribute("onclick", "deleteComment(this.value)");
				list.appendChild(listinstance);
			}
			div.appendChild(list);
		}
	});
}

