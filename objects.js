/*
  This file will contain a main object specialized for this project.
*/



/*
  A class to contain mappings to functions
*/
function glo()  // gregsList Object 
{
    this.user =
	{
	    name : null,
	    password : null,
	    token : null,
	    sessionId : null
	};
    this.goals = 
	{
	    parent: this,
	    contents: [],
	    filler: fillGoals,
	    type: "goal",
	    get: "getGoals",
	    display: displayTable,
	    table: $("#tableOfGoals")[0],
	    removeFunction: remover,
	    editFunction: editGoal,
	    updater: "updateGoal",
	    destroyer: "removeGoal",
	    displayKeys: ["sid","value"],
	};
    this.industries = 
	{
	    parent: this,
	    contents: [],
	    filler: fillIndustries,
	    type: "industry",
	    get: "getIndustries",
	    display: displayTable,
	    table: $("#tableOfIndustries")[0],
	    removeFunction: remover,
	    editFunction: editIndustry,
	    updater: "updateIndustry",
	    destroyer: "removeIndustry",
	    displayKeys: ["sid","name"]
	};
    this.postings = 
	{
	    parent: this,
	    contents: [],		// array of values to be filled from data store
	    filler: fillPostings,	// javascript function to fill contents from data store
	    type: "posting",
	    get: "getPostings",		// php function to call
	    display: displayTable,	// javascript function to display
	    table: $("#tableOfPostings")[0],	// a reference to the div container. set in setupPostings()
	    add: null,			// php function to add posting
	    removeFunction: remover,	// javascript function to remove
	    editFunction: editPosting,
	    updater: "updatePosting",		// php function to update
	    destroyer: "removePosting", // php function to remove
	    displayKeys: ["sid","title","url","location","company","source"] // values to display in table
	};
    this.companies =
	{
	    parent: this,
	    contents: [],
	    filler: fillCompanies,
	    type: "company",
	    get: "getCompanies",
	    display: displayTable,
	    table: $("#tableOfCompanies")[0],
	    add: null,
	    removeFunction: remover,
	    destroyer: "removeCompany", // php function to remove
	    displayKeys: ["sid","name"] // values to display in table
	};
    this.locations =
	{
	    parent: this,
	    contents: [],
	    filler: fillLocations,
	    type: "location",
	    get: "getLocations",
	    display: displayTable,
	    table: $("#tableOfLocations")[0],
	    add: null,
	    removeFunction: remover,
	    destroyer: "removeLocation", // php function to remove
	    displayKeys: ["sid","name"] // values to display in table
	};
    this.contacts =
	{
	    parent: this,
	    contents: [],
	    filler: fillContacts,
	    type: "contact",
	    get: "getContacts",
	    display: displayTable,
	    table: $("#tableOfContacts")[0],
	    add: null,
	    editFunction: editContact,
	    updater: "updateContact",		// php function to update
	    removeFunction: remover,
	    destroyer: "removeContact", // php function to remove
	    displayKeys: ["sid","fname","lname","email","phone",
			  "facebook","linkedin","github"] // values to display in table

	};
    this.schedules =
	{
	    parent: this,
	    contents: [],
	    filler: fillSchedules,
	    removeFunction: remover,
	    type: "schedule",
	    get: "getSchedules",
	    display: displayTable,//displaySchedules,
	    destroyer: "removeSchedule", // php function to remove
	    table: $("#tableOfEvents")[0],
	    displayKeys: ["sid","name","description","start","end"],
	    add: null
	};
    this.blog =
	{
	    parent: this,
	    contents: [],
	    filler: fillBlog,
	    removeFunction: remover,
	    type: "blog",
	    get: "getBlog",
	    display: displayTable,//displaySchedules,
	    destroyer: "removeBlog", // php function to remove
	    table: $("#tableOfBlogs")[0],
	    displayKeys: ["sid","text"],
	    add: null
	};
    this.login();
}

