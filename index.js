$(document).ready
(
    function()
    {

	// setup tabs via  jQuery-ui
	$("#encapsulator").tabs();
	// $("#calendar").resizable();
	


	setupCalendar('#calendar');
	
	// getPostings();

	gregsList = new glo(); // main object 

	// gregsList.setupPostings();

	
	// display postings, companies, contacts, goals

	// get and display job postings	
	// getStuff(gregsList.postings);
	// getStuff(gregsList.companies);
	
	setupPortlets();

	//$("#companiesPortlet").clone($("#tableOfCompanies"));	
	// $("#tableOfCompanies").clone().appendTo( "#companiesPortlet" );
	//$("#postingsPortlet").append($("#tableOfPostings"));

	//$("#calendarPortlet").css("width","66%");
	setupCalendar('#calendarPortlet');

	// console.log("getter = ");
	// console.log(gregsList.postings.get);
    }
);


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
	}
    this.contacts =
	{
	    get: "getContacts",
	    display: displayTable,
	    table: $("#tableOfContacts")[0],
	    add: null
	}
    this.schedules =
	{
	    get: "getSchedules",
	    display: null,//displaySchedules,
	    add: null
	}
    this.login();
}

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
	    box: $(this).dialog,
	    buttons:
	    {
		/*
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


glo.prototype.customs = 
    function customs(response,username,password,dialog,box)
{
    var object = this;
    console.log(response);

    emptyElement("login");
    removeElement("login");
    box.dialog("close");

    
    // give 'em the boiler room treatment
    // might want to act accordingly, but for now each of these is the same
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
    else
    {
	// houston you are clear for lift off, here are your papers, happy searching
	object.user.name = username;
	object.user.password = password;
	object.setupPostings();
	object.setupCompanies();
    }
    
}



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


function insertCompany()
{
    var object = this;
    var toAdd = $("#CompanyToAdd")[0].value;
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
		func: "insertCompany",
		company: toAdd,
	    },
	    success: function(resp)
	    {
		console.log(resp);
		// 
		// clear text fields
		$("#CompanyToAdd")[0].value = '';
		
		if (JSON.parse(resp) === true)
		{
		    console.log("input worked");
		    // displayTable(object,[]);
		    getStuff(object.companies);
		}
		else
		{
		    console.log("input failed");
		}
		
	    }	
	}
    )
   
}

/*
  Get value from textboxes, and hand off to the butler
*/
function insertPosting()
{
    var object = this;

    var ttl = $("#postingTitleToAdd")[0].value;
    var link = $("#postingLinkToAdd")[0].value;
    var comp = $("#postingCompanyToAdd")[0].value;
    var loc = $("#postingLocationToAdd")[0].value;
    var src = $("#postingSourceToAdd")[0].value;
    

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
		func: "insertPosting",
		url: encodeURIComponent(link),
		title: ttl,
		company: comp,
		location: loc,
		source: src
	    },
	    success: function(resp)
	    {
		console.log(resp);
		// 
		// clear text fields
		$("#postingTitleToAdd")[0].value = '';
		$("#postingLinkToAdd")[0].value = '';
		$("#postingCompanyToAdd")[0].value = '';
		$("#postingSourceToAdd")[0].value = '';

		if (JSON.parse(resp) === true)
		{
		    console.log("input worked");
		    // displayTable(object,[]);
		    getStuff(object.postings);
		}
		else
		{
		    console.log("input failed");
		}
	    }	
	}
    )


    
}


