$(document).ready
(
    function()
    {

	// setup tabs via  jQuery-ui
	$("#encapsulator").tabs();
	// $("#calendar").resizable();
	
	setupCalendar();
	// getPostings();

	var gregsList = new glo(); // main object 
	
	// display postings, companies, contacts, goals

	// get and display job postings	
	getStuff(gregsList.postings);
	


	// console.log("getter = ");
	// console.log(gregsList.postings.get);
    }
);


function setupCalendar()
{
    $('#calendar').fullCalendar
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

/*
  A class to contain mappings to functions
*/
function glo()  // gregsList Object 
{
    this.postings = 
	{
	    get: "getPostings",		// php function to call
	    display: displayTable,	// javascript function to display
	    table: $("#tableOfPostings")[0],	// a reference to the div container
	    add: null			// php function to add posting
	};
    this.companies =
	{
	    get: "getCompanies",
	    display: displayCompanies,
	    add: null
	}
    this.contacts =
	{
	    get: "getContacts",
	    display: displayContacts,
	    add: null
	}
    this.schedules =
	{
	    get: "getSchedules",
	    display: displaySchedules,
	    add: null
	}
}

/*
  A middle man to get things from the butler.
*/
function getStuff(object)
{
    //console.log(getter);
    //console.log(callback);
    var getter = object.get;
    var callback = object.display;

    $.ajax
    (
	{
	    async: true,
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		// getter: true
		func: getter
	    },
	    success: function(resp)
	    {
		//console.log(resp);
		callback(object, JSON.parse(resp));
	    }
	}
    )
}

/*
  A callback function to render responses from getStuff()
*/
function displayTable(object, input)
{
    var table = object.table;
    while (table.firstChild)
	table.removeChild(table.firstChild);


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

function displayCompanies()
{
}

function displayContacts()
{
}

function displaySchedules()
{
}

function displayGoals()
{
}

function testButler ()
{
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		a:"alpha",
		b:"beta",
		c:"gamma",
		d:"delta"
	    },
	    success: function(response)
	    {
		console.log(response);
	    }
	}
    );
}


// create a child DOM element of type childType ct and append to parent p
// return the created child 
function createAppendedChildToParent( ct ,parent)
{
    var c = document.createElement(ct);
    parent.appendChild(c);
    return c;
}