/*
  On page load, open a dialog box asking for user name and password. 

  On success, pass to customs function.
*/
glo.prototype.login = 
    function login()
{
    var object = this;

    // build form 
    var string  = '<div id="login" title="Welcome to gregsList!">';
    string += '<ul id="loginInstructions">';
    string += '<li><td>Please enter a username and password.';
    string += '<li>If you lost your password, you will need to create a new username.';
    string += '</ul>';

    string += '<table>';
    string += '<tr>';
    string += '<td>Username</td>'; 

    string += '<td>';
    string += '<input id="embedUsername" value="">';
    string += '</td>';
    string += '</tr>';

    string += '<tr><td>Password</td>';
    string += '<td><input id="embedPassword" value=""></td></tr>';

    string += '</div>';


    // create dialog
    var dialog = $(string).dialog
    (
	{
	    modal:true, 
	    closeOnEscape: false,
	    // open: function(event, ui) { $(".ui-dialog-titlebar-close", ui.dialog || ui).hide(); },
	    beforeclose: function (event, ui) { return false; },
	    dialogClass: "noclose",
	    box: $(this).dialog,
	    buttons:
	    {
		/*  // We doan need no steenken cancelations.
		Cancel: function() 
		{
		    $(this).dialog("close")
		    // box("close")
		},
		*/
		"Login":function()
		{
		    // get values from form
		    var username = $("#embedUsername")[0].value;
		    var password = $("#embedPassword")[0].value;

		    console.log("attempting login");
		    console.log("username: " + username);
		    console.log("password: " + password);

		    // validate these against database.
		    // on successful validation, insert data to glo 


		    // possible responses:
		    // 1. username and password are taken, and they match (success)
		    // 2. username and password are taken, but don't match (prompt user for new username)
		    // 3. username is not taken, and password is not empty (create new account)
		    // 4. username is not taken, but password is empty (prompt user for non-empty password)
		    var box = $(this);
		    $.ajax
		    (
			{
			    url: "butler.php",
			    type: "post",
			    dataType: "text",
			    data:
			    {
				user: username,
				pass: password,
			    },
			    success: function(response)
			    {
				// done all we can do here. 
				// close up shop, and send user to customs for processing.
				object.customs(response,username,password,dialog,box);
			    } // end success
			} // end ajax data
		    ); // end .ajax call
		} // end login button function
	    } // end buttons
	}  // end dialog data
    );  // end dialog function
} // end login function

/*
  After getting a login response from the server, error check that form
  was properly filled.  

  If not filled properly, send them back to the login. 
*/
glo.prototype.customs = 
    function customs(response,username,password,dialog,box)
{
    var object = this;
    console.log(response);

    // tie up login's loose ends.
    emptyElement("login");
    removeElement("login");
    box.dialog("close");

    
    // give 'em the boiler room treatment
    // might want to act accordingly, but for now each of these is the same
    // alert and send back to login.
    if (response === 'invalid combination.')
    {
	alert(response);
	object.login();  // try again
    }
    else if (response === "password cannot be empty.")
    {
	alert(response);
	object.login();  // try again
    }
    else if (response ===  "username cannot be empty.")
    {				    
	alert(response);
	object.login();  // try again
    }
    else if (response ===  "error creating new user.")
    {				    
	alert(response);
	object.login();  // try again
    }
    else
    {
	// houston you are clear for lift off, here are your papers, happy hunting
	object.user.name = username;
	object.user.password = password;
	object.refresh();
    }
    
}

glo.prototype.refresh = 
    function refresh()
{
    var object = this;
    object.setupGoals();
    object.setupIndustries();
    object.setupCompanies();
    object.setupLocations();
    object.setupPostings();
    object.setupContacts();
    object.setupSchedules();
    object.setupBlog();

}


