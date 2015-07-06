


function insertPosting()
{
    var object = this.postings;
    console.log("insert posting object");
    console.log(object);


    // build form 
    var string  = '<div id="postingUpdater" title="Add '+object.type+'">';
    string += '<table>';
    string += '<tr>';
    string += '<td>title</td>'; 

    string += '<td>';
    string += '<input id="embedTitle" value="">';
    string += '</td>';
    string += '</tr>';


    string += '<tr><td>url</td>';
    string += '<td><input id="embedURL" value=""></td></tr>';

    string += '<tr><td>company</td>';
    string += '<td><input id="embedCompany" value=""></td></tr>';

    string += '<tr><td>location</td>';
    string += '<td><input id="embedLocation" value=""></td></tr>';

    string += '<tr><td>source</td>';
    string += '<td><input id="embedSource" value=""></td></tr>';
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
		"Add":function()
		{
		    // get values from form
		    var title = $("#embedTitle")[0].value;

		    var url = '<a href = \\"' + $("#embedURL")[0].value + '\\">link</a>';
		    //var url = $("#embedURL")[0].value;

		    // instead of using a string, try creating an element,
		    // and embedding the url in element 

		    var comp = $("#embedCompany")[0].value;
		    var loc = $("#embedLocation")[0].value;
		    var source = $("#embedSource")[0].value;

		    console.log("title:"+title);
		    console.log("url:"+url);
		    console.log("comp:"+comp);
		    console.log("loc:"+loc);
		    console.log("source:"+source);

		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#postingUpdater")[0]);
		    var toDestroy = 
			[
			    "embedSource","embedLocation",
			    "embedCompany","embedURL",
			    "embedTitle","postingUpdater"
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
				func: "insertPosting",
				url: url,// encodeURIComponent(url),
				//url: encodeURIComponent(url),
				title: title,
				company: comp,
				location: loc,
				source: source
			    },
			    success: function(resp)
			    {
				if (resp !== '')
				    {					
					console.log(JSON.parse(resp));
					if (JSON.parse(resp) === true)
					{
					    console.log("input worked");
					    // displayTable(object,[]);
					    // getStuff(object.parent);
					    object.parent.refresh();
					}
					else
					{
					    console.log("input failed");
					}

				    }
				else
				    console.log('empty response');
				// 
				// clear text fields
				

			    } // end success func
			} // end ajax json
		    ) // end ajax parameters
		} // end add button func	
	    } // end buttons
	} //end dialog json
    )  //end dialog func
} //end insertPosting func


