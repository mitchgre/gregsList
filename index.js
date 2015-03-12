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
	//getStuff(gregsList.postings);
	getStuff(gregsList.companies);
	
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
    this.postings = 
	{
	    get: "getPostings",		// php function to call
	    display: displayTable,	// javascript function to display
	    table: $("#tableOfPostings")[0],	// a reference to the div container. set in setupPostings()
	    add: null,			// php function to add posting
	    removeFunction: remover, // javascript function to remove
	    destroyer: "removePosting" // php function to remove
	};
    this.companies =
	{
	    get: "getCompanies",
	    display: displayTable,
	    table: $("#tableOfCompanies")[0],
	    add: null,
	    removeFunction: remover,
	    destroyer: "removeCompany" // php function to remove
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
    
    this.setupPostings();
    this.setupCompanies();
}

glo.prototype.setupPostings = 
    function setupPostings()
{
    var postings = $("#postings")[0]; // container div
    //var postings = this.postings.table;
    
    emptyElement(postings);


    // add text fields
    postings.appendChild(document.createTextNode('Link'));
    var linkField = addInput(postings,'text','','','postingLinkToAdd');

    postings.appendChild(document.createTextNode('Company'));
    var companyField = addInput(postings,'text','','','postingCompanyToAdd');

    postings.appendChild(document.createTextNode('Source'));
    var sourceField = addInput(postings,'text','','','postingSourceToAdd');

    // add button
    var addButton = addInput(postings,'button','','Add posting','addPostingButton');

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
    var link = $("#postingLinkToAdd")[0].value;
    var comp = $("#postingCompanyToAdd")[0].value;
    var src = $("#postingSourceToAdd")[0].value;
    

    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		func: "insertPosting",
		url: encodeURIComponent(link),
		company: comp,
		source: src
	    },
	    success: function(resp)
	    {
		// console.log(resp);
		// 
		// clear text fields
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

function removeCompany()
{
    var object = this.data; 

    var td = this.parentNode;
    var tr = this.parentNode.parentNode;
    var link = tr.firstChild.innerHTML;
    
}

function remover(e)
{
    // e is an event
    
    // console.log("removing row");
    // console.log(e);
    // console.log(this);

    // object is bound to the button as "data" property
    console.log(this.data);
    var object = this.data; 

    // object is automatically gol.postings.  

    // get url from DOM
    // 'this' is the button clicked
    var td = this.parentNode;
    var tr = this.parentNode.parentNode;
    var link = tr.firstChild.innerHTML;

    console.log(link);
    console.log(encodeURIComponent(link));
    
    
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
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
    )
    
    
}




/*
  A function to render an input type to a container div (element).
*/
function addInput(parentDiv, inputType, inputClass, inputValue, inputId)
{
    var input = createAppendedChildToParent('input',parentDiv);
    input.type = inputType;
    
    if (inputClass)
	input.type = inputClass;
    
    if (inputValue)
	input.value = inputValue;
    
    if (inputId)
	input.id = inputId;
    
    return input;
}

/*
  A middle man to get things from the butler.
*/
function getStuff(object)
{
    // console.log(object);
    // console.log(callback);
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
		console.log(resp);
		// console.log(object);
		callback(object, JSON.parse(resp));
	    }
	}
    )
}

/*
  Remove all of element e's children from DOM
*/
function emptyElement(e)
{
    if (typeof e != 'undefined')
	if (e.firstChild)
	    while (e.firstChild)
		e.removeChild(e.firstChild);
}

/*
  A generalized callback function to display tables.
*/
function displayTable(object, input)
{
    // console.log("displaying table");

    var table = object.table;
    emptyElement(table);


    // insert into DOM elements retrieved via ajax
    for (var i = 0; i < input.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	// var th = createAppendedChildToParent('th',tr);
	var td = createAppendedChildToParent('td',tr);
	var content = document.createTextNode(input[i]);
	td.appendChild(content);
	// next cell
	td = createAppendedChildToParent('td',tr);
	var button = createAppendedChildToParent('input',td);
	button.type = "button"; 	button.value = "remove";
	button.data = object;
	button.onclick = object.removeFunction;

	var button = createAppendedChildToParent('input',td);
	button.type = "button"; 	button.value = "edit";
	
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


// create a child DOM element of type childType ct and append to parent p
// return the created child 
function createAppendedChildToParent( ct ,parent)
{
    var c = document.createElement(ct);
    parent.appendChild(c);
    return c;
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