/*
  empty tables and calendars then refill them from db
*/
glo.prototype.setupSchedules = 
    function setupSchedules()
{
    var object = this.schedules;

    console.log("from setupSchedule: object=");
    console.log(object);

    // empty calendar events
    $("#calendarPortlet").fullCalendar('removeEvents');
    $("#calendar").fullCalendar('removeEvents');

    // empty main table
    var calEd = $("#calEdit")[0];
    emptyElement(calEd);

    // var calEdField = addInput(calEd,'text','','','EventToAdd');
    var addButton = addInput(calEd,'button','','Add Event','addEventButton');
    addButton.data = object; 
    addButton.type="button";


    // wire button
    addButton.onclick = insertSchedule;

    // insert empty results table
    var table = createAppendedChildToParent('table',calEd);
    this.schedules.table = table;
    table.id = 'tableOfEvents';
    table.className = 'io';
    // table.style.tableLayout = "fixed";
    // table.style.width = "50%";



    // get events from db and refill calendars in callback
    getStuff(this.schedules);
}


/*
  Empty the tables of goals and rebuild them.
*/
glo.prototype.setupGoals = 
    function setupGoals()
{
    var goals = $("#goals")[0]; // container div
    
    emptyElement(goals);

    // add text fields
    // goals.appendChild(document.createTextNode('Goals'));
    var goalField = addInput(goals,'text','','','GoalToAdd');

    // add button
    var addButton = addInput(goals,'button','','Add Goal','addGoalButton');

    // wire button
    addButton.onclick = insertGoal.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',goals);
    this.goals.table = table;
    table.id = 'tableOfGoals';
    table.className = 'io';

    // fill results table
    getStuff(this.goals);

}

/*
  Empty the tables of industries and rebuild them.
*/
glo.prototype.setupIndustries = 
    function setupIndustries()
{
    var industries = $("#industries")[0]; // container div
    
    emptyElement(industries);

    // add text fields
    // industries.appendChild(document.createTextNode('Industries'));
    var industryField = addInput(industries,'text','','','IndustryToAdd');

    // add button
    var addButton = addInput(industries,'button','','Add Industry','addIndustryButton');

    // wire button
    addButton.onclick = insertIndustry.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',industries);
    this.industries.table = table;
    table.id = 'tableOfIndustries';
    table.className = 'io';

    // fill results table
    getStuff(this.industries);

}


/*
  Empty the tables of companies and rebuild them.
*/
glo.prototype.setupCompanies = 
    function setupCompanies()
{
    var companies = $("#companies")[0]; // container div
    
    emptyElement(companies);

    // add text fields
    // companies.appendChild(document.createTextNode('Companies'));
    var companyField = addInput(companies,'text','','','CompanyToAdd');

    // add button
    var addButton = addInput(companies,'button','','Add Company','addCompanyButton');

    // wire button
    addButton.onclick = insertCompany.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',companies);
    this.companies.table = table;
    table.id = 'tableOfCompanies';
    table.className = 'io';

    // fill results table
    getStuff(this.companies);

}


/*
  Empty the tables of locations and rebuild them.
*/
glo.prototype.setupLocations = 
    function setupLocations()
{
    var locations = $("#locations")[0]; // container div
    
    emptyElement(locations);

    // add text fields
    // locations.appendChild(document.createTextNode('Locations'));
    var locationField = addInput(locations,'text','','','LocationToAdd');

    // add button
    var addButton = addInput(locations,'button','','Add Location','addLocationButton');

    // wire button
    addButton.onclick = insertLocation.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',locations);
    this.locations.table = table;
    table.id = 'tableOfLocations';
    table.className = 'io';

    // fill results table
    getStuff(this.locations);

}





/*
  Empty the tables of postings and rebuild them. 
*/
glo.prototype.setupPostings = 
    function setupPostings()
{
    var postings = $("#postings")[0]; // container div
    //var postings = this.postings.table;
    
    emptyElement(postings);

     var addButton = addInput(postings,'button','','Add posting','addPostingButton');
     var scrapeButton = addInput(postings,'button','','Scrape Postings','addScrapingButton');

    // wire addButton
    addButton.onclick = insertPosting.bind(this);

    // wire scrapeButton
    scrapeButton.onclick = scrapePostings.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',postings);
    this.postings.table = table;
    table.id = 'tableOfPostings';
    table.className = 'io';

    // fill results table
    getStuff(this.postings);

}



