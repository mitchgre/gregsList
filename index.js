$(document).ready
(
    function()
    {

	// setup tabs via  jQuery-ui
	$("#encapsulator").tabs();
	// $("#calendar").resizable();
	
	setupCalendar();

	
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
