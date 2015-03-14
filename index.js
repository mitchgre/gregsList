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
  A basic setup for the jQuery full calendar.

  http://fullcalendar.io/

*/
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

/*
  A basic setup for jQuery ui portlets.  

  http://jqueryui.com/sortable/#portlets

  Portlets will contain a non-ediable overview of the users data.
*/
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