/*
  Empty the tables of contacts and rebuild them.
*/
glo.prototype.setupContacts = 
    function setupContacts()
{
    var contacts = $("#contacts")[0]; // container div
    
    emptyElement(contacts);

    var input = createAppendedChildToParent('table',contacts);
    // input.style.width = "100%";
    // input.style.tableLayout = "fixed";

    var tr = createAppendedChildToParent('tr',input);
    var td = createAppendedChildToParent('td',tr);

    // add text fields
    td.appendChild(document.createTextNode('First Name'));
    var fnameField = addInput(td,'text','','','fnameToAdd');

    // new cell
    td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Last Name'));
    var lnameField = addInput(td,'text','','','lnameToAdd');

    // new cell
    td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Email'));
    var emailField = addInput(td,'text','','','emailToAdd');

    // new row
    tr = createAppendedChildToParent('tr',input);
    td = createAppendedChildToParent('td',tr);

    td.appendChild(document.createTextNode('Phone'));
    var phoneField = addInput(td,'text','','','phoneToAdd');

    // new cell
    td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Facebook'));
    var facebookField = addInput(td,'text','','','facebookToAdd');

    // new row
    tr = createAppendedChildToParent('tr',input);
    // new cell
    td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Linked In'));
    var linkedinField = addInput(td,'text','','','linkedinToAdd');

    // new cell
    td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Github'));
    var githubField = addInput(td,'text','','','githubToAdd');

    // new cell
    td = createAppendedChildToParent('td',tr);
    // add button
    var addButton = addInput(td,'button','','Add Contact','addContactButton');

    // wire button
    addButton.onclick = insertContact.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',contacts);
    this.contacts.table = table;
    table.id = 'tableOfContacts';
    table.className = 'io';

    // fill results table
    getStuff(this.contacts);

}


/*
  Empty the tables of blog and rebuild them.
*/
glo.prototype.setupBlog = 
    function setupBlog()
{
    var blog = $("#blog")[0]; // container div
    
    emptyElement(blog);

    // add text fields
    // blog.appendChild(document.createTextNode('Blog'));
    var blogField = addInput(blog,'text','','','BlogToAdd');

    // add button
    var addButton = addInput(blog,'button','','Add Blog','addBlogButton');

    // wire button
    addButton.onclick = insertBlog.bind(this);

    // insert empty results table
    var table = createAppendedChildToParent('table',blog);
    this.blog.table = table;
    table.id = 'tableOfBlog';
    table.className = 'io';

    // fill results table
    getStuff(this.blog);

}


/*
  This function should remove an element from the database. 
*/
function remover(e)
{
    // e is an event
    // object is bound to the button as "data" property
    console.log(this.data);
    var object = this.data; 
    
    // console.log("removing row");
    // console.log(e);
    // console.log(this);
    
    console.log("this.sid:");
    console.log(this.sid);
    var link = this.sid;

    console.log("object.destroyer:");
    console.log(object.destroyer);


    // create a new div for validation

    $("<div title='Remove Item?'><p>Are you sure?</p></div>").dialog
    (
	{
	    modal:true, 
	    buttons:
	    {
		Cancel: function() 
		{
		    $(this).dialog("close")
		},
		"Remove Item":function()
		{
		    $(this).dialog("close");
		    $.ajax
		    (
			{
			    url: "butler.php",
			    type: "post",
			    dataType: "text",
			    data:
			    {
				user: object.parent.user.name,
				pass: object.parent.user.password,
				func: object.destroyer,
				url: link
				// company: comp,
				// source: src
			    },
			    success: function(resp)
			    {
				console.log(JSON.parse(resp));
				// 
				if (JSON.parse(resp) === true)
				{
				    console.log("removal worked");
				    // displayTable(object,[]);
				    getStuff(object);
				}
				else
				{
				    console.log("removal failed");
				    getStuff(object);
				}
			    }	
			}
		    );
		    
		} 
	    } 
	}
    );
    
    
}


