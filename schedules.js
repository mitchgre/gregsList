
function insertSchedule()
{
    var object = this.data; 
    console.log("from insertSchedule: object = ");
    console.log(object);
    
    console.log("this.sid:");
    console.log(this.sid);
    var link = this.sid;
    
    // console.log("object.destroyer:");
    // console.log(object.destroyer);

    // var current = object.contents[index];

    // build form 
    var string  = '<div id="scheduleUpdater" title="Update Schedule">';
    string += '<table>';

    string += '<tr>';
    string += '<td>name</td>'; 
    string += '<td>';
    string += '<input id="embedName" value="'+null+'">';
    string += '</td>';
    string += '</tr>';

    string += '<tr><td>description</td>';
    string += '<td><input id="embedDescription" value="'+null+'"></td></tr>';

    string += '<tr><td>contact</td>';
    string += '<td><input id="embedContact" value="'+null+'"></td></tr>';

    string += '<tr><td>start</td>';
    string += '<td><input id="embedStart" value="'+'"></td></tr>';
    // add datepicker here

    string += '<tr><td>end</td>';
    string += '<td><input id="embedEnd" value="'+'"></td></tr>';
    // add datepicker here

    string += '</table></div>';



    $(string).dialog
    (
	{
	    // http://stackoverflow.com/questions/13233321/jquery-datepicker-in-a-dialog
	    open: function() 
	    {
		$( "#embedStart" ).datepicker({dateFormat:"yy-mm-dd"});
		$( "#embedEnd" ).datepicker({dateFormat:"yy-mm-dd"});
	    },
	    close: function()
	    {
		$( "#embedStart" ).datepicker('destroy');
		$( "#embedEnd" ).datepicker('destroy');
	    },

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
		    var name = $("#embedName")[0].value;
		    var description = $("#embedDescription")[0].value;
		    var contact = $("#embedContact")[0].value;
		    var start = $("#embedStart")[0].value;
		    var end = $("#embedEnd")[0].value;


		    // display what we're doing
		    console.log("sending " + 
				"name=" + name + ", " +
				"description=" + description + ", " +
				"contact=" + contact + ", " +
				"start=" + start + ", " +
				"end=" + end + ", " 
				+ " to the butler."
			       );

		    
		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#scheduleUpdater")[0]);
		    var toDestroy = 
			[
			    "embedName","embedDescription",
			    "embedContact","embedStart", "embedEnd",
			    "scheduleUpdater"
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
				//func: object.updater,
				// sid: link,
				name: name,
				description: description,
				contact:contact,
				start:start,
				end:end,
				func: "insertSchedule"
				// func: "addSchedule"
			    },
			    success: function(resp)
			    {
				console.log(resp);
				//console.log(JSON.parse(resp));
				// 
//				if (JSON.parse(resp) === true)
				if (resp == "true" )
				{
				    console.log("removal worked");
				    // displayTable(object,[]);
				}
				else
				{
				    console.log("removal failed");
				}
				getStuff(object);  // what is object in this context?
				object.parent.refresh();

			    }	
			}
		    );
		    
		}
	    }
	}
    );

 
}

function editSchedule()
{
}

function fillSchedules(object,input)
{
    console.log("fill schedules");
    console.log(object);


    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var name = input.names[i]; // called 'title' in calendar
	var description = input.descriptions[i];
	var location = input.locations[i];
	var contact = input.contacts[i];
	var url = input.urls[i];
	var start = input.starts[i];
	var end = input.ends[i];

	var p = new schedule(id,name,description,location,contact,url,start,end);

	contents.push(p); // push to glo object
	// calendar should have been emptied prior to calling this function
	$("#calendar").fullCalendar('renderEvent',{title:name,
						   sid: id,
						   description:description,
						   location:location,
						   contact:contact,
						   url:url,
						   start:start,
						   end:end
						  },true);// add to calendars
	// update portlet 
	$("#calendarPortlet").fullCalendar('renderEvent',{title:name,
						   sid: id,
						   description:description,
						   location:location,
						   contact:contact,
						   url:url,
						   start:start,
						   end:end
						  },true);// add to calendars

	displayTable(object);
	displayEventPortlet(object);
    }
    
    // no user defined table here, need to push into calendar above
    // displayTable(object);
    




}


function displayEventPortlet(object)
{
    $("#eventPortlet").empty();

    var main = $("#eventPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var value = object.contents[i].name;
	
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}