function editPosting()
{
    var object = this.data; 
    
    console.log("this.sid:");
    console.log(this.sid);
    var link = this.sid;
    
    console.log("object.destroyer:");
    console.log(object.destroyer);

    var index;
    // find hash index 
    for (var i=0; i < object.contents.length; i++)
    {
	if (object.contents[i].sid === link)
	    index = i;
    }
    console.log("index:"+index);

    var current = object.contents[index];

    // build form 
    var string  = '<div id="postingUpdater" title="Update '+object.type+'">';
    string += '<table>';
    string += '<tr>';
    string += '<td>title</td>'; 

    string += '<td>';
    string += '<input id="embedTitle" value="'+current.title+'">';
    string += '</td>';
    string += '</tr>';


    string += '<tr><td>url</td>';
    string += '<td><input id="embedURL" value="'+current.url+'"></td></tr>';

    string += '<tr><td>company</td>';
    string += '<td><input id="embedCompany" value="'+current.company+'"></td></tr>';

    string += '<tr><td>location</td>';
    string += '<td><input id="embedLocation" value="'+current.location+'"></td></tr>';

    string += '<tr><td>source</td>';
    string += '<td><input id="embedSource" value="'+current.source+'"></td></tr>';
    string += '</div>';

    $(string).dialog
    (
	{
	    modal:true, 
	    buttons:
	    {
		Cancel: function() 
		{
		    $(this).dialog("close")
		},
		"Update":function()
		{
		    // get values from form
		    var title = $("#embedTitle")[0].value;
		    var url = $("#embedURL")[0].value;
		    var comp = $("#embedCompany")[0].value;
		    var loc = $("#embedLocation")[0].value;
		    var source = $("#embedSource")[0].value;

		    console.log("title:"+title);
		    console.log("url:"+url);
		    console.log("comp:"+comp);
		    console.log("loc:"+loc);
		    console.log("source:"+source);

		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#postingUpdater")[0]);
		    var toDestroy = 
			[
			    "embedSource","embedLocation",
			    "embedCompany","embedURL",
			    "embedTitle","postingUpdater"
			];

		    for (var i=0; i < toDestroy.length; i++)
			removeElement(toDestroy[i]);



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
				func: object.updater,
				sid: link,
				title: title,
				url: encodeURIComponent(url),
				company: comp,
				location: loc,
				source: source
			    },
			    success: function(resp)
			    {
				console.log(resp);
				//console.log(JSON.parse(resp));
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
				}
			    }	
			}
		    );
		    
		}
	    }
	}
    );

}


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
				}
			    }	
			}
		    );
		    
		} 
	    } 
	}
    );
    
    
}


function fillCompanies(object,input)
{
    // erase previous contents
    object.contents = [];
    var contents = object.contents;
    
    for (var i = 0; i < input.length; i++)
    {
	var name = input[i];

	var p = new company(null,name,null);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    
}
    


function fillPostings(object, input)
{

    console.log("object");
    console.log(object);

    //console.log("input keys");
    // console.log(input);
    //console.log(JSON.parse(Object.keys(input)));

    

    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var title = input.titles[i];
	var url = input.urls[i];
	var location = input.locations[i];
	var company = input.companies[i];
	var source = input.sources[i];

	var p = new posting(id,title,url,location,company,source);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    
}


/*
  A middle man to get things from the butler.
*/
function getStuff(object)
{
    console.log(object);
    console.log("username,password=");
    console.log(object.parent.user.name);
    console.log(object.parent.user.password);

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


function getPostings()
{
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		getPostings: true
	    },
	    success: function(resp)
	    {
		displayPostings(JSON.parse(resp));
	    }	
	}
    )
}

function displayPostings(input)
{
    var table = $("#tableOfPostings")[0]; //  get table in DOM
    
    

    // remove it's children and rebuild them later
    while (table.firstChild)
	table.removeChild(table.firstChild);
    
    // var table = createAppendedChildToParent('table',postings);

    // insert postings retrieved via ajax
    for (var i = 0; i < input.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	// var th = createAppendedChildToParent('th',tr);
	var td = createAppendedChildToParent('td',table);
	var content = document.createTextNode(input[i]);
	td.appendChild(content);
    }
    
}





function setupCalendar(divId)
{
    $(divId).fullCalendar
    (
	{
	    header:  
	    {
		left: 'prev,next today',
		center: 'title',
		right: 'month,basicWeek,basicDay'
	    },
	    editable: true,
	    droppable: true,
	    //theme: true,
	    // resizable: true,
	    events: 
	    [
		{
		    title: 'get calendar working',
		    start: '2015-03-07T23:00:00',
		    end: '2015-03-11T23:59:00'
		}
	    ]
	}
    );
}

function setupPortlets()
{
    $(".column").sortable
    (
	{
	    connectWith: ".column",
	    handle: ".portlet-header",
	    cancel: ".portlet-toggle",
	    placeholder: "portlet-placeholder ui-corner-all"
	}
    );
    
    $( ".portlet" )
	.addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
	.find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
    
    $( ".portlet-toggle" ).click(function() {
	var icon = $( this );
	icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
	icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
    });

    
    $(".portlet").resizable().css({overflow:'auto'});
    
}