/*
  A middle man to get things from the butler.
*/
function getStuff(object)
{
    console.log("getting "+object.type+"s");

    console.log(object);

    // console.log(callback);
    var getter = object.get;
    // var callback = object.display;
    var callback = object.filler;
   
    $.ajax
    (
	{
	    async: true,
	    url: "butler.php",
	    type: "post",
	    //dataType: "text",
	     dataType: "json",
	    data:
	    {
		// getter: true
		user: object.parent.user.name,
		pass: object.parent.user.password,
		func: getter
	    },
	    success: function(resp)
	    {
		console.log("got "+object.type+"s");
		console.log(resp);
		//console.log(object);
		//callback(object, JSON.parse(resp));
		callback(object, resp);
	    }
	}
    )
}




/*
  A generalized callback function to display tables.

*/
function displayTable(object)
{
    // console.log("displaying table");

    var table = object.table;
    emptyElement(table);
    var tr = createAppendedChildToParent('tr',table);

    // console.log("from displayTable");
    // console.log(object);

    // add headers (for table)
    for (var i = 0; i < object.displayKeys.length; i++)
    {
	var th = createAppendedChildToParent('th',tr);
	var content = document.createTextNode(object.displayKeys[i]);
	th.appendChild(content);
    }
    

    // insert into DOM elements stored in object
    for (var i = 0; i < object.contents.length; i++)
    {
	tr = createAppendedChildToParent('tr',table);
	var contents = object.contents[i];

	for (var key in contents)
	{
	    if (isInArray(key, object.displayKeys))
		{
		    var td = createAppendedChildToParent('td',tr);


		    // http://stackoverflow.com/questions/10888198/how-do-i-get-html-tags-inside-of-a-javascript-text-node

		    // the following does not work 
		    // if element is a link
		    // --------------------------
		    
		    /*
		    var content = document.createTextNode(contents[key]);
		    td.appendChild(content);
		    */

		    // there's probably a way around using innerHTML
		    // but this is quick and dirty for now
		    
		    td.innerHTML = contents[key];

		    // next cell
		}
	}
	td = createAppendedChildToParent('td',tr);
	var button = createAppendedChildToParent('input',td);
	button.type = "button"; 	button.value = "remove";
	button.data = object;		button.sid = object.contents[i].sid;	
	button.onclick = object.removeFunction;
	
	var button = createAppendedChildToParent('input',td);
	button.type = "button"; 	button.value = "edit";
	button.data = object;		button.sid = object.contents[i].sid;	
	button.onclick = object.editFunction;

    }   
}


/*
  Adding clicks and storing SQL ids in DOM for arbitrary gregsList
  objects that can render as tables. 
*/
function embelishTable(object,callback)
{

    var tableId = object.table.id;
    // debugging info
    /*
    console.log("embelishTable called on ");
    console.log(object);
    
    console.log("object's table is ");
    console.log(object.table);
        
    console.log("tableId is " + tableId);
    */

    // hide first children (headers and columns)   
    $("#" + tableId + " tr th:first-child").css("display","none");
    $("#" + tableId + " tr td:first-child").css("display","none");
    

    // add analytics to titles on click.  (This probably deserves its own function)
    $("#" + tableId + " tr td:nth-child(2)")

	.click(
	    function()
	    {
		// get posting object by sid (stored in hidden cell)		
		var sid = $(this.previousSibling).text();	// get sid from DOM

		var specific = gregsListObjectById(sid,object.type); // get sub object
		console.log("got " + object.type + " object by ID");
		callback(specific, object.type);

	    }
	);  // end click

}

// object are those from class.js, not objects.js
function dialogObjectWrapper2(object,type)
{
    var title;   

    // see classes.js for object definitions
    if ( type == "goal" )
    {
	title = object.value;
    }
    else if ( type ==  "industry"  )
    {
	title = object.name;
    }
    else if ( type == "company" )
    {
	title = object.name;
    }
    else if ( type == "location" )
    {
	title = object.name;
    }
    else if ( type == "posting" )
    {
	title = object.title;
    }

    console.log("title="+title);

    var popUp;
    popUp = document.createElement('div');
    popUp.id = 'popUpNotes';
    popUp.title = title + " Notes";
    
    
    $(popUp)
	.dialog
    (
	{
	    modal:true,
	    height: 0.5 * $(window).width(),  // "auto",
	    width:"70%",
	    buttons:
	    {
		"Add Note":function()
		{
		    console.log("add notes clicked");

		    addObjectNote(object,type);

		    $(this).dialog('close');

		},
		"Close":function()
		{
		    $(this).dialog('close');
		}
		
	    }
	}
    ); // end .dialog

    getObjectNotes(object,type,popUp);

}


