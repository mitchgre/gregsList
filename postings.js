
function sendScraperRequest (divId,url)
{
    // Overview:
    // send request to scraper.
    // scraper should send back an array of json objects.
    // can either dump the objects to the dom, store them in db, or javascript.    
      $.ajax
      (
	  {
	      url:"butler.php",
	      type: "post",
	      dataType: "text",
	      data:
	      {
		  user:gregsList.user.name,
		  pass:gregsList.user.password,
		  func: "scrapePostings",
		  url: url// encodeURIComponent(url),
		  // url: encodeURIComponent(url)
	      },
	      success: function(resp)
	      {
		  console.log('got a response from scraper');
		  console.log(JSON.parse(resp));
		  gregsList.refresh();
	      } // end success func
	  } // end ajax json
      ); // end ajax function
	      	  
}

function getIndeedScraperDialogString(divId)
{
    // create and return a string of html
    var string  = '<div id="'+divId+'" title="'+divId+'">';
    string += '<table>';
    string += '<tr><td>Keyword:  <input id="scraperKeyword"></td></tr>';
    string += '<tr><td>Location:  <input id="scraperLocation"></td></tr>';
    string += '<tr><td>Limit:  <input id="scraperLimit"></td></tr>';
    string += '</table></div>';

    return string;
}



function getScraperParameters()
{
    // sample url.
    // url = "http://www.indeed.com/jobs?q=software+developer&l=San+Francisco,+CA&limit=75&start=0";
    // url = "http://www.indeed.com/jobs?q=software+developer&l=San+Francisco,+CA&limit=100&start=0";
    // get url from dialog

    var url = "http://www.indeed.com/jobs?q=";
    // url += $("#scraperKeyword")[0].value;		// need to replace all spaces in the string with plus signs
    var keyword = $("#scraperKeyword")[0].value;	// get value from input box
    keyword = keyword.replace(/ /g,"+");		// replace ' ' chars with '+' throughout entire string
    url += keyword;					// append replaced string to url

    url += "&l=";					// append location flag
    var location = $("#scraperLocation")[0].value;	// get value from input box
    location = location.replace(/ /g,"+");		// replace ' ' chars with '+' throughout entire string
    url += location;					// append replaced string to url
    
    // url += "&limit=100";				// hardcode limit for now.
    url += "&limit=";					// softcode limit.
    var limit = $("#scraperLimit")[0].value;		// get value from input box    
    url += limit;

    console.log('scraping url:');
    console.log(url);
    return url;
}

function openScraperDialog()
{
    // get dialog string
    var divId = 'scraperDialog';
    var scraperDialogString = getIndeedScraperDialogString(divId);
    
    $(scraperDialogString).dialog(
    {
	modal:true,
	buttons:
	{
	    Cancel: function() 
	    {
		$(this).dialog("close");
	    },
	    "Scrape":function()
	    {
		var url = getScraperParameters();
		// remove input boxes
		
		var toDestroy = ["scraperLocation","scraperKeyword",
				 "scraperLimit","scraperDialog"];
		
		for (var i=0; i < toDestroy.length; i++)
		    removeElement(toDestroy[i]);
		
		// get postings from scraper, store them in div
		$(this).dialog("close");
		sendScraperRequest(divId,url);
	    }
	}
    });
    
}


function scrapePostings()
{
    // startup messages
    console.log("scraping postings.");
    console.log(this);

    // open input dialog 
    openScraperDialog();

    // get results from ajax
    // sendScraperRequest();
}


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

		    // var url = '<a href = \\"' + $("#embedURL")[0].value + '\\">link</a>';
		    var url = $("#embedURL")[0].value;

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


function setMotivation(object,postingId,motivation)
{
    console.log("setting motivation for " + postingId);
    console.log(object);
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
		func: "setMotivation",
		postingId: postingId,
		motive: motivation,
	    },
	    success: function(resp)
	    {
		console.log(resp);
		//console.log(JSON.parse(resp));
		// 
		if (JSON.parse(resp) === true)
		{
		    // console.log("removal worked");
		    // displayTable(object,[]);
		    getStuff(object);
		    // object.parent.refresh();
		}
		else
		{
		    console.log("setMotivation() failed");
		}
	    }	
	}
    );
}

function togglePostingStatus(object,postingId)
{
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
		func: "togglePostingStatus",
		postingId: postingId,
	    },
	    success: function(resp)
	    {
		console.log(resp);
		//console.log(JSON.parse(resp));
		// 
		if (JSON.parse(resp) === true)
		{
		    // console.log("removal worked");
		    // displayTable(object,[]);
		    getStuff(object);
		    // object.parent.refresh();
		}
		else
		{
		    console.log("togglePostingStatus() failed");
		}
	    }	
	}
    );
}
    
/*
  Add input boxes to all of the postings. 
  This could be generalized to companies and industries also, 
  but for now it's just postings. 
*/
function addMotivationInputs(object)
{
    console.log("adding motivation inputs");

    var tableId = object.table.id;

    // get the nth children  (8th in this case)
    var ids = $("#" + tableId + " tr td:nth-child(1)");
    var cells = $("#" + tableId + " tr td:nth-child(8)");
    // console.log(cells);
    // console.log(ids);

    // loop over cells, adding input elements 
    for ( var i = 0; i < cells.length; i++ )
    {
	// get current contents
	// var prev = cells[i].html();
	var thisCell = cells[i];
	var thisId = ids[i].innerHTML;
	// console.log(thisId);

	// console.log(thisCell);
	var content = thisCell.innerHTML;
	
	// console.log("emptying element");
	emptyElement(thisCell);
	

	// append an input element
	var input = addInput(thisCell, 'number', '', content);
	input.sid = thisId;

	// handle change events
	input.onchange = function()
	{
	    console.log("setting " + this.sid + " to " + this.value);
	    // if (this.value 
	    setMotivation(object,this.sid,this.value);
	}

	// cells[i].html('<input type="number"></input>');
    }

    

}

function displayPostingCounts()
{
}

/*
  erase gregsList object's postings and rebuild them from input
*/
function fillPostings(object, input)
{
    console.log("object");
    console.log(object);
    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var title = input.titles[i];
	var url = "<a href=\""+input.urls[i]+"\">link</a>";
	var location = input.locations[i];
	var company = input.companies[i];
	var source = input.sources[i];
	var status = input.statuses[i];
	var motivation = input.motivations[i];

	var p = new posting(id,title,url,location,
			    company,source,status,motivation);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    displayPostingsPortlet(object);

    // embelishTable(object,popUpDialogForJobPosting);
    embelishTable(object,dialogObjectWrapper2);
    addMotivationInputs(object);

    // display counts and next/prev buttons
    displayPostingCounts();
    
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
