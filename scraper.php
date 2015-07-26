<?php

// Defining the basic cURL function
function curl($url) {
    // Assigning cURL options to an array
    $options = Array(
        CURLOPT_RETURNTRANSFER => TRUE,  // Setting cURL's option to return the webpage data
        CURLOPT_FOLLOWLOCATION => TRUE,  // Setting cURL to follow 'location' HTTP headers
        CURLOPT_AUTOREFERER => TRUE, // Automatically set the referer where following 'location' HTTP headers
        CURLOPT_CONNECTTIMEOUT => 120,   // Setting the amount of time (in seconds) before the request times out
        CURLOPT_TIMEOUT => 120,  // Setting the maximum amount of time for cURL to execute queries
        CURLOPT_MAXREDIRS => 10, // Setting the maximum number of redirections to follow
        CURLOPT_USERAGENT => "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1a2pre) Gecko/2008073000 Shredder/3.0a2pre ThunderBrowse/3.2.1.8",  // Setting the useragent
        CURLOPT_URL => $url, // Setting cURL's URL option with the $url variable passed into the function
    );
    
    $ch = curl_init();  // Initialising cURL 
    // echo $ch;
    curl_setopt_array($ch, $options);   // Setting cURL's options using the previously assigned array data in $options
    $data = curl_exec($ch); // Executing the cURL request and assigning the returned data to the $data variable
    curl_close($ch);    // Closing cURL 
    return $data;   // Returning the data from the function 
}



// Defining the basic scraping function
function scrape_between($data, $start, $end){
    $data = stristr($data, $start); // Stripping all data from before $start
    $data = substr($data, strlen($start));  // Stripping $start
    $stop = stripos($data, $end);   // Getting the position of the $end of the data to scrape
    $data = substr($data, 0, $stop);    // Stripping all data from after and including the $end of the data to scrape
    return $data;   // Returning the scraped data from the function
}

// get 2nd table
function get_second_table($text)
{
    // get td with id "resultsCol"
   
    $sd = scrape_between($text, "<td id=\"resultsCol\">","<div class=\"related_searches\">");
    return $sd;
}



function getScrapedLink($noise)
{
    // base link
    $link = "http://indeed.com";

    // get secondary component from noise
    $scraping = scrape_between($noise,"href=\"","\"");
    $link .= $scraping;

    return $link;
}

function getScrapedTitle($noise)
{
    // $title = "title";
    $title = scrape_between($noise,"title=\"","\"");
    return $title;

}

function getScrapedCompany($noise)
{
    // $company = "company";
    $companyName = scrape_between(
        $noise,
        "<span class=company itemprop=\"hiringOrganization\" itemtype=\"http://schema.org/Organization\"><span itemprop=\"name\">",
        "</span>");
    return $companyName;

}

function getScrapedLocation($noise)
{
    // $location = "location";
    
    $location = scrape_between(
        $noise,
        "itemscope itemtype=\"http://schema.org/Postaladdress\"><span itemprop=\"addressLocality\">",
        "<");

    return $location;

}

function getScrapedDescription($noise)
{
    // $description = "description";

    $description = scrape_between(
        $noise,
        "<span class=summary itemprop=\"description\">",
        "</span>");

    return $description;

}


// get an associative array
function scrapePostings($url)
{

    //echo yo mama;
    $postings = [];     // empty array

    $page = curl( $url );   // get all html

    // return $page;
    
    // loop over $scraping pulling all titles, links, locations somehow.
    // breaking this down:

    // filter page down to the relevant table
    $page = get_second_table($page);

    // explode on anchors
    /*
      example:

<a
rel="nofollow"
href="/rc/clk?jk=c23a6d772a159c96" target="_blank"
onmousedown="return rclk(this,jobmap[0],0);"
onclick="return rclk(this,jobmap[0],true,0);"
itemprop="title"
title="Software Engineer - New Grad - 2016"
class="turnstileLink"
data-tn-element="jobTitle"><b>Software</b> Engineer - New Grad - 2016</a>

     */
    $anchor = "<a\nrel=\"nofollow\""; 

  
    
    // $postings = $page;
    // explode page by anchors 
    $pieces = explode($anchor, $page);
 
  

    // loop over pieces
    for ( $i = 0; $i < count( $pieces ); $i++ )
    {
        $piece = $pieces[$i];
        $link = getScrapedLink($piece);
        $title = getScrapedTitle($piece);
        $company = getScrapedCompany($piece);
        $location = getScrapedLocation($piece);
        $description = getScrapedDescription($piece);
        
        // compose the singular posting
        $posting = array(
            "link" => $link,
            "title" => $title,
            "company" => $company,
            "location" => $location,
            "description" => $description
        );

        // push the singular posting into the plural
        array_push($postings,$posting);
    }


    return $postings;
}



?>
