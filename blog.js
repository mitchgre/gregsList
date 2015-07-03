function fillBlog(object,input)
{
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var title = input.titles[i];
	var text = input.texts[i];

	var p = new blog(id,title,text);
	contents.push(p);
    }
    

    displayTable(object);
    displayGoalsPortlet(object);

}


function insertBlog()
{
    // var object = this.data; 
    var object = this.blog; 
    console.log("from insertBlog: object = ");
    console.log(object);
    
    // console.log("object.sid:");
    // console.log(object.sid);
    // var link = object.sid;



    // build form 
    var string  = '<div id="blogUpdater" title="Update Blog Post">';
    string += '<table id="blogDialogAddTable">';
    
    string += '<tr id="blogUpdateTitleRow">';
    string += '<td id="blogUpdateTitleName">title</td>'; 
    string += '<td id="blogUpdateTitleContent">';
    string += '<input id="blogUpdateEmbedTitle" value="'+null+'">';
    string += '</td>';
    string += '</tr>';

    string += '<tr id="blogUpdateContentRow"><td>blog post:</td>';
    string += '<td><textarea id="blogPostContentsToAdd"></textarea></td></tr>';
    // add datepicker here

    string += '</table></div>';



    $(string).dialog
    (
	{
	    // http://stackoverflow.com/questions/13233321/jquery-datepicker-in-a-dialog
	    width: "80%",
	    //height: "80%",
	    height: 400,
	    
	    open: function()
	    {
		$("#blogUpdater").css("width","100%");
		$("#blogDialogAddTable").css("height","80%");

		$("#blogDialogAddTable").css("width","100%");
		$("#blogDialogAddTable").css("height","80%");

		$( "#blogUpdateTitleRow" ).css("width","80%");

		$( "#blogUpdateTitleContent" ).css("width","80%");

		$( "#blogUpdateTitleContent" ).css("width","80%");

		$( "#blogUpdateEmbedTitle" ).css("width","80%");

		$( "#blogUpdateContentRow" ).css("width","80%");
		$( "#blogUpdateContentRow" ).css("height","80%");

		$( "#blogPostContentsToAdd" ).css("width","80%");
		$( "#blogPostContentsToAdd" ).css("height","80%");
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
		    var text = $("#embedDescription")[0].value;
		    var contact = $("#embedContact")[0].value;
		    var start = $("#embedStart")[0].value;
		    var end = $("#embedEnd")[0].value;


		    // display what we're doing
		    console.log("sending " + 
				"name=" + name + ", " +
				"description=" + description + ", " +
				"contact=" + contact + ", " +
				"start=" + start + ", " +
				"end=" + end + ", " +
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
				//func: "insertSchedule"
				func: "addSchedule"
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
				    getStuff(object);
				    object.parent.refresh();
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

