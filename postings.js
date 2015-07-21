


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

    embelishTable(object,popUpDialogForJobPosting);
}



function popUpDialogForJobPosting(postingObject)
{
    var postTitle = postingObject.title;
    // build up a dialog string

    var postingPopUp;
    postingPopUp = document.createElement('div');
    postingPopUp.id = 'popUpNotesOnPosting';
    postingPopUp.title = postingObject.title + " Notes";
    
    
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

		    // $(this).dialog('close');
		    
		    // open dialog showing all blog posts that link to this posting
		    // postingPopUp.innerHTML = '';
		    // emptyElement(postingPopUp);
		},
		"Add Note":function()
		{
		    console.log("add notes clicked");

		    addPostingNote(postingObject);

		    $(this).dialog('close');

		    // open dialog for inserting a blog post
		    // get sid of blog post

		},
		"Close":function()
		{
		    $(this).dialog('close');
		}
		
	    }
	}
    )
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
		/*
		if ( !isNaN( resp ) )  // response should be a number?
		{
		    gregsList.refresh();
		}
		else
		{
		    console.log("something went wrong in 'givePostingNoteInsertionToButler' ");
		}
		*/
		gregsList.refresh();
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

		    givePostingNoteInsertionToButler(postingObject,title,text)


		}
	    }
	}
    );





}


function createPostingPopUpDiv(postingObject)
{
    var postingPopUp;
    postingPopUp = document.createElement('div');
    postingPopUp.id = 'popUpNotesOnPosting';
    postingPopUp.title = postingObject.title + " Notes";
    /*
    postingPopUp.style.width = "50%";
    postingPopUp.style.height = "80%";
    postingPopUp.style.overflow = "auto;"
    */
    console.log(postingPopUp);
    // var postParent = postingPopUp.parentNode;
    // console.log(postParent);
    /*
    postParent.setAttribute('style','width:50%');
    postParent.setAttribute('style','height:80%');
    postParent.setAttribute('style','overflow:auto');
    */
    return postingPopUp;
}

function createPostingPopUpDivWrapper(postingObject)
{
    var postingPopUp;

    if ( document.getElementById('popUpNotesOnPosting') === null ) // doesn't exist
	postingPopUp = createPostingPopUpDiv(postingObject);
    else
	{
	    postingPopUp = document.getElementById('popUpNotesOnPosting');  // get div
	    postingPopUp.parentNode.removeChild(postingPopUp); // destroy div 
	    postingPopUp = createPostingPopUpDiv(postingObject); // create div
	}
    return postingPopUp;
}

function getPostingNotes(postingObject)
{
    // get the butler to give you all the notes on this posting
    console.log('gonna get them notes.');
    
    // use document create element
    var postingPopUp = createPostingPopUpDivWrapper(postingObject);

    // var postingPopUp = document.createElement('div');
    // postingPopUp.id = postingObject.title + 'Notes';
    // createAppendedChildToParent(postingPopUp);


    $(postingPopUp)
	.dialog
    (
	{
	    modal:true,
	    height: 0.5 * $(window).width(),  // "auto",
	    width:"70%",
	    buttons:
	    {
		"OK": function()
		{
		    emptyElement(postingPopUp);
		    $(this).dialog('close');
		}
	    }
	}
    );



    
    // expect an array of sIDs corresponding to the blogIds.
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
		func: "getNotesOnPosting",
		postingId: postingObject.sid
	    },
	    success: function(resp)
	    {
		// resp contains an array of ints (sIDs to blog postings)
		// the blog texts should already be loaded in javascript memory. 
		// (gregsList.blog.contents)
		var postingBlogIDs = JSON.parse(resp);

		console.log("got notes on posting " + postingObject.sid);
		console.log(resp);
		console.log(JSON.parse(resp));


		// get a reference to the popUp dialog window in DOM
		// var div = document.getElementById(postingPopUp.id);
		var div = document.getElementById("popUpNotesOnPosting");
		emptyElement(div);
		console.log(div.innerHTML)

		// callback should display a tableOfBlogs.		
		// var tableTitle = '"tableOfBlogsOn'+postingObject.title+'"';
		var tableTitle = 'tableOfBlogsOnPosting';
		var table = createAppendedChildToParent('table',div);
		table.id = tableTitle;
		// table.border = '1';
		table.className = "io"; 
		// $('#popUpWindowForJobPosting').append("<table id="+tableTitle+"></table>");

		

		// loop over postingBlogIDs
		console.log("looping over blog ids");
		for ( var i = 0; i < postingBlogIDs.length; i++ )
		{
		    
		    var thisID = postingBlogIDs[i];
		    // console.log("i="+i);
		    console.log("thisID="+thisID);
		    // var tr = createAppendedChildToParent(tr,table);
		    // tr.innerHTML = gregsList.blog.contents[thisID].text;


		    
		    // loop over gregsList.blog.contents
		    for ( var j = 0;  j < gregsList.blog.contents.length; j++ )
		    {
			// console.log("j="+j)
			// console.log(gregsList.blog.contents[j].sid);

			if ( gregsList.blog.contents[j].sid ==  thisID  )
			{
			    // insert blog to DOM table
			    console.log("got a hit")
			    var tr = createAppendedChildToParent('tr',table);
			    var td = createAppendedChildToParent('td',tr);
			    td.innerHTML = gregsList.blog.contents[ j ].text;
			}
		    }
		}
	    } // end success func
	} // end ajax json
    ) // end ajax parameters
    
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