// object is from classes.js not objects.js
function getObjectNotes(object,type,div)
{
    // show that data structures are on track 
    console.log('getting object notes');
    console.log(object);
    // console.log(object.parent); // undefined
    console.log(type);
    console.log('object.sid');
    console.log(object.sid);

    var getter; 
    // sort out getter functions by type
    // see classes.js for object definitions
    if ( type == "goal" )
    {
	getter = 'getNotesOnGoal';
    }
    else if ( type ==  "industry"  )
    {
	getter = 'getNotesOnIndustry';
    }
    else if ( type == "company" )
    {
	getter = 'getNotesOnCompany';
    }
    else if ( type == "location" )
    {
	getter = 'getNotesOnLocation';
    }
    else if ( type == "posting" )
    {
	getter = 'getNotesOnPosting';
    }
    
    console.log(getter);



    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    //dataType: "text",
	    data:
	    {
		user: gregsList.user.name,
		pass: gregsList.user.password,
		func: getter,
		id: object.sid
	    },
	    success: function(resp)
	    {
		// resp contains an array of ints (sIDs to blog postings)
		// the blog texts should already be loaded in javascript memory. 
		// (gregsList.blog.contents)
		var postingBlogIDs = JSON.parse(resp);

		console.log("got notes on " + type  + " " + object.sid);
		console.log(resp);
		console.log(JSON.parse(resp));


		// get a reference to the popUp dialog window in DOM
		// var div = document.getElementById(postingPopUp.id);
		// var div = document.getElementById("popUpNotesOnPosting");
		emptyElement(div);
		console.log(div.innerHTML)

		// callback should display a tableOfBlogs.		
		// var tableTitle = '"tableOfBlogsOn'+object.title+'"';
		var tableTitle = 'tableOfBlogsOnPosting';
		var table = createAppendedChildToParent('table',div);
		table.id = tableTitle;
		// table.border = '1';
		table.className = "io"; 
		// $('#popUpWindowForJobPosting').append("<table id="+tableTitle+"></table>");		
		// loop over postingBlogIDs
		console.log("looping over blog ids");
		for ( var i = 0; i < postingBlogIDs.length; i++ )
		{
		    
		    var thisID = postingBlogIDs[i];
		    // console.log("i="+i);
		    console.log("thisID="+thisID);
		    // var tr = createAppendedChildToParent(tr,table);
		    // tr.innerHTML = gregsList.blog.contents[thisID].text;


		    
		    // loop over gregsList.blog.contents
		    for ( var j = 0;  j < gregsList.blog.contents.length; j++ )
		    {
			// console.log("j="+j)
			// console.log(gregsList.blog.contents[j].sid);

			if ( gregsList.blog.contents[j].sid ==  thisID  )
			{
			    // insert blog to DOM table
			    console.log("got a hit")
			    var tr = createAppendedChildToParent('tr',table);
			    var td = createAppendedChildToParent('td',tr);
			    td.innerHTML = gregsList.blog.contents[ j ].text;
			}
		    }
		}
	    } // end success func
	} // end ajax json
    ) // end ajax parameters


}



// object is from classes.js not objects.js
function addObjectNote(object,type)
{
    console.log('adding object notes');
    console.log(object);

    // build form 
    var string = buildBlogFormString();

    $(string).dialog
    (
	{
	    width: "80%",
	    //height: "80%",
	    height: 400,
	    
	    open: function()
	    {
		fixBlogUpdaterDialogCSS();
	    },

	    modal:true, 
	    buttons:
	    {
		Cancel: function() 
		{
		    $(this).dialog("close")
		},
		"Insert":function()
		{
		    // get values from form
		    var title = $("#blogUpdateEmbedTitle")[0].value;
		    var text = $("#blogPostContentsToAdd")[0].value;

		    // display what we're doing
		    console.log("sending " + 
				"title=" + title + ", " +
				"text=" + text + ", " +
				" to the butler."
			       );

		    
		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#scheduleUpdater")[0]);
		    var toDestroy = 
			[
			    "blogPostContentsToAdd",
			    "blogDialogAddTable",
			    "blogUpdater"
			];

		    for (var i=0; i < toDestroy.length; i++)
			removeElement(toDestroy[i]);

		    // givePostingNoteInsertionToButler(postingObject,title,text)
		    insertObjectNote(object,type,title,text);

		}
	    }
	}
    );
}

