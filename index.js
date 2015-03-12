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
    this.postings = 
	{
	    contents: [],		// array of values to be filled from data store
	    filler: fillPostings,	// javascript function to fill contents from data store
	    type: "posting",
	    get: "getPostings",		// php function to call
	    display: displayTable,	// javascript function to display
	    table: $("#tableOfPostings")[0],	// a reference to the div container. set in setupPostings()
	    add: null,			// php function to add posting
	    removeFunction: remover,	// javascript function to remove
	    destroyer: "removePosting", // php function to remove
	    displayKeys: ["title","url","company","location","source"] // values to display in table
	};
    this.companies =
	{
	    contents: [],
	    filler: null,
	    type: "company",
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
    // this.setupCompanies();
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

    console.log("object.destroyer:");
    console.log(object.destroyer);



    // object is automatically gol.postings.  

    // get url from DOM
    // 'this' is the button clicked
    /*
    var td = this.parentNode;
    var tr = this.parentNode.parentNode;
    var link = tr.firstChild.innerHTML;


    console.log(link);
    console.log(encodeURIComponent(link));
    */
    
    var link = this.sid;
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
    // console.log(object);
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
