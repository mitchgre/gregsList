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
	    displayKeys: ["value"]
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
	    displayKeys: ["name"]
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
	    displayKeys: ["title","url","location","company","source"] // values to display in table
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
	    displayKeys: ["name"] // values to display in table
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
	    displayKeys: ["name"] // values to display in table
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
	    displayKeys: ["fname","lname","email","phone",
			  "facebook","linkedin","github"] // values to display in table

	};
    this.schedules =
	{
	    parent: this,
	    contents: [],
	    filler: fillSchedules,
	    type: "contact",
	    get: "getSchedules",
	    display: null,//displaySchedules,
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
	object.setupGoals();
	object.setupIndustries();
	object.setupCompanies();
	object.setupLocations();
	object.setupPostings();
	object.setupContacts();
	object.setupSchedules();
    }
    
}

/*
  empty the calendars and refill them from db
*/
glo.prototype.setupSchedules = 
    function setupSchedules()
{
    // empty calendar events
    $("#calendarPortlet").fullCalendar('removeEvents');
    $("#calendar").fullCalendar('removeEvents');

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

    // add inputs
    var input = createAppendedChildToParent('table',postings);
    input.style.width = "100%";
    input.style.tableLayout = "fixed";
    var tr = createAppendedChildToParent('tr',input);

    // add button
    var td = createAppendedChildToParent('td',tr);
    var addButton = addInput(td,'button','','Add posting','addPostingButton');

    // add text fields
    var td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Title'));
    var titleField = addInput(td,'text','','','postingTitleToAdd');
 
    var td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Link'));
    var linkField = addInput(td,'text','','','postingLinkToAdd');

    var td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Company'));
    var companyField = addInput(td,'text','','','postingCompanyToAdd');

    var td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Location'));
    var companyField = addInput(td,'text','','','postingLocationToAdd');

    var td = createAppendedChildToParent('td',tr);
    td.appendChild(document.createTextNode('Source'));
    var sourceField = addInput(td,'text','','','postingSourceToAdd');


    // wire button
    addButton.onclick = insertPosting.bind(this);

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
    console.log("getting for ");
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
		console.log("got stuff!");
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

    console.log("from displayTable");
    console.log(object);

    // console.log("input");
    // console.log(input);

    // add headers
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
		    var content = document.createTextNode(contents[key]);
		    td.appendChild(content);
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