function insertObjectNote (object,type,title,text)
{
    var putter; 
    // sort out putter functions by type
    // see classes.js for object definitions
    if ( type == "goal" )
    {
	putter = 'insertNotesGoalUser';
    }
    else if ( type ==  "industry"  )
    {
	putter = 'insertNotesIndustryUser';
    }
    else if ( type == "company" )
    {
	putter = 'insertNotesCompanyUser';
    }
    else if ( type == "location" )
    {
	putter = 'insertNotesLocationUser';
    }
    else if ( type == "posting" )
    {
	putter = 'insertNotesPostingUser';
    }
    
    console.log(putter);
    

    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		user: gregsList.user.name,
		pass: gregsList.user.password,
		func: putter,
		// sid: link,
		title: title,
		text: text,
		id: object.sid,
		// func: "insertNotesPostingUser"
	    },
	    success: function(resp)
	    {
		console.log(resp);
		gregsList.refresh();
	    }	
	}
    );
}


// this might be too general unfortunately 
function dialogObjectWrapper(object,type)
{
    /*
    console.log(object);
    console.log(object.type);
    console.log(typeof object);
    */

    //var type = object.type;
    var title;   

    // see classes.js for object definitions
    if ( type == "goal" )
    {
	title = object.value;
    }
    else if ( type ==  "industry"  )
    {
	title = object.name;
    }
    else if ( type == "company" )
    {
	title = object.name;
    }
    else if ( type == "location" )
    {
	title = object.name;
    }

    console.log("title="+title);

    // create a string to hold a div object
    var innerDiv = '<div id="'+title+'-dialog" title="'+title+'">'; 
    innerDiv += '</div>';

    // initialize a local buttons container
    var objectButtons = {};


    // concatenate buttons from object
    // push all the parent object button types into the container
    for ( var index in object.buttons  )
    {
	objectButtons[index] = object.buttons[index];
	console.log('objectButtons: '+index);
	console.log(objectButtons[index]);
    }

    // add a close button
    objectButtons["Close"] = function()
    {
	// removeElement(innerDiv);
	$(this).dialog('close');
    }

    
    
    $(innerDiv)
    .dialog
    (
	{
	    modal:true,
	    buttons: objectButtons
	}
    )
}



/*
  There's probably a cleaner way to get objects by id.
*/
function gregsListObjectById(sid,type)
{
    console.log("searching for sid=" + sid);
    
    var object;


    // get object from type
    if (type === "goal")
	object = gregsList.goals;
    else if (type === "industry") 
	object = gregsList.industries;
    else if (type === "company") 
	object = gregsList.companies;
    else if (type === "location") 
	object = gregsList.locations;
    else if (type === "posting") 
	object = gregsList.postings;
    else if (type === "contact") 
	object = gregsList.contacts;
    else if (type === "schedule") 
	object = gregsList.schedules;
    else if (type === "blog") 
	object = gregsList.blog;


    // loop over object type
    for ( var i = 0; i < object.contents.length; i++ )
    {
	
	var specific = object.contents[i]; 
	// console.log("posting["+i+"]="+posting.sid);
	
	if ( specific.sid == sid  )
	{
	    return specific;
	}
    }

}

// generic function to show notes about an object
// as of Mon Jul 20, 2015 18:10:02 this is too difficult
// will only work with specifics

// glo.prototype.showNotesOnObject = 
function showNotesOnObject(object)
{
    console.log('showing notes on object');
    // try to figure out object type
    console.log(object);
    console.log(object.type);
}
