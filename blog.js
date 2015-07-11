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
    // displayGoalsPortlet(object);

}


/*
  Mon Jul 06, 2015 16:01:15
  This function is broken..

  Maybe it should be deleted.
*/	
function getBlogId(object,title,text)
{
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "data",
	    text:
	    {
		user: object.parent.user.name,
		pass: object.parent.user.password,
		//func: object.updater,
		// sid: link,
		title: title,
		text: text,
		func: "getBlogId"
	    },
	    success: function(resp)
	    {
		console.log(resp);
		//				if (JSON.parse(resp) === true)
		if (resp == "true" )
		{
		    console.log("got blog id");
		    // displayTable(object,[]);
		    // getStuff(object);
		    // object.parent.refresh();
		    return resp;
		    // call back
		}
		else
		{
		    console.log("removal failed");
		}
	    }	
	}
    );    
}


function buildBlogFormString()
{
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

    string += '</table></div>';

    
    return string;
}

function fixBlogUpdaterDialogCSS()
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
    
}




function giveBlogInsertionToButler(object,title,text,callback)
{
    console.log("from giveBlogInsertionToButler: callback= ");
    console.log(callback);

    console.log("typeof callback == 'function'");
    console.log(typeof callback == 'function');

    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		user: gregsList.user.name,
		pass: gregsList.user.password,
		//func: object.updater,
		// sid: link,
		title: title,
		text: text,
		func: "insertBlog"
	    },
	    success: function(resp)
	    {
		console.log(resp);
		//console.log(JSON.parse(resp));
		// 
		//				if (JSON.parse(resp) === true)
		// if (resp == "true" )
		if ( !isNaN( resp ) )
		{
		    // console.log("removal worked");
		    // displayTable(object,[]);
		    // getStuff(object);
		    // object.parent.refresh();
		    // callback(object);
		    console.log("got a number.");
		}
		else
		{
		    console.log("removal failed");
		}
		
		getStuff(object);
		object.parent.refresh();


	    }	
	}
    );
    
}


function insertBlog(callback)
{
    // var object = this.data; 
    var object = this.blog; 
    console.log("from insertBlog: object = ");
    console.log(object);
    console.log("callback");
    console.log(callback);
    console.log("typeof callback = ");
    console.log(typeof callback);
    
    // build form 
    var string = buildBlogFormString();


    $(string).dialog
    (
	{
	    width: "80%",
	    //height: "80%",
	    height: 400,
	    
	    open: function()
	    {
		fixBlogUpdaterDialogCSS();
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
		    var title = $("#blogUpdateEmbedTitle")[0].value;
		    var text = $("#blogPostContentsToAdd")[0].value;

		    // display what we're doing
		    console.log("sending " + 
				"title=" + title + ", " +
				"text=" + text + ", " +
				" to the butler."
			       );

		    
		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#scheduleUpdater")[0]);
		    var toDestroy = 
			[
			    "blogPostContentsToAdd",
			    "blogDialogAddTable",
			    "blogUpdater"
			];

		    for (var i=0; i < toDestroy.length; i++)
			removeElement(toDestroy[i]);



		    giveBlogInsertionToButler(object,title,text,callback);
		    
		    // return an id
		    // return getBlogId(object,title,text);
		}
	    }
	}
    );

    
}

