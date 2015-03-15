
function insertSchedule()
{
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
	$("#calendarPortlet").fullCalendar('renderEvent',{title:name,
						   sid: id,
						   description:description,
						   location:location,
						   contact:contact,
						   url:url,
						   start:start,
						   end:end
						  },true);// add to calendars

    }
    
    // no user defined table here, need to push into calendar above
    // displayTable(object);
    

}