/*
  Open a dialog box containing the current posting's contents.
  
  Send them off to the server when finished.
*/
function editPosting()
{
    var object = this.data; 
    
    console.log("this.sid:");
    console.log(this.sid);
    var link = this.sid;
    
    console.log("object.destroyer:");
    console.log(object.destroyer);

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
    var string  = '<div id="postingUpdater" title="Update '+object.type+'">';
    string += '<table>';
    string += '<tr>';
    string += '<td>title</td>'; 

    string += '<td>';
    string += '<input id="embedTitle" value="'+current.title+'">';
    string += '</td>';
    string += '</tr>';


    string += '<tr><td>url</td>';
    string += '<td><input id="embedURL" value="'+current.url+'"></td></tr>';

    string += '<tr><td>company</td>';
    string += '<td><input id="embedCompany" value="'+current.company+'"></td></tr>';

    string += '<tr><td>location</td>';
    string += '<td><input id="embedLocation" value="'+current.location+'"></td></tr>';

    string += '<tr><td>source</td>';
    string += '<td><input id="embedSource" value="'+current.source+'"></td></tr>';
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
		    var title = $("#embedTitle")[0].value;
		    var url = $("#embedURL")[0].value;
		    var comp = $("#embedCompany")[0].value;
		    var loc = $("#embedLocation")[0].value;
		    var source = $("#embedSource")[0].value;

		    console.log("title:"+title);
		    console.log("url:"+url);
		    console.log("comp:"+comp);
		    console.log("loc:"+loc);
		    console.log("source:"+source);

		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#postingUpdater")[0]);
		    var toDestroy = 
			[
			    "embedSource","embedLocation",
			    "embedCompany","embedURL",
			    "embedTitle","postingUpdater"
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
				title: title,
				url: encodeURIComponent(url),
				company: comp,
				location: loc,
				source: source
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
				    // getStuff(object);
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


    

/*
  erase gregsList object's postings and rebuild them from input
*/
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
    displayPostingsPortlet(object);

    embelishTable();
}


function embelishTable()
{
    // hide first children (headers and columns)   
    $("#tableOfPostings tr th:first-child").css("display","none");
    $("#tableOfPostings tr td:first-child").css("display","none");
    


    // add analytics to titles on click.  (This probably deserves its own function)
    $("#tableOfPostings tr td:nth-child(2)")

	.click(
	    function()
	    {
		// get posting object by sid (stored in hidden cell)		
		var sid = $(this.previousSibling).text();	// get sid from DOM
		var postingObject = getPostingFromSid(sid);		
		console.log(postingObject);
		
		popUpDialogForJobPosting(postingObject);
		

	    }
	);  // end click
}


function popUpDialogForJobPosting(postingObject)
{
    var postTitle = postingObject.title;
    // build up a dialog string
    var postingPopUp = '<div id="popUp" title="'+postTitle+'">';
    //postingPopUp += '<button type="button">Similar</button>'
    postingPopUp += '</div>';
    
    $(postingPopUp)
	.dialog
    (
	{
	    modal:true,
	    buttons:
	    {
		"Show Notes": function()
		{
		    console.log("show notes clicked");

		    getPostingNotes(postingObject);

		    $(this).dialog('close');

		    // open dialog showing all blog posts that link to this posting
		    
		},
		"Add Note":function()
		{
		    console.log("add notes clicked");

		    addPostingNote(postingObject);

		    $(this).dialog('close');

		    // open dialog for inserting a blog post
		    // get sid of blog post

		}
	    }
	}
    )
}


function joinBlogToPosting( blogId , postingId )
{
    // just send this to the butler and let PHP do the lifting
    console.log("joining blogId:")
    console.log(blogId);
    console.log("with posting ID:");
    console.log(postingId);

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
		func: "insertNotesPostingUser",
		noteId: blogId,
		postingId: postingId
	    },
	    success: function(resp)
	    {
		if (resp !== '')
		{					
		    console.log(JSON.parse(resp));
		    if (JSON.parse(resp) === true)
		    {
			console.log("input worked");
			// displayTable(object,[]);
			// getStuff(object.parent);
			object.parent.refresh();
		    }
		    else
		    {
			console.log("input failed");
		    }
		    
		}
		else
		    console.log('empty response');
		
	    } // end success func
	} // end ajax json
    ) // end ajax parameters
}



function givePostingNoteInsertionToButler(object,title,text,callback)
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
		postingId: object.sid,
		func: "insertNotesPostingUser"
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
		    
		    // resp should contain the blogId
		    
		    // need to call insertNotesPostingUser
		    
		}
		else
		{
		    console.log("removal failed");
		}
	    }	
	}
    );
    
}



// gets called when posting title is clicked, and "addNote" is selected
function addPostingNote(postingObject)
{
    // postingObject is a specific post.
    // console.log("postingObject=");
    // console.log(postingObject);

    console.log("addPostingNote called.");
    
    // Mon Jul 06, 2015 15:32:03
    // copy a lot of functionality from insertBlog.
    // couldn't get it to work as a composition, but a decomposition might be easier.


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

		    // var callback = joinBlogToPosting( blogId , postingObject.sid );

		    // giveBlogInsertionToButler(object,title,text,callback);
		    
		    // return an id
		    // return getBlogId(object,title,text);

		    givePostingNoteInsertionToButler(postingObject,title,text)


		}
	    }
	}
    );





}


function getPostingNotes(postingObject)
{
}



function getPostingFromSid(sid)
{
    console.log("searching for sid=" + sid);

    // loop over postings
    for ( var i = 0; i < gregsList.postings.contents.length; i++ )
    {
	
	var posting = gregsList.postings.contents[i]; 
	// console.log("posting["+i+"]="+posting.sid);
	
	if ( posting.sid == sid  )
	{
	    return posting;
	}
    }
}



function displayPostingsPortlet(object)
{
    $("#postingsPortlet").empty();

    var main = $("#postingsPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var value = object.contents[i].title;
	
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}
