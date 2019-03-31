//Post to display classes

$(document).ready(function () {
	
	$("#post-features").hide();
	$("#class-features").show();
	$("#chooseCourse").show();


	//hard coded for now for CS
	//Declare variable later for both post requests
	$.post("/classesGet/", {department: 'CS'}, function(data) {
		//alert(data);

		//This is what will be replaced in the html
		var list = document.getElementById("class-placeholder");

		//Run for loop to go through and create elements for each class
		for(i = 0 ; i < data.length; i++)
		{
			console.log(data.length);
			//Create ID for the element
			var id = "my" + i.toString() + "Div";
			//alert(data[i].number);
			
			var listinstance = document.createElement("input");
			
			//Set attributes
			listinstance.setAttribute("type","radio");
			listinstance.setAttribute("name","radio");
			listinstance.setAttribute("id",id);
			listinstance.setAttribute("value",(data[i].number).toString()); //only the number for post request later
			
			list.appendChild(listinstance);
			
			var label = document.createElement("label");
			label.setAttribute("for",id);
			label.innerHTML = (data[i].department + data[i].number + " - " + data[i].name).toString();
			list.appendChild(label);
			
			var linebreak = document.createElement("br");
			list.appendChild(linebreak);
			
		}
	});

	var submitted = false;

	$("#submitClass").click(function() {
		//alert("submit");

		console.log("clicky");
		
		var checkedClassNum = $('input[name=radio]:checked').val(); 
		console.log(checkedClassNum);
		
		//REPLACE ALL Class information with Post information
		//Run Another script
		//alert("replacing");
		$("#class-placeholder").replaceWith(checkedClassNum);
		
		$("#class-features").hide();
		$("#chooseCourse").hide();

		$("#post-features").show();
		
		var submitted = true;
		console.log("Inside" + " " + submitted);
		
		alert(checkedClassNum);
		//Call function to post
		classPost(checkedClassNum);
		
	});
	
	//Depending on the number of times you click the options is how many times it prints the results???
	
	function classPost(classNum) {
		
		console.log("Here" + " " + classNum);
		
		//FOR NOW hard coded until you can get the class id and number sent
		classNum = 203;
		
		//Put another post request here
		//$.post("/classPostsGet/", {id: 'CS', coursenum: classNum}, function(data) {
		$.post("/classPostsGet/", {id: 'CS', coursenum: classNum}, function(data) {

			
			//This is what will be replaced in the html
			var list = document.getElementById("post-placeholder");
			
			//console.log(data);

			//Run for loop to go through and create elements for each class
			for(i = 0 ; i < data.length; i++)
			{
				console.log("data posts", data.length);
				//Create ID for the element
				var id = "my" + i.toString() + "Div";
				//alert(data[i].number);
				
				//alert("hey");
				
				var listinstance = document.createElement("input");
				
				//Set attributes
				listinstance.setAttribute("type","radio");
				listinstance.setAttribute("name","radio");
				listinstance.setAttribute("value",(data[i].id).toString()); //only the number for post request later
				
				list.appendChild(listinstance);
				
				var label = document.createElement("label");
				label.setAttribute("for",id);
				label.innerHTML = (data[i].title + " - " + data[i].body).toString();
				list.appendChild(label);
				
				var linebreak = document.createElement("br");
				list.appendChild(linebreak);
				
			}
	
		});
	}
	
	$("#newPost").click(function() {
			//alert("new post clicked");
			
		});
	
});

