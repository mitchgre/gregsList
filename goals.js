
function insertGoal()
{
    var object = this;

    var goalText = $("#GoalToAdd")[0].value;
    
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		user: object.user.name,
		pass: object.user.password,
		func: "insertGoal",
		goal: goalText
	    },
	    success: function(resp)
	    {
		console.log(resp);
		// 
		// clear text fields
		$("#GoalToAdd")[0].value = '';

		if (JSON.parse(resp) === true)
		{
		    console.log("input worked");
		    // displayTable(object,[]);
		    getStuff(object.goals);
		    // object.refresh();
		}
		else
		{
		    console.log("input failed");
		}
	    } // end success function
	} // end ajax data
    ) // end ajax function call
} // end insertGoal function

/*
  Open a dialog box containing the current goals's contents.
  
  Send them off to the server when finished.
*/
function editGoal()
{
    var object = this.data; 
    
    console.log("this.sid:");  // user_goal.id
    console.log(this.sid);
    var link = this.sid;

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
    var string  = '<div id="goalUpdater" title="Update '+object.type+'">';
    string += '<table>';
    string += '<tr>';
    string += '<td>value</td>'; 

    string += '<td>';
    string += '<input id="embedValue" value="'+current.value+'">';
    string += '</td>';
    string += '</tr>';

    string += '</table></div>';

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
		    var value = $("#embedValue")[0].value;

		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#postingUpdater")[0]);
		    var toDestroy = 
			[
			    "embedValue","goalUpdater"
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
				value: value,
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

function fillGoals(object,input)
{
    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var value = input.values[i];

	var p = new goal(id,value);
	contents.push(p);
    }
    

    displayTable(object);
    displayGoalsPortlet(object);
    
    embelishTable(object,dialogObjectWrapper);
}




function displayGoalsPortlet(object)
{
    $("#goalsPortlet").empty();

    var main = $("#goalsPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var value = object.contents[i].value;
	
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}


